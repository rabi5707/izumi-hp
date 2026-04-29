// Edge-safe shared constants for admin auth. No Node-only imports here so
// middleware (Edge runtime) and server pages (Node runtime) can both use them.

export const ADMIN_SESSION_COOKIE = "__izumi_admin_session";
export const ADMIN_SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000; // 5 days
