// DeliveryMap — a lightweight SVG illustration showing the two concentric
// delivery zones around the 保土ヶ谷本社 pin.
//
// It is NOT a geographically accurate map — the goal is to give the reader
// an intuitive sense of "this area / further / nationwide" without any
// external API dependency (no Google Maps, no tiles, no cost).
//
// Styles inherit from the palette CSS variables so it re-colors with the
// tweaks in layout.tsx automatically.

type Variant = "main" | "extended" | "frozen" | "overview";

type Props = {
  variant?: Variant;
  className?: string;
};

export function DeliveryMap({ variant = "overview", className }: Props) {
  const mainHighlight = variant === "main" || variant === "overview";
  const extendedHighlight =
    variant === "extended" || variant === "overview";
  const frozenHighlight = variant === "frozen";

  return (
    <div
      className={className}
      style={{
        width: "100%",
        aspectRatio: "4/3",
        padding: 20,
        background: "var(--paper)",
        border: "1px solid var(--rule)",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        role="img"
        aria-label="保土ヶ谷本社を中心とした配達エリアの概念図"
      >
        <defs>
          <pattern
            id="zen-grid"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="var(--rule-soft)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Background — soft grid for a technical / blueprint feel */}
        <rect
          x="0"
          y="0"
          width="400"
          height="300"
          fill="url(#zen-grid)"
        />

        {/* Loose landmass suggestion — not real geography, just a sense of coastline to the east */}
        <path
          d="M 0 80 Q 60 70 120 90 Q 180 100 230 90 Q 280 80 320 100 Q 360 130 350 180 Q 330 230 280 240 Q 220 250 160 240 Q 100 230 50 210 Q 10 180 0 140 Z"
          fill="var(--bg-alt)"
          stroke="var(--rule)"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Extended zone — outer circle (¥50,000〜) */}
        <circle
          cx="170"
          cy="170"
          r="100"
          fill={
            extendedHighlight ? "var(--accent-soft)" : "transparent"
          }
          stroke="var(--accent)"
          strokeWidth={extendedHighlight ? "1.5" : "1"}
          strokeDasharray="4 4"
          opacity={extendedHighlight ? "1" : "0.4"}
        />
        {extendedHighlight && (
          <text
            x="170"
            y="90"
            textAnchor="middle"
            fontFamily="var(--f-mono)"
            fontSize="10"
            letterSpacing="2"
            fill="var(--accent)"
          >
            EXTENDED · ¥50,000〜
          </text>
        )}

        {/* Main zone — inner circle (¥30,000〜) */}
        <circle
          cx="170"
          cy="170"
          r="55"
          fill={mainHighlight ? "var(--accent-soft)" : "transparent"}
          stroke="var(--accent)"
          strokeWidth={mainHighlight ? "2" : "1"}
          opacity={mainHighlight ? "1" : "0.5"}
        />
        {mainHighlight && (
          <text
            x="170"
            y="130"
            textAnchor="middle"
            fontFamily="var(--f-mono)"
            fontSize="10"
            letterSpacing="2"
            fill="var(--accent)"
          >
            MAIN · ¥30,000〜
          </text>
        )}

        {/* Frozen zone — "beyond" indicator shown when frozen variant */}
        {frozenHighlight && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const r = 130;
              const x = 170 + Math.cos(angle) * r;
              const y = 170 + Math.sin(angle) * r;
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fontSize="10"
                  fill="var(--accent)"
                  textAnchor="middle"
                  fontFamily="var(--f-heading)"
                  letterSpacing="1"
                >
                  冷
                </text>
              );
            })}
          </>
        )}

        {/* Pin — 保土ヶ谷本社 */}
        <circle cx="170" cy="170" r="6" fill="var(--accent)" />
        <circle
          cx="170"
          cy="170"
          r="10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="170"
          y1="170"
          x2="170"
          y2="200"
          stroke="var(--ink)"
          strokeWidth="0.5"
        />
        <text
          x="170"
          y="215"
          textAnchor="middle"
          fontFamily="var(--f-heading)"
          fontSize="11"
          letterSpacing="2"
          fill="var(--ink)"
        >
          横浜本社
        </text>
        <text
          x="170"
          y="228"
          textAnchor="middle"
          fontFamily="var(--f-mono)"
          fontSize="8"
          letterSpacing="1"
          fill="var(--ink-mute)"
        >
          保土ヶ谷区仏向町
        </text>

        {/* Reference labels — sample city markers to anchor the viewer's mental model */}
        <g opacity="0.7">
          <circle cx="195" cy="150" r="1.5" fill="var(--ink-mute)" />
          <text
            x="200"
            y="153"
            fontSize="8"
            fill="var(--ink-mute)"
            fontFamily="var(--f-heading)"
            letterSpacing="1"
          >
            川崎
          </text>

          <circle cx="150" cy="145" r="1.5" fill="var(--ink-mute)" />
          <text
            x="128"
            y="142"
            fontSize="8"
            fill="var(--ink-mute)"
            fontFamily="var(--f-heading)"
            letterSpacing="1"
          >
            戸塚
          </text>

          <circle cx="220" cy="130" r="1.5" fill="var(--ink-mute)" />
          <text
            x="225"
            y="128"
            fontSize="8"
            fill="var(--ink-mute)"
            fontFamily="var(--f-heading)"
            letterSpacing="1"
          >
            都心
          </text>

          <circle cx="115" cy="120" r="1.5" fill="var(--ink-mute)" />
          <text
            x="78"
            y="118"
            fontSize="8"
            fill="var(--ink-mute)"
            fontFamily="var(--f-heading)"
            letterSpacing="1"
          >
            町田
          </text>

          <circle cx="90" cy="195" r="1.5" fill="var(--ink-mute)" />
          <text
            x="50"
            y="198"
            fontSize="8"
            fill="var(--ink-mute)"
            fontFamily="var(--f-heading)"
            letterSpacing="1"
          >
            相模原
          </text>

          <circle cx="250" cy="205" r="1.5" fill="var(--ink-mute)" />
          <text
            x="255"
            y="208"
            fontSize="8"
            fill="var(--ink-mute)"
            fontFamily="var(--f-heading)"
            letterSpacing="1"
          >
            鎌倉
          </text>
        </g>

        {/* Scale note */}
        <text
          x="392"
          y="292"
          textAnchor="end"
          fontSize="7"
          fill="var(--ink-faint)"
          fontFamily="var(--f-mono)"
          letterSpacing="1"
        >
          ※ 概念図・実際の距離とは異なります
        </text>
      </svg>
    </div>
  );
}
