// POST /api/checkout
// Creates a Stripe Checkout session for card payments, or writes an order
// directly to Firestore for invoice/cod/bank payments.
//
// 価格・送料はクライアント値を信頼せず、サーバ側 (lib/products.ts) のマスタから
// `id` で引き直す。送料は注文小計から再計算（10,000円以上で無料 / 1,500円）。
// これにより `{ price: 1 }` などの改ざんでの不正注文を防ぐ。

import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import { PRODUCTS } from "@/lib/products";
import type { DeliveryData } from "@/lib/cart-store";

export const runtime = "nodejs";

type ClientCartItem = { id?: unknown; qty?: unknown };
type Body = {
  cart?: ClientCartItem[];
  delivery?: DeliveryData;
};

const VALID_PAYMENTS: ReadonlyArray<DeliveryData["payment"]> = [
  "invoice",
  "card",
  "cod",
  "bank",
];

const MAX_QTY_PER_ITEM = 99;
const MAX_LINES = 50;
const FREE_SHIPPING_THRESHOLD = 10000;
const SHIPPING_FEE = 1500;

function genOrderNo() {
  return "IZ-" + String(Math.floor(Math.random() * 900000) + 100000);
}

/** Resolve client cart items against trusted PRODUCTS master. Throws on bad input. */
function resolveCart(raw: unknown) {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("カートが空でございます。");
  }
  if (raw.length > MAX_LINES) {
    throw new Error("ご注文点数が上限を超えております。");
  }
  const map = new Map<string, number>();
  for (const item of raw as ClientCartItem[]) {
    const id = typeof item?.id === "string" ? item.id : "";
    const qty = Math.floor(Number(item?.qty));
    if (!id) throw new Error("商品IDが不正でございます。");
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY_PER_ITEM) {
      throw new Error("数量が不正でございます。");
    }
    map.set(id, (map.get(id) ?? 0) + qty);
  }
  const lines: Array<{
    id: string;
    ja: string;
    en: string;
    price: number;
    qty: number;
    serves: string;
    freeze: boolean;
  }> = [];
  for (const [id, qty] of map) {
    const product = PRODUCTS.find((p) => p.id === id && p.type === "ec");
    if (!product) {
      throw new Error(`商品「${id}」は取り扱いがございません。`);
    }
    lines.push({
      id: product.id,
      ja: product.ja,
      en: product.en,
      price: product.price,
      qty,
      serves: product.serves,
      freeze: product.freeze,
    });
  }
  return lines;
}

function computeShip(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

function sanitizeDelivery(raw: unknown): DeliveryData {
  if (!raw || typeof raw !== "object") {
    throw new Error("お届け情報が不正でございます。");
  }
  const d = raw as Partial<DeliveryData>;
  const payment = d.payment;
  if (!payment || !VALID_PAYMENTS.includes(payment)) {
    throw new Error("お支払方法が不正でございます。");
  }
  const contactName = typeof d.contactName === "string" ? d.contactName.trim() : "";
  const contactPhone = typeof d.contactPhone === "string" ? d.contactPhone.trim() : "";
  if (!contactName || !contactPhone) {
    throw new Error("お名前とお電話番号は必須でございます。");
  }
  // string fields with caps
  const cap = (v: unknown, max: number) =>
    (typeof v === "string" ? v : "").slice(0, max);
  return {
    date: Number.isFinite(Number(d.date)) ? Number(d.date) : 0,
    time: cap(d.time, 20),
    where: (d.where as DeliveryData["where"]) ?? "venue",
    saijyou: cap(d.saijyou, 200),
    zip: cap(d.zip, 20),
    addr: cap(d.addr, 500),
    people: Number.isFinite(Number(d.people)) ? Number(d.people) : 0,
    contactName: contactName.slice(0, 100),
    contactPhone: contactPhone.slice(0, 50),
    contactRel: cap(d.contactRel, 100),
    noshi: cap(d.noshi, 50),
    noshiName: cap(d.noshiName, 100),
    note: cap(d.note, 2000),
    payment,
  };
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  let lines: ReturnType<typeof resolveCart>;
  let delivery: DeliveryData;
  try {
    lines = resolveCart(body.cart);
    delivery = sanitizeDelivery(body.delivery);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "invalid request";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const subtotal = lines.reduce((s, c) => s + c.price * c.qty, 0);
  const ship = computeShip(subtotal);
  const total = subtotal + ship;
  const orderNo = genOrderNo();

  // Persist order as pending (if Firestore configured).
  const canWriteOrder =
    !!process.env.FIREBASE_PROJECT_ID &&
    !!process.env.FIREBASE_CLIENT_EMAIL &&
    !!process.env.FIREBASE_PRIVATE_KEY;

  if (canWriteOrder) {
    try {
      const db = getAdminDb();
      await db.collection("orders").doc(orderNo).set({
        orderNo,
        status: delivery.payment === "card" ? "pending_payment" : "pending",
        payment: delivery.payment,
        items: lines,
        subtotal,
        ship,
        total,
        delivery,
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[orders] firestore write failed", e);
      // Continue — order creation should not fail if Firestore is not set up yet.
    }
  }

  // Non-card payments: return immediately.
  if (delivery.payment !== "card") {
    return NextResponse.json({ mode: "manual", orderNo });
  }

  // Card payment — create Stripe Checkout session.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      locale: "ja",
      line_items: [
        ...lines.map((c) => ({
          quantity: c.qty,
          price_data: {
            currency: "jpy",
            unit_amount: c.price,
            product_data: {
              name: c.ja,
              description: `${c.en} · ${c.serves}`,
            },
          },
        })),
        ...(ship > 0
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "jpy",
                  unit_amount: ship,
                  product_data: { name: "冷凍便 送料" },
                },
              },
            ]
          : []),
      ],
      customer_email: undefined, // collected inline by Checkout
      success_url: `${siteUrl}/shop/success?orderNo=${orderNo}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/confirm`,
      metadata: {
        orderNo,
        contactName: delivery.contactName,
        contactPhone: delivery.contactPhone,
      },
    });

    return NextResponse.json({ mode: "stripe", url: session.url });
  } catch (e) {
    console.error("[stripe] checkout session failed", e);
    const msg = e instanceof Error ? e.message : "stripe error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
