import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAllProductsForAdmin } from "@/lib/products-server";
import { CATEGORIES } from "@/lib/products";
import { DeleteProductButton } from "./DeleteProductButton";

export const dynamic = "force-dynamic";

const CAT_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.ja])
);

const yen = (n: number) => "¥" + n.toLocaleString("ja-JP");

export default async function AdminProductsList() {
  await requireAdmin();
  const products = await fetchAllProductsForAdmin();

  return (
    <main
      style={{
        maxWidth: 1180,
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
            PRODUCTS · 商品の管理
          </div>
          <h1
            className="kanji-h"
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              margin: 0,
            }}
          >
            冷凍折詰 商品の一覧
          </h1>
          <div
            style={{
              fontSize: 12,
              color: "#5a5346",
              marginTop: 8,
            }}
          >
            全{products.length}件 · 公開{products.filter((p) => p.published).length}件 · 下書
            {products.filter((p) => !p.published).length}件
          </div>
        </div>
        <Link
          href="/admin/products/new"
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
          ＋ 新しい商品を登録
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
            <th style={th}>並び</th>
            <th style={th}>画像</th>
            <th style={th}>商品名</th>
            <th style={th}>カテゴリ</th>
            <th style={th}>価格</th>
            <th style={th}>商品ID</th>
            <th style={{ ...th, width: 200 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderTop: "1px solid #ece7d9" }}>
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
                {p.sortOrder}
              </td>
              <td style={td}>
                {p.image ? (
                  <div
                    style={{
                      position: "relative",
                      width: 64,
                      height: 64,
                      background: "#f0ebe0",
                      border: "1px solid #d8d2c5",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.ja}
                      fill
                      sizes="64px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "#f0ebe0",
                      border: "1px dashed #c9c1ac",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      color: "#8a7e63",
                      letterSpacing: "0.1em",
                    }}
                  >
                    画像なし
                  </div>
                )}
              </td>
              <td style={td}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{p.ja}</div>
                <div style={{ fontSize: 11, color: "#8a7e63" }}>{p.en}</div>
                {p.tag && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 4,
                      padding: "1px 6px",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      background: "#fafaf6",
                      border: "1px solid #c9c1ac",
                      color: "#5a5346",
                    }}
                  >
                    {p.tag}
                  </span>
                )}
              </td>
              <td style={{ ...td, fontSize: 12, color: "#5a5346" }}>
                {CAT_LABEL[p.cat] ?? p.cat}
              </td>
              <td style={{ ...td, fontFamily: "var(--f-mono)", fontSize: 13 }}>
                {yen(p.price)}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  color: "#5a5346",
                }}
              >
                {p.id}
              </td>
              <td style={td}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link href={`/admin/products/${p.id}/edit`} style={btnLink}>
                    編集
                  </Link>
                  <DeleteProductButton id={p.id} title={p.ja} />
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan={8}
                style={{
                  padding: "48px 16px",
                  textAlign: "center",
                  color: "#8a7e63",
                }}
              >
                商品がまだございません。「＋ 新しい商品を登録」からお始めください。
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
