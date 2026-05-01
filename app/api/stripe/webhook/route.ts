// POST /api/stripe/webhook
// Receives Stripe events and updates the order status in Firestore.
//
// Setup:
//   stripe listen --forward-to localhost:3000/api/stripe/webhook
// Production: register the endpoint in Stripe Dashboard and paste the signing
// secret into STRIPE_WEBHOOK_SECRET.

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
// Disable body parsing — Stripe signature verification needs the raw body.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json(
      { error: "missing signature or secret" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (e) {
    console.error("[stripe webhook] signature verification failed", e);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderNo = session.metadata?.orderNo;
        if (orderNo) {
          const db = getAdminDb();
          await db
            .collection("orders")
            .doc(orderNo)
            .set(
              {
                status: "paid",
                stripeSessionId: session.id,
                stripePaymentIntent: session.payment_intent,
                paidAt: new Date().toISOString(),
              },
              { merge: true }
            );
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderNo = session.metadata?.orderNo;
        if (orderNo) {
          const db = getAdminDb();
          await db
            .collection("orders")
            .doc(orderNo)
            .set({ status: "expired" }, { merge: true });
        }
        break;
      }
      default:
        // no-op for other event types
        break;
    }
  } catch (e) {
    // Firestore 書込失敗時は 500 を返し Stripe にリトライさせる。
    // Webhook 配信履歴は Stripe Dashboard で確認可能。
    console.error("[stripe webhook] handler error", {
      type: event.type,
      id: event.id,
      err: e,
    });
    return NextResponse.json(
      { error: "handler failed", eventId: event.id },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
