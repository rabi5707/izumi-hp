// Admin-only Firestore reads for inquiries.

import "server-only";

import { getAdminDb } from "./firebase-admin";
import type { InquiryDoc, InquiryStatus } from "./inquiries-schema";

const COLLECTION = "inquiries";

function docToInquiry(
  data: FirebaseFirestore.DocumentData,
  id: string
): InquiryDoc {
  const status = (data.status as InquiryStatus) ?? "new";
  return {
    inquiryNo: data.inquiryNo ?? id,
    status,
    name: data.name,
    phone: data.phone,
    email: data.email,
    corp: data.corp,
    date: data.date,
    time: data.time,
    people: data.people,
    budget: data.budget,
    venue: data.venue,
    where: data.where,
    addr: data.addr,
    menu: data.menu,
    payment: data.payment,
    notes: data.notes,
    referenceProductId: data.referenceProductId,
    service: Array.isArray(data.service) ? data.service : undefined,
    adminMemo: data.adminMemo,
    createdAt: data.createdAt ?? "",
    userAgent: data.userAgent,
    ip: data.ip,
  };
}

/** All inquiries, newest first. ADMIN ONLY. */
export async function fetchAllInquiries(): Promise<InquiryDoc[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => docToInquiry(d.data(), d.id));
}

/** Single inquiry by id. ADMIN ONLY. */
export async function fetchInquiryById(
  inquiryNo: string
): Promise<InquiryDoc | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(inquiryNo).get();
  if (!snap.exists) return null;
  return docToInquiry(snap.data()!, snap.id);
}

/** Count of unread (status === "new") inquiries. */
export async function countUnreadInquiries(): Promise<number> {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .where("status", "==", "new")
    .count()
    .get();
  return snap.data().count;
}
