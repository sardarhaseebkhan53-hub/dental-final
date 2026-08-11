/**
 * Technical Indicators Engine
 * Mathematical technical analysis indicators for Trading Intelligence.
 */

function calculateSMA(prices, period) {
  if (!prices || prices.length < period) return null;
  const slice = prices.slice(prices.length - period);
  const sum = slice.reduce((acc, val) => acc + val, 0);
  return Number((sum / period).toFixed(4));
}

function calculateEMASeries(prices, period) {
  if (!prices || prices.length < period) return [];
  const k = 2 / (period + 1);
  const emaValues = [];
  
  // Initial SMA as first EMA
  let initialSum = 0;
  for (let i = 0; i < period; i++) {
    initialSum += prices[i];
  }
  let currentEMA = initialSum / period;
  emaValues.push(currentEMA);

  for (let i = period; i < prices.length; i++) {
    currentEMA = prices[i] * k + currentEMA * (1 - k);
    emaValues.push(currentEMA);
  }

  return emaValues;
}

function calculateEMA(prices, period) {
  const series = calculateEMASeries(prices, period);
  if (series.length === 0) return null;
  return Number(series[series.length - 1].toFixed(4));
}

function calculateRSI(prices, period = 14) {
  if (!prices || prices.length <= period) return 50.0;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) {
      avgGain = (avgGain * (period - 1) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) + Math.abs(change)) / period;
    }
  }

  if (avgLoss === 0) return 100.0;
  const rs = avgGain / avgLoss;
  const rsi = 100 - 100 / (1 + rs);
  return Number(rsi.toFixed(2));
}

function calculateMACD(prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  if (!prices || prices.length < slowPeriod + signalPeriod) {
    return { macd: 0, signal: 0, histogram: 0 };
  }

  const fastEMA = calculateEMASeries(prices, fastPeriod);
  const slowEMA = calculateEMASeries(prices, slowPeriod);

  // Align Fast and Slow EMA series
  const diff = fastPeriod - slowPeriod; // negative
  const macdLine = [];
  const offsetFast = slowPeriod - fastPeriod;

  for (let i = 0; i < slowEMA.length; i++) {
    const fastVal = fastEMA[i + offsetFast];
    const slowVal = slowEMA[i];
    macdLine.push(fastVal - slowVal);
  }

  const signalLineSeries = calculateEMASeries(macdLine, signalPeriod);
  if (signalLineSeries.length === 0) {
    return { macd: 0, signal: 0, histogram: 0 };
  }

  const lastMACD = macdLine[macdLine.length - 1];
  const lastSignal = signalLineSeries[signalLineSeries.length - 1];
  const histogram = lastMACD - lastSignal;

  return {
    macd: Number(lastMACD.toFixed(4)),
    signal: Number(lastSignal.toFixed(4)),
    histogram: Number(histogram.toFixed(4)),
  };
}

function calculateBollingerBands(prices, period = 20, multiplier = 2) {
  if (!prices || prices.length < period) {
    const price = prices && prices.length > 0 ? prices[prices.length - 1] : 0;
    return { upper: price, middle: price, lower: price, bandwidth: 0 };
  }

  const sma = calculateSMA(prices, period);
  const slice = prices.slice(prices.length - period);
  const variance = slice.reduce((acc, val) => acc + Math.pow(val - sma, 2), 0) / period;
  const stdDev = Math.sqrt(variance);

  const upper = sma + multiplier * stdDev;
  const lower = sma - multiplier * stdDev;
  const bandwidth = sma > 0 ? ((upper - lower) / sma) * 100 : 0;

  return {
    upper: Number(upper.toFixed(4)),
    middle: Number(sma.toFixed(4)),
    lower: Number(lower.toFixed(4)),
    bandwidth: Number(bandwidth.toFixed(2)),
  };
}

function calculateATR(candles, period = 14) {
  if (!candles || candles.length <= period) return 0;

  const trueRanges = [];
  for (let i = 1; i < candles.length; i++) {
    const high = candles[i].high;
    const low = candles[i].low;
    const prevClose = candles[i - 1].close;

    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    trueRanges.push(tr);
  }

  let atr = trueRanges.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < trueRanges.length; i++) {
    atr = (atr * (period - 1) + trueRanges[i]) / period;
  }

  return Number(atr.toFixed(4));
}

function findSupportResistance(candles, lookback = 30) {
  if (!candles || candles.length < lookback) {
    return { support: 0, resistance: 0 };
  }

  const recent = candles.slice(candles.length - lookback);
  let minLow = Infinity;
  let maxHigh = -Infinity;

  for (const c of recent) {
    if (c.low < minLow) minLow = c.low;
    if (c.high > maxHigh) maxHigh = c.high;
  }

  return {
    support: Number(minLow.toFixed(4)),
    resistance: Number(maxHigh.toFixed(4)),
  };
}

module.exports = {
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
  calculateATR,
  findSupportResistance,
};
