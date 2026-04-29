// Server-only Firestore fetchers for journal posts.
//
// Used by SSR/ISR pages (app/journal/*, app/sitemap.ts). Never import from
// client components — it pulls in firebase-admin and service-account creds.

import "server-only";

import { getAdminDb } from "./firebase-admin";
import type { JournalPostDoc } from "./journal-schema";
import type { Service } from "./journal";

const COLLECTION = "journal_posts";

function docToPost(data: FirebaseFirestore.DocumentData): JournalPostDoc {
  return {
    slug: data.slug,
    ja: data.ja,
    en: data.en,
    lede: data.lede,
    read: data.read,
    body: data.body ?? "",
    services: data.services ?? [],
    cat: data.cat,
    tag: data.tag,
    tags: data.tags ?? [],
    publishedAt: data.publishedAt ?? 0,
    date: data.date,
    published: data.published === true,
    coverImage: data.coverImage,
    createdAt: data.createdAt ?? 0,
    updatedAt: data.updatedAt ?? 0,
  };
}

/** All published posts, newest first. */
export async function fetchAllPublishedPosts(): Promise<JournalPostDoc[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .where("published", "==", true)
    .orderBy("publishedAt", "desc")
    .get();
  return snap.docs.map((d) => docToPost(d.data()));
}

/** Single published post by slug, or null if missing/draft. */
export async function fetchPostBySlug(
  slug: string
): Promise<JournalPostDoc | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(slug).get();
  if (!snap.exists) return null;
  const post = docToPost(snap.data()!);
  if (!post.published) return null;
  return post;
}

/** Published posts that mention the given service. */
export async function fetchPostsByService(
  service: Service
): Promise<JournalPostDoc[]> {
  const db = getAdminDb();
  // Cannot combine array-contains + where + orderBy without a composite index.
  // Pull all published posts (small N) and filter in memory — fine while N < ~100.
  const snap = await db
    .collection(COLLECTION)
    .where("published", "==", true)
    .orderBy("publishedAt", "desc")
    .get();
  return snap.docs
    .map((d) => docToPost(d.data()))
    .filter((p) => p.services.includes(service));
}

/** All posts including drafts, newest first. ADMIN ONLY — never expose. */
export async function fetchAllPostsForAdmin(): Promise<JournalPostDoc[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .orderBy("publishedAt", "desc")
    .get();
  return snap.docs.map((d) => docToPost(d.data()));
}

/** Single post by slug regardless of publish state. ADMIN ONLY — never expose. */
export async function fetchPostBySlugForAdmin(
  slug: string
): Promise<JournalPostDoc | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(slug).get();
  if (!snap.exists) return null;
  return docToPost(snap.data()!);
}

/**
 * Posts related to the given slug, scored by overlap on:
 *   - primary service (×4) / shared service (×1) / shared cat (×2) / shared tag (×1)
 * Mirrors the legacy in-memory implementation in lib/journal.ts.
 */
export async function fetchRelatedPosts(
  slug: string,
  limit = 3
): Promise<JournalPostDoc[]> {
  const all = await fetchAllPublishedPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const primary = current.services[0];
  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (primary && p.services.includes(primary)) score += 4;
      for (const s of current.services) if (p.services.includes(s)) score += 1;
      if (p.cat === current.cat) score += 2;
      const sharedTags = current.tags.filter((t) => p.tags.includes(t)).length;
      score += sharedTags;
      return { post: p, score };
    });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
