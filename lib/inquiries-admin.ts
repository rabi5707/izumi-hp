"use server";

// Server Actions for inquiries (admin-side only).

import { revalidatePath } from "next/cache";
import { getAdminDb } from "./firebase-admin";
import { requireAdmin } from "./admin-auth";
import { INQUIRY_STATUSES, type InquiryStatus } from "./inquiries-schema";

const COLLECTION = "inquiries";

const MAX_MEMO_LEN = 4000;

export async function setInquiryStatus(
  inquiryNo: string,
  status: InquiryStatus
) {
  await requireAdmin();
  if (!INQUIRY_STATUSES.includes(status)) {
    throw new Error("不正な状態でございます。");
  }
  const db = getAdminDb();
  await db
    .collection(COLLECTION)
    .doc(inquiryNo)
    .set(
      { status, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${inquiryNo}`);
  revalidatePath("/admin");
}

export async function updateInquiryMemo(formData: FormData) {
  await requireAdmin();
  const inquiryNo = String(formData.get("inquiryNo") ?? "").trim();
  const memo = String(formData.get("adminMemo") ?? "").slice(0, MAX_MEMO_LEN);
  if (!inquiryNo) throw new Error("対象が見つかりません。");
  const db = getAdminDb();
  await db
    .collection(COLLECTION)
    .doc(inquiryNo)
    .set(
      { adminMemo: memo, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  revalidatePath(`/admin/inquiries/${inquiryNo}`);
}

export async function deleteInquiry(inquiryNo: string) {
  await requireAdmin();
  const db = getAdminDb();
  await db.collection(COLLECTION).doc(inquiryNo).delete();
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
