/**
 * Watchlist Service
 * User watchlist management synchronized with real-time market state.
 */

const marketState = require("./marketState");

// In-memory watchlist store per userId (default 'default_user')
const userWatchlists = new Map();

function getUserWatchlist(userId = "default_user") {
  if (!userWatchlists.has(userId)) {
    userWatchlists.set(userId, ["BTCUSDT", "ETHUSDT", "SOLUSDT"]);
  }
  const symbols = userWatchlists.get(userId);

  return symbols.map((symbol) => {
    const asset = marketState.getAssetState(symbol);
    if (!asset) {
      return {
        symbol,
        currentPrice: "NOT AVAILABLE",
        change24h: "NOT AVAILABLE",
        marketStatus: "OFFLINE",
        currentSignal: "WAIT",
        signalConfidence: 0,
      };
    }

    const signalCard = asset.activeSignals && asset.activeSignals.length > 0 ? asset.activeSignals[0] : null;

    return {
      symbol: asset.symbol,
      currentPrice: asset.currentPrice,
      change24h: asset.change24h,
      volume24h: asset.volume24h,
      marketStatus: asset.marketStatus,
      dataFreshness: asset.dataFreshness,
      lastUpdate: asset.lastUpdate,
      currentSignal: signalCard ? signalCard.signal : "WAIT",
      signalConfidence: signalCard ? signalCard.confidence : 0,
      qualityCategory: signalCard ? signalCard.qualityCategory : "NO CLEAR SETUP",
    };
  });
}

function addToWatchlist(symbol, userId = "default_user") {
  if (!userWatchlists.has(userId)) {
    userWatchlists.set(userId, ["BTCUSDT", "ETHUSDT", "SOLUSDT"]);
  }
  const list = userWatchlists.get(userId);
  if (!list.includes(symbol)) {
    list.push(symbol);
  }
  return getUserWatchlist(userId);
}

function removeFromWatchlist(symbol, userId = "default_user") {
  if (!userWatchlists.has(userId)) return [];
  const list = userWatchlists.get(userId);
  const updated = list.filter((s) => s !== symbol);
  userWatchlists.set(userId, updated);
  return getUserWatchlist(userId);
}

function reorderWatchlist(orderedSymbols, userId = "default_user") {
  userWatchlists.set(userId, orderedSymbols);
  return getUserWatchlist(userId);
}

module.exports = {
  getUserWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  reorderWatchlist,
};
