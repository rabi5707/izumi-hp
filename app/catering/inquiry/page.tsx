import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CateringIcon } from "@/components/CateringIcons";
import { TRUST_BADGES } from "@/lib/catering";
import { InquiryClient } from "@/app/inquiry/InquiryClient";

export const metadata: Metadata = {
  title: "お見積・ご相談　｜　イズミ産業ケータリング",
  description:
    "イズミ産業ケータリングのお見積・ご相談フォーム。24時間以内にご連絡、無理な営業は致しません。お急ぎの方はお電話でも承ります。",
  alternates: {
    canonical: "https://shop.isg.co.jp/catering/inquiry",
  },
};

export default function CateringInquiryPage() {
  return (
    <>
      {/* Header */}
      <section
        className="shell"
        style={{ padding: "64px 40px 32px", textAlign: "center" }}
      >
        <h1
          className="kanji-display"
          style={{
            fontSize: 38,
            margin: "0 0 16px",
            letterSpacing: "0.12em",
          }}
        >
          お見積・ご相談フォーム
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
          }}
        >
          まずはお気軽にご相談ください。
          <br />
          お席の目的・人数・ご予算・会場などをお伺いし、最適なプランをご提案いたします。
          <br />
          お見積りは無料です。どうぞお気兼ねなくお問い合わせください。
        </p>
      </section>

      {/* Trust badges */}
      <section className="shell" style={{ padding: "0 40px 40px" }}>
        <div
          className="r-grid-3"
          style={{
            gap: 16,
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {TRUST_BADGES.map((b) => (
            <div
              key={b.icon}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                padding: "20px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "var(--accent)",
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CateringIcon name={b.icon} size={32} />
              </div>
              <div
                className="kanji-h"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  margin: "0 0 8px",
                }}
              >
                {b.title}
              </div>
              <p
                style={{
                  fontSize: 11,
                  lineHeight: 1.8,
                  color: "var(--ink-soft)",
                  margin: 0,
                }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <Suspense
        fallback={<div className="shell" style={{ padding: "40px" }} />}
      >
        <InquiryClient />
      </Suspense>

      {/* Phone fallback */}
      <section className="shell" style={{ padding: "32px 40px 64px" }}>
        <div
          style={{
            padding: "28px 32px",
            border: "1px solid var(--rule)",
            background: "var(--bg)",
            textAlign: "center",
          }}
        >
          <div
            className="kanji-h"
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              margin: "0 0 12px",
            }}
          >
            お急ぎの方は、お電話でも承っております。
          </div>
          <a
            href="tel:045-333-0163"
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 28,
              letterSpacing: "0.04em",
              textDecoration: "none",
              display: "block",
              marginBottom: 8,
            }}
          >
            ☎ 045-333-0163
          </a>
          <div
            style={{
              fontSize: 12,
              color: "var(--ink-mute)",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            9:00 - 21:00 年中無休
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              letterSpacing: "0.08em",
            }}
          >
            担当アドバイザーが丁寧にお伺いいたします
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section
        className="shell"
        style={{
          padding: "0 40px 64px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Link href="/catering/guide" className="btn btn-line">
          ‹ ご利用ガイドへ戻る
        </Link>
        <Link href="/catering" className="btn btn-line">
          トップページへ戻る ›
        </Link>
      </section>
    </>
  );
}
