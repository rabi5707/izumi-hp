"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";

export default function CartPage() {
  const router = useRouter();
  const cart = useCart((s) => s.cart);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const { subtotal, hasFrozen, frozenSubtotal, ship, total, canCheckout } =
    useMemo(() => {
      const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
      const hasFrozen = cart.some((c) => c.freeze);
      const frozenSubtotal = cart
        .filter((c) => c.freeze)
        .reduce((s, c) => s + c.price * c.qty, 0);
      const ship = hasFrozen ? (frozenSubtotal >= 10000 ? 0 : 1500) : 0;
      return {
        subtotal,
        hasFrozen,
        frozenSubtotal,
        ship,
        total: subtotal + ship,
        canCheckout: cart.length > 0,
      };
    }, [cart]);

  return (
    <section className="shell">
      <div className="crumb">
        <Link href="/shop">ホーム</Link>
        <span className="sep">/</span>
        <span>御買物籠</span>
      </div>
      <div className="list-head" style={{ marginTop: 32 }}>
        <div>
          <h1>御買物籠</h1>
          <div className="count">
            {cart.length} ITEMS · 合計 {cart.reduce((s, c) => s + c.qty, 0)}{" "}
            点
          </div>
        </div>
      </div>
      <div className="cart-shell">
        <div>
          {cart.length === 0 ? (
            <div
              style={{
                padding: "80px 20px",
                textAlign: "center",
                color: "var(--ink-mute)",
              }}
            >
              <span className="kamon" style={{ marginBottom: 24 }} aria-hidden />
              <div
                className="kanji-h"
                style={{ fontSize: 20, marginBottom: 16 }}
              >
                まだ御品が入っておりません
              </div>
              <Link href="/shop" className="btn btn-ghost">
                お品書きを見る
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="ph">
                  <div className="ph-label">#{item.id}</div>
                </div>
                <div>
                  <div className="n">
                    {item.ja}
                    {item.freeze && (
                      <span
                        style={{
                          marginLeft: 10,
                          fontFamily: "var(--f-mono)",
                          fontSize: 10,
                          letterSpacing: "0.2em",
                          color: "var(--accent)",
                          border: "1px solid var(--accent)",
                          padding: "2px 6px",
                        }}
                      >
                        冷凍
                      </span>
                    )}
                  </div>
                  <div className="sub">
                    {item.en} · {item.serves}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <div
                      className="qty"
                      style={{
                        transform: "scale(0.9)",
                        transformOrigin: "left",
                      }}
                    >
                      <button onClick={() => setQty(item.id, item.qty - 1)}>
                        −
                      </button>
                      <input
                        value={item.qty}
                        onChange={(e) =>
                          setQty(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                      <button onClick={() => setQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p">
                  ¥{(item.price * item.qty).toLocaleString()}
                </div>
                <div className="x" onClick={() => remove(item.id)}>
                  ×
                </div>
              </div>
            ))
          )}
        </div>
        <aside className="summary">
          <h3>御精算</h3>
          <div className="row">
            <span>小計</span>
            <span className="v">¥{subtotal.toLocaleString()}</span>
          </div>
          {hasFrozen && (
            <div className="row">
              <span>
                冷凍便送料
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--ink-mute)",
                    marginLeft: 8,
                  }}
                >
                  ¥10,000以上で無料
                </span>
              </span>
              <span className="v">
                {ship === 0 ? "無料" : `¥${ship.toLocaleString()}`}
              </span>
            </div>
          )}
          <div className="row total">
            <span>合計 (税込)</span>
            <span className="v">¥{total.toLocaleString()}</span>
          </div>

          <button
            className="btn btn-accent"
            style={{
              width: "100%",
              marginTop: 20,
              opacity: canCheckout ? 1 : 0.4,
              cursor: canCheckout ? "pointer" : "not-allowed",
            }}
            disabled={!canCheckout}
            onClick={() => canCheckout && router.push("/shop/delivery")}
          >
            配達指定へ進む　→
          </button>
          <Link
            href="/shop"
            className="btn btn-line"
            style={{ width: "100%", marginTop: 10 }}
          >
            お買物を続ける
          </Link>
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              marginTop: 20,
              lineHeight: 1.9,
              letterSpacing: "0.06em",
            }}
          >
            冷凍便 : 1配送先あたり ¥1,500 （¥10,000以上で無料）
            <br />
            ケータリングは
            <Link
              href="/catering"
              style={{ textDecoration: "underline" }}
            >
              アドバイザーへのご相談
            </Link>
            より承ります
            <br />
            法人様は請求書払いがご利用いただけます
          </div>
        </aside>
      </div>
    </section>
  );
}
