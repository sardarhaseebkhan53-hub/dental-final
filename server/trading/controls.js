/**
 * Operational Controls & Feature Flags
 * Admin emergency controls to independently toggle platform capabilities.
 */

const systemControls = {
  signalsEnabled: true,
  aiEnabled: true,
  ordersEnabled: true,
  notificationsEnabled: true,
  scannerEnabled: true,
};

const auditLogs = []; // In-memory operational audit log

function getSystemControls() {
  return { ...systemControls };
}

function updateSystemControls(updates, adminUser = "admin") {
  const previous = { ...systemControls };

  for (const [key, value] of Object.entries(updates)) {
    if (key in systemControls && typeof value === "boolean") {
      systemControls[key] = value;
    }
  }

  const logEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    adminUser,
    action: "UPDATE_OPERATIONAL_CONTROLS",
    previous,
    updated: { ...systemControls },
    timestamp: new Date().toISOString(),
  };

  auditLogs.push(logEntry);

  return { controls: getSystemControls(), logEntry };
}

function getAuditLogs() {
  return [...auditLogs];
}

module.exports = {
  getSystemControls,
  updateSystemControls,
  getAuditLogs,
};
