import Link from "next/link";
import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { CateringIcon } from "@/components/CateringIcons";
import {
  BENTO_LINEUP,
  USE_CASES,
  BENEFITS,
  PROCESS_STEPS,
  SERVICE_INFO,
} from "@/lib/bento-delivery";
import { breadcrumbLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "お届け弁当　｜　横浜近郊への当日便配達　¥20,000より承ります",
  description:
    "横浜近郊の法人様・ご家庭へお届けする会合弁当・ロケ弁・ホームパーティーセット。配膳・回収なしのシンプルなお届けサービス。前日17時までのご注文で翌日お届け、当日便も可能な限りご対応致します。",
  alternates: { canonical: "https://shop.isg.co.jp/bento-delivery" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "最低ご注文金額はいくらからですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "¥20,000（税込）からお引受け致しております。10名様で一人 ¥2,000のお席ですと丁度この金額に達する目安です。",
      },
    },
    {
      "@type": "Question",
      name: "配達エリアはどこまでですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "保土ヶ谷の本店から往復1時間圏内を主要エリアとしてお引受け致しております。横浜市全域・川崎南部・東京23区西部の一部。エリア外は別途お見積となります。",
      },
    },
    {
      "@type": "Question",
      name: "当日のご注文は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "前日17時までのご注文を基本としておりますが、当日便も可能な限りお応え致します。お電話にてお席のご状況をお聞かせくださいませ。",
      },
    },
    {
      "@type": "Question",
      name: "容器の回収はありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "お届け弁当は使い捨て・簡易容器でのお届けとなり、回収はございません。お席後はそのまま破棄頂けます。回収の必要があるご宴会のお席は、別途「フルケータリング」にてお引受け致しております。",
      },
    },
    {
      "@type": "Question",
      name: "アレルギー・精進料理への対応は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ご対応致しております。仕入れ・お仕立ての段取りが変わりますので、ご注文の段階で必ずお申し付けくださいませ。アレルギー食材・お子様向けメニュー・宗派による禁忌などのご相談にも応じます。",
      },
    },
    {
      "@type": "Question",
      name: "ご請求書払い・月次精算は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "法人様のご請求書払い・月次まとめ精算にもご対応致しております。適格請求書（インボイス）も発行可能です。詳細はお見積時にご相談くださいませ。",
      },
    },
  ],
};

export default function BentoDeliveryHome() {
  return (
    <>
      <script {...jsonLdScript(faqLd)} />
      <script
        {...jsonLdScript(
          breadcrumbLd([
            { name: "ホーム", path: "/" },
            { name: "お届け弁当", path: "/bento-delivery" },
          ])
        )}
      />
      {/* Hero */}
      <section
        className="shell"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderBottom: "1px solid var(--rule)",
          minHeight: 480,
        }}
      >
        <div
          style={{
            padding: "56px 40px 48px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--section-accent)",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 24,
                height: 2,
                background: "var(--section-accent)",
              }}
            />
            FOR BUSINESS &amp; HOME USE
          </div>
          <h1
            className="hero-headline"
            style={{
              fontSize: 46,
              lineHeight: 1.3,
              letterSpacing: "0.04em",
              margin: 0,
              fontWeight: 700,
              fontFamily: "var(--f-sans)",
            }}
          >
            老舗の味を、
            <br />
            お席まで。
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 2,
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: 480,
            }}
          >
            配膳・回収のお手間は要りません。個別のお弁当・パーティーセットを、
            ご指定の場所までお運びする、シンプルなサービスです。
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 8,
              alignItems: "stretch",
            }}
          >
            <Link
              href="/bento-delivery/inquiry"
              className="btn btn-accent"
              style={{
                padding: "16px 28px",
                fontWeight: 500,
              }}
            >
              お見積・ご相談 ›
            </Link>
            <a
              href="tel:045-333-0163"
              className="btn btn-line"
              style={{
                padding: "16px 22px",
                textDecoration: "none",
                fontFamily: "var(--f-mono)",
                fontSize: 15,
                letterSpacing: "0.04em",
              }}
            >
              ☎ 045-333-0163
            </a>
          </div>
        </div>

        <div style={{ position: "relative", minHeight: 480 }}>
          <HeroSlideshow
            slides={[
              {
                src: "/images/bento-delivery/hero-bento.png",
                alt: "会合弁当 — 法人の会議・法要のお席に",
                labelEn: "HERO / bento-office",
                labelJa: "会合弁当",
              },
              {
                src: "/images/bento-delivery/hero-party.png",
                alt: "ホームパーティーセット — ご家庭の集まりに",
                labelEn: "HERO / home-party",
                labelJa: "ホームパーティー",
              },
            ]}
            intervalMs={5500}
          />
        </div>
      </section>

      {/* Stat bar — business-facing at-a-glance facts */}
      <div className="shell" style={{ padding: "0 40px" }}>
        <div className="stat-bar">
          <div>
            <span className="stat-label">最低ご注文</span>
            <span className="stat-value">¥20,000〜</span>
          </div>
          <div>
            <span className="stat-label">価格帯</span>
            <span className="stat-value">¥1,200〜/個</span>
          </div>
          <div>
            <span className="stat-label">納期</span>
            <span className="stat-value">前日17時まで・翌日お届け</span>
          </div>
          <div>
            <span className="stat-label">対応エリア</span>
            <span className="stat-value">横浜・川崎・東京23区西部</span>
          </div>
        </div>
      </div>

      {/* Service overview — delivery car emphasis */}
      <section
        className="shell"
        style={{
          padding: "64px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <div className="label-en" style={{ marginBottom: 12 }}>
            Simple Service
          </div>
          <h2
            className="kanji-display"
            style={{
              fontSize: 30,
              margin: "0 0 20px",
              letterSpacing: "0.1em",
            }}
          >
            お運びに専念するから、気軽に。
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 2.1,
              color: "var(--ink-soft)",
              margin: 0,
            }}
          >
            配膳・設営・引取・回収は一切いたしません。
            <br />
            個別のお弁当はもちろん、取り分けのパーティーセットも、
            <br />
            人数分をまとめてお届けするシンプルなサービスです。
            <br />
            法人様もご家庭も、手間なくご利用いただけます。
          </p>
        </div>
        <SmartImage
          src="/images/bento-delivery/delivery-van.png"
          alt="イズミ産業の配達車"
          labelEn="IMG / delivery-van"
          labelJa="お届けの様子"
          aspect="4/3"
        />
      </section>

      {/* Use cases */}
      <section className="shell" style={{ padding: "32px 40px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 26,
              margin: 0,
              letterSpacing: "0.14em",
            }}
          >
            こんなお席にご利用いただいています
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
                padding: "22px 10px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                minHeight: 130,
                color: "var(--accent)",
              }}
            >
              <CateringIcon name={u.icon} size={32} />
              <div
                className="kanji-h"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  lineHeight: 1.7,
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

      {/* Benefits — 3 reasons */}
      <section
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "64px 0",
        }}
      >
        <div className="shell" style={{ padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              className="kanji-display"
              style={{
                fontSize: 26,
                margin: 0,
                letterSpacing: "0.14em",
              }}
            >
              お運びに専念するからこそ、できる3つのこと
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {BENEFITS.map((b, i) => (
              <div
                key={b.icon}
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
                  style={{ color: "var(--section-accent)", marginBottom: 14 }}
                >
                  <CateringIcon name={b.icon} size={44} />
                </div>
                <h3
                  className="kanji-h"
                  style={{
                    fontSize: 16,
                    letterSpacing: "0.14em",
                    margin: "0 0 12px",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.9,
                    color: "var(--ink-soft)",
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lineup summary */}
      <section className="shell" style={{ padding: "64px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 26,
              margin: 0,
              letterSpacing: "0.14em",
            }}
          >
            お弁当ラインナップ（3種類）
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {BENTO_LINEUP.map((b) => (
            <Link
              key={b.slug}
              href="/bento-delivery/menu"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid var(--rule)",
                background: "var(--bg)",
                position: "relative",
              }}
            >
              {b.isNew && (
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "var(--accent)",
                    color: "#fff",
                    fontFamily: "var(--f-heading)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    padding: "4px 10px",
                    zIndex: 1,
                  }}
                >
                  新商品
                </span>
              )}
              <SmartImage
                src={`/images/bento-delivery/${b.slug}.jpg`}
                alt={b.ja}
                labelEn={`IMG / ${b.en.toLowerCase()}`}
                labelJa={b.ja}
                aspect="4/3"
              />
              <div style={{ padding: "20px 20px 24px" }}>
                <div
                  className="kanji-h"
                  style={{
                    fontSize: 15,
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  {b.number} {b.ja}
                </div>
                <div
                  className="price-num"
                  style={{
                    fontSize: 20,
                    letterSpacing: "0.04em",
                    marginBottom: 8,
                  }}
                >
                  ¥{b.price.toLocaleString()}〜
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--ink-mute)",
                      marginLeft: 4,
                    }}
                  >
                    /{b.unit}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink-mute)",
                    letterSpacing: "0.08em",
                    lineHeight: 1.8,
                  }}
                >
                  {b.tagline}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="shell" style={{ padding: "32px 40px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 26,
              margin: 0,
              letterSpacing: "0.14em",
            }}
          >
            ご注文の流れ（簡単3ステップ）
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {PROCESS_STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                padding: "28px 24px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -14,
                  left: 16,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#4a7c4a",
                  color: "#fff",
                  fontFamily: "var(--f-mono)",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                {s.n}
              </div>
              <h3
                className="kanji-h"
                style={{
                  fontSize: 14,
                  letterSpacing: "0.14em",
                  margin: "0 0 10px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 11,
                  lineHeight: 1.9,
                  color: "var(--ink-soft)",
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--bg)",
          padding: "40px 0",
        }}
      >
        <div
          className="shell"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: 24,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              className="kanji-h"
              style={{
                fontSize: 20,
                letterSpacing: "0.16em",
                margin: "0 0 6px",
              }}
            >
              まずはお気軽にご相談ください
            </h3>
            <p
              style={{
                fontSize: 11,
                color: "var(--bg)",
                opacity: 0.8,
                letterSpacing: "0.1em",
                margin: 0,
              }}
            >
              お見積りは無料です。法人様もご家庭も歓迎いたします。
            </p>
          </div>
          <Link
            href="/bento-delivery/inquiry"
            className="btn btn-accent"
            style={{
              background: "#c69d5a",
              borderColor: "#c69d5a",
            }}
          >
            お見積・ご相談フォームへ
          </Link>
          <div
            style={{
              padding: "8px 20px",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <div
              className="label-en"
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                opacity: 0.7,
              }}
            >
              お電話でのご相談
            </div>
            <a
              href="tel:045-333-0163"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 18,
                color: "var(--bg)",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              ☎ 045-333-0163
            </a>
            <div
              style={{
                fontSize: 10,
                opacity: 0.7,
                letterSpacing: "0.1em",
              }}
            >
              9:00 - 21:00 年中無休
            </div>
          </div>
        </div>
      </section>

      {/* Service info footer strip */}
      <section className="shell" style={{ padding: "48px 40px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {SERVICE_INFO.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "18px 20px",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "var(--accent)",
                  paddingTop: 2,
                  flexShrink: 0,
                }}
              >
                <CateringIcon name={s.icon} size={26} />
              </div>
              <div>
                <div
                  className="label-ja"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    marginBottom: 6,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    lineHeight: 1.8,
                    color: "var(--ink-soft)",
                    whiteSpace: "pre-line",
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
