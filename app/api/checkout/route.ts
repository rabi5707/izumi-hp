// POST /api/checkout
// Creates a Stripe Checkout session for card payments, or writes an order
// directly to Firestore for invoice/cod/bank payments.

import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import type { CartItem, DeliveryData } from "@/lib/cart-store";

export const runtime = "nodejs";

type Body = {
  cart: CartItem[];
  delivery: DeliveryData;
  ship: number;
};

function genOrderNo() {
  return "IZ-" + String(Math.floor(Math.random() * 900000) + 100000);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { cart, delivery, ship } = body;
  if (!cart?.length || !delivery) {
    return NextResponse.json({ error: "empty cart or delivery" }, { status: 400 });
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
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
        items: cart.map((c) => ({
          id: c.id,
          ja: c.ja,
          en: c.en,
          price: c.price,
          qty: c.qty,
          freeze: c.freeze,
        })),
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
        ...cart.map((c) => ({
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
