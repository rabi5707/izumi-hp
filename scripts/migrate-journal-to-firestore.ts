// One-shot migration: lib/journal.ts (hardcoded) → Firestore `journal_posts`.
//
// Usage:
//   1. Make sure .env.local has FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL /
//      FIREBASE_PRIVATE_KEY set (Admin SDK).
//   2. `npm run migrate:journal`
//
// Idempotent: each post is written with its slug as document ID, so re-running
// the script overwrites existing docs. createdAt is preserved if a doc already
// exists; updatedAt and other fields are refreshed.

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { JOURNAL_POSTS } from "../lib/journal";
import {
  dateStringToMillis,
  sectionsToMarkdown,
  type JournalPostDoc,
} from "../lib/journal-schema";

function ensureAdminApp() {
  if (getApps().length) return getApps()[0]!;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Check .env.local for FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY."
    );
  }
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

async function migrate() {
  const app = ensureAdminApp();
  const db = getFirestore(app);
  const col = db.collection("journal_posts");

  console.log(`Migrating ${JOURNAL_POSTS.length} posts to journal_posts ...`);

  for (const post of JOURNAL_POSTS) {
    const ref = col.doc(post.slug);
    const existing = await ref.get();
    const now = Date.now();

    const body = post.body ? sectionsToMarkdown(post.body) : "";
    const publishedAt = dateStringToMillis(post.date);

    const doc: JournalPostDoc = {
      slug: post.slug,
      ja: post.ja,
      en: post.en,
      lede: post.lede,
      read: post.read,
      body,
      services: post.services,
      cat: post.cat,
      tag: post.tag,
      tags: post.tags ?? [],
      publishedAt,
      date: post.date,
      published: true,
      createdAt: existing.exists
        ? (existing.data()?.createdAt ?? now)
        : now,
      updatedAt: now,
    };

    await ref.set(doc, { merge: false });
    console.log(`  ✓ ${post.slug} (${body.length} chars body, published=${doc.published})`);
  }

  console.log(`\nDone. ${JOURNAL_POSTS.length} posts written.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
