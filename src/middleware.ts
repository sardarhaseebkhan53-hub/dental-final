import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

// Edge-safe middleware: only the shared auth config (JWT + authorization
// callbacks) is bundled here — Prisma and the Credentials provider stay in
// the Node.js runtime (`@/lib/auth`).
//
// The wrapper form runs Auth.js `authorized()` first (handling page redirects
// and role checks), then this callback adds CORS handling for /api routes.
const { auth } = NextAuth(authConfig);

// ─── CORS ──────────────────────────────────────────────────────────────────
// Only `NEXT_PUBLIC_*` variables are inlined into the Edge runtime, so the
// allowed origins come from public env vars. The app's own origin is always
// allowed.
const ALLOWED_ORIGINS = new Set(
  [
    process.env.NEXT_PUBLIC_APP_URL,
    ...(process.env.NEXT_PUBLIC_CORS_ORIGINS || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ].filter((origin): origin is string => Boolean(origin)),
);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    try {
      if (new URL(origin).origin === new URL(appUrl).origin) return true;
    } catch {
      // invalid origin — not allowed
    }
  }
  return false;
}

function applyCorsHeaders(response: NextResponse, origin: string | null) {
  if (origin && isAllowedOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    response.headers.set("Access-Control-Max-Age", "86400");
  }
  return response;
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const origin = req.headers.get("origin");

  // API routes: add CORS headers and answer preflight requests. Route
  // handlers perform their own authentication and return JSON errors
  // (401/400/429) instead of HTML redirects.
  if (pathname.startsWith("/api")) {
    if (req.method === "OPTIONS") {
      return applyCorsHeaders(new NextResponse(null, { status: 204 }), origin);
    }
    return applyCorsHeaders(NextResponse.next(), origin);
  }

  // Non-API pages: fall through to the Auth.js `authorized()` callback result.
  return undefined;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|icons|fonts|manifest.json).*)",
  ],
};
