import Link from "next/link";
import { SmartImage } from "./SmartImage";

export function CateringFooter() {
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 48,
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--f-heading)",
                  fontSize: 14,
                  letterSpacing: "0.1em",
                }}
              >
                泉
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--f-heading)",
                    fontSize: 20,
                    letterSpacing: "0.16em",
                    fontWeight: 500,
                  }}
                >
                  株式会社イズミ産業
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "var(--ink-mute)",
                    marginTop: 4,
                  }}
                >
                  創業昭和49年 ｜ 横浜のケータリング・仕出し
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              <a
                href="tel:045-333-0163"
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 18,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                ☎ 045-333-0163
              </a>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--ink-mute)",
                }}
              >
                9:00 - 21:00　年中無休
              </div>
            </div>

            <Link
              href="/catering/inquiry"
              className="btn btn-accent"
              style={{ marginTop: 20 }}
            >
              アドバイザーに相談する
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 20,
              alignItems: "center",
            }}
          >
            <SmartImage
              src="/images/catering/hiromi-building.jpg"
              alt="日本料理 広美"
              labelEn="IMG / hiromi"
              labelJa="日本料理 広美"
              aspect="1/1"
              style={{ width: 120 }}
            />
            <div>
              <div
                className="label-en"
                style={{ fontSize: 10, marginBottom: 4 }}
              >
                団体様向け宴会施設
              </div>
              <div
                className="kanji-h"
                style={{
                  fontSize: 20,
                  letterSpacing: "0.16em",
                  marginBottom: 10,
                }}
              >
                日本料理 広美
              </div>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: "var(--ink-soft)",
                  margin: 0,
                }}
              >
                本格的なお料理とおもてなしの空間で、多様なご会食・お集まりのご利用いただけます。
              </p>
              <a
                href="https://www.isg.co.jp/institution/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "var(--accent)",
                  marginTop: 8,
                  display: "inline-block",
                }}
              >
                詳しくはこちら ↗
              </a>
            </div>
          </div>
        </div>

        {/* Prominent back-to-shop panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 24,
            padding: "20px 24px",
            background: "var(--bg)",
            border: "1px solid var(--rule)",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              className="label-en"
              style={{ fontSize: 10, marginBottom: 4 }}
            >
              Frozen Bento · Nationwide
            </div>
            <div
              className="kanji-h"
              style={{
                fontSize: 15,
                letterSpacing: "0.14em",
                marginBottom: 4,
              }}
            >
              松花堂・お祝い膳・おせちを冷凍仕立てで全国へ
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--ink-mute)",
                letterSpacing: "0.08em",
              }}
            >
              遠方のご親族・贈答・ご法要のお席には、通販の冷凍折詰をどうぞ。
            </div>
          </div>
          <Link
            href="/shop"
            className="btn btn-line"
            style={{ whiteSpace: "nowrap" }}
          >
            冷凍折詰の通販へ ›
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            paddingTop: 24,
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
