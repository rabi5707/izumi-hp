import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { CateringIcon } from "@/components/CateringIcons";
import { COURSES, CUSTOMIZATIONS } from "@/lib/catering";

export const metadata: Metadata = {
  title: "お料理の例　｜　イズミ産業ケータリング",
  description:
    "和洋折衷の大皿料理で、集いを華やかに彩ります。カジュアル・スタンダード・プレミアムの3コースから、ご予算・ご要望に合わせてお選びいただけます。",
  alternates: {
    canonical: "https://shop.isg.co.jp/catering/menu",
  },
};

export default function CateringMenu() {
  return (
    <>
      {/* Header */}
      <section
        className="shell"
        style={{ padding: "64px 40px 40px", textAlign: "center" }}
      >
        <h1
          className="kanji-display"
          style={{
            fontSize: 38,
            margin: "0 0 16px",
            letterSpacing: "0.12em",
          }}
        >
          お料理の例
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          和洋折衷の大皿料理で、集いを華やかに彩ります。
          <br />
          20名様より、上限なく承ります。写真は一例です。ご予算・ご要望に合わせて、心を込めてお仕立てします。
        </p>
      </section>

      {/* Courses */}
      <section
        className="shell"
        style={{
          padding: "16px 40px 48px",
          display: "grid",
          gap: 28,
        }}
      >
        {COURSES.map((c) => (
          <div
            key={c.slug}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 32,
              alignItems: "center",
              background: "var(--bg)",
              padding: 24,
              border: "1px solid var(--rule-soft)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 18px",
                    background: c.badgeColor,
                    color: "#fff",
                    fontFamily: "var(--f-heading)",
                    fontSize: 13,
                    letterSpacing: "0.16em",
                  }}
                >
                  {c.ja}
                </span>
                <div>
                  <span
                    className="price-num"
                    style={{
                      fontSize: 24,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ¥{c.price.toLocaleString()}〜
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--ink-mute)",
                      marginLeft: 6,
                      letterSpacing: "0.08em",
                    }}
                  >
                    /人(税込)
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink-mute)",
                    letterSpacing: "0.1em",
                    fontFamily: "var(--f-heading)",
                  }}
                >
                  {c.dishCount}
                </div>
              </div>

              <h2
                className="kanji-display"
                style={{
                  fontSize: 28,
                  lineHeight: 1.5,
                  margin: "0 0 16px",
                  letterSpacing: "0.08em",
                  whiteSpace: "pre-line",
                }}
              >
                {c.headline}
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 2,
                  color: "var(--ink-soft)",
                  margin: "0 0 20px",
                }}
              >
                {c.description}
              </p>

              <div
                style={{
                  padding: "12px 18px",
                  background: "var(--paper)",
                  borderLeft: `3px solid ${c.badgeColor}`,
                }}
              >
                <div
                  className="label-ja"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    marginBottom: 6,
                  }}
                >
                  こんなお席におすすめ
                </div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "var(--ink-soft)",
                  }}
                >
                  {c.useCase}
                </div>
              </div>
            </div>

            <SmartImage
              src={`/images/catering/course-${c.slug}.jpg`}
              alt={`${c.ja}コースのお料理例`}
              labelEn={`IMG / ${c.en.toLowerCase()}-course`}
              labelJa={`${c.ja}コース`}
              aspect="4/3"
            />
          </div>
        ))}

        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "var(--ink-mute)",
            letterSpacing: "0.08em",
            margin: "8px 0",
          }}
        >
          写真はあくまで一例です。 お好み・ご要望に合わせてお仕立てします。
        </p>
      </section>

      {/* Customization */}
      <section
        className="shell"
        style={{ padding: "32px 40px 64px" }}
      >
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
                fontSize: 24,
                margin: 0,
                letterSpacing: "0.14em",
              }}
            >
              カスタマイズの例
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
            {CUSTOMIZATIONS.map((c) => (
              <div
                key={c.icon}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 16,
                  padding: "16px 0",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ color: "var(--accent)", paddingTop: 2 }}>
                  <CateringIcon name={c.icon} size={32} />
                </div>
                <div>
                  <div
                    className="kanji-h"
                    style={{
                      fontSize: 14,
                      letterSpacing: "0.12em",
                      marginBottom: 6,
                    }}
                  >
                    {c.title}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.9,
                      color: "var(--ink-soft)",
                      margin: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section
        className="shell"
        style={{
          padding: "16px 40px 64px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Link href="/catering" className="btn btn-line">
          ‹ トップページへ戻る
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
