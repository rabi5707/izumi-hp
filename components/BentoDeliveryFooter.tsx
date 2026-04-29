import Link from "next/link";
import { SmartImage } from "./SmartImage";

export function BentoDeliveryFooter() {
  return (
    <footer
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        padding: "48px 0 32px",
        marginTop: 64,
      }}
    >
      <div className="shell">
        {/* Main info */}
        <div
          className="r-hero-split-wide"
          style={{
            gap: 32,
            alignItems: "flex-start",
            marginBottom: 32,
          }}
        >
          <div>
            <div
              className="kanji-h"
              style={{
                fontSize: 22,
                letterSpacing: "0.16em",
                marginBottom: 8,
              }}
            >
              株式会社イズミ産業
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--ink-mute)",
                marginBottom: 12,
                lineHeight: 1.9,
              }}
            >
              〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946
              <br />
              045-333-0163　｜　9:00 – 21:00　年中無休
              <br />
              創業　昭和49年（1974年）
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/bento-delivery/inquiry"
                className="btn btn-accent btn-sm"
              >
                お見積・ご相談
              </Link>
              <a
                href="tel:045-333-0163"
                className="btn btn-line btn-sm"
                style={{ textDecoration: "none" }}
              >
                ☎ お電話
              </a>
            </div>
          </div>

          <SmartImage
            src="/images/portal-storefront.jpg"
            alt="株式会社イズミ産業 横浜本社（外観）"
            labelEn="IMG / honsha-gaikan"
            labelJa="横浜本社 外観"
            aspect="1/1"
            style={{ width: 140 }}
          />
        </div>

        {/* Return links to other sections */}
        <div
          className="r-grid-2"
          style={{
            padding: "24px 28px",
            background: "var(--bg)",
            border: "1px solid var(--rule)",
            marginBottom: 24,
            gap: 20,
          }}
        >
          <Link
            href="/shop"
            style={{
              padding: "12px 16px",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              borderLeft: "3px solid var(--rule)",
              paddingLeft: 16,
            }}
          >
            <span
              className="label-en"
              style={{ fontSize: 10, marginBottom: 4 }}
            >
              Frozen Bento · Nationwide
            </span>
            <span
              className="kanji-h"
              style={{ fontSize: 14, letterSpacing: "0.14em" }}
            >
              冷凍折詰の通販サイトへ ›
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--ink-mute)",
                marginTop: 4,
                letterSpacing: "0.08em",
              }}
            >
              松花堂・お祝い膳・おせちを全国配送
            </span>
          </Link>
          <Link
            href="/catering"
            style={{
              padding: "12px 16px",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              borderLeft: "3px solid var(--rule)",
              paddingLeft: 16,
            }}
          >
            <span
              className="label-en"
              style={{ fontSize: 10, marginBottom: 4 }}
            >
              Full Catering · Yokohama
            </span>
            <span
              className="kanji-h"
              style={{ fontSize: 14, letterSpacing: "0.14em" }}
            >
              フルケータリング ›
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--ink-mute)",
                marginTop: 4,
                letterSpacing: "0.08em",
              }}
            >
              大皿料理・配膳込み｜20名様以上
            </span>
          </Link>
        </div>

        {/* Legal */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            paddingTop: 20,
            borderTop: "1px solid var(--rule-soft)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--ink-mute)",
          }}
        >
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Link href="/legal/tokusho">特定商取引法に基づく表記</Link>
            <Link href="/legal/privacy">プライバシーポリシー</Link>
            <Link href="/legal/terms">ご利用規約</Link>
          </div>
          <div>© 2012 IZUMI-SANGYOU CORP.</div>
        </div>
      </div>
    </footer>
  );
}
