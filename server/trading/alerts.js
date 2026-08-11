/**
 * Price & Signal Alerts Engine
 * Monitors unified market state for price thresholds, signal events, and regime shifts.
 */

const marketState = require("./marketState");
const { sendPushNotification } = require("./notifications");

const userAlerts = new Map(); // alertId -> alert

function createAlert(params) {
  const {
    userId = "default_user",
    asset,
    conditionType, // PRICE_ABOVE, PRICE_BELOW, PERCENT_CHANGE, SIGNAL_GENERATED, TARGET_REACHED, STOP_REACHED, MARKET_CONDITION
    targetValue,
    notes = "",
  } = params;

  if (!asset || !conditionType) {
    throw new Error("Asset and conditionType are required.");
  }

  const alertId = `alt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const alert = {
    id: alertId,
    userId,
    asset,
    conditionType,
    targetValue,
    notes,
    createdTime: new Date().toISOString(),
    status: "ACTIVE", // ACTIVE | TRIGGERED | CANCELLED
    triggeredTime: null,
  };

  userAlerts.set(alertId, alert);
  return alert;
}

function checkAlertsForAsset(symbol, assetData) {
  const currentPrice = assetData.currentPrice;
  const signalCard = assetData.activeSignals && assetData.activeSignals.length > 0 ? assetData.activeSignals[0] : null;

  for (const alert of userAlerts.values()) {
    if (alert.asset !== symbol || alert.status !== "ACTIVE") continue;

    let triggered = false;
    let notificationText = "";

    switch (alert.conditionType) {
      case "PRICE_ABOVE":
        if (typeof alert.targetValue === "number" && currentPrice >= alert.targetValue) {
          triggered = true;
          notificationText = `${symbol} Price Alert: Price crossed above ${alert.targetValue} (Current: ${currentPrice})`;
        }
        break;

      case "PRICE_BELOW":
        if (typeof alert.targetValue === "number" && currentPrice <= alert.targetValue) {
          triggered = true;
          notificationText = `${symbol} Price Alert: Price fell below ${alert.targetValue} (Current: ${currentPrice})`;
        }
        break;

      case "PERCENT_CHANGE":
        if (Math.abs(assetData.change24h) >= Math.abs(alert.targetValue)) {
          triggered = true;
          notificationText = `${symbol} 24H Change Alert: Moved ${assetData.change24h}% (Threshold: ${alert.targetValue}%)`;
        }
        break;

      case "SIGNAL_GENERATED":
        if (signalCard && signalCard.signal !== "WAIT") {
          triggered = true;
          notificationText = `New Market Signal - Asset: ${symbol} | Timeframe: ${signalCard.timeframe} | Signal: ${signalCard.signal} SETUP | Confidence: ${signalCard.confidence}%`;
        }
        break;

      case "TARGET_REACHED":
        if (signalCard && signalCard.target !== "NOT AVAILABLE" && currentPrice >= signalCard.target) {
          triggered = true;
          notificationText = `${symbol} Target Reached: Price ${currentPrice} reached target ${signalCard.target}`;
        }
        break;

      case "STOP_REACHED":
        if (signalCard && signalCard.stop !== "NOT AVAILABLE" && currentPrice <= signalCard.stop) {
          triggered = true;
          notificationText = `${symbol} Stop Loss Reached: Price ${currentPrice} hit stop ${signalCard.stop}`;
        }
        break;

      case "MARKET_CONDITION":
        if (assetData.marketRegime && assetData.marketRegime.regime === alert.targetValue) {
          triggered = true;
          notificationText = `${symbol} Regime Shift: Market regime transitioned to ${alert.targetValue}`;
        }
        break;
    }

    if (triggered) {
      alert.status = "TRIGGERED";
      alert.triggeredTime = new Date().toISOString();

      // Dispatch real push notification
      sendPushNotification({
        userId: alert.userId,
        title: `Alert Triggered: ${symbol}`,
        message: notificationText,
        data: { alertId: alert.id, asset: symbol, price: currentPrice },
      });
    }
  }
}

// Hook into marketState updates
marketState.subscribe(({ symbol, data }) => {
  checkAlertsForAsset(symbol, data);
});

function getUserAlerts(userId = "default_user") {
  return Array.from(userAlerts.values()).filter((a) => a.userId === userId);
}

function cancelAlert(alertId) {
  const alert = userAlerts.get(alertId);
  if (alert) {
    alert.status = "CANCELLED";
    return alert;
  }
  return null;
}

module.exports = {
  createAlert,
  getUserAlerts,
  cancelAlert,
  checkAlertsForAsset,
};
