import Link from "next/link";
import type { Metadata } from "next";
import { breadcrumbLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "冷凍折詰　全国配送　近日公開　｜　株式会社イズミ産業",
  description:
    "松花堂・お祝い膳・おせちなどの冷凍折詰の全国配送窓口は、ただいま開設準備中です。横浜近郊のお届け弁当・フルケータリングは現在ご利用いただけます。",
  robots: { index: false, follow: true },
};

export default function ShopComingSoon() {
  return (
    <>
      <script
        {...jsonLdScript(
          breadcrumbLd([
            { name: "ホーム", path: "/" },
            { name: "冷凍折詰　近日公開", path: "/shop" },
          ])
        )}
      />
      <section
        style={{
          minHeight: "calc(100vh - 56px)",
          padding: "96px 24px 120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <div
          className="shell"
          style={{
            maxWidth: 720,
            textAlign: "center",
          }}
        >
          <div
            className="label-en"
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              color: "var(--section-accent, var(--ink))",
              marginBottom: 18,
            }}
          >
            COMING SOON · FROZEN BENTO MAIL ORDER
          </div>
          <h1
            className="kanji-h"
            style={{
              fontSize: "clamp(28px, 4.4vw, 44px)",
              letterSpacing: "0.18em",
              lineHeight: 1.5,
              margin: "0 0 32px",
            }}
          >
            冷凍折詰　全国配送
            <br />
            近日公開
          </h1>
          <div
            aria-hidden
            style={{
              width: 56,
              height: 1,
              background: "var(--rule)",
              margin: "0 auto 32px",
            }}
          />
          <p
            style={{
              fontSize: 15,
              lineHeight: 2,
              color: "var(--ink-soft)",
              margin: "0 0 16px",
            }}
          >
            松花堂・お祝い膳・おせち・ふせちなどの冷凍折詰を、
            <br />
            ヤマト運輸クール便にて全国へお届けする窓口を、
            <br />
            ただいま開設準備中でございます。
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 2,
              color: "var(--ink-mute)",
              margin: "0 0 48px",
            }}
          >
            開設までいましばらくお待ちくださいませ。
            <br />
            お急ぎのご注文・ご相談は、お電話にて承ります。
          </p>

          <div
            style={{
              display: "inline-block",
              padding: "20px 32px",
              background: "var(--paper)",
              border: "1px solid var(--rule)",
              marginBottom: 48,
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.24em",
                color: "var(--ink-mute)",
                marginBottom: 8,
              }}
            >
              お電話でのご注文・ご相談
            </div>
            <a
              href="tel:045-333-0163"
              className="price-num"
              style={{
                fontSize: 26,
                letterSpacing: "0.04em",
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              045-333-0163
            </a>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--ink-mute)",
                marginTop: 6,
              }}
            >
              横浜本店　9:00 – 21:00　年中無休
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--rule)",
              paddingTop: 40,
            }}
          >
            <div
              className="label-en"
              style={{
                fontSize: 10,
                letterSpacing: "0.28em",
                color: "var(--ink-mute)",
                marginBottom: 16,
              }}
            >
              OTHER SERVICES · 他のご案内
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Link
                href="/bento-delivery"
                style={{
                  padding: "12px 20px",
                  border: "1px solid var(--rule)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  fontFamily: "var(--f-heading)",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                }}
              >
                お届け弁当 ›
              </Link>
              <Link
                href="/catering"
                style={{
                  padding: "12px 20px",
                  border: "1px solid var(--rule)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  fontFamily: "var(--f-heading)",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                }}
              >
                フルケータリング ›
              </Link>
              <Link
                href="/"
                style={{
                  padding: "12px 20px",
                  border: "1px solid var(--rule)",
                  background: "transparent",
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  fontFamily: "var(--f-heading)",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                }}
              >
                ホームへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
