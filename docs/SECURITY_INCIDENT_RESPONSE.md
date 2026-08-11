# SECURITY INCIDENT RESPONSE & OPERATIONAL PLAYBOOK — AURUM

**Effective Date:** August 11, 2026

## 1. Overview & Objectives
This Security Incident Response Plan defines operational containment, investigation, recovery, and post-incident verification procedures for the **Aurum** trading intelligence platform.

---

## 2. Severity Classification

| Severity Level | Description | Target Containment Window |
| :--- | :--- | :--- |
| **P0 — Critical** | Database breach, secret compromise, active DDoS, total API outage | < 15 minutes |
| **P1 — Major** | Market feed outage, AI pipeline crash, order execution failure | < 30 minutes |
| **P2 — Moderate** | High API latency (>500ms), single asset feed delay, notification failure | < 2 hours |
| **P3 — Minor** | Non-critical cosmetic bug, minor admin UI glitch | < 24 hours |

---

## 3. Incident Playbooks by Category

### A. API Outage / High Failure Rate
1. **Detection:** Health check endpoint `GET /api/trading/health` returns `DOWN` or HTTP 5xx error rate > 2%.
2. **Containment:** Route traffic through load balancer to healthy backup node or static error fallback.
3. **Investigation:** Inspect server logs (`pm2 logs`), verify node process memory, CPU utilization, and rate limiters.
4. **Recovery:** Restart backend service process or scale instance count.
5. **Verification:** Confirm `GET /api/health` and `GET /api/trading/state` return HTTP 200 with `< 50ms` latency.

### B. Market Feed / WebSocket Outage
1. **Detection:** Market feed health monitor flags data freshness as `STALE` or `OFFLINE` (>10s without tick update).
2. **Containment:** Signal Engine automatically triggers **Signal Safety Gate** (forces `WAIT` status, halts new signal creation). Order Engine blocks new order submissions.
3. **Investigation:** Check upstream exchange WebSocket connections, reconnect logs, and network egress.
4. **Recovery:** Trigger market feed reconnect sequence (`marketState.setMarketStatus('RECONNECTING')`).
5. **Verification:** Verify tick update timestamps normalize and status transitions back to `LIVE`.

### C. Database Outage / Connection Failure
1. **Detection:** Prisma client connection timeout or database query failure logs.
2. **Containment:** Platform automatically degrades gracefully to in-memory fallback state with read-only access.
3. **Investigation:** Inspect PostgreSQL connection pool, Disk space (`df -h`), and database server process (`systemctl status postgresql`).
4. **Recovery:** Restart PostgreSQL service or restore primary connection pool.
5. **Verification:** Execute `npx prisma db push --preview` health test.

### D. AI Analysis Service Failure
1. **Detection:** AI request timeout (>5s) or HTTP 503 from AI provider endpoint.
2. **Containment:** System toggles `aiEnabled: false` via Emergency Controls (`controls.js`).
3. **Behavior:** App gracefully displays `"AI UNAVAILABLE"` in signal card explanations without crashing or inventing fake evidence.
4. **Recovery:** Re-enable `aiEnabled: true` once upstream AI API health is restored.

### E. Credential / Secret Compromise
1. **Detection:** Unauthorized API key usage or suspicious admin access attempt.
2. **Containment:** Immediately revoke compromised JWT secrets / API keys in `.env`.
3. **Investigation:** Review admin audit logs (`GET /api/trading/audit-logs`) to identify compromised accounts or unauthorized IP addresses.
4. **Recovery:** Rotate JWT secrets, cycle database credentials, force-logout active sessions.
5. **Post-Incident:** Notify affected users and file security post-mortem report.

---

## 4. Emergency Operational Controls
Administrators can trigger immediate service toggles via `POST /api/trading/controls/update`:
- `signalsEnabled: false` -> Halts new signal creation.
- `ordersEnabled: false` -> Disables live order preview and execution.
- `aiEnabled: false` -> Switches AI explanations to graceful fallback.
- `notificationsEnabled: false` -> Pauses push notification delivery.
