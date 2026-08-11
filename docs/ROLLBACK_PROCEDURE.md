# PRODUCTION ROLLBACK PLAYBOOK — AURUM

## 1. Overview
In the event of a critical post-deployment failure or regression, follow this playbook to safely roll back services without data loss or prolonged downtime.

---

## 2. Fast Feature-Flag Rollback (Zero Downtime)
Before initiating code rollbacks, attempt immediate operational containment via Feature Flags (`POST /api/trading/controls/update`):
- Disable malfunctioning signals: `signalsEnabled: false`
- Disable live order execution: `ordersEnabled: false`
- Disable AI processing: `aiEnabled: false`

---

## 3. Backend API Rollback
1. **Identify Previous Stable Release Commit:**
   ```bash
   git log --oneline -n 5
   ```
2. **Revert Application Deployment via Process Manager / Git:**
   ```bash
   git checkout <PREVIOUS_STABLE_COMMIT_SHA>
   npm install --production
   pm2 restart aurum-backend
   ```
3. **Verify Service Health:**
   ```bash
   curl http://localhost:3000/api/trading/health
   ```

---

## 4. Database Schema Migration Rollback Policy
- **Rule:** Never execute automatic downward migrations (`prisma migrate resolve`) without prior snapshot backups.
- **Backward-Compatible Schema Policy:** Database columns added in new releases are non-destructive and nullable, ensuring previous backend code remains compatible without requiring immediate schema rollback.
- If data corruption occurs, execute point-in-time database restore as documented in `docs/BACKUP_AND_RESTORE.md`.

---

## 5. Mobile Client Rollback Policy
- Mobile binary rollbacks are managed via Google Play Console -> Release Management -> Rollback / Staged Rollout Halting.
- If a client binary bug occurs, halt staged rollout in Play Console immediately and push hotfix patch release version `1.0.1` (`versionCode 101`).
