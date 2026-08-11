# PRIVACY POLICY — AURUM TRADING INTELLIGENCE

**Effective Date:** August 11, 2026

## 1. Introduction
Welcome to **Aurum** ("we", "our", or "us"). We respect your privacy and are committed to protecting the personal data of users ("you") who use the Aurum mobile application and backend services. This Privacy Policy explains what data we collect, how it is processed, encrypted, stored, and your rights to access or delete your information.

---

## 2. Information We Collect
We collect only the minimum data required to provide real-time market data, technical analysis, trading signals, portfolio tracking, alerts, and user accounts.

### A. Account & Authentication Information
- **Registration Details:** Email address, password hash (encrypted using bcrypt), optional name, and phone number.
- **Session Identifiers:** JSON Web Tokens (JWT) for secure authentication.

### B. App Preferences & User Inputs
- **Watchlist & Alerts:** Assets added to your watchlist, custom price alert thresholds, and notification preferences.
- **Portfolio & Order Simulations:** Virtual position sizes, entry prices, and simulated orders.

### C. Device & Operational Information
- **Push Notification Tokens:** Device push tokens strictly used to deliver price and signal alert notifications.
- **Log Information:** IP address, rate-limiting metadata, and timestamp logs for security protection and account lockout enforcement.

---

## 3. Data Encryption & Security
- **Data in Transit:** All data transmitted between the Aurum app and our backend servers is encrypted using standard Transport Layer Security (TLS 1.3 / HTTPS) and WebSocket Secure (WSS).
- **Data at Rest:** Passwords are hashed with bcrypt (cost factor 12). Private exchange API credentials, where applicable, are stored server-side with AES-256 encryption and are never exposed to the client application.

---

## 4. How We Use Your Data
We use collected data solely for:
- Authenticating your account session.
- Delivering real-time market data, technical indicator metrics, and AI analysis.
- Processing user watchlists, scanner filters, custom alerts, and portfolio tracking.
- Sending alert push notifications when user-configured price or signal triggers fire.
- Protecting the platform against unauthorized access, brute-force attacks, and spam.

---

## 5. Third-Party Sharing
We **do not sell, rent, or trade** your personal data or financial preference information to third parties or advertising networks.

---

## 6. User Rights & Account Deletion
You have the right to request access to or permanent deletion of your account and all associated data at any time.

- **In-App Deletion:** Navigate to **Settings -> Delete Account** and confirm deletion.
- **API Request:** Send an authenticated request to `POST /api/auth/delete-account`.
- **Data Purging:** Upon request, your user record, watchlists, alerts, portfolio positions, and tokens are permanently removed from our databases.

---

## 7. Contact Us
If you have questions regarding this Privacy Policy or your data rights, contact us at:
- **Email:** support@aurum.app
- **Privacy Lead:** privacy@aurum.app
