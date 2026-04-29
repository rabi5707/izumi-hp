"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      await signOut(getFirebaseAuth()).catch(() => {});
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={busy}
      style={{
        padding: "6px 12px",
        background: "transparent",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.3)",
        fontFamily: "var(--f-mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        cursor: busy ? "wait" : "pointer",
      }}
    >
      {busy ? "…" : "LOG OUT"}
    </button>
  );
}
