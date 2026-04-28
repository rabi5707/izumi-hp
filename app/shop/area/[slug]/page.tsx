import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AREAS, AREA_SLUGS, type AreaSlug } from "@/lib/areas";

export function generateStaticParams() {
  return AREA_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const area = AREAS[params.slug as AreaSlug];
  if (!area) return {};
  return {
    title: `${area.ja}　｜　株式会社イズミ産業 オンライン御注文`,
    description: area.lede.slice(0, 140),
  };
}

export default function AreaLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = AREAS[params.slug as AreaSlug];
  if (!data) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="crumb">
        <Link href="/shop">ホーム</Link>
        <span className="sep">/</span>
        <span>配送について</span>
      </div>

      {/* Hero */}
      <div style={{ padding: "48px 0 32px" }}>
        <div className="label-en" style={{ marginBottom: 16 }}>
          Shipping · {data.en}
        </div>
        <h1
          className="kanji-display"
          style={{
            fontSize: 36,
            margin: "0 0 24px",
            lineHeight: 1.45,
            whiteSpace: "pre-line",
            letterSpacing: "0.08em",
          }}
        >
          {data.h1}
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
            maxWidth: 720,
            margin: 0,
          }}
        >
          {data.lede}
        </p>
      </div>

      {/* Shipping rates summary */}
      <div
        style={{
          padding: "32px 0 48px",
        }}
      >
        <div className="section-head" style={{ marginBottom: 20 }}>
          <div className="lhs">
            <h2 style={{ fontSize: 20 }}>配送料金</h2>
            <span className="label-en">Shipping Rates</span>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {[
            {
              label: "送料",
              value: "¥1,500",
              note: "1配送先につき（税込）",
            },
            {
              label: "送料無料の条件",
              value: "¥10,000〜",
              note: "1配送先のご注文金額",
            },
            {
              label: "お届けまで",
              value: "中3日",
              note: "ご注文後3日以降のお日にちをご指定可",
            },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                padding: "20px 24px",
              }}
            >
              <div
                className="label-ja"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  marginBottom: 8,
                }}
              >
                {r.label}
              </div>
              <div
                className="price-num"
                style={{
                  fontSize: 22,
                  letterSpacing: "0.04em",
                  marginBottom: 6,
                }}
              >
                {r.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-mute)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.7,
                }}
              >
                {r.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prefectures */}
      <div
        style={{
          padding: "48px 0",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="section-head" style={{ marginBottom: 20 }}>
          <div className="lhs">
            <h2 style={{ fontSize: 20 }}>お届け都道府県</h2>
            <span className="label-en">Prefectures</span>
          </div>
          <div className="meta">
            ヤマト運輸クール便にて、全国どちらへでもお届け致します。
          </div>
        </div>
        <div className="area-chips">
          {data.areas.map((a, i) => (
            <span key={i} className={"ac " + (a.includes("—") ? "hd" : "")}>
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: "48px 0" }}>
        <div className="section-head" style={{ marginBottom: 20 }}>
          <div className="lhs">
            <h2 style={{ fontSize: 20 }}>よくあるご質問</h2>
            <span className="label-en">FAQ</span>
          </div>
        </div>
        <div className="faq-list">
          {data.faqs.map((f, i) => (
            <div key={i} className="faq-row">
              <div className="faq-q">
                <span className="faq-mark">Q.</span>
                {f.q}
              </div>
              <div className="faq-a">
                <span className="faq-mark faq-a-mark">A.</span>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA back to shop */}
      <div
        style={{
          padding: "32px 0 80px",
          textAlign: "center",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <Link href="/shop" className="btn btn-accent">
          冷凍折詰を見る　→
        </Link>
      </div>
    </section>
  );
}
