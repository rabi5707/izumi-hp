// POST /api/inquiry
// Receives catering/quote inquiries and records them to Firestore.
// Works even without Firestore configured (degrades to logging) so the form
// stays usable during early dev.
//
// セキュリティ:
//   - クライアント値はホワイトリストに含まれるフィールドのみ採用（status / inquiryNo
//     を上書きされないため）。
//   - 各文字列に長さ上限を設け、Firestore ドキュメント肥大化を防止。
//   - IP 単位で簡易レート制限（メモリ内・lambda 単一インスタンス前提の暫定実装）。
//     本格運用時には Upstash Redis や Vercel KV に置き換える想定。

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

// 受け付けるフィールドと最大長 (文字数)。InquiryClient.tsx の FormState と整合。
const STRING_FIELD_LIMITS: Record<string, number> = {
  name: 100,
  phone: 50,
  email: 200,
  corp: 200,
  date: 30,
  time: 30,
  people: 20,
  budget: 50,
  venue: 200,
  where: 30,
  addr: 500,
  menu: 1000,
  payment: 30,
  notes: 4000,
  referenceProductId: 100,
};
// 配列フィールド: 各要素を文字列として受け、要素数と各長さを制限。
const ARRAY_FIELD_LIMITS: Record<string, { items: number; itemLen: number }> = {
  service: { items: 20, itemLen: 50 },
};

const MAX_BODY_BYTES = 32 * 1024; // 32 KB
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// IP -> recent timestamps (ms). Single-instance only; resets on cold start.
const rateBuckets = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const arr = (rateBuckets.get(ip) ?? []).filter((t) => t > cutoff);
  if (arr.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, arr);
    return true;
  }
  arr.push(now);
  rateBuckets.set(ip, arr);
  // 簡易 GC: バケットが大きくなったら古い IP を捨てる
  if (rateBuckets.size > 1000) {
    for (const [k, v] of rateBuckets) {
      if (v.every((t) => t <= cutoff)) rateBuckets.delete(k);
    }
  }
  return false;
}

function genInquiryNo() {
  return "IQ-" + String(Math.floor(Math.random() * 900000) + 100000);
}

function pickFields(body: Record<string, unknown>) {
  const out: Record<string, string | string[]> = {};
  for (const [key, max] of Object.entries(STRING_FIELD_LIMITS)) {
    const v = body[key];
    if (typeof v === "string") {
      const trimmed = v.trim();
      if (trimmed) out[key] = trimmed.slice(0, max);
    } else if (typeof v === "number" && Number.isFinite(v)) {
      out[key] = String(v).slice(0, max);
    }
  }
  for (const [key, lim] of Object.entries(ARRAY_FIELD_LIMITS)) {
    const v = body[key];
    if (Array.isArray(v)) {
      const items: string[] = [];
      for (const el of v.slice(0, lim.items)) {
        if (typeof el === "string" && el.trim()) {
          items.push(el.trim().slice(0, lim.itemLen));
        }
      }
      if (items.length) out[key] = items;
    }
  }
  return out;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (tooManyRequests(ip)) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらくお待ちください。" },
      { status: 429 }
    );
  }

  // 早期に過大ペイロードを弾く。
  const lenHeader = req.headers.get("content-length");
  if (lenHeader && Number(lenHeader) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const fields = pickFields(raw as Record<string, unknown>);
  if (!fields.name || !fields.phone) {
    return NextResponse.json(
      { error: "name and phone are required" },
      { status: 400 }
    );
  }

  const inquiryNo = genInquiryNo();
  // 信頼フィールドは ...fields の後に置き、クライアント値で上書きされないようにする。
  const payload = {
    ...fields,
    inquiryNo,
    status: "new",
    createdAt: new Date().toISOString(),
    userAgent: (req.headers.get("user-agent") || "").slice(0, 500) || null,
    ip,
  };

  const canWrite =
    !!process.env.FIREBASE_PROJECT_ID &&
    !!process.env.FIREBASE_CLIENT_EMAIL &&
    !!process.env.FIREBASE_PRIVATE_KEY;

  if (canWrite) {
    try {
      const db = getAdminDb();
      await db.collection("inquiries").doc(inquiryNo).set(payload);
    } catch (e) {
      console.error("[inquiries] firestore write failed", e);
      // Still return success — we logged for manual follow-up.
    }
  } else {
    // Dev fallback: log so the operator can see inquiries before Firestore is wired up.
    console.log("[inquiries] received (no firestore):", payload);
  }

  return NextResponse.json({ inquiryNo });
}
