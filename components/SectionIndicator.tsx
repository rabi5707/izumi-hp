"use client";

// Persistent cross-section navigation strip.
// Appears in all three section headers so visitors always know
// which branch they're on and can hop between them.

import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionId = "portal" | "shop" | "bento-delivery" | "catering";

const ENTRIES: {
  id: SectionId;
  href: string;
  ja: string;
  jaShort: string;
  en: string;
  enShort: string;
  tag: string;
  comingSoon?: boolean;
}[] = [
  {
    id: "portal",
    href: "/",
    ja: "ホーム",
    jaShort: "ホーム",
    en: "HOME · PORTAL",
    enShort: "HOME",
    tag: "",
  },
  {
    id: "shop",
    href: "/shop",
    ja: "冷凍折詰 通販",
    jaShort: "冷凍折詰",
    en: "FROZEN · NATIONWIDE",
    enShort: "FROZEN",
    tag: "全国配送",
    comingSoon: true,
  },
  {
    id: "bento-delivery",
    href: "/bento-delivery",
    ja: "お届け弁当",
    jaShort: "お届け弁当",
    en: "DELIVERY BENTO · YOKOHAMA",
    enShort: "BENTO",
    tag: "10個〜",
  },
  {
    id: "catering",
    href: "/catering",
    ja: "フルケータリング",
    jaShort: "ケータリング",
    en: "FULL CATERING · YOKOHAMA",
    enShort: "CATERING",
    tag: "20名〜",
  },
];

// Brand-level links — apply to all sections (about, journal). Rendered on the
// right side of the indicator, visually separated from the service-switcher.
const BRAND_LINKS: { href: string; ja: string; en: string; matchPrefix: string }[] = [
  { href: "/journal", ja: "読み物", en: "JOURNAL", matchPrefix: "/journal" },
  { href: "/about", ja: "会社案内", en: "ABOUT", matchPrefix: "/about" },
];

function detectSection(pathname: string | null): SectionId {
  if (!pathname) return "portal";
  if (pathname.startsWith("/catering")) return "catering";
  if (pathname.startsWith("/bento-delivery")) return "bento-delivery";
  if (pathname.startsWith("/shop")) return "shop";
  return "portal";
}

export function SectionIndicator() {
  const pathname = usePathname();
  const current = detectSection(pathname);

  return (
    <nav className="section-indicator" aria-label="サービスの切替">
      <div className="si-services">
        {ENTRIES.map((e) => (
          <Link
            key={e.id}
            href={e.href}
            className={current === e.id ? "is-here" : ""}
          >
            <span className="si-ja-full">{e.ja}</span>
            <span className="si-ja-short">{e.jaShort}</span>
            <span className="si-en si-en-full">{e.en}</span>
            <span className="si-en si-en-short">{e.enShort}</span>
            {e.comingSoon && <span className="si-soon">近日</span>}
          </Link>
        ))}
      </div>
      <div className="si-brand">
        {BRAND_LINKS.map((b) => {
          const isActive = pathname?.startsWith(b.matchPrefix) ?? false;
          return (
            <Link
              key={b.href}
              href={b.href}
              className={isActive ? "is-here" : ""}
            >
              {b.ja}
              <span className="si-en">{b.en}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
