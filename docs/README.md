# Serene Dental — Enterprise Dental Clinic Platform

## Overview

Serene Dental is a production-ready enterprise dental clinic platform built with
modern web technologies: a public marketing website, a patient portal, doctor
and reception dashboards, and a full admin panel.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 3.4, Radix UI, Framer Motion
- **Database**: PostgreSQL (online — Neon / Supabase / Railway) with Prisma ORM
- **Authentication**: NextAuth.js v5 (Auth.js) with JWT sessions
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Email**: Resend (optional, degrades gracefully)
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- An **online PostgreSQL** database (Neon, Supabase, Railway, etc.)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone <repository-url>
   cd dental
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set **at least**:

   - `DATABASE_URL` — your online PostgreSQL connection string
     (e.g. `postgresql://USER:PASSWORD@ep-xxx-pooler.us-east-1.aws.neon.tech/db?sslmode=require`)
   - `AUTH_SECRET` — generate one with `openssl rand -base64 32`

   > Note: `next dev` loads `.env.local` (and `.env`) automatically. The
   > Prisma CLI reads `.env` — `prisma.config.ts` loads `dotenv` for you, or
   > run `cp .env.example .env` in addition if you use the CLI directly.

   > Dev convenience: if `AUTH_SECRET` is not set, `next dev` falls back to a
   > built-in development-only secret (`src/lib/auth.config.ts`), so the app
   > boots without the `MissingSecret` error. Production builds still require
   > a real `AUTH_SECRET`.

3. Set up the database schema and seed data:

   ```bash
   pnpm db:migrate:prod  # applies the committed migration (prisma migrate deploy)
   pnpm db:seed          # admin@serenedental.com / Admin@123, doctors, services, etc.
   ```

   The initial migration (`prisma/migrations/0_init`) is committed to the
   repository, so `prisma migrate deploy` works on any environment — including
   Vercel and a fresh Neon database. `pnpm db:push` remains available for
   rapid prototyping (it syncs the schema directly without migrations).

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open http://localhost:3000

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | `prisma generate && next build` (production build) |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint |
| `pnpm type-check` | TypeScript type checking |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm db:generate` | Generate Prisma Client |
| `pnpm db:push` | Push schema to the database |
| `pnpm db:migrate` | Create/apply migrations in development |
| `pnpm db:migrate:prod` | Apply migrations in production |
| `pnpm db:seed` | Seed the database |
| `pnpm db:studio` | Open Prisma Studio |

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Import Project** from the repository. Vercel auto-detects
   Next.js and pnpm (the `packageManager` field pins pnpm 10).
3. Add the environment variables (from `.env.example`) in
   **Project → Settings → Environment Variables**. At minimum:
   - `DATABASE_URL` — your online PostgreSQL URL
   - `AUTH_SECRET` — a strong random secret
   - `AUTH_TRUST_HOST=true`
   - `NEXT_PUBLIC_APP_URL` — your production URL
4. Deploy. The build runs `prisma generate` automatically
   (`postinstall` + `build` script), so no manual Prisma steps are needed.
5. After the first deploy, apply the schema and seed once against your online
   database from your machine:
   `pnpm db:migrate:prod && pnpm db:seed`

   > Neon-specific: put the **pooled** connection string (with
   > `?sslmode=require&pgbouncer=true&connection_limit=1`) in `DATABASE_URL`
   > for the serverless runtime, and the **direct** connection string in
   > `DIRECT_URL` for migrations. See `.env.example`.

Notes for Vercel:

- API routes (`/api/*`) are excluded from the middleware matcher, so they
  return proper JSON errors (401/400/429) instead of HTML redirects.
- The middleware runs on the Edge runtime and only bundles the shared Auth.js
  config — Prisma stays in the Node.js runtime.
- Security headers (CSP, X-Frame-Options, etc.) are set in `next.config.ts`.

## API Endpoints

| Endpoint | Method | Auth | Purpose |
| --- | --- | --- | --- |
| `/api/auth/register` | POST | — | Patient registration |
| `/api/auth/forgot-password` | POST | — | Send password reset email |
| `/api/auth/reset-password` | POST | — | Reset password with token |
| `/api/auth/[...nextauth]` | GET/POST | — | NextAuth handlers |
| `/api/appointments` | GET/POST/PATCH | JWT | List/create/update appointments |
| `/api/doctors` | GET | — | Public doctor directory |
| `/api/services` | GET | — | Public services catalogue |
| `/api/reviews` | GET/POST | POST requires JWT | Public reviews + submit |
| `/api/search` | GET | — | Global site search (services/blog/FAQ) |
| `/api/contact` | POST | — | Contact form (rate-limited) |
| `/api/newsletter` | POST | — | Newsletter subscription (rate-limited) |

## Testing

```bash
pnpm test              # Unit tests
pnpm test:coverage     # Coverage report
pnpm test:e2e          # E2E tests (Playwright)
```

## License

Proprietary — Serene Dental Clinic
