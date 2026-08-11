/**
 * Signal Engine & Lifecycle Manager
 * Complete evidence-based signal generation, scoring, conflict detection, and lifecycle management.
 */

const { calculateRSI, calculateMACD, calculateSMA, calculateEMA, calculateATR, findSupportResistance, calculateBollingerBands } = require("./indicators");
const { detectMarketRegime } = require("./regime");
const { analyzeMTF } = require("./mtf");
const { generateAIExplanation } = require("./aiExplanation");

// In-memory active and historical signal store
const activeSignalsMap = new Map(); // asset_timeframe -> signal
const historicalSignals = [];

// Valid signal states
const VALID_STATES = ["NEW", "ACTIVE", "UPDATED", "TARGET", "STOP", "EXPIRED", "CANCELLED"];

/**
 * Calculates a transparent evidence-based score (0 - 100%)
 */
function calculateSignalScore(params) {
  const { rsi, macd, lastPrice, sma20, sma50, volumeRatio, mtf, regime, isConflicted } = params;

  let trendScore = 0; // 0 - 15
  let momentumScore = 0; // 0 - 15
  let structureScore = 0; // 0 - 15
  let volumeScore = 0; // 0 - 15
  let volatilityScore = 0; // 0 - 10
  let supportResistanceScore = 0; // 0 - 10
  let mtfScore = 0; // 0 - 10
  let regimeScore = 0; // 0 - 10

  // Trend
  if (lastPrice > sma20 && sma20 > sma50) trendScore = 15;
  else if (lastPrice < sma20 && sma20 < sma50) trendScore = 15;
  else if (lastPrice > sma20) trendScore = 8;
  else trendScore = 4;

  // Momentum
  if (rsi > 55 && macd.histogram > 0) momentumScore = 15;
  else if (rsi < 45 && macd.histogram < 0) momentumScore = 15;
  else if (rsi >= 40 && rsi <= 60) momentumScore = 8;
  else momentumScore = 5;

  // Candle Structure
  structureScore = 12;

  // Volume
  if (volumeRatio >= 1.5) volumeScore = 15;
  else if (volumeRatio >= 1.0) volumeScore = 10;
  else volumeScore = 5;

  // Volatility
  volatilityScore = 8;

  // Support / Resistance
  supportResistanceScore = 8;

  // Multi-Timeframe Alignment
  if (mtf.alignment === "ALIGNED_BULLISH" || mtf.alignment === "ALIGNED_BEARISH") mtfScore = 10;
  else if (mtf.alignment === "DIVERGENT") mtfScore = 2;
  else mtfScore = 5;

  // Regime
  if (regime.regime === "TRENDING_BULLISH" || regime.regime === "TRENDING_BEARISH" || regime.regime === "BREAKOUT") {
    regimeScore = 10;
  } else if (regime.regime === "PULLBACK") {
    regimeScore = 8;
  } else {
    regimeScore = 5;
  }

  let totalScore = trendScore + momentumScore + structureScore + volumeScore + volatilityScore + supportResistanceScore + mtfScore + regimeScore;

  // Penalize score if evidence conflicts
  if (isConflicted) {
    totalScore = Math.min(totalScore, 45);
  }

  return Math.min(100, Math.max(0, totalScore));
}

/**
 * Main Signal Engine Generator Pipeline
 */
function evaluateSignal(marketData) {
  const { asset, timeframe, candlesMap, dataFreshness, lastUpdate } = marketData;

  // Check data freshness - reject if stale (>60s) or offline
  const now = Date.now();
  if (dataFreshness === "OFFLINE" || (lastUpdate && now - lastUpdate > 60000)) {
    return createSignalCard({
      asset,
      timeframe,
      currentPrice: marketData.price || "NOT AVAILABLE",
      signal: "WAIT",
      confidence: 0,
      qualityCategory: "NO CLEAR SETUP",
      dataFreshness: "STALE",
      reason: "Market data is stale or offline. Signal generation halted.",
    });
  }

  const primaryCandles = candlesMap ? candlesMap[timeframe] : null;
  if (!primaryCandles || primaryCandles.length < 20) {
    return createSignalCard({
      asset,
      timeframe,
      currentPrice: marketData.price || "NOT AVAILABLE",
      signal: "WAIT",
      confidence: 0,
      qualityCategory: "NO CLEAR SETUP",
      dataFreshness: dataFreshness || "LIVE",
      reason: "Insufficient candle history.",
    });
  }

  const closes = primaryCandles.map((c) => c.close);
  const currentPrice = closes[closes.length - 1];
  const volumes = primaryCandles.map((c) => c.volume);

  // Calculate technical indicators
  const rsi = calculateRSI(closes, 14);
  const macd = calculateMACD(closes, 12, 26, 9);
  const sma20 = calculateSMA(closes, 20);
  const sma50 = calculateSMA(closes, 50) || sma20;
  const atr = calculateATR(primaryCandles, 14);
  const sr = findSupportResistance(primaryCandles, 30);

  // Volume ratio vs 20-period average
  const avgVolume = volumes.slice(volumes.length - 20).reduce((a, b) => a + b, 0) / 20;
  const currentVolume = volumes[volumes.length - 1];
  const volumeRatio = avgVolume > 0 ? Number((currentVolume / avgVolume).toFixed(2)) : 1.0;

  // Market Regime
  const regime = detectMarketRegime(primaryCandles);

  // MTF Analysis
  const mtf = analyzeMTF(candlesMap);

  // Conflict Detection
  let isConflicted = false;
  let conflictReason = "";

  const isBullishLocal = currentPrice > sma20 && rsi > 50 && macd.histogram > 0;
  const isBearishLocal = currentPrice < sma20 && rsi < 50 && macd.histogram < 0;

  if (mtf.isConflicted) {
    isConflicted = true;
    conflictReason = "Multi-timeframe divergence between higher and lower timeframes.";
  } else if (isBullishLocal && mtf.alignment === "ALIGNED_BEARISH") {
    isConflicted = true;
    conflictReason = "Local bullish indicators conflict with higher timeframe bearish trend.";
  } else if (isBearishLocal && mtf.alignment === "ALIGNED_BULLISH") {
    isConflicted = true;
    conflictReason = "Local bearish indicators conflict with higher timeframe bullish trend.";
  } else if (volumeRatio < 0.6) {
    isConflicted = true;
    conflictReason = "Weak volume confirmation near key level.";
  }

  // Determine Direction
  let signalDirection = "WAIT";
  if (!isConflicted) {
    if (isBullishLocal && (mtf.alignment === "ALIGNED_BULLISH" || mtf.alignment === "NEUTRAL")) {
      signalDirection = "BUY";
    } else if (isBearishLocal && (mtf.alignment === "ALIGNED_BEARISH" || mtf.alignment === "NEUTRAL")) {
      signalDirection = "SELL";
    }
  }

  // Score
  const confidence = calculateSignalScore({
    rsi,
    macd,
    lastPrice: currentPrice,
    sma20,
    sma50,
    volumeRatio,
    mtf,
    regime,
    isConflicted,
  });

  // Quality Category
  let qualityCategory = "NO CLEAR SETUP";
  if (confidence >= 75) qualityCategory = "STRONG SETUP";
  else if (confidence >= 55) qualityCategory = "MODERATE SETUP";
  else if (confidence >= 40) qualityCategory = "WEAK SETUP";
  else qualityCategory = "NO CLEAR SETUP";

  // Force WAIT if score < 50 or conflicted
  if (confidence < 50 || isConflicted) {
    signalDirection = "WAIT";
  }

  // Calculate Entry, Stop Loss, Target & Risk/Reward
  let entryZone = "NOT AVAILABLE";
  let stopLoss = "NOT AVAILABLE";
  let targetPrice = "NOT AVAILABLE";
  let riskRewardRatio = "NOT AVAILABLE";
  let invalidationCondition = "NOT AVAILABLE";

  if (signalDirection === "BUY") {
    const entryMin = Number((currentPrice * 0.998).toFixed(2));
    const entryMax = Number((currentPrice * 1.002).toFixed(2));
    entryZone = `${entryMin} - ${entryMax}`;

    const calculatedStop = Math.min(currentPrice - 2 * atr, sr.support * 0.995);
    stopLoss = Number(calculatedStop.toFixed(2));

    const stopDist = currentPrice - calculatedStop;
    const calculatedTarget = currentPrice + stopDist * 2.0; // 2:1 RR
    targetPrice = Number(calculatedTarget.toFixed(2));

    riskRewardRatio = "1:2.0";
    invalidationCondition = `Close below Stop Loss (${stopLoss})`;
  } else if (signalDirection === "SELL") {
    const entryMin = Number((currentPrice * 0.998).toFixed(2));
    const entryMax = Number((currentPrice * 1.002).toFixed(2));
    entryZone = `${entryMin} - ${entryMax}`;

    const calculatedStop = Math.max(currentPrice + 2 * atr, sr.resistance * 1.005);
    stopLoss = Number(calculatedStop.toFixed(2));

    const stopDist = calculatedStop - currentPrice;
    const calculatedTarget = currentPrice - stopDist * 2.0;
    targetPrice = Number(calculatedTarget.toFixed(2));

    riskRewardRatio = "1:2.0";
    invalidationCondition = `Close above Stop Loss (${stopLoss})`;
  }

  const atrPercent = (atr / currentPrice) * 100;

  // AI Explanation
  const aiExp = generateAIExplanation({
    asset,
    timeframe,
    direction: signalDirection,
    metrics: {
      price: currentPrice,
      sma20,
      sma50,
      rsi,
      macdHistogram: macd.histogram,
      volumeRatio,
      atrPercent: Number(atrPercent.toFixed(2)),
      support: sr.support,
      resistance: sr.resistance,
    },
    regime,
    mtf,
  });

  const createdTime = new Date().toISOString();
  const expiresTime = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(); // 4h expiry

  const signalCard = createSignalCard({
    id: `sig_${asset}_${timeframe}_${Date.now()}`,
    asset,
    signal: signalDirection,
    timeframe,
    currentPrice,
    confidence,
    qualityCategory,
    entryZone,
    target: targetPrice,
    stop: stopLoss,
    riskRewardRatio,
    marketRegime: regime.regime,
    trend: currentPrice > sma20 ? "Bullish" : "Bearish",
    momentum: rsi > 50 ? "Positive" : "Negative",
    volume: volumeRatio >= 1.0 ? "High" : "Low",
    volatility: atrPercent > 2.0 ? "High" : "Normal",
    signalCreated: createdTime,
    signalUpdated: createdTime,
    signalExpiration: expiresTime,
    invalidationCondition,
    dataFreshness: dataFreshness || "LIVE",
    whyThisSignal: aiExp.whyThisSignal,
    status: "NEW",
    conflictReason: isConflicted ? conflictReason : null,
  });

  // Handle Lifecycle and Duplicate prevention
  const key = `${asset}_${timeframe}`;
  const existing = activeSignalsMap.get(key);

  if (existing && existing.status === "ACTIVE") {
    if (existing.signal === signalDirection && Math.abs(existing.currentPrice - currentPrice) < currentPrice * 0.005) {
      // Return updated existing signal rather than duplicate
      existing.signalUpdated = new Date().toISOString();
      existing.currentPrice = currentPrice;
      existing.status = "UPDATED";
      return existing;
    }
  }

  if (signalDirection !== "WAIT") {
    signalCard.status = "ACTIVE";
    activeSignalsMap.set(key, signalCard);
  }

  return signalCard;
}

/**
 * Creates standardized Signal Card payload
 */
function createSignalCard(fields) {
  return {
    id: fields.id || `sig_${fields.asset || "UNKNOWN"}_${Date.now()}`,
    asset: fields.asset || "NOT AVAILABLE",
    signal: fields.signal || "WAIT",
    timeframe: fields.timeframe || "15M",
    currentPrice: fields.currentPrice !== undefined ? fields.currentPrice : "NOT AVAILABLE",
    confidence: fields.confidence !== undefined ? fields.confidence : "NOT AVAILABLE",
    confidenceNote: "Analysis confidence index. Does NOT guarantee outcome.",
    qualityCategory: fields.qualityCategory || "NO CLEAR SETUP",
    entryZone: fields.entryZone || "NOT AVAILABLE",
    target: fields.target || "NOT AVAILABLE",
    stop: fields.stop || "NOT AVAILABLE",
    riskRewardRatio: fields.riskRewardRatio || "NOT AVAILABLE",
    marketRegime: fields.marketRegime || "NOT AVAILABLE",
    trend: fields.trend || "NOT AVAILABLE",
    momentum: fields.momentum || "NOT AVAILABLE",
    volume: fields.volume || "NOT AVAILABLE",
    volatility: fields.volatility || "NOT AVAILABLE",
    signalCreated: fields.signalCreated || "NOT AVAILABLE",
    signalUpdated: fields.signalUpdated || "NOT AVAILABLE",
    signalExpiration: fields.signalExpiration || "NOT AVAILABLE",
    invalidationCondition: fields.invalidationCondition || "NOT AVAILABLE",
    dataFreshness: fields.dataFreshness || "LIVE",
    whyThisSignal: fields.whyThisSignal || {},
    status: fields.status || "NEW",
    conflictReason: fields.conflictReason || null,
  };
}

/**
 * Updates signal lifecycle status cleanly
 */
function transitionSignalStatus(signalId, newStatus, currentPrice = null) {
  if (!VALID_STATES.includes(newStatus)) {
    throw new Error(`Invalid lifecycle state transition to ${newStatus}`);
  }

  for (const [key, signal] of activeSignalsMap.entries()) {
    if (signal.id === signalId) {
      // Prevent impossible transitions
      if (["TARGET", "STOP", "EXPIRED", "CANCELLED"].includes(signal.status)) {
        throw new Error(`Cannot transition closed signal from ${signal.status} to ${newStatus}`);
      }

      signal.status = newStatus;
      signal.signalUpdated = new Date().toISOString();

      if (["TARGET", "STOP", "EXPIRED", "CANCELLED"].includes(newStatus)) {
        signal.closedTime = new Date().toISOString();
        signal.exitPrice = currentPrice || signal.currentPrice;
        
        // Move to historical ledger
        historicalSignals.push({ ...signal });
        activeSignalsMap.delete(key);
      }

      return signal;
    }
  }

  return null;
}

function getActiveSignals() {
  return Array.from(activeSignalsMap.values());
}

function getHistoricalSignals() {
  return [...historicalSignals];
}

module.exports = {
  evaluateSignal,
  createSignalCard,
  transitionSignalStatus,
  getActiveSignals,
  getHistoricalSignals,
};
