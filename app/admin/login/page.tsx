"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin/journal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const auth = getFirebaseAuth();
      // Session cookie is the source of truth; client-side persistence not needed.
      await setPersistence(auth, browserSessionPersistence);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `ログインに失敗しました（${res.status}）`);
      }
      router.replace(from);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "ログインに失敗しました。";
      setError(translateAuthError(msg));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg, #f7f4ee)",
        padding: 24,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.28em",
            color: "#8a7e63",
            marginBottom: 12,
          }}
        >
          ADMIN · 管理者ログイン
        </div>
        <h1
          className="kanji-h"
          style={{
            fontSize: 22,
            letterSpacing: "0.14em",
            margin: "0 0 28px",
          }}
        >
          読み物の編集ページ
        </h1>

        <label
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#5a5346",
            marginBottom: 6,
          }}
        >
          メールアドレス
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #c9c1ac",
            background: "#fafaf6",
            fontSize: 14,
            marginBottom: 18,
          }}
        />

        <label
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#5a5346",
            marginBottom: 6,
          }}
        >
          パスワード
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #c9c1ac",
            background: "#fafaf6",
            fontSize: 14,
            marginBottom: 24,
          }}
        />

        {error && (
          <div
            role="alert"
            style={{
              padding: "10px 12px",
              background: "#fdecec",
              border: "1px solid #e0a8a8",
              color: "#8a2e2e",
              fontSize: 12,
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: busy ? "#8a7e63" : "#1a1613",
            color: "#fff",
            border: "none",
            fontFamily: "var(--f-heading)",
            fontSize: 13,
            letterSpacing: "0.16em",
            cursor: busy ? "wait" : "pointer",
          }}
        >
          {busy ? "確認しております…" : "ログイン"}
        </button>
      </form>
    </main>
  );
}

function translateAuthError(raw: string): string {
  if (raw.includes("auth/invalid-credential")) {
    return "メールアドレスかパスワードが違います。";
  }
  if (raw.includes("auth/user-not-found")) {
    return "このメールアドレスは登録されておりません。";
  }
  if (raw.includes("auth/wrong-password")) {
    return "パスワードが違います。";
  }
  if (raw.includes("auth/too-many-requests")) {
    return "ログイン試行が多すぎます。しばらくお待ちください。";
  }
  if (raw.includes("auth/network-request-failed")) {
    return "ネットワークエラーです。接続を確認してください。";
  }
  return raw;
}
