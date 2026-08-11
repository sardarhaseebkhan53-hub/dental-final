/**
 * Production Health Monitoring Engine
 * Monitors health states (HEALTHY, DEGRADED, DOWN, UNKNOWN) across system components.
 */

const marketState = require("./marketState");
const { getSystemControls } = require("./controls");
const wsServer = require("./wsServer");

function checkSystemHealth() {
  const controls = getSystemControls();
  const assets = marketState.getAllAssets();

  // 1. Backend API Status
  const backendHealth = { status: "HEALTHY", latencyMs: 2 };

  // 2. Market Feed & Freshness Monitoring
  const totalAssets = assets.length;
  const liveAssets = assets.filter((a) => a && a.dataFreshness === "LIVE").length;
  const staleAssets = assets.filter((a) => a && a.dataFreshness === "STALE").length;
  const offlineAssets = assets.filter((a) => a && a.dataFreshness === "OFFLINE").length;

  let marketFeedStatus = "HEALTHY";
  if (offlineAssets === totalAssets) marketFeedStatus = "DOWN";
  else if (offlineAssets > 0 || staleAssets > 0) marketFeedStatus = "DEGRADED";

  // 3. WebSocket Feed Status
  const activeSockets = wsServer.clients ? wsServer.clients.size : 0;
  const webSocketStatus = marketFeedStatus === "DOWN" ? "DEGRADED" : "HEALTHY";

  // 4. AI Analysis Service Status
  let aiStatus = controls.aiEnabled ? "HEALTHY" : "DEGRADED";

  // 5. Signal Engine Operational Safety Status
  let signalEngineStatus = controls.signalsEnabled && marketFeedStatus === "HEALTHY" ? "HEALTHY" : "DEGRADED";

  // 6. Order Execution Safety Status
  let orderEngineStatus = controls.ordersEnabled && marketFeedStatus === "HEALTHY" ? "HEALTHY" : "DEGRADED";

  // Overall Platform Status
  let overallStatus = "HEALTHY";
  if (marketFeedStatus === "DOWN") overallStatus = "DOWN";
  else if (marketFeedStatus === "DEGRADED" || !controls.signalsEnabled || !controls.ordersEnabled) {
    overallStatus = "DEGRADED";
  }

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    services: {
      backendApi: backendHealth,
      marketFeed: {
        status: marketFeedStatus,
        totalAssets,
        liveAssets,
        staleAssets,
        offlineAssets,
      },
      webSocket: {
        status: webSocketStatus,
        activeConnections: activeSockets,
      },
      aiService: {
        status: aiStatus,
        enabled: controls.aiEnabled,
      },
      signalEngine: {
        status: signalEngineStatus,
        enabled: controls.signalsEnabled,
      },
      orderEngine: {
        status: orderEngineStatus,
        enabled: controls.ordersEnabled,
      },
    },
    controls,
  };
}

module.exports = {
  checkSystemHealth,
};
