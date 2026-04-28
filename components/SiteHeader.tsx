"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { SectionIndicator } from "./SectionIndicator";

// Frozen EC (shop) — minimal nav. Brand-level pages (会社案内 etc.) live on
// the portal/footer; cross-section navigation uses SectionIndicator.

const nav = [
  { href: "/shop", ja: "ホーム" },
  { href: "/shop/area/frozen", ja: "配送について" },
];

// Anchor links into the shop home's category sections.
const cats = [
  { slug: "shokado", ja: "松花堂", href: "/shop#shokado" },
  { slug: "oiwai", ja: "お祝い膳", href: "/shop#oiwai" },
  { slug: "osechi", ja: "おせち・ふせち", href: "/shop#osechi" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const cartCount = useCart((s) => s.cart.reduce((sum, c) => sum + c.qty, 0));

  // Catering and bento-delivery have their own dedicated header/footer.
  if (
    pathname?.startsWith("/catering") ||
    pathname?.startsWith("/bento-delivery")
  )
    return null;

  return (
    <>
      <SectionIndicator />
      {/* Sub-context strip — matches /catering and /bento-delivery pattern */}
      <div
        style={{
          background: "var(--section-accent-ink, var(--ink))",
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
            gap: 14,
          }}
        >
          <span style={{ opacity: 0.75 }}>
            FROZEN DELIVERY · 冷凍折詰の全国配送窓口｜ヤマト運輸クール便・中3日
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell bar">
          <Link href="/shop" className="logo">
            <div className="mark">株式会社イズミ産業</div>
            <div className="sub">冷凍折詰　全国配送窓口</div>
          </Link>
          <nav className="head-nav" aria-label="主要ナビゲーション">
            {nav.map((n) => {
              const isActive =
                n.href === "/shop"
                  ? pathname === "/shop"
                  : pathname?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={isActive ? "is-active" : ""}
                >
                  {n.ja}
                </Link>
              );
            })}
          </nav>
          <div className="head-actions">
            <Link href="/shop/cart" className="icon-btn">
              <span>御買物籠</span>
              <span className="num">[{String(cartCount).padStart(2, "0")}]</span>
            </Link>
          </div>
        </div>
        <div className="cat-strip">
          <div className="shell">
            <span className="label-ja" style={{ marginRight: 8 }}>
              品目
            </span>
            {cats.map((c, i) => (
              <span key={c.slug}>
                <Link href={c.href}>{c.ja}</Link>
                {i < cats.length - 1 && <span className="sep">·</span>}
              </span>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
