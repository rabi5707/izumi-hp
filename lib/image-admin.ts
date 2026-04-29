"use server";

// Generic image upload utility — used by /admin/images.
// Uploads any image to `uploads/` in Firebase Storage and returns a download URL
// that can be pasted anywhere (catering data, bento-delivery data, or directly
// into journal post body markdown).

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getAdminStorage } from "./firebase-admin";
import { requireAdmin } from "./admin-auth";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export type UploadResult = {
  url: string;
  path: string;
  contentType: string;
  size: number;
};

export type StoredImage = {
  path: string;
  url: string;
  size: number;
  contentType: string;
  uploadedAt: number;
};

function safeFilename(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "") // strip extension (we set our own)
      .replace(/[^a-zA-Z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()
      .slice(0, 60) || "image"
  );
}

function extOf(contentType: string): string {
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "jpg";
}

function buildDownloadUrl(bucketName: string, path: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
}

/** Upload a file. Returns the public download URL + storage path. */
export async function uploadImage(form: FormData): Promise<UploadResult> {
  await requireAdmin();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("ファイルが選択されておりません。");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(
      "JPEG / PNG / WebP / GIF いずれかの形式でご用意ください。"
    );
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `ファイルは ${MAX_IMAGE_BYTES / (1024 * 1024)}MB 以下にしてください。`
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const stem = safeFilename(file.name || "image");
  const path = `uploads/${stem}-${Date.now()}.${extOf(file.type)}`;
  const token = randomUUID();
  const bucket = getAdminStorage().bucket();

  await bucket.file(path).save(buffer, {
    contentType: file.type,
    metadata: {
      metadata: { firebaseStorageDownloadTokens: token },
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  revalidatePath("/admin/images");
  return {
    url: buildDownloadUrl(bucket.name, path, token),
    path,
    contentType: file.type,
    size: file.size,
  };
}

/** List all uploaded images, newest first. */
export async function listImages(): Promise<StoredImage[]> {
  await requireAdmin();
  const bucket = getAdminStorage().bucket();
  const [files] = await bucket.getFiles({ prefix: "uploads/" });
  const out: StoredImage[] = [];
  for (const f of files) {
    const md = f.metadata ?? {};
    const fbTokens = (md.metadata as Record<string, string> | undefined)?.firebaseStorageDownloadTokens;
    const token = fbTokens?.split(",")[0];
    if (!token) continue; // skip files we cannot serve via public URL
    out.push({
      path: f.name,
      url: buildDownloadUrl(bucket.name, f.name, token),
      size: typeof md.size === "string" ? parseInt(md.size, 10) : Number(md.size ?? 0),
      contentType: typeof md.contentType === "string" ? md.contentType : "",
      uploadedAt: md.timeCreated ? new Date(md.timeCreated).getTime() : 0,
    });
  }
  out.sort((a, b) => b.uploadedAt - a.uploadedAt);
  return out;
}

/** Delete an image by storage path. Refuses anything outside uploads/. */
export async function deleteImage(path: string): Promise<void> {
  await requireAdmin();
  if (!path.startsWith("uploads/")) {
    throw new Error("uploads/ 配下の画像のみ削除できます。");
  }
  const bucket = getAdminStorage().bucket();
  await bucket.file(path).delete().catch(() => {
    // 既に消えている場合は無視
  });
  revalidatePath("/admin/images");
}
