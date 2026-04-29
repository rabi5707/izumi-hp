"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

type FormState = {
  name: string;
  phone: string;
  email: string;
  corp: string;
  date: string;
  time: string;
  people: string;
  budget: string;
  venue: string;
  where: string;
  addr: string;
  menu: string;
  service: string[]; // catering options: 配膳, 器引取, 飲物手配
  payment: string; // 銀行振込 / 当日現金 / 未定
  notes: string;
};

const defaultForm: FormState = {
  name: "",
  phone: "",
  email: "",
  corp: "",
  date: "",
  time: "",
  people: "20",
  budget: "",
  venue: "",
  where: "venue",
  addr: "",
  menu: "",
  service: [],
  payment: "",
  notes: "",
};

export function InquiryClient() {
  const sp = useSearchParams();
  const refProductId = sp.get("product");
  const refProduct = refProductId
    ? PRODUCTS.find((p) => p.id === refProductId)
    : null;

  const [data, setData] = useState<FormState>(() => ({
    ...defaultForm,
    menu: refProduct
      ? `ご参考：${refProduct.ja}（${refProduct.en}）`
      : "",
  }));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));
  const toggleService = (s: string) => {
    setData((d) => ({
      ...d,
      service: d.service.includes(s)
        ? d.service.filter((x) => x !== s)
        : [...d.service, s],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          referenceProductId: refProductId || null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "送信に失敗しました");
      }
      const json = (await res.json()) as { inquiryNo: string };
      setDone(json.inquiryNo);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "予期しないエラーが発生しました"
      );
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section className="shell" style={{ maxWidth: 780 }}>
        <div className="crumb">
          <Link href="/">ホーム</Link>
          <span className="sep">/</span>
          <span>アドバイザーに相談</span>
        </div>
        <div style={{ padding: "80px 0 64px", textAlign: "center" }}>
          <span className="kamon" aria-hidden />
          <h1
            className="kanji-display"
            style={{ fontSize: 32, margin: "24px 0 16px" }}
          >
            お問合せを承りました
          </h1>
          <div
            className="kanji-h"
            style={{
              fontSize: 14,
              color: "var(--ink-mute)",
              letterSpacing: "0.14em",
              lineHeight: 2.2,
            }}
          >
            担当アドバイザーよりご連絡差し上げます。
            <br />
            お急ぎの場合はお電話にてご連絡くださいませ。
          </div>
          <div className="order-no" style={{ marginTop: 28 }}>
            お問合せ番号　／　{done}
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <Link href="/" className="btn btn-ghost">
              トップへ戻る
            </Link>
            <Link href="/shop" className="btn btn-line">
              お品書きを見る
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="form-shell shell">
      <div className="crumb">
        <Link href="/">ホーム</Link>
        <span className="sep">/</span>
        <span>アドバイザーに相談</span>
      </div>

      <div style={{ padding: "48px 0 32px" }}>
        <div className="label-en" style={{ marginBottom: 18 }}>
          Inquiry · ケータリング・お見積
        </div>
        <h1
          className="kanji-display"
          style={{ fontSize: 36, margin: "0 0 24px", lineHeight: 1.4 }}
        >
          アドバイザーに
          <br />
          ご相談ください。
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
            maxWidth: 640,
            margin: 0,
          }}
        >
          ケータリングは、お席の規模・会場・ご予算に応じて一件ずつお仕立て致します。
          下記項目をご記入の上、ご送信ください。担当アドバイザーより24時間以内にご連絡差し上げます。
          お急ぎの場合は直接お電話くださいませ。
        </p>

        <div
          style={{
            marginTop: 28,
            padding: "18px 22px",
            border: "1px solid var(--rule)",
            background: "var(--paper)",
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <div>
            <div
              className="label-en"
              style={{ fontSize: 10, marginBottom: 4 }}
            >
              Tel · 横浜本店
            </div>
            <div
              className="price-num"
              style={{ fontSize: 22, letterSpacing: "0.04em" }}
            >
              045-333-0163
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
            }}
          >
            9:00 – 21:00　年中無休
            <br />
            神奈川・東京・川崎のケータリング承り窓口
          </div>
        </div>

        {refProduct && (
          <div
            style={{
              marginTop: 24,
              padding: "14px 20px",
              background: "var(--accent-soft)",
              border: "1px solid var(--accent)",
              fontSize: 13,
              letterSpacing: "0.04em",
              color: "var(--accent)",
            }}
          >
            ご参考：<b>{refProduct.ja}</b>（{refProduct.en}）よりお問合せ
          </div>
        )}
      </div>

      <form onSubmit={submit}>
        <div className="form-section">
          <h2>
            <span className="idx">01</span>ご連絡先
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label>
                お名前<span className="req">必須</span>
              </label>
              <input
                required
                placeholder="山田 太郎"
                value={data.name}
                onChange={(e) => upd("name", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                お電話番号<span className="req">必須</span>
              </label>
              <input
                required
                placeholder="090-0000-0000"
                value={data.phone}
                onChange={(e) => upd("phone", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>メールアドレス</label>
              <input
                type="email"
                placeholder="example@xxx.co.jp"
                value={data.email}
                onChange={(e) => upd("email", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>法人名（任意）</label>
              <input
                placeholder="株式会社◯◯"
                value={data.corp}
                onChange={(e) => upd("corp", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>
            <span className="idx">02</span>お席の情報
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label>
                ご希望日<span className="req">必須</span>
              </label>
              <input
                type="date"
                required
                value={data.date}
                onChange={(e) => upd("date", e.target.value)}
              />
              <span className="hint">2週間以上先のお日にちをお勧めします</span>
            </div>
            <div className="form-field">
              <label>開始時間</label>
              <input
                type="time"
                value={data.time}
                onChange={(e) => upd("time", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                お人数<span className="req">必須</span>
              </label>
              <input
                required
                placeholder="20 名"
                value={data.people}
                onChange={(e) => upd("people", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>ご予算の目安</label>
              <select
                value={data.budget}
                onChange={(e) => upd("budget", e.target.value)}
              >
                <option value="">選択してください</option>
                <option value="under-3k">お一人様 3,000円まで</option>
                <option value="3k-5k">お一人様 3,000〜5,000円</option>
                <option value="5k-8k">お一人様 5,000〜8,000円</option>
                <option value="over-8k">お一人様 8,000円以上</option>
                <option value="undecided">未定・ご相談</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>
            <span className="idx">03</span>会場
          </h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {(
              [
                { k: "venue", ja: "会場・施設" },
                { k: "jitaku", ja: "ご自宅" },
                { k: "office", ja: "事業所・撮影現場" },
                { k: "tera", ja: "寺院・会館" },
                { k: "other", ja: "その他" },
              ] as const
            ).map((o) => (
              <button
                key={o.k}
                type="button"
                className={"chip" + (data.where === o.k ? " on" : "")}
                onClick={() => upd("where", o.k)}
                style={{
                  padding: "8px 14px",
                  fontFamily: "var(--f-heading)",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                }}
              >
                {o.ja}
              </button>
            ))}
          </div>
          <div className="form-grid">
            <div className="form-field full">
              <label>会場・施設名</label>
              <input
                placeholder="例）◯◯ホール 第二会議室"
                value={data.venue}
                onChange={(e) => upd("venue", e.target.value)}
              />
            </div>
            <div className="form-field full">
              <label>ご住所</label>
              <input
                placeholder="神奈川県横浜市◯◯区◯◯町 1-2-3"
                value={data.addr}
                onChange={(e) => upd("addr", e.target.value)}
              />
              <span className="hint">
                ざっくりで結構です（市区町村まででも可）
              </span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>
            <span className="idx">04</span>ご希望メニュー・サービス
          </h2>
          <div className="form-grid">
            <div className="form-field full">
              <label>ご希望メニュー・お料理のイメージ</label>
              <textarea
                rows={5}
                placeholder="例）和洋のオードブル中心で、お寿司もお願いしたいです。参加者はベジタリアンの方が1名いらっしゃいます。"
                value={data.menu}
                onChange={(e) => upd("menu", e.target.value)}
              />
              <span className="hint">
                お気軽にイメージでお書きください。具体的でなくて結構です
              </span>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <label
              className="label-ja"
              style={{
                display: "block",
                marginBottom: 12,
                fontSize: 11,
                letterSpacing: "0.2em",
              }}
            >
              ご希望のサービス（複数選択可）
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                "配膳スタッフの手配",
                "器の引取",
                "飲物の手配",
                "会場設営のご相談",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={
                    "chip" + (data.service.includes(s) ? " on" : "")
                  }
                  onClick={() => toggleService(s)}
                  style={{
                    padding: "8px 14px",
                    fontFamily: "var(--f-heading)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <label
              className="label-ja"
              style={{
                display: "block",
                marginBottom: 12,
                fontSize: 11,
                letterSpacing: "0.2em",
              }}
            >
              お支払い方法のご希望
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["銀行振込", "当日現金", "未定・ご相談"].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={"chip" + (data.payment === p ? " on" : "")}
                  onClick={() => upd("payment", p)}
                  style={{
                    padding: "8px 14px",
                    fontFamily: "var(--f-heading)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <span
              className="hint"
              style={{ display: "block", marginTop: 8 }}
            >
              請求書発行・インボイス対応も承ります
            </span>
          </div>
        </div>

        <div className="form-section">
          <h2>
            <span className="idx">05</span>その他ご要望
          </h2>
          <div className="form-grid">
            <div className="form-field full">
              <label>ご連絡事項</label>
              <textarea
                rows={4}
                placeholder="アレルギー・宗教上の制限・進行予定・過去のご注文経緯など、何なりとお書きください。"
                value={data.notes}
                onChange={(e) => upd("notes", e.target.value)}
              />
            </div>
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
            alignItems: "center",
            marginTop: 40,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              letterSpacing: "0.08em",
              lineHeight: 1.8,
            }}
          >
            ご送信頂いた内容は、お見積・ご連絡以外の目的には使用致しません。
          </div>
          <button
            type="submit"
            className="btn btn-accent"
            disabled={submitting}
            style={{ opacity: submitting ? 0.6 : 1 }}
          >
            {submitting ? "送信中…" : "アドバイザーに相談する　→"}
          </button>
        </div>
      </form>
    </section>
  );
}
