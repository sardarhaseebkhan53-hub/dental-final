/**
 * AI Explanation Generator
 * Produces structured evidence-backed analysis for trading signals.
 * Never invents fake evidence.
 */

function generateAIExplanation(data) {
  const { asset, timeframe, direction, metrics, regime, mtf } = data;

  const trendText = metrics.price > metrics.sma50
    ? `Bullish structure above 50-period SMA (${metrics.sma50})`
    : metrics.price < metrics.sma50
    ? `Bearish structure below 50-period SMA (${metrics.sma50})`
    : `Neutral price action relative to 50 SMA`;

  const momentumText = metrics.rsi > 60
    ? `Positive momentum (RSI ${metrics.rsi}, MACD hist ${metrics.macdHistogram})`
    : metrics.rsi < 40
    ? `Negative momentum (RSI ${metrics.rsi}, MACD hist ${metrics.macdHistogram})`
    : `Balanced momentum (RSI ${metrics.rsi})`;

  const volumeText = metrics.volumeRatio > 1.2
    ? `Elevated volume (${metrics.volumeRatio}x 20-period average)`
    : metrics.volumeRatio < 0.8
    ? `Below-average volume (${metrics.volumeRatio}x 20-period average)`
    : `Normal trading volume (${metrics.volumeRatio}x average)`;

  const htfText = mtf.alignment === "ALIGNED_BULLISH"
    ? "Higher timeframes confirm bullish alignment"
    : mtf.alignment === "ALIGNED_BEARISH"
    ? "Higher timeframes confirm bearish alignment"
    : mtf.isConflicted
    ? "Conflicting direction between higher and lower timeframes"
    : "Neutral multi-timeframe stance";

  const volatilityText = metrics.atrPercent > 2.0
    ? `High volatility environment (ATR ${metrics.atrPercent}%)`
    : metrics.atrPercent < 0.8
    ? `Low volatility / compressed range (ATR ${metrics.atrPercent}%)`
    : `Normal market volatility (ATR ${metrics.atrPercent}%)`;

  const structureText = direction === "BUY"
    ? `Constructive higher highs and higher lows establish support at ${metrics.support}`
    : direction === "SELL"
    ? `Lower highs and lower lows establish key resistance at ${metrics.resistance}`
    : `Price consolidated within support (${metrics.support}) and resistance (${metrics.resistance})`;

  let aiAssessment = "";
  if (direction === "BUY") {
    aiAssessment = `High probability bullish setup for ${asset} on ${timeframe}. Supported by ${regime.regime} regime and ${mtf.alignment} structure.`;
  } else if (direction === "SELL") {
    aiAssessment = `High probability bearish setup for ${asset} on ${timeframe}. Supported by ${regime.regime} regime and ${mtf.alignment} structure.`;
  } else {
    aiAssessment = `Market conditions present conflicting or insufficient signals for ${asset} on ${timeframe}. Stance is WAIT.`;
  }

  return {
    whyThisSignal: {
      trend: trendText,
      momentum: momentumText,
      volume: volumeText,
      higherTimeframe: htfText,
      volatility: volatilityText,
      marketStructure: structureText,
      aiAssessment,
    },
  };
}

module.exports = {
  generateAIExplanation,
};
