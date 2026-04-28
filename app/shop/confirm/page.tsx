"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";

const PAYMENT_LABELS: Record<string, string> = {
  card: "クレジットカード",
  invoice: "請求書払い",
  cod: "代金引換",
  bank: "銀行振込",
};

export default function ConfirmPage() {
  const router = useRouter();
  const cart = useCart((s) => s.cart);
  const d = useCart((s) => s.delivery);
  const clear = useCart((s) => s.clear);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { subtotal, ship, total, deliveryDate } = useMemo(() => {
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const hasFrozen = cart.some((c) => c.freeze);
    const frozenSubtotal = cart
      .filter((c) => c.freeze)
      .reduce((s, c) => s + c.price * c.qty, 0);
    const ship = hasFrozen
      ? frozenSubtotal >= 10000
        ? 0
        : 1500
      : 0;
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    const deliveryDate = new Date(base);
    deliveryDate.setDate(base.getDate() + (d?.date || 0));
    return { subtotal, ship, total: subtotal + ship, deliveryDate };
  }, [cart, d]);

  const submit = async () => {
    if (!d) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, delivery: d, ship }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "決済セッションの作成に失敗しました");
      }
      const json = (await res.json()) as
        | { mode: "stripe"; url: string }
        | { mode: "manual"; orderNo: string };
      if (json.mode === "stripe") {
        // Stripe Checkout へリダイレクト
        window.location.href = json.url;
      } else {
        // 請求書・代引・銀行振込は即座に success へ
        clear();
        router.push(`/shop/success?orderNo=${encodeURIComponent(json.orderNo)}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "予期しないエラー");
      setSubmitting(false);
    }
  };

  if (cart.length === 0 || !d) {
    return (
      <section className="shell" style={{ padding: "80px 0", textAlign: "center" }}>
        <div
          className="kanji-h"
          style={{ fontSize: 18, color: "var(--ink-mute)" }}
        >
          注文情報が見つかりません
        </div>
        <button
          className="btn btn-ghost"
          style={{ marginTop: 24 }}
          onClick={() => router.push("/shop/cart")}
        >
          買物籠へ戻る
        </button>
      </section>
    );
  }

  return (
    <section className="form-shell shell">
      <div className="step-bar">
        <div className="step done">
          <span className="n">✓</span>買物籠
        </div>
        <span className="step-sep" />
        <div className="step done">
          <span className="n">✓</span>配達指定
        </div>
        <span className="step-sep" />
        <div className="step on">
          <span className="n">3</span>確認
        </div>
        <span className="step-sep" />
        <div className="step">
          <span className="n">4</span>完了
        </div>
      </div>

      <h1
        className="kanji-display"
        style={{ fontSize: 28, margin: "24px 0 36px" }}
      >
        ご注文内容のご確認
      </h1>

      <div className="confirm-card" style={{ marginBottom: 24 }}>
        <h3
          className="kanji-h"
          style={{ margin: "0 0 16px", fontSize: 14, letterSpacing: "0.2em" }}
        >
          お届け情報
        </h3>
        <dl style={{ margin: 0 }}>
          <div className="confirm-row">
            <dt>お届け日時</dt>
            <dd>
              {deliveryDate.getFullYear()}年 {deliveryDate.getMonth() + 1}月{" "}
              {deliveryDate.getDate()}日 ／ {d.time}
            </dd>
          </div>
          <div className="confirm-row">
            <dt>お届け先</dt>
            <dd>
              {d.saijyou || "（未入力）"}
              <br />〒{d.zip}　{d.addr}
            </dd>
          </div>
          <div className="confirm-row">
            <dt>お人数</dt>
            <dd>{d.people} 名様</dd>
          </div>
          <div className="confirm-row">
            <dt>ご連絡先</dt>
            <dd>
              {d.contactName}　／　{d.contactPhone}
            </dd>
          </div>
          <div className="confirm-row">
            <dt>熨斗・表書き</dt>
            <dd>
              {d.noshi}
              {d.noshiName && `　／　${d.noshiName}`}
            </dd>
          </div>
          <div className="confirm-row" style={{ borderBottom: "none" }}>
            <dt>お支払い</dt>
            <dd>{PAYMENT_LABELS[d.payment] || "—"}</dd>
          </div>
        </dl>
      </div>

      <div className="confirm-card">
        <h3
          className="kanji-h"
          style={{ margin: "0 0 16px", fontSize: 14, letterSpacing: "0.2em" }}
        >
          ご注文品
        </h3>
        {cart.map((c) => (
          <div
            key={c.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 20,
              padding: "14px 0",
              borderBottom: "1px solid var(--rule-soft)",
              alignItems: "baseline",
            }}
          >
            <div>
              <div className="kanji-h" style={{ fontSize: 15 }}>
                {c.ja}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-mute)",
                  letterSpacing: "0.14em",
                }}
              >
                {c.en}
              </div>
            </div>
            <div className="price-num" style={{ color: "var(--ink-mute)" }}>
              ¥{c.price.toLocaleString()} × {c.qty}
            </div>
            <div className="price-num">
              ¥{(c.price * c.qty).toLocaleString()}
            </div>
          </div>
        ))}
        <div
          style={{
            padding: "14px 0",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            fontSize: 13,
          }}
        >
          <span>小計</span>
          <span className="price-num">¥{subtotal.toLocaleString()}</span>
        </div>
        <div
          style={{
            padding: "6px 0 14px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            fontSize: 13,
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <span>送料</span>
          <span className="price-num">¥{ship.toLocaleString()}</span>
        </div>
        <div
          style={{
            padding: "18px 0 0",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "baseline",
          }}
        >
          <span className="kanji-h" style={{ letterSpacing: "0.24em" }}>
            合計 (税込)
          </span>
          <span className="price-num" style={{ fontSize: 26 }}>
            ¥{total.toLocaleString()}
          </span>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginTop: 20,
            padding: "12px 14px",
            background: "var(--accent-soft)",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <button
          className="btn btn-line"
          onClick={() => router.push("/shop/delivery")}
          disabled={submitting}
        >
          ← 内容を修正する
        </button>
        <button
          className="btn btn-accent"
          onClick={submit}
          disabled={submitting}
          style={{ opacity: submitting ? 0.6 : 1 }}
        >
          {submitting
            ? "処理中…"
            : d.payment === "card"
              ? "決済画面へ進む"
              : "この内容で注文を確定する"}
        </button>
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--ink-mute)",
          marginTop: 16,
          textAlign: "right",
          letterSpacing: "0.1em",
        }}
      >
        ※ ご注文確定後、担当者より確認のお電話を差し上げます。
      </div>
    </section>
  );
}
