/**
 * Portfolio Manager
 * Tracks user cash balances, active open positions, unrealized/realized P/L, and asset allocation.
 */

const marketState = require("./marketState");

// User portfolios store (default 'default_user')
const userPortfolios = new Map();

function getInitialPortfolio() {
  return {
    availableBalance: 50000.0, // $50,000 initial USDT cash
    realizedPL: 1250.50,
    positions: [
      {
        id: "pos_btc_01",
        symbol: "BTCUSDT",
        direction: "LONG",
        quantity: 0.5,
        entryPrice: 63500.0,
      },
      {
        id: "pos_eth_01",
        symbol: "ETHUSDT",
        direction: "LONG",
        quantity: 3.0,
        entryPrice: 3400.0,
      },
    ],
  };
}

function getPortfolio(userId = "default_user") {
  if (!userPortfolios.has(userId)) {
    userPortfolios.set(userId, getInitialPortfolio());
  }

  const raw = userPortfolios.get(userId);
  let totalPositionValue = 0;
  let totalUnrealizedPL = 0;
  const enrichedPositions = [];

  for (const pos of raw.positions) {
    const asset = marketState.getAssetState(pos.symbol);
    const currentPrice = asset ? asset.currentPrice : pos.entryPrice;

    let positionValue = 0;
    let unrealizedPL = 0;
    let unrealizedPLPercent = 0;

    if (pos.direction === "LONG") {
      positionValue = currentPrice * pos.quantity;
      unrealizedPL = (currentPrice - pos.entryPrice) * pos.quantity;
      unrealizedPLPercent = pos.entryPrice > 0 ? ((currentPrice - pos.entryPrice) / pos.entryPrice) * 100 : 0;
    } else {
      positionValue = currentPrice * pos.quantity;
      unrealizedPL = (pos.entryPrice - currentPrice) * pos.quantity;
      unrealizedPLPercent = pos.entryPrice > 0 ? ((pos.entryPrice - currentPrice) / pos.entryPrice) * 100 : 0;
    }

    totalPositionValue += positionValue;
    totalUnrealizedPL += unrealizedPL;

    enrichedPositions.push({
      id: pos.id,
      symbol: pos.symbol,
      direction: pos.direction,
      quantity: pos.quantity,
      entryPrice: pos.entryPrice,
      currentPrice: Number(currentPrice.toFixed(4)),
      positionValue: Number(positionValue.toFixed(2)),
      unrealizedPL: Number(unrealizedPL.toFixed(2)),
      unrealizedPLPercent: Number(unrealizedPLPercent.toFixed(2)),
      marketStatus: asset ? asset.marketStatus : "OFFLINE",
    });
  }

  const totalValue = raw.availableBalance + totalPositionValue;

  // Asset allocation breakdown
  const assetAllocation = [];
  if (totalValue > 0) {
    assetAllocation.push({
      asset: "CASH (USDT)",
      value: Number(raw.availableBalance.toFixed(2)),
      percentage: Number(((raw.availableBalance / totalValue) * 100).toFixed(2)),
    });

    for (const p of enrichedPositions) {
      assetAllocation.push({
        asset: p.symbol,
        value: p.positionValue,
        percentage: Number(((p.positionValue / totalValue) * 100).toFixed(2)),
      });
    }
  }

  return {
    totalValue: Number(totalValue.toFixed(2)),
    availableBalance: Number(raw.availableBalance.toFixed(2)),
    realizedPL: Number(raw.realizedPL.toFixed(2)),
    unrealizedPL: Number(totalUnrealizedPL.toFixed(2)),
    totalExposure: Number(totalPositionValue.toFixed(2)),
    positions: enrichedPositions,
    assetAllocation,
  };
}

module.exports = {
  getPortfolio,
};
