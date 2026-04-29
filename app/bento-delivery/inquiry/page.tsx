import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CateringIcon } from "@/components/CateringIcons";
import { TRUST_BADGES } from "@/lib/bento-delivery";
import { InquiryClient } from "@/app/inquiry/InquiryClient";

export const metadata: Metadata = {
  title: "お見積・ご注文　｜　イズミ産業 お届け弁当配達",
  description:
    "お届け弁当配達のお見積・ご相談フォーム。法人様のお昼からご家庭のお祝いまで、24時間受付。お急ぎの方はお電話でも承ります。",
  alternates: {
    canonical: "https://shop.isg.co.jp/bento-delivery/inquiry",
  },
};

export default function BentoInquiry() {
  return (
    <>
      {/* Header */}
      <section
        className="shell"
        style={{ padding: "56px 40px 28px", textAlign: "center" }}
      >
        <h1
          className="kanji-display"
          style={{
            fontSize: 38,
            margin: "0 0 16px",
            letterSpacing: "0.14em",
          }}
        >
          お見積・ご注文
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
          }}
        >
          法人様のお昼から、ご家庭のお祝いまで。
          <br />
          まずはお気軽にご相談ください。
        </p>
      </section>

      {/* Trust badges */}
      <section className="shell" style={{ padding: "0 40px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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
                padding: "22px 18px",
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
                  letterSpacing: "0.1em",
                  margin: "0 0 6px",
                  lineHeight: 1.6,
                }}
              >
                {b.title}
              </div>
              <p
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "var(--ink-mute)",
                  margin: 0,
                  letterSpacing: "0.06em",
                }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Phone fallback above form */}
      <section className="shell" style={{ padding: "0 40px 32px" }}>
        <div
          style={{
            padding: "24px 32px",
            border: "1px solid var(--rule)",
            background: "var(--bg)",
            textAlign: "center",
            maxWidth: 780,
            margin: "0 auto",
          }}
        >
          <div
            className="kanji-h"
            style={{
              fontSize: 15,
              letterSpacing: "0.14em",
              margin: "0 0 10px",
            }}
          >
            お電話でのご相談・ご注文
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              marginBottom: 12,
              letterSpacing: "0.06em",
            }}
          >
            お急ぎの方、数量・内容のご相談はお電話が便利です。
            <br />
            担当者が丁寧に承ります。
          </div>
          <a
            href="tel:045-333-0163"
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 28,
              letterSpacing: "0.04em",
              textDecoration: "none",
              display: "block",
              marginBottom: 6,
            }}
          >
            ☎ 045-333-0163
          </a>
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              letterSpacing: "0.1em",
            }}
          >
            （9:00 - 21:00 年中無休）｜ 横浜本店
          </div>
        </div>
      </section>

      {/* Form — reuse existing InquiryClient */}
      <section className="shell" style={{ padding: "0 40px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2
            className="kanji-h"
            style={{
              fontSize: 18,
              letterSpacing: "0.16em",
              margin: "0 0 8px",
            }}
          >
            お見積・ご相談フォーム
            <span
              style={{
                fontSize: 11,
                color: "var(--ink-mute)",
                marginLeft: 10,
                letterSpacing: "0.1em",
              }}
            >
              （24時間受付）
            </span>
          </h2>
          <p
            style={{
              fontSize: 12,
              color: "var(--ink-mute)",
              letterSpacing: "0.06em",
            }}
          >
            下記フォームに必要事項をご入力ください。
            内容を確認のうえ、担当よりご連絡いたします。
          </p>
        </div>
      </section>
      <Suspense
        fallback={<div className="shell" style={{ padding: "40px" }} />}
      >
        <InquiryClient />
      </Suspense>

      {/* Pre-order checklist */}
      <section className="shell" style={{ padding: "24px 40px" }}>
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: "24px 28px",
            background: "var(--paper)",
            border: "1px solid var(--rule)",
          }}
        >
          <div
            className="kanji-h"
            style={{
              fontSize: 14,
              letterSpacing: "0.14em",
              margin: "0 0 14px",
            }}
          >
            ご注文の前にご確認ください
          </div>
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: 20,
              margin: 0,
              fontSize: 12,
              lineHeight: 2.1,
              color: "var(--ink-soft)",
            }}
          >
            <li>最低ご注文は¥20,000よりとなります。</li>
            <li>
              配達エリアは5個および一部地域を往復1時間圏内（横浜市全域・川崎南部・東京23区西部の一部）に限ります。
            </li>
            <li>
              ご希望日の2日前17時までにご注文ください（お急ぎの場合はお電話にてご相談くださいませ）。
            </li>
            <li>配膳・設営・引取・回収は一切いたしません（お届けのみ）。</li>
            <li>
              容器は使い捨てまたは簡易容器でお届け。回収はいたしません。
            </li>
          </ul>
        </div>
      </section>

      {/* Bottom nav */}
      <section
        className="shell"
        style={{
          padding: "24px 40px 64px",
          textAlign: "center",
        }}
      >
        <Link
          href="/bento-delivery"
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            color: "var(--ink-mute)",
          }}
        >
          ‹ サービスのトップページへ戻る (/bento-delivery)
        </Link>
      </section>
    </>
  );
}
