# GOOGLE PLAY DATA SAFETY DECLARATION — AURUM

This document provides the reference data for filling out the **Data Safety** form in the Google Play Console for **Aurum (`com.aurum.app`)**.

---

## 1. Overview of Data Collection

| Data Type | Collected | Shared | Required / Optional | Purpose |
| :--- | :---: | :---: | :---: | :--- |
| **Email Address** | Yes | No | Required for Account | User authentication, account recovery |
| **Name** | Yes | No | Optional | Personalization within app |
| **User Identifiers (User ID)** | Yes | No | Required | Account management, watchlist & portfolio association |
| **App Interactions / Preferences** | Yes | No | Optional | Watchlist items, scanner filters, custom price alerts |
| **Device Token (Push Notification)** | Yes | No | Optional | Price & market signal push notifications |
| **Crash / Performance Logs** | Yes | No | Optional | Security protection, system rate limiting |

---

## 2. Security Practices

- **Data Encrypted in Transit:** Yes. All client-server communications use HTTPS (TLS 1.3) and WSS (WebSocket Secure).
- **Data Deletion Supported:** Yes. Users can request complete account and data deletion directly within the mobile application or via API endpoint `POST /api/auth/delete-account`.
- **No Third-Party Advertising:** The application does not contain third-party ad SDKs or tracking networks.

---

## 3. Account Deletion Policy Compliance

- **In-App Path:** Settings -> Security -> Delete Account
- **Web / API Endpoint:** `https://api.aurum.app/api/auth/delete-account`
- **Data Purged:** Account credentials, JWT tokens, user watchlists, alert rules, portfolio positions, and notification settings.
