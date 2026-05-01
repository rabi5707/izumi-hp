// Server-only Firestore fetchers for shop products.
//
// Used by SSR/ISR pages (/shop and subroutes when un-archived) and by the
// /api/checkout route to validate prices server-side.

import "server-only";

import { getAdminDb } from "./firebase-admin";
import type { ProductDoc } from "./products-schema";
import type { CategoryId } from "./products";

const COLLECTION = "products";

function docToProduct(data: FirebaseFirestore.DocumentData): ProductDoc {
  return {
    id: data.id,
    cat: data.cat,
    ja: data.ja,
    en: data.en ?? "",
    desc: data.desc ?? "",
    price: Number(data.price ?? 0),
    serves: data.serves ?? "",
    tag: data.tag ?? "",
    freeze: data.freeze !== false,
    lead: data.lead ?? "",
    area: data.area ?? "",
    image: data.image,
    sortOrder: Number(data.sortOrder ?? 0),
    published: data.published === true,
    createdAt: data.createdAt ?? 0,
    updatedAt: data.updatedAt ?? 0,
  };
}

/** All published products, sorted by sortOrder asc. */
export async function fetchAllPublishedProducts(): Promise<ProductDoc[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .where("published", "==", true)
    .orderBy("sortOrder", "asc")
    .get();
  return snap.docs.map((d) => docToProduct(d.data()));
}

/** Single published product by id, or null. */
export async function fetchPublishedProductById(
  id: string
): Promise<ProductDoc | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  const product = docToProduct(snap.data()!);
  if (!product.published) return null;
  return product;
}

/** Trusted price/identity lookup for /api/checkout. Returns null if missing or unpublished. */
export async function fetchProductForCheckout(
  id: string
): Promise<ProductDoc | null> {
  return fetchPublishedProductById(id);
}

/** Published products in a given category, ordered. */
export async function fetchPublishedProductsByCategory(
  cat: CategoryId
): Promise<ProductDoc[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .where("published", "==", true)
    .where("cat", "==", cat)
    .orderBy("sortOrder", "asc")
    .get();
  return snap.docs.map((d) => docToProduct(d.data()));
}

/** All products including drafts. ADMIN ONLY — never expose. */
export async function fetchAllProductsForAdmin(): Promise<ProductDoc[]> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).orderBy("sortOrder", "asc").get();
  return snap.docs.map((d) => docToProduct(d.data()));
}

/** Single product by id regardless of publish state. ADMIN ONLY. */
export async function fetchProductByIdForAdmin(
  id: string
): Promise<ProductDoc | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return docToProduct(snap.data()!);
}
