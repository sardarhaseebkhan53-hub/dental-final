# Serene Dental — Documentation

This project is a full rebuild of the Serene Dental clinic website and admin
panel using a framework-free stack:

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Prisma ORM

See the **root `README.md`** for the feature overview, project structure, quick
start, and deployment guide, and **`SETUP.md`** for detailed first-time setup.

## API Overview

| Endpoint            | Method   | Auth | Purpose                              |
|---------------------|----------|------|--------------------------------------|
| `/api/auth/register` | POST     | —    | Patient registration                 |
| `/api/auth/login`    | POST     | —    | Login (returns JWT)                  |
| `/api/auth/me`       | GET      | JWT  | Current user profile                 |
| `/api/auth/change-password` | POST | JWT | Change own password              |
| `/api/auth/forgot-password` | POST | —  | Request a reset token               |
| `/api/auth/reset-password`  | POST | —  | Reset password with token           |
| `/api/public/services`      | GET | —  | Public services catalogue            |
| `/api/public/services/:slug`| GET | —  | Single service                       |
| `/api/public/doctors`       | GET | —  | Doctor directory                     |
| `/api/public/testimonials`  | GET | —  | Approved testimonials                |
| `/api/public/faqs`          | GET | —  | FAQs                                 |
| `/api/public/gallery`       | GET | —  | Gallery items                        |
| `/api/public/blog`          | GET | —  | Published posts                      |
| `/api/public/blog/:slug`    | GET | —  | Single post                          |
| `/api/public/contact`       | POST| —  | Contact form (rate-limited)          |
| `/api/public/newsletter`    | POST| —  | Newsletter subscribe (rate-limited)  |
| `/api/public/book-appointment` | POST | — | Create patient + appointment       |
| `/api/upload`               | POST | JWT | Image upload (local `/uploads`)      |
| `/api/admin/*`              | *    | JWT | Admin CRUD (dashboard, appointments, doctors, services, gallery, testimonials, FAQs, blog, messages, users, settings, profile) |

## Dynamic Pages

- `/services/:slug` and `/blog/:slug` render shared detail templates and load
  their content from the API (falling back to demo content offline).
