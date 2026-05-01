// 管理者ユーザーに `admin: true` の Custom Claim を付与するスクリプト。
//
// 使い方:
//   node scripts/grant-admin-claim.mjs yamaizumi@isg.co.jp
//
// 必要環境変数 (.env.local):
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY
//
// Firestore / Storage rules が `request.auth.token.admin == true` を要求するため、
// Firebase Auth に追加した管理者ユーザーごとに 1 回だけ実行が必要。
// ユーザーは付与後に再ログイン（ID トークン再発行）が必要。

import { readFileSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function loadEnvLocal() {
  try {
    const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (!m) continue;
      const [, k, v] = m;
      if (process.env[k]) continue;
      // strip optional surrounding quotes
      process.env[k] = v.replace(/^"(.*)"$/s, "$1").replace(/^'(.*)'$/s, "$1");
    }
  } catch {
    // ignore — assume real env vars are already set
  }
}

loadEnvLocal();

const email = process.argv[2];
if (!email) {
  console.error("使い方: node scripts/grant-admin-claim.mjs <email>");
  process.exit(1);
}

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

const auth = getAuth();
const user = await auth.getUserByEmail(email);
const existing = user.customClaims ?? {};
await auth.setCustomUserClaims(user.uid, { ...existing, admin: true });
console.log(`✅ ${email} (uid=${user.uid}) に admin: true を付与しました。`);
console.log("⚠️  当該ユーザーは一度ログアウト → 再ログインしてください（ID トークン更新のため）。");
