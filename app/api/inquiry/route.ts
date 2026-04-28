// POST /api/inquiry
// Receives catering/quote inquiries and records them to Firestore.
// Works even without Firestore configured (degrades to logging) so the form
// stays usable during early dev.

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

function genInquiryNo() {
  return "IQ-" + String(Math.floor(Math.random() * 900000) + 100000);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!name || !phone) {
    return NextResponse.json(
      { error: "name and phone are required" },
      { status: 400 }
    );
  }

  const inquiryNo = genInquiryNo();
  const payload = {
    inquiryNo,
    status: "new",
    ...body,
    createdAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || null,
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
