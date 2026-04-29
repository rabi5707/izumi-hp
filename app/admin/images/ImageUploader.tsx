"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage, type UploadResult } from "@/lib/image-admin";

export function ImageUploader() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<UploadResult | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setRecent(null);
    setCopyState("idle");
    const form = e.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    try {
      const result = await uploadImage(data);
      setRecent(result);
      form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "アップロードに失敗しました。");
    } finally {
      setBusy(false);
    }
  }

  async function copyUrl() {
    if (!recent) return;
    await navigator.clipboard.writeText(recent.url);
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 1500);
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: "#fff",
        border: "1px solid #d8d2c5",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          style={{ fontSize: 13 }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            padding: "8px 18px",
            background: busy ? "#8a7e63" : "#1a1613",
            color: "#fff",
            border: "none",
            fontFamily: "var(--f-heading)",
            fontSize: 13,
            letterSpacing: "0.16em",
            cursor: busy ? "wait" : "pointer",
          }}
        >
          {busy ? "アップ中…" : "アップロード"}
        </button>
        <span style={{ fontSize: 11, color: "#8a7e63" }}>
          JPEG / PNG / WebP / GIF · 10MBまで
        </span>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            marginTop: 12,
            padding: "10px 12px",
            background: "#fdecec",
            border: "1px solid #e0a8a8",
            color: "#8a2e2e",
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}

      {recent && (
        <div
          style={{
            marginTop: 16,
            padding: 14,
            background: "#f0ebe0",
            border: "1px solid #c9c1ac",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "#5a5346",
              marginBottom: 8,
              fontFamily: "var(--f-mono)",
            }}
          >
            ✓ アップロード完了
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              readOnly
              value={recent.url}
              style={{
                flex: 1,
                padding: "8px 10px",
                fontSize: 12,
                fontFamily: "var(--f-mono)",
                border: "1px solid #c9c1ac",
                background: "#fff",
              }}
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              onClick={copyUrl}
              style={{
                padding: "8px 14px",
                background: copyState === "copied" ? "#2d5f4e" : "#fafaf6",
                color: copyState === "copied" ? "#fff" : "#1a1613",
                border: "1px solid #c9c1ac",
                fontSize: 11,
                letterSpacing: "0.14em",
                cursor: "pointer",
              }}
            >
              {copyState === "copied" ? "コピー済" : "URLをコピー"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
