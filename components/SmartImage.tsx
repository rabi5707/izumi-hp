// SmartImage — drop-in image component that falls back to the existing
// striped placeholder when the actual file is missing.
//
// Usage:
//   <SmartImage src="/images/products/shokado-tsuru.jpg"
//               alt="松花堂 鶴" labelEn="SHOKADO TSURU" labelJa="松花堂 鶴" />
//
// If the file at `src` exists in /public, it renders a next/image.
// Otherwise (e.g. before AI generation is run), it renders the existing
// placeholder markup so the site looks identical to today.
//
// Detection: we rely on onError of the underlying <img> to swap in the
// placeholder at runtime. This avoids any build-time file-system checks.

"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Placeholder upper-left tag (e.g. `IMG / shokado-tsuru`) */
  labelEn?: string;
  /** Placeholder centered label (e.g. 商品名) */
  labelJa?: string;
  /**
   * Aspect ratio for the box. Default "4/3".
   * Pass `"fill"` to let the parent's size control the image instead
   * (useful for CSS-grid cells with their own min-height).
   */
  aspect?: string;
  /** Whether to include the ph class for the fallback. Default true. */
  className?: string;
  /** Pass-through for next/image */
  priority?: boolean;
  /** Inline styles */
  style?: React.CSSProperties;
  /** `object-position` for the image. Default `"center"`. */
  objectPosition?: string;
};

export function SmartImage({
  src,
  alt,
  labelEn,
  labelJa,
  aspect = "4/3",
  className = "",
  priority = false,
  style,
  objectPosition = "center",
}: Props) {
  const [failed, setFailed] = useState(false);

  // `aspect="fill"` means "let the parent size control me" — used for hero slots.
  // We use absolute positioning so the wrapper fills its (position:relative)
  // parent reliably, even when the parent only has `min-height` (which doesn't
  // resolve % heights on its children).
  const sizingStyle: React.CSSProperties =
    aspect === "fill"
      ? { position: "absolute", inset: 0 }
      : { aspectRatio: aspect, position: "relative" };

  if (failed) {
    return (
      <div
        className={"ph " + className}
        style={{
          ...sizingStyle,
          background:
            "repeating-linear-gradient(135deg, var(--rule-soft) 0 1px, transparent 1px 14px), var(--bg-alt)",
          ...style,
        }}
      >
        {labelEn && <div className="ph-label">{labelEn}</div>}
        {labelJa && <div className="ph-center">{labelJa}</div>}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        ...sizingStyle,
        overflow: "hidden",
        background: "var(--bg-alt)",
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        // Generous sizes hint so Next.js serves a high-enough resolution
        // for hero slots (which can be 700px+ on retina = 1400px actual).
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
        quality={90}
        style={{ objectFit: "cover", objectPosition }}
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
