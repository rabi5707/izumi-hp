"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/lib/products";
import type { ProductDoc } from "@/lib/products-schema";

type Mode = { kind: "new" } | { kind: "edit"; original: ProductDoc };

export function ProductForm({
  mode,
  action,
  submitLabel,
  defaultSortOrder,
}: {
  mode: Mode;
  action: (form: FormData) => Promise<void>;
  submitLabel: string;
  defaultSortOrder: number;
}) {
  const seed: Partial<ProductDoc> = mode.kind === "edit" ? mode.original : {};
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageRemove, setImageRemove] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const existingImage = seed.image;

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "32px 24px 96px",
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
        PRODUCTS · {mode.kind === "new" ? "新しい商品" : "商品の編集"}
      </div>
      <h1
        className="kanji-h"
        style={{ fontSize: 22, letterSpacing: "0.14em", margin: "0 0 24px" }}
      >
        {mode.kind === "new" ? "新規商品の登録" : `編集: ${seed.ja}`}
      </h1>

      <form
        action={async (formData) => {
          setError(null);
          setBusy(true);
          try {
            await action(formData);
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "digest" in err &&
              typeof (err as { digest?: unknown }).digest === "string" &&
              (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
            ) {
              throw err;
            }
            setError(err instanceof Error ? err.message : "保存に失敗しました。");
            setBusy(false);
          }
        }}
        style={{
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: 28,
        }}
      >
        <Row label="商品ID（URL末尾）" hint="半角英数字とハイフンのみ。例: shokado-tsuru">
          <input
            name="id"
            required
            defaultValue={seed.id ?? ""}
            placeholder="shokado-tsuru"
            style={{ ...inputStyle, fontFamily: "var(--f-mono)" }}
          />
        </Row>

        <Row label="カテゴリ">
          <select
            name="cat"
            required
            defaultValue={seed.cat ?? ""}
            style={inputStyle}
          >
            <option value="">— お選びください —</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.ja}（{c.en}）
              </option>
            ))}
          </select>
        </Row>

        <Row label="日本語商品名">
          <input
            name="ja"
            required
            defaultValue={seed.ja ?? ""}
            placeholder="松花堂　鶴"
            style={inputStyle}
          />
        </Row>

        <Row label="英語商品名（サブタイトル）">
          <input
            name="en"
            defaultValue={seed.en ?? ""}
            placeholder="SHOKADO TSURU"
            style={inputStyle}
          />
        </Row>

        <Row label="商品説明" hint="商品一覧と詳細ページに表示されます。1〜2文程度。">
          <textarea
            name="desc"
            defaultValue={seed.desc ?? ""}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Row>

        <Row label="商品画像" hint="JPEG / PNG / WebP・10MBまで。商品一覧と詳細に表示されます。">
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {(imagePreview || (existingImage && !imageRemove)) && (
              <div
                style={{
                  position: "relative",
                  width: 220,
                  aspectRatio: "1 / 1",
                  background: "#f0ebe0",
                  border: "1px solid #c9c1ac",
                  overflow: "hidden",
                }}
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="新しい商品画像のプレビュー"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : existingImage ? (
                  <Image
                    src={existingImage}
                    alt="現在の商品画像"
                    fill
                    sizes="220px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                ) : null}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 240 }}>
              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (imagePreview) URL.revokeObjectURL(imagePreview);
                  setImagePreview(f ? URL.createObjectURL(f) : null);
                  if (f) setImageRemove(false);
                }}
                style={{ fontSize: 12 }}
              />
              {existingImage && (
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "#5a5346",
                    marginTop: 12,
                  }}
                >
                  <input
                    type="checkbox"
                    name="imageRemove"
                    checked={imageRemove}
                    onChange={(e) => {
                      setImageRemove(e.target.checked);
                      if (e.target.checked && imagePreview) {
                        URL.revokeObjectURL(imagePreview);
                        setImagePreview(null);
                      }
                    }}
                  />
                  既存の商品画像を削除する
                </label>
              )}
            </div>
          </div>
        </Row>

        <Row label="価格（円・税込）" hint="数字のみ。例: 4200">
          <input
            name="price"
            type="number"
            min={0}
            step={100}
            required
            defaultValue={seed.price ?? ""}
            style={{ ...inputStyle, fontFamily: "var(--f-mono)" }}
          />
        </Row>

        <Row label="ご提供量" hint="例: 一人前 / 2〜3名様">
          <input
            name="serves"
            defaultValue={seed.serves ?? "一人前"}
            style={inputStyle}
          />
        </Row>

        <Row label="バッジ" hint="任意。例: 人気 / 定番（空欄でバッジなし）">
          <input
            name="tag"
            defaultValue={seed.tag ?? ""}
            placeholder="人気"
            style={inputStyle}
          />
        </Row>

        <Row label="リードタイム表示" hint="例: 中3日 (冷凍) / 12月25日まで受付">
          <input
            name="lead"
            defaultValue={seed.lead ?? "中3日 (冷凍)"}
            style={inputStyle}
          />
        </Row>

        <Row label="配送エリア表示" hint="例: 全国配送">
          <input
            name="area"
            defaultValue={seed.area ?? "全国配送"}
            style={inputStyle}
          />
        </Row>

        <Row label="冷凍便">
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <input
              type="checkbox"
              name="freeze"
              defaultChecked={seed.freeze ?? true}
            />
            冷凍便での配送
          </label>
        </Row>

        <Row label="並び順" hint="昇順。10, 20, 30… のように間隔を空けると後から差し込めます。">
          <input
            name="sortOrder"
            type="number"
            step={10}
            required
            defaultValue={seed.sortOrder ?? defaultSortOrder}
            style={{ ...inputStyle, fontFamily: "var(--f-mono)" }}
          />
        </Row>

        <Row label="公開状態">
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <input
              type="checkbox"
              name="published"
              defaultChecked={seed.published ?? false}
            />
            公開する（チェックを外すと下書き）
          </label>
        </Row>

        {error && (
          <div
            role="alert"
            style={{
              padding: "10px 14px",
              background: "#fdecec",
              border: "1px solid #e0a8a8",
              color: "#8a2e2e",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            marginTop: 12,
          }}
        >
          <a
            href="/admin/products"
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: "#5a5346",
              border: "1px solid #c9c1ac",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: "0.14em",
            }}
          >
            キャンセル
          </a>
          <button
            type="submit"
            disabled={busy}
            style={{
              padding: "10px 24px",
              background: busy ? "#8a7e63" : "#1a1613",
              color: "#fff",
              border: "none",
              fontFamily: "var(--f-heading)",
              fontSize: 13,
              letterSpacing: "0.16em",
              cursor: busy ? "wait" : "pointer",
            }}
          >
            {busy ? "保存中…" : submitLabel}
          </button>
        </div>
      </form>
    </main>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#5a5346",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {hint && (
        <div
          style={{
            fontSize: 11,
            color: "#8a7e63",
            marginBottom: 6,
            lineHeight: 1.6,
          }}
        >
          {hint}
        </div>
      )}
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #c9c1ac",
  background: "#fafaf6",
  fontSize: 14,
  fontFamily: "inherit",
};
