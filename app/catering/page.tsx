import Link from "next/link";
import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import { CateringIcon } from "@/components/CateringIcons";
import { USE_CASES, REASONS, VOICES } from "@/lib/catering";
import { localBusinessLd, breadcrumbLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "フルケータリング　｜　横浜のご宴会・ご会合・周年式典に",
  description:
    "横浜近郊の20名様以上のお席に、配膳係付きのフルケータリングをお届け致します。社内懇親会・取引先様との会食・周年式典・ご結婚披露宴二次会まで、お席の格に応じたお仕立て。お一人 ¥2,500よりお引受け。",
  alternates: { canonical: "https://shop.isg.co.jp/catering" },
};

export default function CateringHome() {
  return (
    <>
      <script {...jsonLdScript(localBusinessLd)} />
      <script
        {...jsonLdScript(
          breadcrumbLd([
            { name: "ホーム", path: "/" },
            { name: "フルケータリング", path: "/catering" },
          ])
        )}
      />
      {/* Cinematic full-bleed hero */}
      <section className="hero-cinematic">
        <SmartImage
          src="/images/catering/hero.jpg"
          alt="イズミ産業のパーティー料理"
          labelEn="HERO / catering-spread"
          labelJa="老舗のパーティー料理"
          aspect="fill"
          priority
          style={{ position: "absolute", inset: 0 }}
        />
        <div className="hero-cinematic-content hero-catering-content shell">
          <div className="hero-catering-inner">
            <span className="hero-cinematic-gold">
              Izumi Sangyo · Full Catering
            </span>
            <div>
              <p className="kanji-h hero-catering-lede">
                心を込めてお届けする、
              </p>
              <p className="kanji-h hero-catering-lede hero-catering-lede-2">
                老舗のパーティー料理。
              </p>
              <h1 className="kanji-display hero-catering-h1">
                和と<em>洋</em>の良いところを、
                <br />
                一<em>卓</em>に。
              </h1>
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 2.2,
                opacity: 0.78,
                margin: 0,
                maxWidth: 520,
              }}
            >
              昭和四十九年より半世紀、お席の数々を承って参りました。
              配膳・設営・引取まで一貫対応、大切なお集まりにふさわしい
              一卓をお仕立て致します。
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <Link
                href="/catering/inquiry"
                className="btn btn-accent"
                style={{
                  flexDirection: "column",
                  padding: "16px 32px",
                  lineHeight: 1.3,
                }}
              >
                <span style={{ fontSize: 13, letterSpacing: "0.14em" }}>
                  アドバイザーに相談する
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    opacity: 0.9,
                    marginTop: 2,
                  }}
                >
                  お見積・ご相談はこちら
                </span>
              </Link>

              <div
                style={{
                  padding: "10px 22px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="label-en"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    opacity: 0.75,
                    color: "var(--bg)",
                  }}
                >
                  お電話でのお問い合わせ
                </div>
                <a
                  href="tel:045-333-0163"
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 20,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    color: "var(--bg)",
                  }}
                >
                  ☎ 045-333-0163
                </a>
                <div
                  style={{
                    fontSize: 10,
                    opacity: 0.7,
                    letterSpacing: "0.1em",
                    color: "var(--bg)",
                  }}
                >
                  9:00 - 21:00 年中無休
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section
        className="shell"
        style={{ padding: "64px 40px 40px", textAlign: "center" }}
      >
        <p
          style={{
            maxWidth: 780,
            margin: "0 auto",
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
          }}
        >
          横浜の老舗・イズミ産業は、法人様の懇親会・周年行事・株主総会から、
          <br />
          ご家族のお祝い、撮影現場の会食まで、20名様以上のパーティー料理を承ります。
          <br />
          和洋折衷の大皿料理を配膳・設営・引取まで一貫対応。気取らず、けれど品よく、集いを彩るお料理をお届けします。
        </p>
      </section>

      {/* Use cases */}
      <section className="shell" style={{ padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            className="kanji-display"
            style={{ fontSize: 28, margin: 0, letterSpacing: "0.12em" }}
          >
            こんなお席を承ります
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
          }}
        >
          {USE_CASES.map((u) => (
            <div
              key={u.icon}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                padding: "24px 12px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                minHeight: 140,
                color: "var(--accent)",
              }}
            >
              <CateringIcon name={u.icon} size={36} />
              <div
                className="kanji-h"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  whiteSpace: "pre-line",
                }}
              >
                {u.ja}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reasons */}
      <section className="shell" style={{ padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            className="kanji-display"
            style={{ fontSize: 28, margin: 0, letterSpacing: "0.12em" }}
          >
            イズミ産業が選ばれる理由
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {REASONS.map((r, i) => (
            <div
              key={r.icon}
              style={{
                position: "relative",
                borderTop: "2px solid var(--section-accent)",
                padding: "44px 24px 32px",
                textAlign: "center",
              }}
            >
              <span className="feat-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                style={{ color: "var(--section-accent)", marginBottom: 16 }}
              >
                <CateringIcon name={r.icon} size={48} />
              </div>
              <h3
                className="kanji-h"
                style={{
                  fontSize: 16,
                  letterSpacing: "0.14em",
                  margin: "0 0 12px",
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.9,
                  color: "var(--ink-soft)",
                  margin: 0,
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Voices */}
      <section className="shell" style={{ padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            className="kanji-display"
            style={{ fontSize: 24, margin: 0, letterSpacing: "0.12em" }}
          >
            お客様の声
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {VOICES.map((v) => (
            <div
              key={v.from}
              style={{
                background: "var(--paper)",
                padding: "24px 28px",
                border: "1px solid var(--rule-soft)",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 2,
                  color: "var(--ink-soft)",
                  margin: "0 0 14px",
                }}
              >
                「{v.body}」
              </p>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-mute)",
                  textAlign: "right",
                }}
              >
                — {v.from}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "56px 0",
          marginTop: 32,
        }}
      >
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              className="kanji-h"
              style={{
                fontSize: 22,
                letterSpacing: "0.16em",
                margin: "0 0 8px",
              }}
            >
              まずはお気軽にご相談ください
            </h3>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.9,
                color: "var(--ink-soft)",
                margin: 0,
              }}
            >
              お見積りは無料です。ご予算・ご要望に合わせて最適なお料理をご提案いたします。
            </p>
          </div>
          <Link
            href="/catering/inquiry"
            className="btn btn-accent"
            style={{
              flexDirection: "column",
              padding: "14px 28px",
              lineHeight: 1.3,
              background: "#c69d5a",
              borderColor: "#c69d5a",
            }}
          >
            <span style={{ fontSize: 13 }}>アドバイザーに相談する</span>
            <span
              style={{ fontSize: 10, letterSpacing: "0.18em", opacity: 0.9 }}
            >
              お見積・ご相談はこちら
            </span>
          </Link>
          <div
            style={{
              padding: "10px 22px",
              border: "1px solid var(--rule)",
              background: "var(--bg)",
            }}
          >
            <div
              className="label-en"
              style={{ fontSize: 9, letterSpacing: "0.2em" }}
            >
              お電話でのお問い合わせ
            </div>
            <a
              href="tel:045-333-0163"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 18,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              ☎ 045-333-0163
            </a>
            <div
              style={{
                fontSize: 10,
                color: "var(--ink-mute)",
                letterSpacing: "0.1em",
              }}
            >
              9:00 - 21:00 年中無休
            </div>
          </div>
        </div>
      </section>

      {/* Next page nav */}
      <section
        className="shell"
        style={{
          padding: "32px 40px 64px",
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/catering/menu"
          className="btn btn-ghost"
          style={{
            background: "#2c4a6b",
            color: "var(--bg)",
            border: "none",
          }}
        >
          お料理の例を見る ›
        </Link>
        <Link
          href="/catering/guide"
          className="btn btn-ghost"
          style={{
            background: "#2c4a6b",
            color: "var(--bg)",
            border: "none",
          }}
        >
          ご利用ガイドへ ›
        </Link>
      </section>
    </>
  );
}
