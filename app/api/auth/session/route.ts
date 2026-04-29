// Session cookie endpoints for /admin UI.
//
//   POST   /api/auth/session  — body: { idToken } → creates a session cookie
//   DELETE /api/auth/session  → clears the session cookie

import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { isAllowedEmail } from "@/lib/admin-auth";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_MS,
} from "@/lib/admin-auth-shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { idToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const idToken = body.idToken;
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  const auth = getAdminAuth();

  let decoded;
  try {
    decoded = await auth.verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!isAllowedEmail(decoded.email)) {
    return NextResponse.json(
      { error: "このメールアドレスは管理者として登録されておりません。" },
      { status: 403 }
    );
  }

  const session = await auth.createSessionCookie(idToken, {
    expiresIn: ADMIN_SESSION_MAX_AGE_MS,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, session, {
    maxAge: ADMIN_SESSION_MAX_AGE_MS / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}
