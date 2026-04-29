"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteImage, type StoredImage } from "@/lib/image-admin";

export function ImageList({ initial }: { initial: StoredImage[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [copied, setCopied] = useState<string | null>(null);
  const [items, setItems] = useState(initial);

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1200);
  }

  function onDelete(img: StoredImage) {
    if (
      !confirm(
        `この画像を削除します。\n${img.path}\nこの操作は取り消せません。よろしいですか？`
      )
    )
      return;
    start(async () => {
      try {
        await deleteImage(img.path);
        setItems((prev) => prev.filter((p) => p.path !== img.path));
        router.refresh();
      } catch (err) {
        alert(err instanceof Error ? err.message : "削除に失敗しました。");
      }
    });
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          padding: "48px 16px",
          textAlign: "center",
          color: "#8a7e63",
          background: "#fff",
          border: "1px dashed #d8d2c5",
          fontSize: 13,
        }}
      >
        まだ画像がアップロードされておりません。
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((img) => (
        <div
          key={img.path}
          style={{
            background: "#fff",
            border: "1px solid #d8d2c5",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 3",
              background: "#f0ebe0",
              overflow: "hidden",
            }}
          >
            <Image
              src={img.url}
              alt={img.path}
              fill
              sizes="220px"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
          <div style={{ padding: "10px 12px", fontSize: 11, color: "#5a5346" }}>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                color: "#8a7e63",
                marginBottom: 6,
                wordBreak: "break-all",
              }}
            >
              {img.path.replace(/^uploads\//, "")}
            </div>
            <div style={{ fontSize: 10, color: "#8a7e63", marginBottom: 8 }}>
              {formatBytes(img.size)}
              {img.uploadedAt > 0 &&
                ` · ${new Date(img.uploadedAt).toLocaleDateString("ja-JP")}`}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                onClick={() => copy(img.url)}
                style={btn(copied === img.url ? "#2d5f4e" : "#fafaf6", copied === img.url ? "#fff" : "#1a1613")}
              >
                {copied === img.url ? "コピー済" : "URLをコピー"}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => onDelete(img)}
                style={{
                  ...btn("transparent", "#8a2e2e"),
                  borderColor: "#d4b3b3",
                  cursor: pending ? "wait" : "pointer",
                }}
              >
                削除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function btn(bg: string, fg: string): React.CSSProperties {
  return {
    flex: 1,
    padding: "6px 8px",
    background: bg,
    color: fg,
    border: "1px solid #c9c1ac",
    fontSize: 10,
    letterSpacing: "0.14em",
    cursor: "pointer",
  };
}

function formatBytes(n: number): string {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
