// Firestore document schema for journal posts.
//
// Collection: `journal_posts`
// Document ID: post slug (kebab-case, URL-safe)
//
// Read path: published==true posts are served via Admin SDK with ISR.
// Write path: Admin SDK only, gated by `/admin/journal` UI (Firebase Auth allowlist).

import type { JournalSection, Service } from "./journal";

export type JournalPostDoc = {
  /** kebab-case slug, also the document ID. */
  slug: string;

  /** Display copy. */
  ja: string;
  en: string;
  lede: string;
  read: string;

  /** Body as Markdown. Rendered with react-markdown on the read path. */
  body: string;

  /** Taxonomy. */
  services: Service[];
  cat: string;
  tag: string;
  tags: string[];

  /** Sortable publication timestamp (millis since epoch). */
  publishedAt: number;
  /** Display string like "2026.04.27" — kept for typographic control. */
  date: string;

  /** Visibility flag. Drafts are not exposed on the public read path. */
  published: boolean;

  /** Optional cover image (Firebase Storage URL). Phase 4. */
  coverImage?: string;

  /** Bookkeeping. */
  createdAt: number;
  updatedAt: number;
};

/**
 * Convert the legacy JSON section blocks (lib/journal.ts) into Markdown.
 * Used by the one-off migration script and as a reference for any future
 * import from the same shape.
 */
export function sectionsToMarkdown(sections: JournalSection[]): string {
  return sections
    .map((s) => {
      switch (s.type) {
        case "h2":
          return `## ${s.text}`;
        case "p":
          return s.text;
        case "ul":
          return s.items.map((it) => `- ${it}`).join("\n");
        case "quote":
          return `> ${s.text}`;
      }
    })
    .join("\n\n");
}

/**
 * Parse a "2026.04.27" date string into a millis-since-epoch timestamp.
 * Used during migration to seed publishedAt from the existing display date.
 */
export function dateStringToMillis(date: string): number {
  const [y, m, d] = date.split(".").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return Date.now();
  return new Date(y, m - 1, d, 9, 0, 0).getTime();
}
