import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAllPostsForAdmin } from "@/lib/journal-server";
import { fetchAllProductsForAdmin } from "@/lib/products-server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = await requireAdmin();

  // それぞれの管理対象の件数を一目で把握できるように軽くサマリー。
  const [posts, products] = await Promise.all([
    fetchAllPostsForAdmin().catch(() => []),
    fetchAllProductsForAdmin().catch(() => []),
  ]);

  const journalSummary = {
    total: posts.length,
    published: posts.filter((p) => p.published).length,
    draft: posts.filter((p) => !p.published).length,
  };
  const productSummary = {
    total: products.length,
    published: products.filter((p) => p.published).length,
    draft: products.filter((p) => !p.published).length,
  };

  return (
    <main
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "48px 24px 96px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "#8a7e63",
          marginBottom: 6,
        }}
      >
        ADMIN · 管理画面ホーム
      </div>
      <h1
        className="kanji-h"
        style={{
          fontSize: 26,
          letterSpacing: "0.14em",
          margin: "0 0 8px",
        }}
      >
        ようこそ、{user.email.split("@")[0]} 様
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "#5a5346",
          margin: "0 0 32px",
          lineHeight: 1.8,
        }}
      >
        編集なさりたい項目をお選びください。
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        <Card
          tag="PRODUCTS"
          ja="冷凍折詰 商品"
          desc="松花堂・お祝い膳・おせち等の商品を登録・編集します。価格・商品画像・公開状態の切替も。"
          summary={`全${productSummary.total}件 · 公開${productSummary.published} · 下書${productSummary.draft}`}
          href="/admin/products"
          primaryHref="/admin/products/new"
          primaryLabel="＋ 新規登録"
        />
        <Card
          tag="JOURNAL"
          ja="読み物"
          desc="記事の新規作成・公開状態の切替・カバー画像の差替を行います。Markdown 形式。"
          summary={`全${journalSummary.total}件 · 公開${journalSummary.published} · 下書${journalSummary.draft}`}
          href="/admin/journal"
          primaryHref="/admin/journal/new"
          primaryLabel="＋ 新規記事"
        />
        <Card
          tag="IMAGES"
          ja="画像庫"
          desc="LP やコードに貼り付ける画像をアップロード。アップロード後に URL をコピーしてご利用下さい。"
          summary="任意の画像をアップロード可能"
          href="/admin/images"
          primaryHref="/admin/images"
          primaryLabel="画像庫を開く"
        />
      </div>

      <section style={{ marginTop: 56 }}>
        <h2
          className="kanji-h"
          style={{
            fontSize: 16,
            letterSpacing: "0.18em",
            margin: "0 0 12px",
            color: "#5a5346",
          }}
        >
          公開ページの確認
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ExtLink href="/" label="ホーム" />
          <ExtLink href="/shop" label="冷凍折詰（/shop）" />
          <ExtLink href="/catering" label="ケータリング（/catering）" />
          <ExtLink
            href="/bento-delivery"
            label="お届け弁当（/bento-delivery）"
          />
          <ExtLink href="/journal" label="読み物（/journal）" />
        </div>
      </section>
    </main>
  );
}

function Card({
  tag,
  ja,
  desc,
  summary,
  href,
  primaryHref,
  primaryLabel,
}: {
  tag: string;
  ja: string;
  desc: string;
  summary: string;
  href: string;
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d8d2c5",
        padding: "24px 24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: "#8a7e63",
        }}
      >
        {tag}
      </div>
      <div
        className="kanji-h"
        style={{
          fontSize: 18,
          letterSpacing: "0.14em",
          margin: 0,
        }}
      >
        {ja}
      </div>
      <p
        style={{
          fontSize: 12,
          color: "#5a5346",
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        {desc}
      </p>
      <div
        style={{
          fontSize: 11,
          color: "#8a7e63",
          fontFamily: "var(--f-mono)",
          letterSpacing: "0.1em",
          padding: "6px 0",
          borderTop: "1px solid #ece7d9",
          marginTop: "auto",
        }}
      >
        {summary}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link
          href={href}
          style={{
            flex: 1,
            padding: "10px 14px",
            background: "#1a1613",
            color: "#fff",
            textDecoration: "none",
            fontFamily: "var(--f-heading)",
            fontSize: 12,
            letterSpacing: "0.16em",
            textAlign: "center",
          }}
        >
          一覧を開く
        </Link>
        <Link
          href={primaryHref}
          style={{
            padding: "10px 14px",
            background: "#fafaf6",
            color: "#1a1613",
            border: "1px solid #c9c1ac",
            textDecoration: "none",
            fontSize: 12,
            letterSpacing: "0.14em",
            textAlign: "center",
          }}
        >
          {primaryLabel}
        </Link>
      </div>
    </div>
  );
}

function ExtLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      style={{
        padding: "8px 14px",
        background: "#fff",
        border: "1px solid #d8d2c5",
        color: "#5a5346",
        textDecoration: "none",
        fontSize: 12,
        letterSpacing: "0.1em",
      }}
    >
      ↗ {label}
    </Link>
  );
}
