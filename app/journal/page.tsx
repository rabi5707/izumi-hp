import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICE_LABELS, isService, type Service } from "@/lib/journal";
import {
  fetchAllPublishedPosts,
  fetchPostsByService,
} from "@/lib/journal-server";
import { breadcrumbLd, jsonLdScript } from "@/lib/seo";

// Revalidate the listing every 60s. Phase 3 will switch to on-demand
// revalidation triggered by admin save actions.
export const revalidate = 60;

type Search = { service?: string };

const FILTERS: Array<{ key: "all" | Service; ja: string; en: string }> = [
  { key: "all", ja: "すべて", en: "All" },
  { key: "frozen", ja: "冷凍折詰", en: "Frozen" },
  { key: "bento", ja: "お届け弁当", en: "Bento Delivery" },
  { key: "catering", ja: "ケータリング", en: "Catering" },
  { key: "common", ja: "知識・マナー", en: "General" },
];

export function generateMetadata({
  searchParams,
}: {
  searchParams?: Search;
}): Metadata {
  const s = searchParams?.service;
  if (isService(s)) {
    const label = SERVICE_LABELS[s];
    return {
      title: `${label.ja}にまつわる読み物　｜　株式会社イズミ産業 オンライン御注文`,
      description: `${label.ja}に関するお席のマナー・由来・ご利用のコツを、仕出し屋の目線でご案内します。`,
      alternates: { canonical: `/journal?service=${s}` },
    };
  }
  return {
    title: "読み物　｜　株式会社イズミ産業 オンライン御注文",
    description:
      "お食い初め・節句・法要・ケータリング・冷凍便など、お席にまつわる覚え書き。仕出し屋の目線から、由来・マナー・ご利用のコツをご案内します。",
    alternates: { canonical: "/journal" },
  };
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const active: "all" | Service = isService(searchParams?.service)
    ? (searchParams!.service as Service)
    : "all";

  const posts =
    active === "all"
      ? await fetchAllPublishedPosts()
      : await fetchPostsByService(active);

  const crumbs =
    active === "all"
      ? [
          { name: "ホーム", path: "/" },
          { name: "読み物", path: "/journal" },
        ]
      : [
          { name: "ホーム", path: "/" },
          { name: "読み物", path: "/journal" },
          {
            name: SERVICE_LABELS[active].ja,
            path: `/journal?service=${active}`,
          },
        ];

  return (
    <section className="shell">
      <script {...jsonLdScript(breadcrumbLd(crumbs))} />
      <div className="crumb">
        <Link href="/">ホーム</Link>
        <span className="sep">/</span>
        <span>読み物</span>
      </div>

      <div
        style={{
          padding: "64px 0 48px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="label-en" style={{ marginBottom: 20 }}>
          Journal · 読み物
        </div>
        <h1
          className="kanji-display"
          style={{ fontSize: 40, margin: "0 0 20px", lineHeight: 1.4 }}
        >
          お席にまつわる
          <br />
          ささやかな覚え書き
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
          節目のお祝い、ご会合、ご法要。それぞれのお席で承って参りました経験から、お料理の由来やマナー、お仕出しをご利用頂く際の心得などを、仕出し屋の目線で綴ります。
        </p>
      </div>

      <nav
        aria-label="読み物のサービス別フィルタ"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          padding: "20px 0 4px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        {FILTERS.map((f) => {
          const isActive = f.key === active;
          const href = f.key === "all" ? "/journal" : `/journal?service=${f.key}`;
          return (
            <Link
              key={f.key}
              href={href}
              aria-current={isActive ? "page" : undefined}
              style={{
                padding: "12px 18px 14px",
                marginRight: 4,
                fontSize: 12,
                letterSpacing: "0.18em",
                textDecoration: "none",
                color: isActive ? "var(--accent)" : "var(--ink-mute)",
                borderBottom: isActive
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
                marginBottom: -1,
                fontFamily: "var(--f-heading)",
              }}
            >
              {f.ja}
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  marginLeft: 8,
                  color: "var(--ink-mute)",
                }}
              >
                {f.en}
              </span>
            </Link>
          );
        })}
      </nav>

      {posts.length === 0 ? (
        <div
          style={{
            padding: "96px 0",
            textAlign: "center",
            color: "var(--ink-mute)",
            fontFamily: "var(--f-heading)",
            letterSpacing: "0.16em",
          }}
        >
          このカテゴリの覚え書きは只今準備中でございます
        </div>
      ) : (
        <div className="journal-list">
          {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/journal/${p.slug}`}
            className="journal-row"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="jr-meta">
              <span className="jr-date">{p.date}</span>
              <span className="jr-cat">
                {p.cat}　·　{p.tag}
              </span>
            </div>
            <div className="jr-body">
              <h2 className="jr-title">{p.ja}</h2>
              <div className="jr-en">{p.en}</div>
              <p className="jr-lede">{p.lede}</p>
              <div className="jr-foot">
                <span className="jr-read">{p.read}</span>
                <span className="jr-link">続きを読む　→</span>
              </div>
            </div>
            {p.coverImage ? (
              <div
                className="jr-thumb"
                style={{
                  position: "relative",
                  background: "var(--bg-alt)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={p.coverImage}
                  alt={p.ja}
                  fill
                  sizes="(max-width: 768px) 30vw, 240px"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            ) : (
              <div className="jr-thumb ph">
                <div className="ph-label">IMG / {p.slug}</div>
              </div>
            )}
          </Link>
          ))}
        </div>
      )}

      <div
        style={{
          padding: "64px 0",
          textAlign: "center",
          borderTop: "1px solid var(--rule)",
          marginTop: 32,
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            color: "var(--ink-mute)",
            marginBottom: 14,
          }}
        >
          新しい覚え書きは、月に一二度の頻度で更新致します
        </div>
        <Link href="/shop" className="btn btn-ghost">
          お品書きを見る　→
        </Link>
      </div>
    </section>
  );
}
