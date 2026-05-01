// Firestore document schema for shop products (冷凍折詰).
//
// Collection: `products`
// Document ID: product slug (kebab-case, URL-safe — used in /shop/products/{id})
//
// Read path: published==true products are served via Admin SDK with ISR.
// Write path: Admin SDK only, gated by `/admin/products` UI (admin claim required).

import type { CategoryId } from "./products";

export type ProductDoc = {
  /** kebab-case ID, also the document ID. */
  id: string;

  cat: CategoryId;

  /** Display copy. */
  ja: string;
  en: string;
  desc: string;

  /** 価格（円・税込・整数）. */
  price: number;

  /** "一人前" / "2〜3名様" 等。 */
  serves: string;

  /** バッジ (人気・定番 等)。空文字 = なし。 */
  tag: string;

  /** 冷凍便フラグ（現状は全て true）。将来の常温商品想定で残す。 */
  freeze: boolean;

  /** "中3日 (冷凍)" / "12月25日まで受付" 等のリードタイム表示。 */
  lead: string;

  /** "全国配送" 等の地域表示。 */
  area: string;

  /** 商品画像（Firebase Storage の download URL）。任意。 */
  image?: string;

  /** 並び順（昇順）。同値ならば createdAt 昇順。 */
  sortOrder: number;

  /** 公開フラグ。下書き品は /shop に出ない。 */
  published: boolean;

  /** Bookkeeping. */
  createdAt: number;
  updatedAt: number;
};
