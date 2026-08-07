# 🦷 Serene Dental Clinic — Full-Stack Website

A complete, self-hosted dental clinic website and admin panel rebuilt from an
existing Next.js application into a lean stack with **no frameworks**:

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Prisma ORM

The site is designed to look and behave almost exactly like the original
application — same layout, colours, fonts, spacing, animations, and pages — but
with a simpler, dependency-light codebase.

## ✨ Features

### Public website
- Home page (hero, trust bar, services, about, doctors, journey, gallery,
  testimonials, pricing, FAQ, contact CTA)
- About, Team, Technology, Careers
- Services list + per-service detail pages
- Doctors directory
- Gallery (filterable, lightbox)
- Blog (list + article pages)
- Testimonials, Pricing, FAQ (filterable)
- Insurance, Emergency, Contact (with working form)
- Legal pages (Privacy, Terms, Cookies, Refund Policy), Sitemap
- **Book Appointment** form (creates a patient + appointment)
- Newsletter subscription
- Patient login / register / forgot & reset password

### Admin panel (`/admin`)
- **Secure login** (JWT)
- **Dashboard** with live statistics
- **Appointments** — create, update status, delete, filter
- **Doctors** — add / edit / delete
- **Services** — add / edit / delete
- **Gallery** — add / delete
- **Testimonials** — add / edit / delete
- **FAQs** — add / edit / delete
- **Blog** — write / publish / delete posts
- **Contact Messages** — read, change status, delete
- **Users** — manage roles & statuses
- **Settings / Branding**
- **Image Upload** (local `/uploads` folder)
- **Profile** and **Password Change**

## 🛠 Technology Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript (ES6)         |
| Backend    | Node.js, Express.js                           |
| Database   | PostgreSQL with Prisma ORM                    |
| Auth       | JWT + bcrypt password hashing                 |
| Security   | Helmet, CORS, input validation, rate limiting, XSS/sanitization, SQL-injection safe (Prisma) |

No React, Next.js, Vue, Angular, Vite, Docker, Kubernetes, Firebase, Supabase,
Redis, or cloud databases.

## 📁 Project Structure

```
.
├── server/                  Express backend
│   ├── config/              env + multer (uploads)
│   ├── controllers/         auth, public, admin logic
│   ├── middleware/          auth, validation, rate limiting, errors
│   ├── lib/                 prisma client, JWT, responses
│   └── routes/              /api/auth, /api/public, /api/admin, /api/upload
├── public/                  Static frontend
│   ├── css/  js/  images/   site assets
│   ├── *.html               all public pages
│   ├── uploads/             locally-uploaded images (runtime)
│   └── admin/               admin panel (HTML + JS)
├── prisma/
│   ├── schema.prisma        database schema
│   └── seed.js              demo data + admin user
├── scripts/gen-pages.sh     regenerates legal/info pages
└── package.json
```

## 🚀 Quick Start (Development)

Requirements: **Node.js 20+** and a **local PostgreSQL** database.

```bash
# 1. Install dependencies (also runs `prisma generate`)
npm install

# 2. Configure environment
cp .env.example .env
#  → edit DATABASE_URL (and set a strong JWT_SECRET)

# 3. Create tables + seed demo data
npm run db:push
npm run db:seed

# 4. Start the server
npm start
```

Open http://localhost:3000

**Admin login:**

| Email                    | Password    | Role        |
|--------------------------|-------------|-------------|
| `admin@serenedental.com` | `Admin@123` | SUPER_ADMIN |

> ⚠️ Change the default passwords immediately in production.

## 🌍 Deployment

The app is designed to be deployed anywhere that can run Node.js + PostgreSQL.

1. **Install Node.js 20+** on your server.
2. **Create a PostgreSQL database** (e.g. `CREATE DATABASE serene_dental;`).
3. **Upload the project** and run `npm install`.
4. **Configure `.env`** — copy `.env.example` to `.env` and set `DATABASE_URL`
   and a strong `JWT_SECRET`.
5. **Run migrations** `npm run db:push` (or `npx prisma migrate deploy` if you
   use the provided migrations) and `npm run db:seed`.
6. **Start the server** `npm start` (run under a process manager such as
   `pm2` or `systemd` for production).
7. Point your domain's DNS at the server and set up a reverse proxy (nginx)
   for HTTPS if needed.

No Docker, no Kubernetes, no cloud services, no complicated setup.

## 🧪 Useful Commands

| Command                | What it does                                 |
|------------------------|----------------------------------------------|
| `npm start`            | Start the server (http://localhost:3000)     |
| `npm run dev`          | Start with auto-reload                       |
| `npm run db:push`      | Push schema to DB (create tables)            |
| `npm run db:seed`      | Load demo data + admin user                  |
| `npm run db:migrate`   | Create/apply a new Prisma migration          |
| `npm run db:studio`    | Open Prisma Studio (DB GUI) at :5555         |
| `npm run db:generate`  | Regenerate the Prisma client                 |

## 🔒 Security

- Passwords hashed with **bcrypt** (cost 12).
- **JWT**-based authentication with expiry.
- **Helmet** sets secure HTTP headers (including a CSP).
- **CORS** restricted to configured origins.
- **express-validator** for input validation on every write endpoint.
- **Rate limiting** on the API and stricter limits on auth/forms.
- **XSS** sanitization strips `<script>`/event-handler payloads from input.
- **Prisma** uses parameterised queries, so SQL injection is not possible.
- Account lockout after repeated failed logins.

## 📄 License

Private project. © Serene Dental Clinic.
