# 🦷 Junaid Dental Care — Premium Dental Clinic Website

A complete, self-hosted dental clinic website and admin panel for **Junaid Dental Care** in Ali Pur, Pakistan. Built with a lean stack and **no frameworks** on the frontend:

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Prisma ORM

> **Live clinic info (from Google Maps):** Junaid Dental Care, Lehtrar Road, near Old Bank Stop, Ali Pur 45600, Pakistan · ☎ +92 312 5028812 · ⭐ 4.6/5 (487+ reviews)

---

## ✨ Features

### Public website
- **Luxury hero section** with premium dental imagery, animated counters, Google rating
- **Comprehensive services** (12 treatments: general, cosmetic, orthodontics, implants, etc.)
- **Before & After gallery** with smile transformation slider
- **Meet our doctors** — 6 specialist dentists with detailed profiles
- **Patient journey** — step-by-step experience guide
- **Modern technology** showcase (digital X-ray, 3D imaging, laser, rotary endo)
- **Insurance partners** & flexible payment plans
- **Awards & certifications**
- **Clinic gallery** with lightbox
- **Patient testimonials** + video testimonials
- **Special offers** & pricing
- **FAQ** with categories
- **24/7 Emergency care** section
- **Latest blog** with categories, tags, SEO
- **Google Maps** integration
- **Contact form** with admin notification
- **Newsletter** subscription
- **Working hours** with live status
- **Social links** & professional footer
- **WhatsApp floating button** with pulse animation
- **Sticky appointment button**
- Mobile-first responsive design

### Appointment system
- **Patients:** Choose doctor, treatment, date, time → instant confirmation
- **Admin:** Approve, reject, reschedule, cancel with calendar view
- **Status tracking:** Pending → Confirmed → Completed / Cancelled / No-Show
- **Email notifications** (SMTP-ready)
- **WhatsApp booking** integration

### Admin panel (`/admin`)
- **Secure login** (JWT + bcrypt)
- **Dashboard** with live statistics & recent activity
- **Appointments** — full CRUD with status management
- **Doctors** — profiles, specializations, fees
- **Services** — 12 services with pricing, categories
- **Gallery** — categories, image upload, before/after
- **Testimonials** — patient reviews management
- **FAQs** — categorized knowledge base
- **Blog CMS** — posts, categories, tags, SEO
- **Contact Messages** — read, respond, archive
- **Users & Roles** — multi-role permissions
- **SEO Panel** — per-page meta title, description, keywords, OG, Twitter, Schema.org, robots.txt, sitemap.xml
- **Website Settings** — branding, contact info, business hours, emergency contact, WhatsApp, Google Maps, logo
- **SMTP / Email** — full email configuration
- **Analytics Dashboard** — page views, conversions, traffic sources
- **Backup & Restore** — full database backups
- **Image Upload** — drag-and-drop with copy URL
- **Profile & Password** — self-service
- **Roles & Permissions** — SUPER_ADMIN, ADMIN, DOCTOR, STAFF, RECEPTIONIST

### Security
- JWT authentication with expiry
- bcrypt password hashing (cost 12)
- Helmet security headers + CSP
- Rate limiting (API + auth)
- Input validation (express-validator)
- XSS sanitization
- SQL injection safe (Prisma)
- Account lockout after failed logins
- Secure file upload with type validation

---

## 🛠 Technology Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript (ES6)         |
| Backend    | Node.js, Express.js                           |
| Database   | PostgreSQL with Prisma ORM                    |
| Auth       | JWT + bcrypt password hashing                 |
| Security   | Helmet, CORS, rate limiting, input validation |
| Uploads    | Multer (local filesystem)                     |

No React, Next.js, Vue, Angular, Docker, Kubernetes, Firebase, Supabase, Redis, or cloud databases.

---

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
│   └── admin/               admin panel (HTML + JS + CSS)
├── prisma/
│   ├── schema.prisma        database schema
│   ├── seed.js              demo data + admin user
│   └── migrations/          prisma migrations
├── scripts/gen-pages.sh     regenerates legal/info pages
└── package.json
```

---

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

| Email                            | Password    | Role        |
|----------------------------------|-------------|-------------|
| `admin@junaiddentalcare.pk`      | `Admin@123` | SUPER_ADMIN |

> ⚠️ Change the default passwords immediately in production.

---

## 🌍 Deployment

The app is designed to be deployed anywhere that can run Node.js + PostgreSQL.

1. **Install Node.js 20+** on your server.
2. **Create a PostgreSQL database** (e.g. `CREATE DATABASE junaid_dental;`).
3. **Upload the project** and run `npm install`.
4. **Configure `.env`** — copy `.env.example` to `.env` and set `DATABASE_URL` and a strong `JWT_SECRET`.
5. **Run migrations** `npm run db:push` (or `npx prisma migrate deploy` if you use the provided migrations) and `npm run db:seed`.
6. **Start the server** `npm start` (run under a process manager such as `pm2` or `systemd` for production).
7. Point your domain's DNS at the server and set up a reverse proxy (nginx) for HTTPS if needed.

No Docker, no Kubernetes, no cloud services, no complicated setup.

---

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

---

## 📞 Clinic Information

- **Name:** Junaid Dental Care
- **Address:** J5WM+643, Lehtrar Road, near Old Bank Stop, Ali Pur, Islamabad Capital Territory 45600, Pakistan
- **Phone:** +92 312 5028812
- **Email:** info@junaiddentalcare.pk
- **Hours:** Mon-Sat 8:00 AM – 9:00 PM · Sunday closed (Emergency only)
- **Google Maps:** https://maps.app.goo.gl/sim1qA4wDdpcMovK7

---

## 📄 License

Private project. © Junaid Dental Care.
