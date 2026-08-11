# FINAL HANDOVER & PRODUCTION DEPLOYMENT GUIDE — AURUM

## 1. ARCHITECTURE OVERVIEW

The Aurum platform consists of:
- **Mobile Client:** Native Flutter App (`com.aurum.app`) for Android and iOS.
- **Backend API & Real-Time Engine:** Node.js Express REST API & WebSocket Server (`server/`).
- **Database:** PostgreSQL with Prisma ORM (`prisma/schema.prisma`).
- **Admin Panel:** Protected Management Dashboard (`public/admin/`).

---

## 2. KEY PRODUCTION COMMANDS

### Running Backend API & Real-Time WebSocket Server
```bash
# Production server launch
npm start

# Running full automated test suite (39 tests)
npm test
```

### Database Operations
```bash
# Push Prisma schema to PostgreSQL database
npm run db:push

# Seed demo data / initial admin user
npm run db:seed
```

---

## 3. GOOGLE PLAY STORE SUBMISSION CHECKLIST

1. **Upload AAB:** Upload `build/app/outputs/bundle/release/app-release.aab` to Google Play Console.
2. **Data Safety Form:** Refer to `docs/DATA_SAFETY.md` for exact form field mappings.
3. **Privacy Policy URL:** Point store listing to `https://aurum.app/privacy.html` (reference: `docs/PRIVACY_POLICY.md`).
4. **Account Deletion URL:** Point store listing to `https://aurum.app/account-deletion.html` (backend endpoint: `POST /api/auth/delete-account`).
5. **Store Description & Risk Disclosures:** Refer to `docs/GOOGLE_PLAY_COMPLIANCE.md` and `docs/RISK_DISCLOSURE.md`.

---

## 4. OPERATIONAL EMERGENCY CONTROLS

In the event of an operational anomaly, administrators can trigger feature-flag toggles via `POST /api/trading/controls/update`:
- `signalsEnabled: false` — Pauses signal generation.
- `ordersEnabled: false` — Disables live order preview/execution.
- `aiEnabled: false` — Gracefully switches AI explanations to `AI UNAVAILABLE`.
- `notificationsEnabled: false` — Pauses push notification dispatches.

Refer to `docs/SECURITY_INCIDENT_RESPONSE.md` and `docs/ROLLBACK_PROCEDURE.md` for full incident playbooks.
