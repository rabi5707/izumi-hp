import type { MetadataRoute } from "next";
import { fetchAllPublishedPosts } from "@/lib/journal-server";
import { PRODUCTS } from "@/lib/products";
import { AREAS } from "@/lib/areas";
import { LEGAL_INFO } from "@/lib/legal";

const BASE = LEGAL_INFO.shopUrl.replace(/\/$/, "");

// Pages that are public-facing & indexable. Cart / checkout / success /
// inquiry-thanks pages are excluded.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/bento-delivery", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bento-delivery/menu", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bento-delivery/inquiry", priority: 0.6, changeFrequency: "yearly" },
  { path: "/catering", priority: 0.9, changeFrequency: "monthly" },
  { path: "/catering/menu", priority: 0.7, changeFrequency: "monthly" },
  { path: "/catering/guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/catering/inquiry", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/journal", priority: 0.7, changeFrequency: "weekly" },
  { path: "/inquiry", priority: 0.5, changeFrequency: "yearly" },
  { path: "/legal/tokusho", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
];

const SERVICE_FILTERS: ("frozen" | "bento" | "catering" | "common")[] = [
  "frozen",
  "bento",
  "catering",
  "common",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const journalFilters: MetadataRoute.Sitemap = SERVICE_FILTERS.map((s) => ({
    url: `${BASE}/journal?service=${s}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/shop/products/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts = await fetchAllPublishedPosts();
  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/journal/${p.slug}`,
    lastModified: new Date(p.date.replaceAll(".", "-")),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const areas: MetadataRoute.Sitemap = Object.values(AREAS).map((a) => ({
    url: `${BASE}/shop/area/${a.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...staticEntries, ...journalFilters, ...products, ...articles, ...areas];
}
