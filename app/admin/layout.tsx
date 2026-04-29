import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { getAdminUser } from "@/lib/admin-auth";

export const metadata = {
  title: "管理画面 | 株式会社イズミ産業",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f4ee",
      }}
    >
      {user && (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px",
            background: "#1a1613",
            color: "#fff",
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link
              href="/admin/journal"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              読み物
            </Link>
            <Link
              href="/admin/images"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              画像庫
            </Link>
            <Link
              href="/journal"
              target="_blank"
              style={{ color: "#b8924c", textDecoration: "none" }}
            >
              ↗ 公開ページ
            </Link>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ opacity: 0.7 }}>{user.email}</span>
            <LogoutButton />
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
