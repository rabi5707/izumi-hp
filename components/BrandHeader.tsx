"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SectionIndicator } from "./SectionIndicator";

// Brand-level pages (Journal, About) — share a minimal header so visitors
// always have a way back to the three service sections via SectionIndicator,
// without inheriting any one section's navigation.

export function BrandHeader() {
  const pathname = usePathname();
  const label = pathname?.startsWith("/journal")
    ? "JOURNAL · お席にまつわる覚え書き"
    : pathname?.startsWith("/about")
      ? "ABOUT · 株式会社イズミ産業について"
      : "";

  return (
    <>
      <SectionIndicator />
      <div
        style={{
          background: "var(--ink)",
          color: "var(--bg)",
          fontSize: 11,
          letterSpacing: "0.18em",
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 28,
          }}
        >
          <span style={{ opacity: 0.75 }}>{label}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell bar">
          <Link href="/" className="logo">
            <div className="mark">株式会社イズミ産業</div>
            <div className="sub">冷凍折詰・お届け弁当・ケータリング</div>
          </Link>
        </div>
      </header>
    </>
  );
}
