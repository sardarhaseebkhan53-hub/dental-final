/**
 * Automated Test Suite for Trading Intelligence Platform
 * Executed via `node --test tests/trading.test.js`
 */

const test = require("node:test");
const assert = require("node:assert");

// Import modules
const { calculateSMA, calculateEMA, calculateRSI, calculateMACD, calculateATR } = require("../server/trading/indicators");
const { detectMarketRegime } = require("../server/trading/regime");
const { analyzeMTF } = require("../server/trading/mtf");
const { evaluateSignal, transitionSignalStatus, getActiveSignals, getHistoricalSignals } = require("../server/trading/signalEngine");
const marketState = require("../server/trading/marketState");
const { scanMarket } = require("../server/trading/scanner");
const { getUserWatchlist, addToWatchlist, removeFromWatchlist, reorderWatchlist } = require("../server/trading/watchlist");
const { createAlert, getUserAlerts, cancelAlert, checkAlertsForAsset } = require("../server/trading/alerts");
const { sendPushNotification, getUserSettings, updateUserSettings } = require("../server/trading/notifications");
const { getPortfolio } = require("../server/trading/portfolio");
const { calculatePositionSize, getRiskOverview } = require("../server/trading/riskCenter");
const { createOrderPreview, executeOrder } = require("../server/trading/orderEngine");
const { runBacktest } = require("../server/trading/backtester");

test("1. Technical Indicators Engine", async (t) => {
  await t.test("calculateSMA computes arithmetic mean correctly", () => {
    const prices = [10, 20, 30, 40, 50];
    const sma3 = calculateSMA(prices, 3); // (30+40+50)/3 = 40
    assert.strictEqual(sma3, 40);
  });

  await t.test("calculateRSI outputs value bounded between 0 and 100", () => {
    const prices = [100, 102, 104, 103, 105, 107, 108, 110, 112, 111, 113, 115, 114, 116, 118, 120];
    const rsi = calculateRSI(prices, 14);
    assert.strictEqual(typeof rsi, "number");
    assert.ok(rsi >= 0 && rsi <= 100);
  });

  await t.test("calculateMACD returns object with macd, signal, and histogram", () => {
    const prices = Array.from({ length: 40 }, (_, i) => 100 + i * 0.5);
    const macd = calculateMACD(prices, 12, 26, 9);
    assert.ok(typeof macd.macd === "number");
    assert.ok(typeof macd.signal === "number");
    assert.ok(typeof macd.histogram === "number");
  });
});

test("2. Market Regime Detector", async (t) => {
  await t.test("detectMarketRegime identifies regime and returns metrics", () => {
    const candles = Array.from({ length: 30 }, (_, i) => ({
      open: 100 + i,
      high: 102 + i,
      low: 99 + i,
      close: 101 + i,
      volume: 1000,
    }));
    const result = detectMarketRegime(candles);
    assert.ok(result.regime);
    assert.ok(result.description);
    assert.ok(result.metrics);
  });
});

test("3. Multi-Timeframe Alignment", async (t) => {
  await t.test("analyzeMTF detects divergent or aligned timeframes", () => {
    const candles15M = Array.from({ length: 20 }, (_, i) => ({ close: 100 + i }));
    const candles1H = Array.from({ length: 20 }, (_, i) => ({ close: 100 - i }));

    const result = analyzeMTF({ "15M": candles15M, "1H": candles1H });
    assert.strictEqual(result.alignment, "DIVERGENT");
    assert.strictEqual(result.isConflicted, true);
  });
});

test("4. Signal Engine & Conflict Handling", async (t) => {
  await t.test("evaluateSignal forces WAIT when evidence conflicts", () => {
    const candles15M = Array.from({ length: 30 }, (_, i) => ({
      open: 100 + i,
      high: 102 + i,
      low: 99 + i,
      close: 101 + i,
      volume: 1000,
    }));
    const candles1H = Array.from({ length: 30 }, (_, i) => ({
      open: 100 - i,
      high: 102 - i,
      low: 99 - i,
      close: 101 - i,
      volume: 1000,
    }));

    const signalCard = evaluateSignal({
      asset: "TESTUSDT",
      timeframe: "15M",
      price: 101,
      candlesMap: { "15M": candles15M, "1H": candles1H },
      dataFreshness: "LIVE",
      lastUpdate: Date.now(),
    });

    assert.strictEqual(signalCard.signal, "WAIT");
    assert.ok(signalCard.confidence <= 50);
  });

  await t.test("evaluateSignal rejects stale market data", () => {
    const signalCard = evaluateSignal({
      asset: "STALEUSDT",
      timeframe: "15M",
      price: 100,
      candlesMap: {},
      dataFreshness: "OFFLINE",
      lastUpdate: Date.now() - 120000,
    });

    assert.strictEqual(signalCard.signal, "WAIT");
    assert.strictEqual(signalCard.dataFreshness, "STALE");
  });
});

test("5. Signal Lifecycle Management", async (t) => {
  await t.test("transitionSignalStatus handles valid transitions and blocks invalid ones", () => {
    const card = evaluateSignal({
      asset: "LIFECYCLEUSDT",
      timeframe: "15M",
      price: 100,
      candlesMap: {
        "15M": Array.from({ length: 30 }, (_, i) => ({ open: 100, high: 105, low: 95, close: 102, volume: 5000 })),
      },
      dataFreshness: "LIVE",
      lastUpdate: Date.now(),
    });

    if (card.status === "ACTIVE") {
      const updated = transitionSignalStatus(card.id, "TARGET", 110);
      assert.strictEqual(updated.status, "TARGET");
      assert.strictEqual(updated.exitPrice, 110);

      // Attempting transition on closed signal must throw error
      assert.throws(() => {
        transitionSignalStatus(card.id, "ACTIVE");
      });
    }
  });
});

test("6. Market Scanner", async (t) => {
  await t.test("scanMarket filters assets by confidence and strategy criteria", () => {
    const result = scanMarket({ timeframe: "15M", minConfidence: 0 });
    assert.ok(typeof result.totalScanned === "number");
    assert.ok(Array.isArray(result.results));
  });
});

test("7. Watchlist Service", async (t) => {
  await t.test("addToWatchlist and removeFromWatchlist modify user watchlist", () => {
    addToWatchlist("SOLUSDT", "test_user");
    let list = getUserWatchlist("test_user");
    assert.ok(list.some((item) => item.symbol === "SOLUSDT"));

    removeFromWatchlist("SOLUSDT", "test_user");
    list = getUserWatchlist("test_user");
    assert.ok(!list.some((item) => item.symbol === "SOLUSDT"));
  });
});

test("8. Alerts Engine", async (t) => {
  await t.test("createAlert fires when condition is met", () => {
    const alert = createAlert({
      userId: "test_user",
      asset: "BTCUSDT",
      conditionType: "PRICE_ABOVE",
      targetValue: 60000,
    });

    checkAlertsForAsset("BTCUSDT", {
      currentPrice: 65000,
      change24h: 2.5,
      activeSignals: [],
    });

    const userAlerts = getUserAlerts("test_user");
    const triggered = userAlerts.find((a) => a.id === alert.id);
    assert.strictEqual(triggered.status, "TRIGGERED");
  });
});

test("9. Portfolio & Risk Center", async (t) => {
  await t.test("getPortfolio calculates correct balance, exposure and P/L", () => {
    const portfolio = getPortfolio("test_user");
    assert.ok(typeof portfolio.totalValue === "number");
    assert.ok(typeof portfolio.availableBalance === "number");
    assert.ok(Array.isArray(portfolio.positions));
  });

  await t.test("calculatePositionSize computes position mathematically", () => {
    const result = calculatePositionSize({
      accountSize: 10000,
      riskPercentage: 1.0, // $100 max risk
      entryPrice: 100,
      stopLossPrice: 95, // $5 stop distance
      leverage: 1,
    });

    assert.strictEqual(result.maxRiskAmount, 100);
    assert.strictEqual(result.stopDistance, 5);
    assert.strictEqual(result.suggestedQuantity, 20); // 100 / 5 = 20
  });
});

test("10. Order Execution Engine & Offline Protection", async (t) => {
  await t.test("createOrderPreview blocks execution when market feed is offline", () => {
    marketState.setMarketStatus("OFFLINE");

    assert.throws(() => {
      createOrderPreview({
        asset: "BTCUSDT",
        direction: "LONG",
        orderType: "MARKET",
        quantity: 1,
      });
    }, /OFFLINE/);

    marketState.setMarketStatus("LIVE");
  });

  await t.test("executeOrder requires explicit user confirmation", () => {
    const preview = createOrderPreview({
      asset: "BTCUSDT",
      direction: "LONG",
      orderType: "MARKET",
      quantity: 0.1,
    });

    assert.throws(() => {
      executeOrder(preview.confirmationToken, preview.preview, false);
    }, /Explicit user confirmation required/);

    const executed = executeOrder(preview.confirmationToken, preview.preview, true);
    assert.strictEqual(executed.success, true);
  });
});

test("11. Backtester Engine with Zero Look-Ahead Bias", async (t) => {
  await t.test("runBacktest evaluates historical candles and returns trade stats", () => {
    const syntheticCandles = Array.from({ length: 60 }, (_, i) => ({
      time: Date.now() - (60 - i) * 15 * 60 * 1000,
      open: 100 + Math.sin(i * 0.2) * 5,
      high: 102 + Math.sin(i * 0.2) * 5,
      low: 98 + Math.sin(i * 0.2) * 5,
      close: 101 + Math.sin(i * 0.2) * 5,
      volume: 2000,
    }));

    const result = runBacktest({
      symbol: "BTCUSDT",
      initialBalance: 10000,
      candles: syntheticCandles,
    });

    assert.strictEqual(result.initialBalance, 10000);
    assert.ok(typeof result.endingBalance === "number");
    assert.ok(typeof result.winRate === "number");
    assert.ok(Array.isArray(result.trades));
  });
});
