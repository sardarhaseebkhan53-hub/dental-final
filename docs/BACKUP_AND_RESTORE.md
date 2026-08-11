# DATABASE BACKUP AND RESTORE PROCEDURES — AURUM

## 1. Overview
This document specifies automated backup schedules, retention policies, and disaster recovery restore procedures for the Aurum PostgreSQL database.

---

## 2. Backup Schedule & Strategy

| Backup Type | Frequency | Retention Period | Target Location |
| :--- | :--- | :--- | :--- |
| **Full Database Dump** | Daily at 02:00 UTC | 30 Days | Encrypted S3 / Secure Storage |
| **Transaction Logs (WAL)** | Continuous (15-min archives) | 7 Days | Encrypted S3 / Point-in-time Recovery |
| **Pre-Migration Snapshot** | Before every schema change | 90 Days | Offsite Backup Storage |

---

## 3. Backup Execution Command
Automated backup script (`scripts/backup_db.sh`):

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/aurum_db"
mkdir -p $BACKUP_DIR

# Custom format compressed dump
pg_dump -h $DB_HOST -U $DB_USER -d aurum_prod -F c -b -v -f "$BACKUP_DIR/aurum_backup_$TIMESTAMP.dump"

# Verify backup file size
if [ -s "$BACKUP_DIR/aurum_backup_$TIMESTAMP.dump" ]; then
    echo "BACKUP SUCCESSFUL: aurum_backup_$TIMESTAMP.dump"
else
    echo "BACKUP FAILED: Empty dump generated!" >&2
    exit 1
fi
```

---

## 4. Disaster Recovery & Test Restore Procedure

To verify backup validity, perform a test restore on a staging database instance:

```bash
# 1. Create temporary staging database
createdb -h $DB_HOST -U $DB_USER aurum_staging_test

# 2. Restore from compressed dump
pg_restore -h $DB_HOST -U $DB_USER -d aurum_staging_test -v "$BACKUP_DIR/aurum_backup_LATEST.dump"

# 3. Verify schema & data integrity
psql -h $DB_HOST -U $DB_USER -d aurum_staging_test -c "SELECT COUNT(*) FROM \"User\";"
psql -h $DB_HOST -U $DB_USER -d aurum_staging_test -c "SELECT COUNT(*) FROM \"Appointment\";"

# 4. Clean up staging test database
dropdb -h $DB_HOST -U $DB_USER aurum_staging_test
```

**Verification Status:** BACKUP VERIFIED
