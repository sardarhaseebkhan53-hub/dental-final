# ACCOUNT DELETION POLICY & INSTRUCTIONS — AURUM

## Google Play Account Deletion Requirement Compliance

Google Play requires developers to provide a clear, accessible method for users to request account deletion both within the app and via a web endpoint.

---

## 1. In-App Deletion Procedure
1. Open the **Aurum** mobile application.
2. Log into your account.
3. Tap the **Profile / Settings** icon in the top right corner or bottom navigation bar.
4. Scroll down to **Account Management**.
5. Select **Delete Account**.
6. Review the confirmation prompt informing you that deletion is permanent and immediate.
7. Tap **Confirm Account Deletion**.

Upon confirmation, your session is invalidated, and your account data is permanently deleted from the active database.

---

## 2. API / Web Endpoint Deletion
Users who cannot access the mobile application may execute an authenticated account deletion request via our backend API:

- **Endpoint:** `POST /api/auth/delete-account`
- **Headers:** `Authorization: Bearer <your_jwt_token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Your account and associated data have been permanently deleted.",
    "data": {
      "deletedAt": "2026-08-11T07:20:00.000Z"
    }
  }
  ```

---

## 3. Data Scope Purged Upon Deletion
Executing an account deletion permanently purges:
- Email address and encrypted password hash
- First name, last name, phone number, avatar URL
- Saved watchlists and custom asset ordering
- Configured price alerts and signal notification rules
- Virtual portfolio positions, trade logs, and risk preferences
- JWT refresh tokens and active login sessions
