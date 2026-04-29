import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth-shared";

// 二段の認証ゲート:
//   1. 全ページ Basic 認証（役員レビュー段階の一時的な保護）
//   2. /admin/* は加えて Firebase Auth セッションクッキーの有無をチェック。
//      クッキーの中身検証（allowlist）は Edge runtime では実行できないため、
//      ページ側 requireAdmin() で改めて検証する。ここはあくまで
//      "未ログインなら /admin/login へ" の振り分け。
//
// 環境変数:
//   BASIC_AUTH_USER     Basic 認証ID（一般公開時に空にすると無効化）
//   BASIC_AUTH_PASSWORD Basic 認証PW
//   ADMIN_EMAILS        管理者メールの allowlist（カンマ区切り、ページ側で参照）

export function middleware(req: NextRequest) {
  const basicAuthResult = enforceBasicAuth(req);
  if (basicAuthResult) return basicAuthResult;

  return enforceAdminGate(req) ?? NextResponse.next();
}

function enforceBasicAuth(req: NextRequest): NextResponse | null {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;
  if (!expectedUser || !expectedPass) return null;

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString();
    const sep = decoded.indexOf(":");
    if (sep >= 0) {
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) return null;
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="izumi-hp preview"' },
  });
}

function enforceAdminGate(req: NextRequest): NextResponse | null {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return null;
  if (pathname === "/admin/login") return null;
  if (pathname.startsWith("/api/auth")) return null;

  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (session) return null;

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // _next 系の静的アセット・favicon・robots.txt 等は認証なしで通す。
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
