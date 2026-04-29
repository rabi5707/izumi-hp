import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAllPostsForAdmin } from "@/lib/journal-server";
import { DeletePostButton } from "./DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminJournalList() {
  await requireAdmin();
  const posts = await fetchAllPostsForAdmin();

  return (
    <main
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "32px 24px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.28em",
              color: "#8a7e63",
              marginBottom: 6,
            }}
          >
            JOURNAL · 読み物の編集
          </div>
          <h1
            className="kanji-h"
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              margin: 0,
            }}
          >
            記事の一覧
          </h1>
          <div
            style={{
              fontSize: 12,
              color: "#5a5346",
              marginTop: 8,
            }}
          >
            全{posts.length}件 · 公開{posts.filter((p) => p.published).length}件 · 下書き
            {posts.filter((p) => !p.published).length}件
          </div>
        </div>
        <Link
          href="/admin/journal/new"
          style={{
            padding: "10px 18px",
            background: "#1a1613",
            color: "#fff",
            textDecoration: "none",
            fontFamily: "var(--f-heading)",
            fontSize: 13,
            letterSpacing: "0.16em",
          }}
        >
          ＋ 新しい記事を書く
        </Link>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          border: "1px solid #d8d2c5",
        }}
      >
        <thead>
          <tr style={{ background: "#f0ebe0", textAlign: "left" }}>
            <th style={th}>状態</th>
            <th style={th}>日付</th>
            <th style={th}>タイトル</th>
            <th style={th}>サービス</th>
            <th style={th}>スラッグ</th>
            <th style={{ ...th, width: 200 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.slug} style={{ borderTop: "1px solid #ece7d9" }}>
              <td style={td}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    background: p.published ? "#2d5f4e" : "#8a7e63",
                    color: "#fff",
                  }}
                >
                  {p.published ? "公開" : "下書"}
                </span>
              </td>
              <td style={{ ...td, fontFamily: "var(--f-mono)", fontSize: 11 }}>
                {p.date}
              </td>
              <td style={td}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{p.ja}</div>
                <div style={{ fontSize: 11, color: "#8a7e63" }}>{p.en}</div>
              </td>
              <td style={{ ...td, fontSize: 11, color: "#5a5346" }}>
                {p.services.join(", ")}
              </td>
              <td style={{ ...td, fontFamily: "var(--f-mono)", fontSize: 11, color: "#5a5346" }}>
                {p.slug}
              </td>
              <td style={td}>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link
                    href={`/admin/journal/${p.slug}/edit`}
                    style={btnLink}
                  >
                    編集
                  </Link>
                  {p.published && (
                    <Link
                      href={`/journal/${p.slug}`}
                      target="_blank"
                      style={{ ...btnLink, background: "#fff" }}
                    >
                      ↗ 表示
                    </Link>
                  )}
                  <DeletePostButton slug={p.slug} title={p.ja} />
                </div>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: "48px 16px", textAlign: "center", color: "#8a7e63" }}>
                記事がまだございません。「新しい記事を書く」からお始めください。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}

const th: React.CSSProperties = {
  padding: "12px 16px",
  fontFamily: "var(--f-mono)",
  fontSize: 10,
  letterSpacing: "0.22em",
  color: "#5a5346",
  fontWeight: 500,
};

const td: React.CSSProperties = {
  padding: "14px 16px",
  verticalAlign: "top",
};

const btnLink: React.CSSProperties = {
  padding: "6px 12px",
  background: "#fafaf6",
  color: "#1a1613",
  textDecoration: "none",
  fontSize: 11,
  letterSpacing: "0.14em",
  border: "1px solid #c9c1ac",
};
