// Server-side admin auth helpers.
//
// The /admin UI is protected by a Firebase ID-token-backed session cookie.
// Flow:
//   1. Client signs in with Firebase Auth (email/password) → ID token
//   2. POST /api/auth/session with the ID token → server creates a session
//      cookie via Admin SDK and writes it to the response
//   3. Middleware + server pages call requireAdmin() to verify the cookie
//      and check the email against ADMIN_EMAILS allowlist

import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "./firebase-admin";

export {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_MS,
} from "./admin-auth-shared";
import { ADMIN_SESSION_COOKIE } from "./admin-auth-shared";

export type AdminUser = {
  uid: string;
  email: string;
};

function parseAllowlist(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allow = parseAllowlist();
  if (allow.length === 0) return false;
  return allow.includes(email.toLowerCase());
}

/**
 * Verify the current session cookie. Returns the admin user, or null if
 * unauthenticated / not on the allowlist / expired.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifySessionCookie(session, true);
    if (!isAllowedEmail(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email! };
  } catch {
    return null;
  }
}

/**
 * Server-component helper. Redirects to /admin/login if not authenticated,
 * otherwise returns the admin user.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
