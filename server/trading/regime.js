/**
 * Market Regime Detector
 * Classifies market conditions based on price action, moving averages, ADX/ATR, and Bollinger Bands.
 */

const { calculateSMA, calculateATR, calculateBollingerBands, calculateRSI } = require("./indicators");

function detectMarketRegime(candles) {
  if (!candles || candles.length < 20) {
    return { regime: "UNCLEAR", description: "Insufficient candle history for regime determination." };
  }

  const closes = candles.map((c) => c.close);
  const currentPrice = closes[closes.length - 1];

  const sma20 = calculateSMA(closes, 20);
  const sma50 = calculateSMA(closes, 50) || sma20;
  const bb = calculateBollingerBands(closes, 20, 2);
  const atr = calculateATR(candles, 14);
  const rsi = calculateRSI(closes, 14);

  const atrPercent = currentPrice > 0 ? (atr / currentPrice) * 100 : 0;
  const isHighVolatility = atrPercent > 2.5 || bb.bandwidth > 6.0;
  const isLowVolatility = atrPercent < 0.8 && bb.bandwidth < 2.0;

  // Recent price movement
  const prevClose = closes[closes.length - 2] || currentPrice;
  const priceChange = ((currentPrice - prevClose) / prevClose) * 100;

  // Trend detection
  const isBullishTrend = currentPrice > sma20 && sma20 > sma50;
  const isBearishTrend = currentPrice < sma20 && sma20 < sma50;

  // Breakout detection: close above upper BB or below lower BB
  const isUpperBreakout = currentPrice > bb.upper && priceChange > 0.8;
  const isLowerBreakout = currentPrice < bb.lower && priceChange < -0.8;

  // Pullback detection: in trend but testing SMA20
  const isBullishPullback = isBullishTrend && currentPrice <= sma20 * 1.005 && currentPrice >= sma20 * 0.99;
  const isBearishPullback = isBearishTrend && currentPrice >= sma20 * 0.995 && currentPrice <= sma20 * 1.01;

  let regime = "RANGING";
  let description = "Price oscillating within defined boundaries.";

  if (isUpperBreakout) {
    regime = "BREAKOUT";
    description = "Strong upward expansion breaking past upper volatility band.";
  } else if (isLowerBreakout) {
    regime = "BREAKOUT";
    description = "Strong downward expansion breaking below lower volatility band.";
  } else if (isBullishPullback) {
    regime = "PULLBACK";
    description = "Bullish trend experiencing constructive retracement near support.";
  } else if (isBearishPullback) {
    regime = "PULLBACK";
    description = "Bearish trend experiencing corrective bounce near resistance.";
  } else if (isBullishTrend) {
    regime = "TRENDING_BULLISH";
    description = "Clear upward trend with price trading above key moving averages.";
  } else if (isBearishTrend) {
    regime = "TRENDING_BEARISH";
    description = "Clear downward trend with price trading below key moving averages.";
  } else if (isHighVolatility) {
    regime = "HIGH_VOLATILITY";
    description = "Elevated price fluctuations with wide ATR dispersion.";
  } else if (isLowVolatility) {
    regime = "LOW_VOLATILITY";
    description = "Tight consolidation with contracting volatility bands.";
  } else if (rsi >= 45 && rsi <= 55) {
    regime = "RANGING";
    description = "Sideways consolidation around mean price.";
  } else {
    regime = "UNCLEAR";
    description = "Mixed signals across technical indicators.";
  }

  return {
    regime,
    description,
    metrics: {
      atrPercent: Number(atrPercent.toFixed(2)),
      bandwidth: bb.bandwidth,
      rsi,
      sma20,
      sma50,
    },
  };
}

module.exports = {
  detectMarketRegime,
};
