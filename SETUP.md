# 🦷 Serene Dental — First-Time Setup

This guide gets the HTML/CSS/JS + Express + PostgreSQL + Prisma build running
from a fresh clone. Two things must exist first: **Node.js 20+** and a
**local PostgreSQL** database.

---

## 1. Install PostgreSQL (if you don't have it)

- **Windows:** https://www.postgresql.org/download/windows/
- **macOS:** `brew install postgresql`
- **Linux (Ubuntu):** `sudo apt install postgresql postgresql-contrib`

Then create a database for the app:

```bash
sudo -u postgres psql -c "CREATE USER serene WITH PASSWORD 'serene123';"
sudo -u postgres psql -c "CREATE DATABASE serene_dental OWNER serene;"
```

> Note: the schema uses `gen_random_uuid()`, which is built into PostgreSQL 13+.

## 2. Configure environment variables

From the project root:

```bash
cp .env.example .env
```

Then edit `.env` and fill in:

```ini
# PostgreSQL connection string
DATABASE_URL="postgresql://serene:serene123@localhost:5432/serene_dental?schema=public"

# Strong secret for JWT (generate one with the command below)
JWT_SECRET="generate-me"
```

Generate a strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 3. Install dependencies

```bash
npm install
```

This also runs `prisma generate` automatically (via the `postinstall` script).

## 4. Create the tables

```bash
npm run db:push
```

If you'd rather use proper migrations instead:

```bash
npx prisma migrate dev --name init
```

## 5. Seed the database

```bash
npm run db:seed
```

This creates the admin account plus sample departments, services, doctors,
testimonials, FAQs, gallery items, blog posts, and branding settings.

| Email                    | Password    | Role        |
|--------------------------|-------------|-------------|
| `admin@serenedental.com` | `Admin@123` | SUPER_ADMIN |

## 6. Start the server

```bash
npm start
```

Open **http://localhost:3000**.

- Public website: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `The table public.users does not exist` | You haven't run `npm run db:push` / migrations yet. Run them. |
| `Can't reach database server` | Check `DATABASE_URL` in `.env` — host, port, and credentials. |
| `Environment variable not found: DATABASE_URL` | Make sure you created `.env` from `.env.example`. |
| `@prisma/client did not initialize yet` | Run `npm run db:generate` (or re-run `npm install`). |
| Login says "Invalid credentials" | Run `npm run db:seed` to create the admin user, then use `admin@serenedental.com` / `Admin@123`. |
| Port 3000 already in use | Change `PORT` in `.env`. |

## Useful commands

| Command               | What it does                                     |
|-----------------------|--------------------------------------------------|
| `npm start`           | Run the server                                   |
| `npm run dev`         | Run with auto-reload                             |
| `npm run db:push`     | Create/update tables from the schema             |
| `npm run db:seed`     | Seed demo data (safe to re-run)                  |
| `npm run db:migrate`  | Create & apply a new migration                   |
| `npm run db:studio`   | Open Prisma Studio (GUI) at http://localhost:5555 |
| `npm run db:generate` | Regenerate the Prisma client                     |
