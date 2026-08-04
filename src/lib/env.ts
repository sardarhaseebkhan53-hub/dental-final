import { z } from "zod";

/**
 * Centralized environment variable validation.
 *
 * - Server-only: do NOT import this from Edge middleware or client components
 *   (only `NEXT_PUBLIC_*` vars are inlined for those runtimes).
 * - Never throws at import time, so `next build` and static prerendering are
 *   safe even when optional vars are unset. Missing REQUIRED vars are logged
 *   as errors and the feature that depends on them fails gracefully at
 *   request time (e.g. `sendEmail` throws only when actually used).
 */

const booleanFromString = z
  .enum(["true", "false", "1", "0"])
  .transform((value) => value === "true" || value === "1");

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // App
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Serene Dental"),

  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().optional(),

  // Auth
  AUTH_SECRET: z.string().min(8).optional(),
  AUTH_TRUST_HOST: booleanFromString.default("true"),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(8).optional(),

  // Email (Resend) — optional
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Rate limiting — optional (defaults are safe)
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),

  // CORS — optional. Comma-separated list of extra allowed origins.
  NEXT_PUBLIC_CORS_ORIGINS: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

const REQUIRED_IN_PRODUCTION: (keyof Env)[] = ["DATABASE_URL", "AUTH_SECRET"];

let cached: Env | null = null;
let warned = false;

/**
 * Returns the validated environment. Falls back to process.env on parse
 * failure and reports the issue once.
 */
export function getEnv(): Env {
  if (cached) return cached;

  const parsed = envSchema.safeParse(process.env);

  if (parsed.success) {
    cached = parsed.data;
  } else {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    console.error(`[env] Invalid environment variables: ${issues}`);
    // Use raw process.env as fallback so the app still boots.
    cached = {
      NODE_ENV: (process.env.NODE_ENV as Env["NODE_ENV"]) || "development",
      NEXT_PUBLIC_APP_URL:
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Serene Dental",
      DATABASE_URL: process.env.DATABASE_URL || "",
      DIRECT_URL: process.env.DIRECT_URL,
      AUTH_SECRET: process.env.AUTH_SECRET,
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST !== "false",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
      RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
      RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
      NEXT_PUBLIC_CORS_ORIGINS: process.env.NEXT_PUBLIC_CORS_ORIGINS,
    };
  }

  if (!warned) {
    warned = true;
    for (const key of REQUIRED_IN_PRODUCTION) {
      if (cached.NODE_ENV === "production" && !cached[key]) {
        console.error(`[env] Missing required environment variable: ${key}`);
      }
    }
  }

  return cached;
}

/** Accessor used by server code (email, rate-limit, db, etc.). */
export const env = getEnv();

export function isProduction(): boolean {
  return env.NODE_ENV === "production";
}
