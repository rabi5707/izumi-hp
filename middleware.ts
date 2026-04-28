import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Basic 認証で全ページを保護する。
// 役員レビュー段階の一時的な処置。一般公開時に削除（または環境変数で無効化）する。
//
// 環境変数:
//   BASIC_AUTH_USER     ログインID
//   BASIC_AUTH_PASSWORD ログインパスワード
// どちらかが未設定の場合は認証ゲートを無効化（=誰でも閲覧可）。

export function middleware(req: NextRequest) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;

  // 環境変数が未設定 → 認証無効（ローカル開発・将来の一般公開時の明示的OFF用）
  if (!expectedUser || !expectedPass) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString();
    const sep = decoded.indexOf(":");
    if (sep >= 0) {
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="izumi-hp preview"',
    },
  });
}

export const config = {
  // _next 系の静的アセット・favicon・robots.txt 等は認証なしで通す。
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)"],
};
