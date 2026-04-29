import { requireAdmin } from "@/lib/admin-auth";
import { listImages } from "@/lib/image-admin";
import { ImageUploader } from "./ImageUploader";
import { ImageList } from "./ImageList";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  await requireAdmin();
  const images = await listImages();

  return (
    <main
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "32px 24px 80px",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.28em",
            color: "#8a7e63",
            marginBottom: 6,
          }}
        >
          IMAGES · 画像のアップロード
        </div>
        <h1
          className="kanji-h"
          style={{
            fontSize: 22,
            letterSpacing: "0.14em",
            margin: 0,
          }}
        >
          画像庫
        </h1>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.9,
            color: "#5a5346",
            marginTop: 10,
            maxWidth: 720,
          }}
        >
          ケータリング・お届け弁当・会社案内など、サイト内で使う画像をアップロードできます。
          アップロード後、URLをコピーしてご利用ください
          （読み物のカバー画像は記事の編集ページから直接アップロードできます）。
        </p>
      </div>

      <ImageUploader />

      <h2
        style={{
          fontSize: 14,
          letterSpacing: "0.18em",
          color: "#5a5346",
          margin: "32px 0 12px",
          fontFamily: "var(--f-mono)",
        }}
      >
        UPLOADED · 既存の画像（{images.length}件）
      </h2>
      <ImageList initial={images} />
    </main>
  );
}
