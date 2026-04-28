"use client";

import Link from "next/link";
import { SectionIndicator } from "./SectionIndicator";

export function BentoDeliveryHeader() {
  return (
    <>
      <SectionIndicator />
      {/* Sub-context strip: business-practical tone */}
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
            DELIVERY BENTO · 横浜近郊｜ご注文¥20,000より承ります
          </span>
        </div>
      </div>

      <header
        className="section-header"
        style={{
          borderBottom: "1px solid var(--rule)",
          background: "var(--bg)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div className="shell section-header-bar">
          <Link href="/bento-delivery" className="sh-logo">
            <div className="sh-mark">株式会社イズミ産業</div>
            <div className="sh-sub">
              お弁当・パーティーセットのお届け窓口
            </div>
          </Link>

          <nav className="sh-nav" aria-label="お弁当配達ナビゲーション">
            <Link href="/bento-delivery/menu">お弁当の種類</Link>
            <Link href="/bento-delivery/inquiry">お見積・ご注文</Link>
          </nav>

          <a href="tel:045-333-0163" className="sh-tel">
            <span aria-hidden>☎</span>
            <span className="sh-tel-num">045-333-0163</span>
          </a>

          <Link
            href="/bento-delivery/inquiry"
            className="btn btn-accent btn-sm sh-cta"
          >
            お見積・ご相談
          </Link>
        </div>
      </header>
    </>
  );
}
