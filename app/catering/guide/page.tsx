import type { Metadata } from "next";
import Link from "next/link";
import { CateringIcon } from "@/components/CateringIcons";
import { PROCESS_STEPS, FAQS, AREAS } from "@/lib/catering";

export const metadata: Metadata = {
  title: "ご利用ガイド　｜　イズミ産業ケータリング",
  description:
    "ご相談からお届けまでの流れ、配達対応エリア、最低注文金額、よくあるご質問などケータリングご利用時の情報をまとめました。",
  alternates: {
    canonical: "https://shop.isg.co.jp/catering/guide",
  },
};

export default function CateringGuide() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

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
          ご利用ガイド
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
          }}
        >
          ご相談からお届けまでの流れと、配達対応エリアのご案内です。
        </p>
      </section>

      {/* Process steps */}
      <section className="shell" style={{ padding: "32px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {PROCESS_STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                border: "1px solid var(--rule)",
                padding: "32px 20px",
                textAlign: "center",
                position: "relative",
                background: "var(--paper)",
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
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  color: "var(--accent)",
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CateringIcon name={s.icon} size={40} />
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

      {/* Delivery area */}
      <section className="shell" style={{ padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 26,
              margin: "0 0 12px",
              letterSpacing: "0.14em",
            }}
          >
            配達対応エリア
          </h2>
          <p
            style={{
              fontSize: 12,
              color: "var(--ink-soft)",
              letterSpacing: "0.08em",
            }}
          >
            保土ヶ谷本社からの往復時間を目安に、2つのエリアでご案内いたします。
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            maxWidth: 880,
            margin: "0 auto",
          }}
        >
          <AreaCard area={AREAS.main} accent="#4a7c4a" />
          <AreaCard area={AREAS.extended} accent="#2c4a6b" />
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "var(--ink-mute)",
            letterSpacing: "0.08em",
            marginTop: 20,
          }}
        >
          ※ エリア外やお急ぎの場合は、冷凍便の折詰を全国配送（別サービス）にて承ります。
        </p>
      </section>

      {/* FAQ */}
      <section className="shell" style={{ padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 26,
              margin: 0,
              letterSpacing: "0.14em",
            }}
          >
            よくあるご質問
          </h2>
        </div>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          {FAQS.map((f, i) => (
            <details
              key={i}
              style={{
                borderBottom: "1px solid var(--rule-soft)",
                padding: "18px 0",
              }}
            >
              <summary
                style={{
                  fontFamily: "var(--f-heading)",
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  listStyle: "none",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 12,
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                    paddingTop: 2,
                  }}
                >
                  Q.
                </span>
                <span>{f.q}</span>
              </summary>
              <div
                style={{
                  marginTop: 12,
                  paddingLeft: 28,
                  fontSize: 13,
                  lineHeight: 2,
                  color: "var(--ink-soft)",
                }}
              >
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "48px 0",
          marginTop: 32,
        }}
      >
        <div
          className="shell"
          style={{ textAlign: "center" }}
        >
          <h3
            className="kanji-h"
            style={{
              fontSize: 20,
              letterSpacing: "0.16em",
              margin: "0 0 20px",
            }}
          >
            ご不明な点はお気軽にお問い合わせください
          </h3>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href="/catering/inquiry"
              className="btn btn-accent"
              style={{
                background: "#c69d5a",
                borderColor: "#c69d5a",
              }}
            >
              アドバイザーに相談する
            </Link>
            <a
              href="tel:045-333-0163"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 20,
                letterSpacing: "0.04em",
                textDecoration: "none",
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
          padding: "32px 40px 64px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Link href="/catering/menu" className="btn btn-line">
          ‹ お料理の例へ戻る
        </Link>
        <Link
          href="/catering/inquiry"
          className="btn btn-ghost"
          style={{
            background: "#c69d5a",
            color: "var(--bg)",
            border: "none",
          }}
        >
          お見積・ご相談へ ›
        </Link>
      </section>
    </>
  );
}

function AreaCard({
  area,
  accent,
}: {
  area: (typeof AREAS)["main"] | (typeof AREAS)["extended"];
  accent: string;
}) {
  return (
    <div
      style={{
        padding: "24px 28px",
        border: `1px solid ${accent}`,
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          className="kanji-h"
          style={{
            fontSize: 18,
            letterSpacing: "0.16em",
            color: accent,
          }}
        >
          {area.label}
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--ink-mute)",
          }}
        >
          （{area.note}）
        </span>
      </div>
      <p
        style={{
          fontSize: 12,
          color: "var(--ink-soft)",
          lineHeight: 1.9,
          margin: "0 0 16px",
        }}
      >
        {area.places}
      </p>
      <div
        style={{
          paddingTop: 12,
          borderTop: "1px solid var(--rule-soft)",
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "var(--ink-mute)",
            marginBottom: 4,
          }}
        >
          最低ご注文人数
        </div>
        <div
          className="price-num"
          style={{
            fontSize: 26,
            letterSpacing: "0.04em",
            color: accent,
          }}
        >
          {area.minPeople}名様〜
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--ink-mute)",
            marginTop: 6,
            letterSpacing: "0.08em",
          }}
        >
          {area.tail}
        </div>
      </div>
    </div>
  );
}
