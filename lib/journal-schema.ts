// Firestore document schema for journal posts.
//
// Collection: `journal_posts`
// Document ID: post slug (kebab-case, URL-safe)
//
// Read path: published==true posts are served via Admin SDK with ISR.
// Write path: Admin SDK only, gated by `/admin/journal` UI (Firebase Auth allowlist).

import type { Service } from "./journal";

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
 * Parse a "2026.04.27" display date string into a millis-since-epoch timestamp.
 * Used by the admin save action to keep `publishedAt` in sync with the
 * editor-facing `date` field.
 */
export function dateStringToMillis(date: string): number {
  const [y, m, d] = date.split(".").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return Date.now();
  return new Date(y, m - 1, d, 9, 0, 0).getTime();
}
