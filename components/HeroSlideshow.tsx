"use client";

// HeroSlideshow — lightweight crossfade slideshow for hero slots.
//
// Usage:
//   <HeroSlideshow slides={[{ src, alt, labelEn, labelJa }, ...]} />
//
// - Auto-advances every `intervalMs` (default 5s)
// - 1.2s crossfade between slides
// - Respects `prefers-reduced-motion` (pauses auto-advance)
// - User can click dots to switch manually
// - First slide gets `priority` for LCP, others lazy
// - Falls back to plain SmartImage if only one slide given

import { useState, useEffect } from "react";
import { SmartImage } from "./SmartImage";

export type HeroSlide = {
  src: string;
  alt: string;
  labelEn?: string;
  labelJa?: string;
  /** Shift the image horizontally. Default "center". */
  objectPosition?: string;
};

type Props = {
  slides: HeroSlide[];
  /** ms between slide changes. Default 5000. */
  intervalMs?: number;
  /** Extra styles for the wrapper */
  style?: React.CSSProperties;
};

export function HeroSlideshow({
  slides,
  intervalMs = 5000,
  style,
}: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    // Respect accessibility preference to reduce motion.
    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (mq?.matches) return;

    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, slides.length]);

  if (slides.length === 0) return null;
  if (slides.length === 1) {
    const s = slides[0]!;
    return (
      <SmartImage
        src={s.src}
        alt={s.alt}
        labelEn={s.labelEn}
        labelJa={s.labelJa}
        objectPosition={s.objectPosition}
        aspect="fill"
        priority
        style={style}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "inherit",
        overflow: "hidden",
        ...style,
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: active === i ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
            pointerEvents: active === i ? "auto" : "none",
          }}
          aria-hidden={active === i ? undefined : true}
        >
          <SmartImage
            src={s.src}
            alt={s.alt}
            labelEn={s.labelEn}
            labelJa={s.labelJa}
            objectPosition={s.objectPosition}
            aspect="fill"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dots — manual control */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 3,
          padding: "6px 12px",
          background: "rgba(0,0,0,0.35)",
          borderRadius: 999,
          backdropFilter: "blur(6px)",
        }}
        role="tablist"
        aria-label="ヒーロー画像の切り替え"
      >
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`スライド ${i + 1}`}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? 24 : 8,
              height: 8,
              borderRadius: 999,
              background:
                active === i ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 240ms ease, background 240ms ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
