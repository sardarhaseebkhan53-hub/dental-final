/**
 * Backtesting Engine
 * Historical backtesting simulator with strictly ZERO look-ahead bias.
 */

const { calculateRSI, calculateSMA, calculateATR, calculateMACD } = require("./indicators");

function runBacktest(options = {}) {
  const {
    symbol = "BTCUSDT",
    timeframe = "15M",
    initialBalance = 10000,
    feeRate = 0.00075, // 0.075% fee per trade
    slippageRate = 0.0005, // 0.05% slippage
    riskPercentPerTrade = 1.0,
    candles = [],
  } = options;

  if (!candles || candles.length < 30) {
    throw new Error("Insufficient candles supplied for backtesting (minimum 30 required).");
  }

  let balance = initialBalance;
  let peakBalance = initialBalance;
  let maxDrawdown = 0;

  const trades = [];
  let openPosition = null;

  // STRICT ZERO LOOK-AHEAD BIAS LOOP
  for (let i = 25; i < candles.length; i++) {
    // Only pass historical slice up to index i
    const subCandles = candles.slice(0, i + 1);
    const currentCandle = subCandles[subCandles.length - 1];
    const closes = subCandles.map((c) => c.close);

    const price = currentCandle.close;
    const rsi = calculateRSI(closes, 14);
    const macd = calculateMACD(closes, 12, 26, 9);
    const sma20 = calculateSMA(closes, 20);
    const sma50 = calculateSMA(closes, 50) || sma20;
    const atr = calculateATR(subCandles, 14);

    // Track peak balance & drawdown
    const currentAccountValue = openPosition
      ? balance + (openPosition.direction === "LONG" ? (price - openPosition.entryPrice) * openPosition.quantity : (openPosition.entryPrice - price) * openPosition.quantity)
      : balance;

    if (currentAccountValue > peakBalance) {
      peakBalance = currentAccountValue;
    }
    const drawdown = peakBalance > 0 ? ((peakBalance - currentAccountValue) / peakBalance) * 100 : 0;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }

    // Check open position exit conditions (Stop Loss or Take Profit)
    if (openPosition) {
      let isExit = false;
      let exitPrice = price;
      let exitReason = "";

      if (openPosition.direction === "LONG") {
        if (currentCandle.low <= openPosition.stopLoss) {
          isExit = true;
          exitPrice = openPosition.stopLoss * (1 - slippageRate);
          exitReason = "STOP_LOSS";
        } else if (currentCandle.high >= openPosition.takeProfit) {
          isExit = true;
          exitPrice = openPosition.takeProfit * (1 - slippageRate);
          exitReason = "TAKE_PROFIT";
        }
      } else if (openPosition.direction === "SHORT") {
        if (currentCandle.high >= openPosition.stopLoss) {
          isExit = true;
          exitPrice = openPosition.stopLoss * (1 + slippageRate);
          exitReason = "STOP_LOSS";
        } else if (currentCandle.low <= openPosition.takeProfit) {
          isExit = true;
          exitPrice = openPosition.takeProfit * (1 + slippageRate);
          exitReason = "TAKE_PROFIT";
        }
      }

      if (isExit) {
        let grossPL = 0;
        if (openPosition.direction === "LONG") {
          grossPL = (exitPrice - openPosition.entryPrice) * openPosition.quantity;
        } else {
          grossPL = (openPosition.entryPrice - exitPrice) * openPosition.quantity;
        }

        const exitFee = exitPrice * openPosition.quantity * feeRate;
        const netPL = grossPL - exitFee;

        balance += netPL;

        trades.push({
          id: `trd_${trades.length + 1}`,
          symbol,
          timeframe,
          direction: openPosition.direction,
          entryTime: openPosition.entryTime,
          exitTime: currentCandle.time,
          entryPrice: openPosition.entryPrice,
          exitPrice: Number(exitPrice.toFixed(4)),
          quantity: openPosition.quantity,
          grossPL: Number(grossPL.toFixed(2)),
          netPL: Number(netPL.toFixed(2)),
          fee: Number((openPosition.entryFee + exitFee).toFixed(2)),
          reason: exitReason,
        });

        openPosition = null;
      }
    }

    // Evaluate Entry Signal if no position open
    if (!openPosition) {
      const isBullishSignal = price > sma20 && sma20 > sma50 && rsi > 55 && macd.histogram > 0;
      const isBearishSignal = price < sma20 && sma20 < sma50 && rsi < 45 && macd.histogram < 0;

      if (isBullishSignal) {
        const entryPrice = price * (1 + slippageRate);
        const stopLoss = entryPrice - 2 * atr;
        const takeProfit = entryPrice + 4 * atr; // 2:1 RR
        const stopDist = entryPrice - stopLoss;

        const maxRisk = balance * (riskPercentPerTrade / 100);
        const quantity = stopDist > 0 ? maxRisk / stopDist : 0;
        const entryFee = entryPrice * quantity * feeRate;

        if (quantity > 0 && balance >= entryFee) {
          balance -= entryFee;
          openPosition = {
            direction: "LONG",
            entryPrice: Number(entryPrice.toFixed(4)),
            stopLoss: Number(stopLoss.toFixed(4)),
            takeProfit: Number(takeProfit.toFixed(4)),
            quantity: Number(quantity.toFixed(4)),
            entryTime: currentCandle.time,
            entryFee,
          };
        }
      } else if (isBearishSignal) {
        const entryPrice = price * (1 - slippageRate);
        const stopLoss = entryPrice + 2 * atr;
        const takeProfit = entryPrice - 4 * atr;
        const stopDist = stopLoss - entryPrice;

        const maxRisk = balance * (riskPercentPerTrade / 100);
        const quantity = stopDist > 0 ? maxRisk / stopDist : 0;
        const entryFee = entryPrice * quantity * feeRate;

        if (quantity > 0 && balance >= entryFee) {
          balance -= entryFee;
          openPosition = {
            direction: "SHORT",
            entryPrice: Number(entryPrice.toFixed(4)),
            stopLoss: Number(stopLoss.toFixed(4)),
            takeProfit: Number(takeProfit.toFixed(4)),
            quantity: Number(quantity.toFixed(4)),
            entryTime: currentCandle.time,
            entryFee,
          };
        }
      }
    }
  }

  // Calculate backtest performance statistics
  const winningTrades = trades.filter((t) => t.netPL > 0);
  const losingTrades = trades.filter((t) => t.netPL <= 0);

  const totalWins = winningTrades.reduce((acc, t) => acc + t.netPL, 0);
  const totalLosses = Math.abs(losingTrades.reduce((acc, t) => acc + t.netPL, 0));

  const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
  const avgWin = winningTrades.length > 0 ? totalWins / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? totalLosses / losingTrades.length : 0;
  const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? 999.0 : 0;
  const netResult = balance - initialBalance;
  const netResultPercent = (netResult / initialBalance) * 100;

  return {
    strategy: "Trend Following Momentum Confluence Strategy",
    symbol,
    timeframe,
    initialBalance,
    endingBalance: Number(balance.toFixed(2)),
    netResult: Number(netResult.toFixed(2)),
    netResultPercent: Number(netResultPercent.toFixed(2)),
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    winRate: Number(winRate.toFixed(2)),
    averageWin: Number(avgWin.toFixed(2)),
    averageLoss: Number(avgLoss.toFixed(2)),
    profitFactor: Number(profitFactor.toFixed(2)),
    maxDrawdownPercent: Number(maxDrawdown.toFixed(2)),
    trades,
    disclaimer: "Backtest statistics simulate historical strategy performance. Past performance is NOT indicative of future market results.",
  };
}

module.exports = {
  runBacktest,
};
