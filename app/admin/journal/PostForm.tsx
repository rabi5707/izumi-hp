"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { JournalPostDoc } from "@/lib/journal-schema";

const SERVICE_OPTIONS: { value: "frozen" | "bento" | "catering" | "common"; label: string }[] = [
  { value: "frozen", label: "冷凍折詰" },
  { value: "bento", label: "お届け弁当" },
  { value: "catering", label: "ケータリング" },
  { value: "common", label: "共通・知識" },
];

type Mode =
  | { kind: "new" }
  | { kind: "edit"; original: JournalPostDoc };

export function PostForm({
  mode,
  action,
  submitLabel,
}: {
  mode: Mode;
  action: (form: FormData) => Promise<void>;
  submitLabel: string;
}) {
  const seed: Partial<JournalPostDoc> =
    mode.kind === "edit" ? mode.original : {};
  const [body, setBody] = useState(seed.body ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverRemove, setCoverRemove] = useState(false);

  // Revoke object URL when component unmounts or preview changes.
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const today = formatToday();
  const existingCover = seed.coverImage;

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
        JOURNAL · {mode.kind === "new" ? "新しい記事" : "記事の編集"}
      </div>
      <h1
        className="kanji-h"
        style={{ fontSize: 22, letterSpacing: "0.14em", margin: "0 0 24px" }}
      >
        {mode.kind === "new" ? "新規記事の作成" : `編集: ${seed.ja}`}
      </h1>

      <form
        action={async (formData) => {
          setError(null);
          setBusy(true);
          try {
            await action(formData);
          } catch (err) {
            // Next.js redirect() throws an error with a NEXT_REDIRECT digest
            // — re-throw so the framework can perform the navigation.
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
        <Row label="日付（yyyy.mm.dd）" hint="表示用と並び替え用に使用します。">
          <input
            name="date"
            required
            defaultValue={seed.date ?? today}
            placeholder="2026.04.29"
            style={inputStyle}
          />
        </Row>

        <Row label="スラッグ（URL末尾）" hint="半角英数字とハイフンのみ。例: okuizome">
          <input
            name="slug"
            required
            defaultValue={seed.slug ?? ""}
            placeholder="okuizome"
            style={{ ...inputStyle, fontFamily: "var(--f-mono)" }}
          />
        </Row>

        <Row label="日本語タイトル">
          <input
            name="ja"
            required
            defaultValue={seed.ja ?? ""}
            style={inputStyle}
          />
        </Row>

        <Row label="英語サブタイトル" hint="記事の見出し下に小さく表示されます。">
          <input
            name="en"
            defaultValue={seed.en ?? ""}
            placeholder="Memorial Service — Bento or Catering?"
            style={inputStyle}
          />
        </Row>

        <Row label="リード文" hint="記事冒頭に表示される導入文。140文字程度。">
          <textarea
            name="lede"
            required
            defaultValue={seed.lede ?? ""}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Row>

        <Row
          label="カバー画像"
          hint="記事一覧と詳細ページの上部に表示される画像（任意・JPEG/PNG/WebP・10MBまで）。"
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {(coverPreview || (existingCover && !coverRemove)) && (
              <div
                style={{
                  position: "relative",
                  width: 220,
                  aspectRatio: "16 / 9",
                  background: "#f0ebe0",
                  border: "1px solid #c9c1ac",
                  overflow: "hidden",
                }}
              >
                {coverPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverPreview}
                    alt="新しいカバー画像のプレビュー"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : existingCover ? (
                  <Image
                    src={existingCover}
                    alt="現在のカバー画像"
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
                name="cover"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (coverPreview) URL.revokeObjectURL(coverPreview);
                  setCoverPreview(f ? URL.createObjectURL(f) : null);
                  if (f) setCoverRemove(false);
                }}
                style={{ fontSize: 12 }}
              />
              {existingCover && (
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
                    name="coverRemove"
                    checked={coverRemove}
                    onChange={(e) => {
                      setCoverRemove(e.target.checked);
                      if (e.target.checked && coverPreview) {
                        URL.revokeObjectURL(coverPreview);
                        setCoverPreview(null);
                      }
                    }}
                  />
                  既存のカバー画像を削除する
                </label>
              )}
            </div>
          </div>
        </Row>

        <Row label="読了の目安">
          <input
            name="read"
            defaultValue={seed.read ?? "5分で読めます"}
            style={inputStyle}
          />
        </Row>

        <Row label="カテゴリ表示">
          <input
            name="cat"
            defaultValue={seed.cat ?? "覚え書き"}
            style={inputStyle}
          />
        </Row>

        <Row label="タグ表示">
          <input
            name="tag"
            defaultValue={seed.tag ?? "コラム"}
            style={inputStyle}
          />
        </Row>

        <Row label="関連サービス" hint="記事に該当するサービスを選んでください。">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {SERVICE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name={`service_${opt.value}`}
                  defaultChecked={
                    seed.services?.includes(opt.value) ?? false
                  }
                />
                {opt.label}
              </label>
            ))}
          </div>
        </Row>

        <Row label="検索キーワード" hint="カンマ区切り。SEO用。例: 法事, 法要, 横浜">
          <input
            name="tags"
            defaultValue={(seed.tags ?? []).join(", ")}
            style={inputStyle}
          />
        </Row>

        <Row
          label="本文（Markdown）"
          hint="## で見出し、- で箇条書き、> で引用、**太字**、[リンク](url) など。"
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              style={{
                padding: "5px 10px",
                background: showPreview ? "#1a1613" : "#fafaf6",
                color: showPreview ? "#fff" : "#1a1613",
                border: "1px solid #c9c1ac",
                fontSize: 11,
                letterSpacing: "0.14em",
                cursor: "pointer",
              }}
            >
              {showPreview ? "編集に戻る" : "プレビュー"}
            </button>
            <span style={{ fontSize: 11, color: "#8a7e63" }}>
              {body.length} 文字
            </span>
          </div>
          {showPreview ? (
            <div
              className="journal-md"
              style={{
                padding: 20,
                background: "#fafaf6",
                border: "1px solid #c9c1ac",
                minHeight: 240,
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {body || "_（本文未入力）_"}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={20}
              style={{
                ...inputStyle,
                fontFamily: "var(--f-mono)",
                fontSize: 13,
                lineHeight: 1.7,
                resize: "vertical",
              }}
            />
          )}
        </Row>

        <Row label="公開状態">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}
          >
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
            href="/admin/journal"
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

function formatToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
}
