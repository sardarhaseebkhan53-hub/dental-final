/**
 * Unified Market State Manager
 * Single source of truth for asset market data, prices, candles, indicators, regimes, and signals.
 */

const { calculateSMA, calculateEMA, calculateRSI, calculateMACD, calculateBollingerBands, calculateATR, findSupportResistance } = require("./indicators");
const { detectMarketRegime } = require("./regime");
const { evaluateSignal } = require("./signalEngine");

class UnifiedMarketState {
  constructor() {
    this.assets = new Map();
    this.subscribers = new Set();
    this.initializeDefaultAssets();
  }

  initializeDefaultAssets() {
    const defaultSymbols = [
      { symbol: "BTCUSDT", price: 65240.50, change24h: 2.45, volume: 1845000000 },
      { symbol: "ETHUSDT", price: 3480.20, change24h: -1.15, volume: 920000000 },
      { symbol: "SOLUSDT", price: 145.80, change24h: 5.60, volume: 450000000 },
      { symbol: "BNBUSDT", price: 580.40, change24h: 0.85, volume: 210000000 },
      { symbol: "ADAUSDT", price: 0.425, change24h: -0.40, volume: 85000000 },
      { symbol: "XRPUSDT", price: 0.585, change24h: 1.20, volume: 120000000 },
    ];

    for (const item of defaultSymbols) {
      const candlesMap = this.generateSyntheticCandles(item.price);
      
      const assetState = {
        symbol: item.symbol,
        currentPrice: item.price,
        change24h: item.change24h,
        high24h: Number((item.price * 1.03).toFixed(2)),
        low24h: Number((item.price * 0.97).toFixed(2)),
        volume24h: item.volume,
        marketStatus: "LIVE", // LIVE | STALE | RECONNECTING | OFFLINE
        lastUpdate: Date.now(),
        dataFreshness: "LIVE",
        timeframes: ["15M", "1H", "4H"],
        candles: candlesMap,
        indicators: {},
        marketRegime: null,
        aiAnalysis: null,
        activeSignals: [],
      };

      this.recalculateAssetState(assetState);
      this.assets.set(item.symbol, assetState);
    }
  }

  generateSyntheticCandles(basePrice) {
    const timeframes = ["15M", "1H", "4H"];
    const candlesMap = {};

    for (const tf of timeframes) {
      const candles = [];
      let current = basePrice * 0.96;
      const count = 50;
      const now = Date.now();
      const stepMs = tf === "15M" ? 15 * 60 * 1000 : tf === "1H" ? 60 * 60 * 1000 : 4 * 60 * 60 * 1000;

      for (let i = count; i >= 0; i--) {
        const time = now - i * stepMs;
        const delta = (Math.random() - 0.48) * (basePrice * 0.008);
        const open = current;
        const close = Math.max(0.001, open + delta);
        const high = Math.max(open, close) + Math.abs(delta) * 0.5;
        const low = Math.min(open, close) - Math.abs(delta) * 0.5;
        const volume = Math.floor(1000 + Math.random() * 5000);

        candles.push({
          time,
          open: Number(open.toFixed(4)),
          high: Number(high.toFixed(4)),
          low: Number(low.toFixed(4)),
          close: Number(close.toFixed(4)),
          volume,
        });

        current = close;
      }
      candlesMap[tf] = candles;
    }

    return candlesMap;
  }

  recalculateAssetState(assetState) {
    const tf = "15M";
    const primaryCandles = assetState.candles[tf] || [];
    const closes = primaryCandles.map((c) => c.close);

    // Calculate indicators for 15M
    assetState.indicators = {
      sma20: calculateSMA(closes, 20),
      sma50: calculateSMA(closes, 50),
      ema9: calculateEMA(closes, 9),
      ema21: calculateEMA(closes, 21),
      rsi: calculateRSI(closes, 14),
      macd: calculateMACD(closes, 12, 26, 9),
      bollinger: calculateBollingerBands(closes, 20, 2),
      atr: calculateATR(primaryCandles, 14),
      supportResistance: findSupportResistance(primaryCandles, 30),
    };

    // Market Regime
    assetState.marketRegime = detectMarketRegime(primaryCandles);

    // Signal Engine Evaluation
    const signalCard = evaluateSignal({
      asset: assetState.symbol,
      timeframe: tf,
      price: assetState.currentPrice,
      candlesMap: assetState.candles,
      dataFreshness: assetState.dataFreshness,
      lastUpdate: assetState.lastUpdate,
    });

    assetState.activeSignals = [signalCard];
  }

  updateTick(symbol, newPrice, change24h = null, volume24h = null) {
    const assetState = this.assets.get(symbol);
    if (!assetState) return null;

    assetState.currentPrice = Number(newPrice.toFixed(4));
    if (change24h !== null) assetState.change24h = change24h;
    if (volume24h !== null) assetState.volume24h = volume24h;

    assetState.lastUpdate = Date.now();
    assetState.dataFreshness = "LIVE";
    assetState.marketStatus = "LIVE";

    // Update current 15M candle close
    const candles15m = assetState.candles["15M"];
    if (candles15m && candles15m.length > 0) {
      const lastCandle = candles15m[candles15m.length - 1];
      lastCandle.close = assetState.currentPrice;
      if (assetState.currentPrice > lastCandle.high) lastCandle.high = assetState.currentPrice;
      if (assetState.currentPrice < lastCandle.low) lastCandle.low = assetState.currentPrice;
    }

    this.recalculateAssetState(assetState);
    this.notifySubscribers(symbol, assetState);

    return assetState;
  }

  setMarketStatus(status) {
    for (const [symbol, assetState] of this.assets.entries()) {
      assetState.marketStatus = status;
      assetState.dataFreshness = status === "LIVE" ? "LIVE" : "STALE";
    }
  }

  getAssetState(symbol) {
    const assetState = this.assets.get(symbol);
    if (!assetState) return null;

    // Check data freshness
    const now = Date.now();
    if (now - assetState.lastUpdate > 60000) {
      assetState.dataFreshness = "OFFLINE";
      assetState.marketStatus = "OFFLINE";
    } else if (now - assetState.lastUpdate > 10000) {
      assetState.dataFreshness = "STALE";
      assetState.marketStatus = "STALE";
    }

    return assetState;
  }

  getAllAssets() {
    return Array.from(this.assets.values()).map((a) => this.getAssetState(a.symbol));
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers(symbol, assetState) {
    for (const callback of this.subscribers) {
      try {
        callback({ symbol, data: assetState });
      } catch (err) {
        // Safe disposal
      }
    }
  }
}

// Singleton instance
const marketState = new UnifiedMarketState();

module.exports = marketState;
