"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(10);
  const addToCart = useCart((s) => s.addToCart);
  const router = useRouter();

  return (
    <>
      <div className="qty-row">
        <div className="qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <input
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
          />
          <button onClick={() => setQty(Math.min(200, qty + 1))}>+</button>
        </div>
        <div className="qty-note">
          お一人様ごと　｜　最小 1 / 最大 200
        </div>
      </div>
      <div className="buy-row">
        <button
          className="btn btn-ghost"
          onClick={() => addToCart(product, qty)}
        >
          買物籠に入れる
        </button>
        <button
          className="btn btn-accent"
          onClick={() => {
            addToCart(product, qty);
            router.push("/shop/cart");
          }}
        >
          ご注文手続きへ
        </button>
      </div>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}
      >
        <span className="chip">御見積のご依頼</span>
        <span className="chip">お電話でのご注文</span>
        <span className="chip">人数の後日変更可</span>
      </div>
    </>
  );
}
