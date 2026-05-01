// Seed `products` collection with the existing 8 frozen products.
//
// 使い方:
//   node scripts/seed-products.mjs
//
// 何度実行しても安全 (upsert / merge ベース)。既に存在するドキュメントは
// updatedAt のみ更新する。

import { readFileSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function loadEnvLocal() {
  try {
    const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (!m) continue;
      const [, k, v] = m;
      if (process.env[k]) continue;
      process.env[k] = v.replace(/^"(.*)"$/s, "$1").replace(/^'(.*)'$/s, "$1");
    }
  } catch {
    /* ignore */
  }
}

loadEnvLocal();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!projectId || !clientEmail || !privateKey) {
  console.error("FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY が必要です。");
  process.exit(1);
}

if (getApps().length === 0) {
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

const db = getFirestore();

const PRODUCTS = [
  { id: "shokado-tsuru", cat: "shokado", ja: "松花堂　鶴", en: "SHOKADO TSURU", price: 4200, serves: "一人前", tag: "人気", freeze: true, desc: "一汁五菜の松花堂仕立て。法要・ご会食のお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-kame", cat: "shokado", ja: "松花堂　亀", en: "SHOKADO KAME", price: 3600, serves: "一人前", tag: "", freeze: true, desc: "一汁四菜の松花堂。想い出を語り合うお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "shokado-matsu", cat: "shokado", ja: "松花堂御膳　松", en: "SHOKADO MATSU", price: 5800, serves: "一人前", tag: "定番", freeze: true, desc: "晴れの日にも通じる、上品な松花堂仕立て。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "oiwai-nidan", cat: "oiwai", ja: "お祝い膳　二段重", en: "OIWAI NIDAN", price: 8800, serves: "2〜3名様", tag: "定番", freeze: true, desc: "鯛・海老・赤飯を中心に。晴れの日のお席に。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "oiwai-frozen", cat: "oiwai", ja: "お祝い折詰　冷凍", en: "OIWAI FROZEN", price: 5800, serves: "一人前", tag: "", freeze: true, desc: "遠方へのお祝いに。解凍するだけで晴れの膳が整います。", lead: "中3日 (冷凍)", area: "全国配送" },
  { id: "osechi-nidan", cat: "osechi", ja: "おせち　二段重", en: "OSECHI NIDAN", price: 18000, serves: "3〜4名様", tag: "人気", freeze: true, desc: "伝統の祝い肴から季節の逸品まで、二段重に彩り豊かに。新年を寿ぐお席に。", lead: "12月25日まで受付", area: "全国配送" },
  { id: "osechi-sandan", cat: "osechi", ja: "おせち　三段重", en: "OSECHI SANDAN", price: 32000, serves: "4〜5名様", tag: "定番", freeze: true, desc: "祝い肴・口取・焼物・煮物を三段に詰めた、ご家族皆様での新年に相応しい特製おせち。", lead: "12月25日まで受付", area: "全国配送" },
  { id: "fusechi", cat: "osechi", ja: "ふせち（喪中おせち）", en: "FUSECHI", price: 15000, serves: "2〜3名様", tag: "", freeze: true, desc: "喪中のお正月に。華美を避けた、精進・仏事の仕立てにて。赤い食材を用いず、穏やかに新年を迎えるお膳です。", lead: "12月25日まで受付", area: "全国配送" },
];

const now = Date.now();
let created = 0;
let updated = 0;

for (let i = 0; i < PRODUCTS.length; i++) {
  const p = PRODUCTS[i];
  const ref = db.collection("products").doc(p.id);
  const snap = await ref.get();
  const sortOrder = (i + 1) * 10; // 10, 20, 30, ... — 後から間に挿入できる余白
  if (snap.exists) {
    await ref.set(
      {
        ...p,
        sortOrder,
        published: true,
        updatedAt: now,
      },
      { merge: true }
    );
    updated++;
    console.log(`✏️  updated: ${p.id}`);
  } else {
    await ref.set({
      ...p,
      sortOrder,
      published: true,
      createdAt: now,
      updatedAt: now,
    });
    created++;
    console.log(`✨  created: ${p.id}`);
  }
}

console.log(`\n完了: 新規 ${created} 件、更新 ${updated} 件`);
process.exit(0);
