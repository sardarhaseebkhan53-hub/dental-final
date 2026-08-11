/**
 * Push Notification Service
 * Dispatches real-event notifications respecting user preferences.
 */

const userNotificationSettings = new Map(); // userId -> settings
const notificationLogs = []; // Audit log of dispatched notifications

function getUserSettings(userId = "default_user") {
  if (!userNotificationSettings.has(userId)) {
    userNotificationSettings.set(userId, {
      enabled: true,
      priceAlerts: true,
      signalAlerts: true,
      targetStopAlerts: true,
      regimeAlerts: true,
    });
  }
  return userNotificationSettings.get(userId);
}

function updateUserSettings(settings, userId = "default_user") {
  const current = getUserSettings(userId);
  const updated = { ...current, ...settings };
  userNotificationSettings.set(userId, updated);
  return updated;
}

function sendPushNotification(payload) {
  const { userId = "default_user", title, message, data } = payload;
  const settings = getUserSettings(userId);

  if (!settings.enabled) {
    return { success: false, reason: "User has disabled push notifications." };
  }

  const notification = {
    id: `ntf_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    userId,
    title,
    message: `${message}\n\nDisclaimer: Market analysis signals are non-guaranteed probabilistic estimates.`,
    data: data || {},
    timestamp: new Date().toISOString(),
    status: "DELIVERED",
  };

  notificationLogs.push(notification);

  return { success: true, notification };
}

function getNotificationHistory(userId = "default_user") {
  return notificationLogs.filter((n) => n.userId === userId);
}

module.exports = {
  getUserSettings,
  updateUserSettings,
  sendPushNotification,
  getNotificationHistory,
};
