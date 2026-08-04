/**
 * Lightweight sliding-window rate limiter for API routes.
 *
 * Suitable for Vercel serverless functions (per-instance memory) and as a
 * first line of defense against brute-force/spam on public endpoints.
 * Limits are configurable through RATE_LIMIT_MAX and RATE_LIMIT_WINDOW_MS.
 */

import { getEnv } from "@/lib/env";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const { RATE_LIMIT_WINDOW_MS: WINDOW_MS, RATE_LIMIT_MAX: DEFAULT_MAX } =
  getEnv();

const store = new Map<string, RateLimitEntry>();

function getClientKey(ip: string, route: string): string {
  return `${route}:${ip}`;
}

export function getClientIp(
  request: Request,
  fallback = "unknown",
): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    fallback
  );
}

export function rateLimit(
  request: Request,
  options?: { max?: number; windowMs?: number },
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  const max = options?.max ?? DEFAULT_MAX;
  const windowMs = options?.windowMs ?? WINDOW_MS;
  const route = new URL(request.url).pathname;
  const key = getClientKey(getClientIp(request), route);

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= max) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { success: true, remaining: max - entry.count, retryAfterSeconds: 0 };
}

// Periodic cleanup so the in-memory store does not grow unbounded.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
if (typeof setInterval === "function") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
  }, CLEANUP_INTERVAL_MS);
}

export function tooManyRequestsError(retryAfterSeconds: number) {
  return Response.json(
    {
      success: false,
      error: "Too many requests. Please try again later.",
    },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}
