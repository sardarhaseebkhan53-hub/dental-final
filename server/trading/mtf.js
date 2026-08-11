/**
 * Multi-Timeframe (MTF) Alignment Analyzer
 * Evaluates momentum, trend, and structure across lower and higher timeframes.
 */

const { calculateRSI, calculateSMA } = require("./indicators");

function analyzeMTF(timeframeData) {
  // timeframeData is a map like { '15M': candles, '1H': candles, '4H': candles }
  const timeframes = Object.keys(timeframeData || {});
  if (timeframes.length === 0) {
    return {
      alignment: "UNCLEAR",
      score: 50,
      details: {},
      isConflicted: false,
    };
  }

  const details = {};
  let bullishCount = 0;
  let bearishCount = 0;
  let totalAnalyzed = 0;

  for (const tf of timeframes) {
    const candles = timeframeData[tf];
    if (!candles || candles.length < 10) continue;

    const closes = candles.map((c) => c.close);
    const lastPrice = closes[closes.length - 1];
    const rsi = calculateRSI(closes, 14);
    const sma20 = calculateSMA(closes, 20) || lastPrice;

    let bias = "NEUTRAL";
    if (lastPrice > sma20 && rsi > 50) {
      bias = "BULLISH";
      bullishCount++;
    } else if (lastPrice < sma20 && rsi < 50) {
      bias = "BEARISH";
      bearishCount++;
    }

    totalAnalyzed++;
    details[tf] = {
      price: lastPrice,
      rsi,
      sma20,
      bias,
    };
  }

  let alignment = "NEUTRAL";
  let isConflicted = false;
  let score = 50;

  if (totalAnalyzed > 0) {
    if (bullishCount === totalAnalyzed) {
      alignment = "ALIGNED_BULLISH";
      score = 95;
    } else if (bearishCount === totalAnalyzed) {
      alignment = "ALIGNED_BEARISH";
      score = 95;
    } else if (bullishCount > 0 && bearishCount > 0) {
      alignment = "DIVERGENT";
      isConflicted = true;
      score = 30;
    } else {
      alignment = "NEUTRAL";
      score = 50;
    }
  }

  return {
    alignment,
    score,
    details,
    isConflicted,
  };
}

module.exports = {
  analyzeMTF,
};
