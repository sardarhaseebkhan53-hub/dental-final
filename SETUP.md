# 🦷 Serene Dental Platform — First-Time Setup (Windows)

The error you saw — **`The table public.users does not exist in the current database`** — happens because Prisma migrations have **never been run** against your database. The app starts fine, but no tables exist yet. Follow these steps exactly.

---

## 1. Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm i -g pnpm`)
- A PostgreSQL 15+ database. Pick one:
  - 🌩️ **Free & easiest:** [Neon](https://neon.tech/) (serverless Postgres, free tier)
  - 🌩️ **Alternative:** [Supabase](https://supabase.com/) (free tier)
  - 🖥️ **Local install:** [PostgreSQL for Windows](https://www.postgresql.org/download/windows/)

---

## 2. Configure environment variables

From the project root (`C:\Users\TECHNIFI\Pictures\dental-final-main`):

```powershell
copy .env.example .env
```

Then open `.env` in VS Code / Notepad and fill in:

```ini
# ── Database ──────────────────────────────────────────────────
# Paste the full connection string from Neon / Supabase / your local Postgres.
# For Neon, paste the pooled URL here; put the *direct* (non-pooled) URL into
# DIRECT_URL (needed for migrations).
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/dbname?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/dbname?sslmode=require"

# ── Auth secret (required for production; dev has a fallback) ─
# Run this in PowerShell to generate one:
#   node -e "console.log(crypto.randomBytes(32).toString('base64'))"
AUTH_SECRET="paste-generated-secret-here"
AUTH_TRUST_HOST=true
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ── Google Login (optional) ──────────────────────────────────
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

> **Neon users:** copy the two connection strings from the Neon Dashboard:
> - `DATABASE_URL` → **Pooled** connection string
> - `DIRECT_URL` → **Direct** connection string (used by migrations)

---

## 3. Install dependencies

```powershell
pnpm install
```

If you get npm install warnings (`deprecated`, `vulnerabilities`) they are not blocking — safe to ignore for local dev.

---

## 4. Create the database tables (THE FIX FOR YOUR ERROR)

Run the initial migration. This creates **all tables** (`users`, `patients`, `doctors`, `appointments`, etc.):

```powershell
pnpm db:migrate
```

You should see output similar to:

```
Applying migration `0_init`
The following migration(s) have been applied:
migrations/
  └─ 0_init/
```

If you see *"Prisma Migrate could not create the shadow database"* with Neon/Supabase, use `db push` instead:

```powershell
pnpm db:push
```

---

## 5. Seed the database with the admin account (and demo data)

```powershell
pnpm db:seed
```

This creates:

| Email                       | Password   | Role        |
|-----------------------------|------------|-------------|
| `admin@serenedental.com`    | `Admin@123`| SUPER_ADMIN |

Plus sample departments, services, doctors, etc.

---

## 6. Start the dev server

```powershell
pnpm dev
```

Open http://localhost:3000. You can now log in with:

- **Email:** `admin@serenedental.com`
- **Password:** `Admin@123`

---

## 7. Enable Google Login (optional)

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth 2.0 Client ID** (Web application type)
3. Add these **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://your-domain.com/api/auth/callback/google` (prod)
4. Copy the Client ID and Secret into `.env`:
   ```ini
   GOOGLE_CLIENT_ID="xxxx.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="GOCSPX-xxxx"
   ```
5. Restart `pnpm dev`. The Google button on `/login` will now work.

> Without those env vars, the Google button shows an error toast:
> *"Google sign-in is not available right now."* This is by design so the app
> doesn't crash on a fresh clone.

---

## Troubleshooting

| Error | Fix |
|---|---|
| `The table public.users does not exist` | Run `pnpm db:migrate` (or `pnpm db:push`) |
| `Can't reach database server` | Check `DATABASE_URL` — make sure password/host are correct; if using Neon, ensure SSL is on (`?sslmode=require`) |
| `Environment variable not found: DATABASE_URL` | You created `.env.local` but Prisma CLI reads `.env`. Copy values into `.env` as well. |
| Login says "Invalid credentials" after seeding | Make sure seed completed: run `pnpm db:seed` again (it uses `upsert`, safe to re-run). |
| Google button does nothing | Check browser console. Make sure `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are set **and** the redirect URI is whitelisted in Google Cloud. |

---

## Useful commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server (http://localhost:3000) |
| `pnpm db:generate` | Regenerate Prisma Client (after schema changes) |
| `pnpm db:migrate` | Create and apply a new migration in dev |
| `pnpm db:push` | Push schema directly to DB (skip migrations — good for quick prototyping / Neon) |
| `pnpm db:seed` | Seed the database with demo data / admin user |
| `pnpm db:studio` | Open Prisma Studio (DB GUI) at http://localhost:5555 |
| `pnpm db:reset` | Drop all tables and re-run migrations + seed (⚠️ wipes data) |
