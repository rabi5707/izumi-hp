"use server";

// Server Actions for editing shop products. Mirrors lib/journal-admin.ts.
// Every action calls requireAdmin() at the top so unauthenticated callers
// are rejected even if they invoke the action directly.

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminDb, getAdminStorage } from "./firebase-admin";
import { requireAdmin } from "./admin-auth";
import type { ProductDoc } from "./products-schema";
import type { CategoryId } from "./products";

const COLLECTION = "products";

const VALID_CATEGORIES: CategoryId[] = ["shokado", "oiwai", "osechi"];
const ID_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

type BasePayload = Omit<ProductDoc, "createdAt" | "updatedAt" | "image">;

function parseBaseFormPayload(form: FormData): BasePayload {
  const id = String(form.get("id") ?? "").trim();
  const cat = String(form.get("cat") ?? "").trim() as CategoryId;
  const ja = String(form.get("ja") ?? "").trim();
  const en = String(form.get("en") ?? "").trim();
  const desc = String(form.get("desc") ?? "").trim();
  const priceRaw = String(form.get("price") ?? "").trim();
  const serves = String(form.get("serves") ?? "").trim();
  const tag = String(form.get("tag") ?? "").trim();
  const lead = String(form.get("lead") ?? "").trim();
  const area = String(form.get("area") ?? "").trim();
  const sortOrderRaw = String(form.get("sortOrder") ?? "").trim();
  const freeze = form.get("freeze") !== "off";
  const published = form.get("published") === "on";

  if (!ID_RE.test(id)) {
    throw new Error(
      "商品IDは半角英数字とハイフンのみ、先頭末尾は英数字でご入力ください。"
    );
  }
  if (!VALID_CATEGORIES.includes(cat)) {
    throw new Error("カテゴリをお選びください。");
  }
  if (!ja) throw new Error("日本語商品名は必須でございます。");
  const price = parseInt(priceRaw, 10);
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("価格は 0 以上の整数でご入力ください。");
  }
  const sortOrder = parseInt(sortOrderRaw, 10);
  if (!Number.isFinite(sortOrder)) {
    throw new Error("並び順は整数でご入力ください。");
  }

  return {
    id,
    cat,
    ja,
    en,
    desc,
    price,
    serves: serves || "一人前",
    tag,
    freeze,
    lead: lead || "中3日 (冷凍)",
    area: area || "全国配送",
    sortOrder,
    published,
  };
}

async function uploadProductImage(id: string, file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(
      "商品画像は JPEG / PNG / WebP の形式でご用意ください。"
    );
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `商品画像は ${MAX_IMAGE_BYTES / (1024 * 1024)}MB 以下にしてください。`
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";
  const path = `product-images/${id}-${Date.now()}.${ext}`;
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

async function resolveImage(
  id: string,
  form: FormData,
  existing?: string
): Promise<string | undefined> {
  const remove = form.get("imageRemove") === "on";
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    return await uploadProductImage(id, file);
  }
  if (remove) return undefined;
  return existing;
}

export async function createProduct(form: FormData) {
  await requireAdmin();
  const base = parseBaseFormPayload(form);

  const db = getAdminDb();
  const ref = db.collection(COLLECTION).doc(base.id);
  const existing = await ref.get();
  if (existing.exists) {
    throw new Error(
      `商品ID「${base.id}」は既に使われております。別のIDをお選びください。`
    );
  }

  const image = await resolveImage(base.id, form);
  const now = Date.now();
  const doc: ProductDoc = {
    ...base,
    createdAt: now,
    updatedAt: now,
  };
  if (image) doc.image = image;
  await ref.set(doc);

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(originalId: string, form: FormData) {
  await requireAdmin();
  const base = parseBaseFormPayload(form);

  const db = getAdminDb();
  const oldRef = db.collection(COLLECTION).doc(originalId);
  const oldSnap = await oldRef.get();
  if (!oldSnap.exists) {
    throw new Error(`商品「${originalId}」が見つかりません。`);
  }

  const idChanged = base.id !== originalId;
  const newRef = idChanged ? db.collection(COLLECTION).doc(base.id) : oldRef;
  if (idChanged) {
    const conflict = await newRef.get();
    if (conflict.exists) {
      throw new Error(
        `商品ID「${base.id}」は既に使われております。別のIDをお選びください。`
      );
    }
  }

  const old = oldSnap.data() as ProductDoc;
  const image = await resolveImage(base.id, form, old.image);
  const doc: ProductDoc = {
    ...base,
    createdAt: old.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  if (image) doc.image = image;
  await newRef.set(doc);
  if (idChanged) await oldRef.delete();

  revalidatePath("/shop");
  revalidatePath(`/shop/products/${base.id}`);
  if (idChanged) revalidatePath(`/shop/products/${originalId}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const db = getAdminDb();
  await db.collection(COLLECTION).doc(id).delete();
  revalidatePath("/shop");
  revalidatePath(`/shop/products/${id}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
