/**
 * Order Execution & Confirmation Engine
 * Handles order confirmation flow, order submission, and offline market protection.
 */

const marketState = require("./marketState");
const { getPortfolio } = require("./portfolio");

const executedOrders = [];

/**
 * Stage 1: Generate Order Confirmation Preview
 */
function createOrderPreview(params) {
  const {
    asset,
    direction, // LONG / BUY or SHORT / SELL
    orderType, // MARKET, LIMIT, STOP
    quantity,
    price = null,
    stopLoss = null,
    takeProfit = null,
  } = params;

  const assetState = marketState.getAssetState(asset);
  if (!assetState) {
    throw new Error(`Asset ${asset} not found in market feed.`);
  }

  // Check Offline / Stale Order Protection
  if (assetState.marketStatus === "OFFLINE" || assetState.dataFreshness === "OFFLINE") {
    throw new Error("ORDER REJECTED: Market feed is OFFLINE. Cannot execute order with stale data.");
  }
  if (assetState.marketStatus === "RECONNECTING") {
    throw new Error("ORDER REJECTED: Market feed is RECONNECTING. Execution paused.");
  }

  const executionPrice = orderType === "MARKET" ? assetState.currentPrice : (price || assetState.currentPrice);
  const totalValue = executionPrice * quantity;

  let estimatedRiskAmount = "NOT AVAILABLE";
  let estimatedRiskPercent = "NOT AVAILABLE";

  if (stopLoss) {
    const riskDistance = Math.abs(executionPrice - stopLoss);
    const totalRisk = riskDistance * quantity;
    estimatedRiskAmount = Number(totalRisk.toFixed(2));
    estimatedRiskPercent = Number(((riskDistance / executionPrice) * 100).toFixed(2));
  }

  const orderConfirmationToken = `ord_preview_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  return {
    confirmationToken: orderConfirmationToken,
    preview: {
      asset,
      direction,
      orderType,
      quantity,
      price: executionPrice,
      totalValue: Number(totalValue.toFixed(2)),
      stopLoss: stopLoss ? Number(stopLoss.toFixed(4)) : "NOT SET",
      takeProfit: takeProfit ? Number(takeProfit.toFixed(4)) : "NOT SET",
      estimatedRiskAmount,
      estimatedRiskPercent,
      marketStatus: assetState.marketStatus,
      dataFreshness: assetState.dataFreshness,
      dataTimestamp: assetState.lastUpdate,
      requiresExplicitConfirmation: true,
    },
  };
}

/**
 * Stage 2: Confirm and Execute Order
 */
function executeOrder(confirmationToken, previewData, userConfirmed = false) {
  if (!userConfirmed) {
    throw new Error("ORDER CANCELLED: Explicit user confirmation required to execute order.");
  }

  const { asset, direction, orderType, quantity, price, stopLoss, takeProfit } = previewData;

  const assetState = marketState.getAssetState(asset);
  if (!assetState || assetState.dataFreshness === "OFFLINE" || assetState.marketStatus === "OFFLINE") {
    throw new Error("EXECUTION BLOCKED: Market data became OFFLINE or STALE prior to execution.");
  }

  const orderId = `ord_exec_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const orderRecord = {
    id: orderId,
    confirmationToken,
    asset,
    direction,
    orderType,
    quantity,
    executedPrice: price,
    stopLoss,
    takeProfit,
    executedAt: new Date().toISOString(),
    status: "EXECUTED",
  };

  executedOrders.push(orderRecord);

  return {
    success: true,
    message: `Order executed successfully: ${direction} ${quantity} ${asset} at $${price}`,
    order: orderRecord,
  };
}

function getExecutedOrders() {
  return [...executedOrders];
}

module.exports = {
  createOrderPreview,
  executeOrder,
  getExecutedOrders,
};
