/**
 * Market Scanner & Filtering Engine
 * Scans unified market state across assets and timeframes based on strategy criteria and filters.
 */

const marketState = require("./marketState");
const { analyzeMTF } = require("./mtf");

function scanMarket(options = {}) {
  const {
    timeframe = "15M",
    direction = null, // BUY, SELL, WAIT
    minConfidence = 0,
    minVolume = 0,
    volatility = null, // HIGH, LOW, NORMAL
    marketRegime = null,
    signalType = null, // STRONG_SETUP, MODERATE_SETUP, WEAK_SETUP
    strategyPreset = null, // BULLISH_STRUCTURE, BEARISH_STRUCTURE, MOMENTUM, VOLUME_EXPANSION, BREAKOUT, PULLBACK, RSI_OVERSOLD, RSI_OVERBOUGHT
  } = options;

  const allAssets = marketState.getAllAssets();
  const results = [];

  for (const asset of allAssets) {
    if (!asset || asset.dataFreshness === "OFFLINE") continue;

    const signalCard = asset.activeSignals && asset.activeSignals.length > 0 ? asset.activeSignals[0] : null;
    if (!signalCard) continue;

    // Apply strategy preset if requested
    if (strategyPreset) {
      if (strategyPreset === "BULLISH_STRUCTURE" && signalCard.trend !== "Bullish") continue;
      if (strategyPreset === "BEARISH_STRUCTURE" && signalCard.trend !== "Bearish") continue;
      if (strategyPreset === "MOMENTUM" && signalCard.momentum !== "Positive") continue;
      if (strategyPreset === "VOLUME_EXPANSION" && signalCard.volume !== "High") continue;
      if (strategyPreset === "BREAKOUT" && asset.marketRegime?.regime !== "BREAKOUT") continue;
      if (strategyPreset === "PULLBACK" && asset.marketRegime?.regime !== "PULLBACK") continue;
      if (strategyPreset === "RSI_OVERSOLD" && asset.indicators?.rsi >= 30) continue;
      if (strategyPreset === "RSI_OVERBOUGHT" && asset.indicators?.rsi <= 70) continue;
    }

    // Filter by direction
    if (direction && signalCard.signal !== direction) continue;

    // Filter by minimum confidence
    if (minConfidence > 0 && (typeof signalCard.confidence !== "number" || signalCard.confidence < minConfidence)) continue;

    // Filter by minimum 24h volume
    if (minVolume > 0 && asset.volume24h < minVolume) continue;

    // Filter by volatility
    if (volatility && signalCard.volatility !== volatility) continue;

    // Filter by market regime
    if (marketRegime && asset.marketRegime?.regime !== marketRegime) continue;

    // Filter by quality signal type
    if (signalType && signalCard.qualityCategory !== signalType) continue;

    results.push({
      symbol: asset.symbol,
      currentPrice: asset.currentPrice,
      change24h: asset.change24h,
      volume24h: asset.volume24h,
      dataFreshness: asset.dataFreshness,
      signal: signalCard,
      indicators: {
        rsi: asset.indicators?.rsi,
        macdHistogram: asset.indicators?.macd?.histogram,
        sma20: asset.indicators?.sma20,
      },
      marketRegime: asset.marketRegime?.regime,
    });
  }

  // Sort by signal confidence descending
  results.sort((a, b) => (b.signal.confidence || 0) - (a.signal.confidence || 0));

  return {
    totalScanned: allAssets.length,
    matchedCount: results.length,
    results,
  };
}

module.exports = {
  scanMarket,
};
