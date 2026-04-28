"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-store";

function SuccessContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const orderNo = sp.get("orderNo");
  const clear = useCart((s) => s.clear);

  // Clear cart on arrival (covers Stripe redirect case).
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="shell">
      <div className="success">
        <span className="kamon" aria-hidden />
        <h1>御注文を承りました</h1>
        <div
          className="kanji-h"
          style={{
            fontSize: 15,
            color: "var(--ink-mute)",
            letterSpacing: "0.16em",
            lineHeight: 2.2,
          }}
        >
          この度はご利用頂き、誠にありがとうございます。
          <br />
          担当者よりご確認のお電話を差し上げます。
          <br />
          心を込めてお仕立て申し上げます。
        </div>
        <div className="order-no">
          ご注文番号　／　{orderNo || "—"}
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <button className="btn btn-ghost" onClick={() => router.push("/shop")}>
            ショップトップへ戻る
          </button>
          <Link href="/shop" className="btn btn-line">
            お品書きを見る
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="shell" style={{ padding: 80 }} />}>
      <SuccessContent />
    </Suspense>
  );
}
