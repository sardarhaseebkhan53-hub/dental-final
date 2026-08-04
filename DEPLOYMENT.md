# 🚀 Deploying Serene Dental to Vercel

This project is production-ready and builds clean (type-check ✓, lint ✓, tests ✓,
`next build` ✓). To put it live on Vercel, follow these steps.

## Prerequisites

- A **GitHub** account with push access to this repository.
- A **Vercel** account (free tier is fine).
- An **online PostgreSQL** database — [Neon](https://neon.tech) (recommended),
  [Supabase](https://supabase.com), or Railway.

---

## 1. Create the database & get connection strings

1. Create a free Neon project (or use Supabase).
2. Copy **two** connection strings from the dashboard:
   - `DATABASE_URL` → the **pooled** (pgbouncer) URL, e.g.
     `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require`
   - `DIRECT_URL` → the **direct** (non-pooled) URL — used by Prisma migrations.
3. Generate an auth secret:

   ```bash
   node -e "console.log(crypto.randomBytes(32).toString('base64'))"
   ```

---

## 2. Import the repo into Vercel

1. Go to https://vercel.com/new
2. Import the **GitHub** repository.
3. Vercel auto-detects **Next.js** and reads `vercel.json` (already committed), so:
   - Install command: `pnpm install --frozen-lockfile`
   - Build command: `prisma generate && prisma migrate deploy && next build`
4. Click **Deploy**.

> The build command automatically **applies database migrations** on build, so
> all tables are created the first time it deploys.

---

## 3. Set environment variables

In the Vercel project → **Settings → Environment Variables**, add these (both
for **Production** and **Preview**):

| Name                        | Value                                                            |
| --------------------------- | ---------------------------------------------------------------- |
| `DATABASE_URL`              | Pooled PostgreSQL connection string                               |
| `DIRECT_URL`                | Direct (non-pooled) PostgreSQL connection string                 |
| `AUTH_SECRET`               | The secret you generated above                                    |
| `AUTH_TRUST_HOST`           | `true`                                                           |
| `NEXT_PUBLIC_APP_URL`       | `https://your-project.vercel.app` (or your custom domain)         |
| `GOOGLE_CLIENT_ID`          | *(optional)* Google OAuth Client ID                              |
| `GOOGLE_CLIENT_SECRET`      | *(optional)* Google OAuth Client Secret                          |
| `RESEND_API_KEY`            | *(optional)* For transactional email                             |
| `EMAIL_FROM`                | *(optional)* Sender address                                      |

Then re-deploy (Vercel → Deployments → Redploy) so the new variables take effect.

---

## 4. Verify

- Open your deployed URL — you should see the Serene Dental homepage.
- Log in with the seeded admin account (if you ran the seed) or register a new
  account.

### Seeding the admin account (optional)

The build applies migrations but does **not** seed. To create the
`admin@serenedental.com` admin user and demo data, run the seed once against
your production DB:

```bash
DATABASE_URL="<direct-url>" DIRECT_URL="<direct-url>" pnpm db:seed
```

> You can run this locally, or use a Neon/Supabase SQL runner / a one-off
> serverless function. Do **not** put the seed in the build command.

---

## 5. Production database note

- Prisma migrations are version-controlled under `prisma/migrations/` and are
  applied with `prisma migrate deploy` during the Vercel build.
- If you later change `prisma/schema.prisma`, run `pnpm db:migrate` locally,
  commit the new migration folder, and push — the next Vercel build applies it.

---

## Troubleshooting

| Error | Fix |
|---|---|
| `The table public.users does not exist` | Migration wasn't applied. Redeploy after setting `DATABASE_URL` + `DIRECT_URL` (the build runs `prisma migrate deploy`). |
| `MissingSecret` / 500 on `/api/auth/*` | Set `AUTH_SECRET` in Vercel and redeploy. |
| `Environment variable not found: DATABASE_URL` | Add `DATABASE_URL` (and `DIRECT_URL`) in Vercel env vars, then redeploy. |
| Google button error | Set `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` and add the Vercel URL as an authorized redirect URI (`https://your-app/api/auth/callback/google`) in Google Cloud Console. |
