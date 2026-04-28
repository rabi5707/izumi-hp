// Common layout wrapper for all legal pages — provides consistent styling.

import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="shell"
      style={{ maxWidth: 900, padding: "48px 40px 96px" }}
    >
      <nav
        style={{
          marginBottom: 40,
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--ink-mute)",
        }}
      >
        <Link href="/legal/tokusho" className="label-ja">
          特定商取引法に基づく表記
        </Link>
        <span style={{ opacity: 0.3 }}>｜</span>
        <Link href="/legal/privacy" className="label-ja">
          プライバシーポリシー
        </Link>
        <span style={{ opacity: 0.3 }}>｜</span>
        <Link href="/legal/terms" className="label-ja">
          ご利用規約
        </Link>
      </nav>
      {children}
    </section>
  );
}
