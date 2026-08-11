# GOOGLE PLAY STORE COMPLIANCE & STORE LISTING AUDIT — AURUM

## 1. Application Metadata

| Field | Production Value |
| :--- | :--- |
| **App Name** | Aurum — Trading Intelligence & Real-Time Signals |
| **Package Name / Application ID** | `com.aurum.app` |
| **Category** | Finance / Technical Tools |
| **Target SDK Version** | Android 14 (API level 34) |
| **Min SDK Version** | Android 7.0 (API level 24) |
| **Version Name** | `1.0.0` |
| **Version Code** | `100` |
| **Privacy Policy URL** | `https://aurum.app/privacy.html` |
| **Account Deletion URL** | `https://aurum.app/account-deletion.html` |
| **Support Email** | `support@aurum.app` |

---

## 2. Store Listing Content

### Short Description (Max 80 chars)
Real-time market data, technical indicator analysis, AI signals & portfolio tools.

### Full Description
Aurum is a production-grade trading intelligence and real-time market analysis platform designed for traders seeking evidence-based market insights.

**Key Features:**
- **Real-Time Market State:** Live price updates, 24H changes, volume, and data freshness indicators.
- **Evidence-Based Signal Engine:** Transparent signal scoring (`BUY`, `SELL`, `WAIT`) driven by multi-timeframe indicator confluence (RSI, MACD, Moving Averages, Bollinger Bands, ATR).
- **Market Regime Detection:** Classifies market conditions into Trending, Ranging, Breakout, Pullback, and Volatility states.
- **AI Analysis Explanations:** Clear "WHY THIS SIGNAL?" breakdowns evaluating trend, momentum, volume, and structure.
- **Market Scanner:** Efficient multi-asset scanning using custom filters (timeframe, direction, confidence, volume, volatility).
- **Price & Signal Alerts:** Custom price thresholds, target/stop alerts, and signal generation notifications.
- **Portfolio & Risk Management:** Live mark-to-market position tracking, exposure analysis, and mathematical position sizing calculators.
- **Historical Backtesting:** Strategy testing with strict zero look-ahead bias, fee/slippage modeling, win rate, and drawdown statistics.

*Disclaimer: Market analysis and signals are probabilistic estimates based on historical price action and technical indicator formulas. They do not constitute financial advice or guaranteed outcomes. Trading involves risk of loss.*

---

## 3. Android Permissions Audit (`AndroidManifest.xml`)

| Permission | Purpose | Justification |
| :--- | :--- | :--- |
| `android.permission.INTERNET` | Required | Fetch real-time market feed, REST API endpoints, and WebSocket stream. |
| `android.permission.ACCESS_NETWORK_STATE` | Required | Detect network state changes (Internet ON/OFF) for offline UI indication. |
| `android.permission.POST_NOTIFICATIONS` | Optional (Runtime) | Deliver price alert and signal notifications requested by user. |
| `android.permission.VIBRATE` | Optional | Haptic feedback for price alert triggers. |

No dangerous permissions (`CAMERA`, `READ_CONTACTS`, `ACCESS_FINE_LOCATION`, `READ_EXTERNAL_STORAGE`) requested.

---

## 4. Google Play Compliance Checklist

- [x] Application ID matches `com.aurum.app`.
- [x] Privacy Policy published and accessible.
- [x] Account Deletion mechanism implemented in-app and via API (`POST /api/auth/delete-account`).
- [x] Data Safety declarations accurate (no third-party tracking, encryption in transit).
- [x] Risk Disclosures explicit and non-misleading (no "100% accuracy" or "guaranteed profit" claims).
- [x] Minimal Android permissions requested.
- [x] Offline state handling & stale price protections active.
- [x] Production environment credentials segregated (no secrets shippable in client APK/AAB).
