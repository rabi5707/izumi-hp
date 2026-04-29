import Link from "next/link";
import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import { CateringIcon } from "@/components/CateringIcons";
import { SectionIndicator } from "@/components/SectionIndicator";
import {
  SERVICES,
  REASONS,
  VOICES,
  COMPANY_INFO,
} from "@/lib/portal";
import { localBusinessLd, breadcrumbLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "株式会社イズミ産業　｜　冷凍折詰・お届け弁当・ケータリング",
  description:
    "昭和四十九年創業、横浜・保土ヶ谷の老舗仕出し屋。冷凍折詰の全国配送・横浜近郊へのお届け弁当・フルケータリングの三つのサービスで、お席に応じたかたちでお届けします。",
};

export default function Portal() {
  return (
    <>
      <SectionIndicator />
      <main data-section="portal" style={{ background: "var(--bg)" }}>
        <script {...jsonLdScript(localBusinessLd)} />
        <script
          {...jsonLdScript(
            breadcrumbLd([{ name: "ホーム", path: "/" }])
          )}
        />
      {/* Cinematic full-bleed hero */}
      <section
        style={{
          position: "relative",
          minHeight: 720,
          background: "var(--ink)",
          color: "var(--bg)",
          overflow: "hidden",
        }}
      >
        {/* Background image fills the whole section */}
        <SmartImage
          src="/images/portal-hero.png"
          alt="よき日のお席 — 株式会社イズミ産業"
          labelEn="HERO / portal"
          labelJa="よき日のお席"
          aspect="fill"
          priority
        />

        {/* Gradient overlay for text legibility */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content overlay */}
        <div
          className="shell"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 720,
            padding: "72px 40px 96px",
          }}
        >
          <div style={{ zIndex: 1 }}>
            {/* Logo + kamon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 40,
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "1px solid rgba(184,146,76,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b8924c",
                  fontFamily: "var(--f-heading)",
                  fontSize: 18,
                  letterSpacing: "0.1em",
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(4px)",
                }}
              >
                泉
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--f-heading)",
                    fontSize: 24,
                    letterSpacing: "0.16em",
                    fontWeight: 500,
                  }}
                >
                  株式会社イズミ産業
                </div>
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    letterSpacing: "0.24em",
                    opacity: 0.65,
                    marginTop: 4,
                  }}
                >
                  創業　昭和四十九年(1974年)
                </div>
              </div>
            </div>

            <h1
              className="kanji-display"
              style={{
                fontSize: 64,
                lineHeight: 1.3,
                margin: "0 0 28px",
                letterSpacing: "0.06em",
                textShadow: "0 2px 24px rgba(0,0,0,0.45)",
                maxWidth: 700,
              }}
            >
              よき日のお席を、
              <br />
              心を込めて。
            </h1>
            <p
              style={{
                fontSize: 16,
                lineHeight: 2,
                opacity: 0.92,
                margin: "0 0 48px",
                letterSpacing: "0.05em",
                textShadow: "0 1px 12px rgba(0,0,0,0.5)",
              }}
            >
              お席に応じて、三つのかたちでお届けします。
            </p>

            {/* Service shortcuts */}
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    color: "var(--bg)",
                    textDecoration: "none",
                    padding: "10px 16px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(0,0,0,0.32)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      width: 38,
                      height: 38,
                      background: "rgba(184,146,76,0.16)",
                      border: "1px solid rgba(184,146,76,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#b8924c",
                    }}
                  >
                    <CateringIcon
                      name={
                        s.slug === "shop"
                          ? "box"
                          : s.slug === "bento-delivery"
                            ? "van"
                            : "glasses"
                      }
                      size={22}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        opacity: 0.65,
                        fontFamily: "var(--f-mono)",
                      }}
                    >
                      {s.targetJa}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-heading)",
                        fontSize: 13,
                        letterSpacing: "0.1em",
                        marginTop: 2,
                      }}
                    >
                      {s.ja.replace(/・.*/, "")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            color: "rgba(255,255,255,0.78)",
            fontSize: 10,
            letterSpacing: "0.22em",
            fontFamily: "var(--f-mono)",
            zIndex: 2,
          }}
        >
          <span>サービスを見る</span>
          <span>▽</span>
        </div>
      </section>

      {/* Brand story */}
      <section
        className="shell"
        style={{
          padding: "80px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <h2
            className="kanji-display"
            style={{
              fontSize: 30,
              lineHeight: 1.5,
              margin: "0 0 28px",
              letterSpacing: "0.08em",
            }}
          >
            昭和四十九年より、
            <br />
            横浜・保土ヶ谷の地にて
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 2.1,
              color: "var(--ink-soft)",
              margin: 0,
            }}
          >
            株式会社イズミ産業は、昭和四十九年の創業以来、冠婚葬祭料理のケータリング・仕出しを半世紀にわたり承って参りました。
            <br />
            熟練の板前が一品一品に心を尽くし、用途やご人数に応じた最適なおもてなしのかたちをご提案いたします。
            <br />
            日本料理の伝統を大切に、時代に寄り添いながら、これからも皆様の大切なお席を支えて参ります。
          </p>
        </div>
        <SmartImage
          src="/images/portal-storefront.jpg"
          alt="株式会社イズミ産業 店舗"
          labelEn="IMG / storefront"
          labelJa="店舗外観"
          aspect="4/3"
        />
      </section>

      {/* Three services ★main */}
      <section
        style={{
          padding: "24px 0 72px",
          background: "var(--bg)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="shell" style={{ padding: "48px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              className="kanji-display"
              style={{
                fontSize: 28,
                margin: "0 0 10px",
                letterSpacing: "0.2em",
              }}
            >
              三つのお届けのかたち
            </h2>
            <div
              className="label-en"
              style={{
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "var(--ink-mute)",
              }}
            >
              Three Services
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--rule)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative" }}>
                  <SmartImage
                    src={s.image}
                    alt={s.ja}
                    labelEn={s.en}
                    labelJa={s.ja}
                    aspect="16/9"
                    objectPosition={s.imageObjectPosition}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 14,
                      fontFamily: "var(--f-mono)",
                      fontSize: 20,
                      letterSpacing: "0.1em",
                      color: "#fff",
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {s.num}
                  </div>
                  {s.comingSoon && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(0,0,0,0.78)",
                        color: "#fff",
                        padding: "6px 12px",
                        fontFamily: "var(--f-heading)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        border: "1px solid rgba(184,146,76,0.6)",
                      }}
                    >
                      近日公開
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: "24px 24px 20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="label-en"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.24em",
                      color: s.accentColor,
                      marginBottom: 8,
                    }}
                  >
                    {s.en}
                  </div>
                  <h3
                    className="kanji-h"
                    style={{
                      fontSize: 19,
                      letterSpacing: "0.12em",
                      margin: "0 0 4px",
                    }}
                  >
                    {s.ja}
                  </h3>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--ink-mute)",
                      letterSpacing: "0.1em",
                      marginBottom: 18,
                    }}
                  >
                    {s.targetJa}
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px",
                      flex: 1,
                    }}
                  >
                    {s.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                          fontSize: 12,
                          lineHeight: 1.8,
                          color: "var(--ink-soft)",
                          padding: "4px 0",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            color: s.accentColor,
                            fontWeight: "bold",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      padding: "12px 14px",
                      background: "var(--bg)",
                      marginBottom: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          color: "var(--ink-mute)",
                          marginBottom: 4,
                        }}
                      >
                        {s.priceLabel}
                      </div>
                      <div
                        className="price-num"
                        style={{
                          fontSize: 14,
                          letterSpacing: "0.04em",
                          whiteSpace: "pre-line",
                          lineHeight: 1.4,
                        }}
                      >
                        {s.priceValue}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          color: "var(--ink-mute)",
                          marginBottom: 4,
                        }}
                      >
                        {s.minLabel}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          letterSpacing: "0.04em",
                          whiteSpace: "pre-line",
                          lineHeight: 1.4,
                        }}
                      >
                        {s.minValue}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={s.href}
                    style={{
                      display: "block",
                      padding: "14px 18px",
                      background: s.comingSoon ? "var(--ink-mute)" : s.ctaBg,
                      color: "#fff",
                      textAlign: "center",
                      textDecoration: "none",
                      fontFamily: "var(--f-heading)",
                      fontSize: 13,
                      letterSpacing: "0.16em",
                    }}
                  >
                    {s.comingSoon
                      ? "近日公開のお知らせ ›"
                      : `${s.ja.replace(/・.*$/, "")}を見る ›`}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section
        className="shell"
        style={{
          padding: "72px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            className="kanji-display"
            style={{
              fontSize: 26,
              margin: 0,
              letterSpacing: "0.2em",
            }}
          >
            イズミ産業が選ばれる理由
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {REASONS.map((r) => (
            <div
              key={r.icon}
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#b8924c",
                  marginBottom: 14,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CateringIcon name={r.icon} size={44} />
              </div>
              <h3
                className="kanji-h"
                style={{
                  fontSize: 15,
                  letterSpacing: "0.14em",
                  margin: "0 0 10px",
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.9,
                  color: "var(--ink-soft)",
                  margin: 0,
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Voices */}
      <section
        style={{
          background: "var(--paper)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "64px 0",
        }}
      >
        <div className="shell" style={{ padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2
              className="kanji-display"
              style={{
                fontSize: 24,
                margin: 0,
                letterSpacing: "0.2em",
              }}
            >
              お客様の声
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {VOICES.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  padding: "22px 22px 18px",
                  border: "1px solid var(--rule-soft)",
                  position: "relative",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--f-heading)",
                    fontSize: 24,
                    color: "var(--accent)",
                    lineHeight: 1,
                    display: "inline-block",
                    marginBottom: 8,
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.9,
                    color: "var(--ink-soft)",
                    margin: "0 0 14px",
                  }}
                >
                  {v.quote}
                </p>
                <div
                  style={{
                    paddingTop: 12,
                    borderTop: "1px solid var(--rule-soft)",
                    fontSize: 11,
                    color: "var(--ink-mute)",
                    letterSpacing: "0.1em",
                  }}
                >
                  <b style={{ color: "var(--ink)" }}>{v.by}</b>
                  <br />
                  {v.kind}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "right",
              fontSize: 10,
              color: "var(--ink-mute)",
              letterSpacing: "0.1em",
              marginTop: 16,
            }}
          >
            ※ 個人の感想です
          </p>
        </div>
      </section>

      {/* Company info */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--bg)",
          padding: "64px 0",
        }}
      >
        <div
          className="shell"
          style={{
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              className="kanji-display"
              style={{
                fontSize: 22,
                margin: "0 0 28px",
                letterSpacing: "0.2em",
              }}
            >
              会 社 概 要
            </h2>
            <table
              style={{
                borderCollapse: "collapse",
                fontSize: 13,
                lineHeight: 1.9,
                width: "100%",
              }}
            >
              <tbody>
                {COMPANY_INFO.map((c) => (
                  <tr
                    key={c.label}
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <th
                      style={{
                        width: 100,
                        padding: "12px 0",
                        textAlign: "left",
                        fontFamily: "var(--f-heading)",
                        fontWeight: 400,
                        letterSpacing: "0.16em",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {c.label}
                    </th>
                    <td style={{ padding: "12px 0" }}>{c.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                marginTop: 32,
                padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 6,
                  }}
                >
                  本社コーポレートサイト
                </div>
                <a
                  href="https://www.isg.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 16,
                    color: "var(--bg)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  https://www.isg.co.jp/ ↗
                </a>
              </div>
              <Link
                href="/about"
                className="btn btn-line"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  color: "var(--bg)",
                  whiteSpace: "nowrap",
                }}
              >
                会社案内の詳細へ
              </Link>
            </div>
          </div>

          <SmartImage
            src="/images/portal-hiromi.jpg"
            alt="日本料理 広美 — 宴会場"
            labelEn="IMG / hiromi"
            labelJa="日本料理 広美"
            aspect="4/5"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          padding: "48px 0",
          background: "var(--bg)",
        }}
      >
        <div className="shell" style={{ padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h3
              className="kanji-h"
              style={{
                fontSize: 18,
                letterSpacing: "0.16em",
                margin: 0,
              }}
            >
              お席に応じて、最適なかたちをお選びください。
            </h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                style={{
                  padding: "16px 20px",
                  background: s.comingSoon ? "var(--ink-mute)" : s.ctaBg,
                  color: "#fff",
                  textAlign: "center",
                  textDecoration: "none",
                  fontFamily: "var(--f-heading)",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <CateringIcon
                  name={
                    s.slug === "shop"
                      ? "box"
                      : s.slug === "bento-delivery"
                        ? "van"
                        : "glasses"
                  }
                  size={18}
                />
                {s.comingSoon ? `${s.ja} 近日公開 ›` : `${s.ja}を見る ›`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "24px 0",
          background: "var(--bg-alt)",
          fontSize: 11,
          color: "var(--ink-mute)",
          letterSpacing: "0.14em",
          textAlign: "center",
        }}
      >
        <div className="shell" style={{ padding: "0 40px" }}>
          © IZUMI SANGYO Co., Ltd.
        </div>
      </footer>
      </main>
    </>
  );
}
