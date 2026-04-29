"use server";

// Server Actions for editing journal posts. Every action calls requireAdmin()
// at the top so unauthenticated requests are rejected even if a client somehow
// invokes them directly.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminDb } from "./firebase-admin";
import { requireAdmin } from "./admin-auth";
import { dateStringToMillis, type JournalPostDoc } from "./journal-schema";
import type { Service } from "./journal";

const COLLECTION = "journal_posts";

const VALID_SERVICES: Service[] = ["frozen", "bento", "catering", "common"];

const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

function parseFormPayload(form: FormData): Omit<JournalPostDoc, "createdAt" | "updatedAt"> {
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

export async function createPost(form: FormData) {
  await requireAdmin();
  const data = parseFormPayload(form);

  const db = getAdminDb();
  const ref = db.collection(COLLECTION).doc(data.slug);
  const existing = await ref.get();
  if (existing.exists) {
    throw new Error(
      `スラッグ「${data.slug}」は既に使われております。別の名称をお選びください。`
    );
  }

  const now = Date.now();
  const doc: JournalPostDoc = { ...data, createdAt: now, updatedAt: now };
  await ref.set(doc);

  revalidatePath("/journal");
  revalidatePath(`/journal/${data.slug}`);
  redirect("/admin/journal");
}

export async function updatePost(originalSlug: string, form: FormData) {
  await requireAdmin();
  const data = parseFormPayload(form);

  const db = getAdminDb();
  const oldRef = db.collection(COLLECTION).doc(originalSlug);
  const oldSnap = await oldRef.get();
  if (!oldSnap.exists) {
    throw new Error(`記事「${originalSlug}」が見つかりません。`);
  }

  const slugChanged = data.slug !== originalSlug;
  const newRef = slugChanged ? db.collection(COLLECTION).doc(data.slug) : oldRef;
  if (slugChanged) {
    const conflict = await newRef.get();
    if (conflict.exists) {
      throw new Error(
        `スラッグ「${data.slug}」は既に使われております。別の名称をお選びください。`
      );
    }
  }

  const old = oldSnap.data() as JournalPostDoc;
  const doc: JournalPostDoc = {
    ...data,
    createdAt: old.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  await newRef.set(doc);
  if (slugChanged) await oldRef.delete();

  revalidatePath("/journal");
  revalidatePath(`/journal/${data.slug}`);
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
