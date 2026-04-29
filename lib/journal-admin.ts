"use server";

// Server Actions for editing journal posts. Every action calls requireAdmin()
// at the top so unauthenticated requests are rejected even if a client somehow
// invokes them directly.

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminDb, getAdminStorage } from "./firebase-admin";
import { requireAdmin } from "./admin-auth";
import { dateStringToMillis, type JournalPostDoc } from "./journal-schema";
import type { Service } from "./journal";

const COLLECTION = "journal_posts";

const VALID_SERVICES: Service[] = ["frozen", "bento", "catering", "common"];

const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

type BasePayload = Omit<JournalPostDoc, "createdAt" | "updatedAt" | "coverImage">;

function parseBaseFormPayload(form: FormData): BasePayload {
  const slug = String(form.get("slug") ?? "").trim();
  const ja = String(form.get("ja") ?? "").trim();
  const en = String(form.get("en") ?? "").trim();
  const lede = String(form.get("lede") ?? "").trim();
  const read = String(form.get("read") ?? "").trim();
  const body = String(form.get("body") ?? "");
  const cat = String(form.get("cat") ?? "").trim();
  const tag = String(form.get("tag") ?? "").trim();
  const date = String(form.get("date") ?? "").trim();
  const tagsRaw = String(form.get("tags") ?? "");
  const tags = tagsRaw
    .split(/[,、，\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const services = VALID_SERVICES.filter(
    (s) => form.get(`service_${s}`) === "on"
  );
  const published = form.get("published") === "on";

  if (!SLUG_RE.test(slug)) {
    throw new Error(
      "スラッグは半角英数字とハイフンのみ、先頭末尾は英数字でご入力ください。"
    );
  }
  if (!ja) throw new Error("日本語タイトルは必須でございます。");
  if (!lede) throw new Error("リード文は必須でございます。");
  if (services.length === 0) {
    throw new Error("サービスを少なくとも一つお選びください。");
  }
  if (!date.match(/^\d{4}\.\d{2}\.\d{2}$/)) {
    throw new Error("日付は yyyy.mm.dd の形でご入力ください（例 2026.04.29）。");
  }

  return {
    slug,
    ja,
    en,
    lede,
    read: read || "数分で読めます",
    body,
    services,
    cat: cat || "覚え書き",
    tag: tag || "コラム",
    tags,
    date,
    publishedAt: dateStringToMillis(date),
    published,
  };
}

/**
 * Upload an image to journal-covers/ and return a public Firebase Storage URL.
 * Files are tagged with a download token so the URL works without making the
 * underlying bucket object world-readable via IAM.
 */
async function uploadCoverImage(slug: string, file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(
      "カバー画像は JPEG / PNG / WebP の形式でご用意ください。"
    );
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `カバー画像は ${MAX_IMAGE_BYTES / (1024 * 1024)}MB 以下にしてください。`
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext =
    file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `journal-covers/${slug}-${Date.now()}.${ext}`;
  const token = randomUUID();
  const bucket = getAdminStorage().bucket();
  await bucket.file(path).save(buffer, {
    contentType: file.type,
    metadata: {
      metadata: { firebaseStorageDownloadTokens: token },
      cacheControl: "public, max-age=31536000, immutable",
    },
  });
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
}

/**
 * Resolve the coverImage value from the submitted form, considering:
 *   - new file uploaded → upload + return URL
 *   - "remove cover" checkbox checked → undefined
 *   - neither → keep `existing`
 */
async function resolveCoverImage(
  slug: string,
  form: FormData,
  existing?: string
): Promise<string | undefined> {
  const remove = form.get("coverRemove") === "on";
  const file = form.get("cover");
  if (file instanceof File && file.size > 0) {
    return await uploadCoverImage(slug, file);
  }
  if (remove) return undefined;
  return existing;
}

export async function createPost(form: FormData) {
  await requireAdmin();
  const base = parseBaseFormPayload(form);

  const db = getAdminDb();
  const ref = db.collection(COLLECTION).doc(base.slug);
  const existing = await ref.get();
  if (existing.exists) {
    throw new Error(
      `スラッグ「${base.slug}」は既に使われております。別の名称をお選びください。`
    );
  }

  const coverImage = await resolveCoverImage(base.slug, form);
  const now = Date.now();
  const doc: JournalPostDoc = {
    ...base,
    createdAt: now,
    updatedAt: now,
  };
  // Firestore rejects undefined; only set the field when a cover exists.
  if (coverImage) doc.coverImage = coverImage;
  await ref.set(doc);

  revalidatePath("/journal");
  revalidatePath(`/journal/${base.slug}`);
  redirect("/admin/journal");
}

export async function updatePost(originalSlug: string, form: FormData) {
  await requireAdmin();
  const base = parseBaseFormPayload(form);

  const db = getAdminDb();
  const oldRef = db.collection(COLLECTION).doc(originalSlug);
  const oldSnap = await oldRef.get();
  if (!oldSnap.exists) {
    throw new Error(`記事「${originalSlug}」が見つかりません。`);
  }

  const slugChanged = base.slug !== originalSlug;
  const newRef = slugChanged ? db.collection(COLLECTION).doc(base.slug) : oldRef;
  if (slugChanged) {
    const conflict = await newRef.get();
    if (conflict.exists) {
      throw new Error(
        `スラッグ「${base.slug}」は既に使われております。別の名称をお選びください。`
      );
    }
  }

  const old = oldSnap.data() as JournalPostDoc;
  const coverImage = await resolveCoverImage(base.slug, form, old.coverImage);
  const doc: JournalPostDoc = {
    ...base,
    createdAt: old.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  if (coverImage) doc.coverImage = coverImage;
  await newRef.set(doc);
  if (slugChanged) await oldRef.delete();

  revalidatePath("/journal");
  revalidatePath(`/journal/${base.slug}`);
  if (slugChanged) revalidatePath(`/journal/${originalSlug}`);
  redirect("/admin/journal");
}

export async function deletePost(slug: string) {
  await requireAdmin();
  const db = getAdminDb();
  await db.collection(COLLECTION).doc(slug).delete();
  revalidatePath("/journal");
  revalidatePath(`/journal/${slug}`);
  redirect("/admin/journal");
}
