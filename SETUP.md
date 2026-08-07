# 🦷 Junaid Dental Care — First-Time Setup

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
sudo -u postgres psql -c "CREATE USER junaid WITH PASSWORD 'junaid123';"
sudo -u postgres psql -c "CREATE DATABASE junaid_dental OWNER junaid;"
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
DATABASE_URL="postgresql://junaid:junaid123@localhost:5432/junaid_dental?schema=public"

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
testimonials, FAQs, gallery items, blog posts, branding settings, and SEO defaults.

| Email                            | Password    | Role        |
|----------------------------------|-------------|-------------|
| `admin@junaiddentalcare.pk`      | `Admin@123` | SUPER_ADMIN |

## 6. Start the server

```bash
npm start
```

Open **http://localhost:3000**.

- Public website: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

---

## Clinic Information (pre-filled)

The seed data and website content are pre-populated with Junaid Dental Care's information from Google Maps:

- **Name:** Junaid Dental Care
- **Address:** J5WM+643, Lehtrar Road, near Old Bank Stop, Ali Pur, Islamabad Capital Territory 45600, Pakistan
- **Phone:** +92 312 5028812
- **Email:** info@junaiddentalcare.pk
- **Hours:** Mon-Sat 8:00 AM – 9:00 PM
- **Google Rating:** 4.6/5 (487+ reviews)
- **Google Maps:** https://maps.app.goo.gl/sim1qA4wDdpcMovK7

You can change all of this from the Admin Panel → Settings.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `The table public.users does not exist` | You haven't run `npm run db:push` / migrations yet. Run them. |
| `Can't reach database server` | Check `DATABASE_URL` in `.env` — host, port, and credentials. |
| `Environment variable not found: DATABASE_URL` | Make sure you created `.env` from `.env.example`. |
| `@prisma/client did not initialize yet` | Run `npm run db:generate` (or re-run `npm install`). |
| Login says "Invalid credentials" | Run `npm run db:seed` to create the admin user, then use `admin@junaiddentalcare.pk` / `Admin@123`. |
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
