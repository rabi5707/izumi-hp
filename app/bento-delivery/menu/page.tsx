import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { CateringIcon } from "@/components/CateringIcons";
import {
  BENTO_LINEUP,
  CUSTOMIZATIONS,
  COMPARISON_ROWS,
} from "@/lib/bento-delivery";

export const metadata: Metadata = {
  title: "お弁当の種類　｜　イズミ産業 お届け弁当配達",
  description:
    "会合弁当・ロケ弁当・ホームパーティーセットの3種類をご用意。用途やご予算に合わせて、老舗の味を使いやすいかたちでお届けします。",
  alternates: {
    canonical: "https://shop.isg.co.jp/bento-delivery/menu",
  },
};

export default function BentoMenu() {
  return (
    <>
      {/* Header */}
      <section
        className="shell"
        style={{ padding: "56px 40px 40px", textAlign: "center" }}
      >
        <h1
          className="kanji-display"
          style={{
            fontSize: 38,
            margin: "0 0 16px",
            letterSpacing: "0.14em",
          }}
        >
          お弁当の種類
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
          }}
        >
          用途やご予算に合わせて、3つのラインナップをご用意。
          <br />
          老舗の味を、使いやすいかたちでお届けします。
        </p>
      </section>

      {/* Lineup detail */}
      <section className="shell" style={{ padding: "16px 40px 48px" }}>
        {BENTO_LINEUP.map((b, i) => (
          <div
            key={b.slug}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gap: 32,
              alignItems: "center",
              marginBottom: 32,
              background: "var(--bg)",
              border: "1px solid var(--rule-soft)",
              padding: 24,
              position: "relative",
              // alternate photo side
              gridTemplateAreas: i % 2 === 0 ? '"text photo"' : '"photo text"',
            }}
          >
            {b.isNew && (
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--f-heading)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  padding: "4px 12px",
                  zIndex: 1,
                }}
              >
                新商品
              </span>
            )}
            <div style={{ gridArea: "text" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="kanji-h"
                  style={{
                    fontSize: 22,
                    letterSpacing: "0.12em",
                  }}
                >
                  {b.number} {b.ja}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <span
                  className="price-num"
                  style={{
                    fontSize: 28,
                    letterSpacing: "0.04em",
                  }}
                >
                  ¥{b.price.toLocaleString()}〜
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--ink-mute)",
                  }}
                >
                  /{b.unit}
                </span>
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "var(--paper)",
                  border: "1px solid var(--rule)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--ink-mute)",
                  marginBottom: 16,
                }}
              >
                {b.tagline}
              </div>
              <h3
                className="kanji-h"
                style={{
                  fontSize: 16,
                  letterSpacing: "0.1em",
                  margin: "0 0 10px",
                }}
              >
                {b.headline}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 2,
                  color: "var(--ink-soft)",
                  margin: "0 0 20px",
                }}
              >
                {b.description}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {b.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      fontSize: 12,
                      lineHeight: 1.9,
                      color: "var(--ink-soft)",
                      padding: "4px 0",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        color: b.badgeColor,
                        fontFamily: "var(--f-mono)",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ gridArea: "photo" }}>
              <SmartImage
                src={`/images/bento-delivery/${b.slug}.jpg`}
                alt={b.ja}
                labelEn={`IMG / ${b.en.toLowerCase()}`}
                labelJa={b.ja}
                aspect="4/3"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Customization */}
      <section className="shell" style={{ padding: "32px 40px" }}>
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--rule)",
            padding: "40px 32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2
              className="kanji-display"
              style={{
                fontSize: 22,
                margin: "0 0 8px",
                letterSpacing: "0.14em",
              }}
            >
              ご希望に応じてお仕立ての調整が可能です
            </h2>
            <p
              style={{
                fontSize: 12,
                color: "var(--ink-soft)",
                letterSpacing: "0.08em",
              }}
            >
              以下のご要望もお気軽にご相談ください。
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 16,
            }}
          >
            {CUSTOMIZATIONS.map((c) => (
              <div
                key={c.icon}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--rule-soft)",
                  padding: "20px 12px",
                  textAlign: "center",
                  color: "var(--accent)",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <CateringIcon name={c.icon} size={32} />
                </div>
                <div
                  className="kanji-h"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "var(--ink)",
                    lineHeight: 1.7,
                  }}
                >
                  {c.title}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              letterSpacing: "0.08em",
              textAlign: "center",
              marginTop: 20,
              margin: "20px 0 0",
            }}
          >
            ※
            内容により対応できない場合もございます。詳しくはお問い合わせください。
          </p>
        </div>
      </section>

      {/* Comparison with full catering */}
      <section className="shell" style={{ padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 24,
              margin: 0,
              letterSpacing: "0.14em",
            }}
          >
            フルケータリングとの違い
          </h2>
        </div>
        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            border: "1px solid var(--rule)",
            background: "var(--paper)",
          }}
        >
          <table
            className="spec-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: 0,
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--bg-alt)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    width: "20%",
                    fontFamily: "var(--f-heading)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    borderRight: "1px solid var(--rule-soft)",
                  }}
                >
                  項目
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--f-heading)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    borderRight: "1px solid var(--rule-soft)",
                  }}
                >
                  フルケータリング <span style={{ fontSize: 10, color: "var(--ink-mute)" }}>(/catering)</span>
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--f-heading)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    background: "var(--accent-soft)",
                  }}
                >
                  お弁当・パーティーセットのお届け <span style={{ fontSize: 10, color: "var(--accent)" }}>(本サービス)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.label}
                  style={{ borderBottom: "1px solid var(--rule-soft)" }}
                >
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontFamily: "var(--f-heading)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      color: "var(--ink-soft)",
                      borderRight: "1px solid var(--rule-soft)",
                      background: "var(--bg)",
                    }}
                  >
                    {row.label}
                  </th>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: 12,
                      lineHeight: 1.8,
                      color: "var(--ink-soft)",
                      borderRight: "1px solid var(--rule-soft)",
                    }}
                  >
                    {row.catering}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: 12,
                      lineHeight: 1.8,
                      color: "var(--ink)",
                      fontWeight: 500,
                      background: "var(--accent-soft)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {row.delivery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "48px 0",
          marginTop: 16,
        }}
      >
        <div className="shell" style={{ textAlign: "center" }}>
          <h3
            className="kanji-h"
            style={{
              fontSize: 22,
              letterSpacing: "0.16em",
              margin: "0 0 20px",
            }}
          >
            まずはお見積・ご相談を
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--ink-soft)",
              lineHeight: 2,
              maxWidth: 600,
              margin: "0 auto 24px",
            }}
          >
            ご人数・ご予算・お届け場所・日時をお知らせください。
            <br />
            最適なご提案をいたします。
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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
            <a
              href="tel:045-333-0163"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 20,
                letterSpacing: "0.04em",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ☎ 045-333-0163
            </a>
          </div>
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
