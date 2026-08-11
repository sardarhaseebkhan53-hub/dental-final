/**
 * Trading Controller
 * Routes HTTP API requests to Trading Intelligence backend engines.
 */

const marketState = require("../trading/marketState");
const { getActiveSignals, getHistoricalSignals } = require("../trading/signalEngine");
const { scanMarket } = require("../trading/scanner");
const { getUserWatchlist, addToWatchlist, removeFromWatchlist, reorderWatchlist } = require("../trading/watchlist");
const { createAlert, getUserAlerts, cancelAlert } = require("../trading/alerts");
const { getPortfolio } = require("../trading/portfolio");
const { calculatePositionSize, getRiskOverview } = require("../trading/riskCenter");
const { createOrderPreview, executeOrder, getExecutedOrders } = require("../trading/orderEngine");
const { runBacktest } = require("../trading/backtester");

const getMarketState = (req, res) => {
  const symbol = req.query.symbol;
  if (symbol) {
    const asset = marketState.getAssetState(symbol.toUpperCase());
    if (!asset) return res.status(404).json({ success: false, message: "Asset not found" });
    return res.json({ success: true, data: asset });
  }
  return res.json({ success: true, data: marketState.getAllAssets() });
};

const getSignals = (req, res) => {
  const active = getActiveSignals();
  const historical = getHistoricalSignals();
  return res.json({ success: true, data: { active, historical } });
};

const getSignalById = (req, res) => {
  const id = req.params.id;
  const active = getActiveSignals();
  const historical = getHistoricalSignals();
  const found = active.find((s) => s.id === id) || historical.find((s) => s.id === id);

  if (!found) {
    return res.status(404).json({ success: false, message: "Signal card not found" });
  }
  return res.json({ success: true, data: found });
};

const runScanner = (req, res) => {
  const options = req.body || {};
  const scanResult = scanMarket(options);
  return res.json({ success: true, data: scanResult });
};

const getWatchlist = (req, res) => {
  const watchlist = getUserWatchlist("default_user");
  return res.json({ success: true, data: watchlist });
};

const addToWatchlistHandler = (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ success: false, message: "Symbol is required" });
  const updated = addToWatchlist(symbol.toUpperCase(), "default_user");
  return res.json({ success: true, data: updated });
};

const removeFromWatchlistHandler = (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ success: false, message: "Symbol is required" });
  const updated = removeFromWatchlist(symbol.toUpperCase(), "default_user");
  return res.json({ success: true, data: updated });
};

const reorderWatchlistHandler = (req, res) => {
  const { symbols } = req.body;
  if (!Array.isArray(symbols)) return res.status(400).json({ success: false, message: "symbols array required" });
  const updated = reorderWatchlist(symbols, "default_user");
  return res.json({ success: true, data: updated });
};

const getAlerts = (req, res) => {
  const alerts = getUserAlerts("default_user");
  return res.json({ success: true, data: alerts });
};

const createAlertHandler = (req, res) => {
  try {
    const alert = createAlert({ ...req.body, userId: "default_user" });
    return res.status(201).json({ success: true, data: alert });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const cancelAlertHandler = (req, res) => {
  const alertId = req.params.id;
  const canceled = cancelAlert(alertId);
  if (!canceled) return res.status(404).json({ success: false, message: "Alert not found" });
  return res.json({ success: true, data: canceled });
};

const getPortfolioHandler = (req, res) => {
  const portfolio = getPortfolio("default_user");
  return res.json({ success: true, data: portfolio });
};

const calculatePositionSizeHandler = (req, res) => {
  try {
    const result = calculatePositionSize(req.body);
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getRiskOverviewHandler = (req, res) => {
  const risk = getRiskOverview("default_user");
  return res.json({ success: true, data: risk });
};

const createOrderPreviewHandler = (req, res) => {
  try {
    const preview = createOrderPreview(req.body);
    return res.json({ success: true, data: preview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const executeOrderHandler = (req, res) => {
  try {
    const { confirmationToken, previewData, userConfirmed } = req.body;
    const result = executeOrder(confirmationToken, previewData, userConfirmed);
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getExecutedOrdersHandler = (req, res) => {
  return res.json({ success: true, data: getExecutedOrders() });
};

const runBacktestHandler = (req, res) => {
  try {
    const symbol = req.body.symbol || "BTCUSDT";
    const assetState = marketState.getAssetState(symbol);
    const candles = req.body.candles || (assetState ? assetState.candles["15M"] : []);

    const result = runBacktest({ ...req.body, candles });
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getRegimeDashboard = (req, res) => {
  const assets = marketState.getAllAssets();
  const dashboard = assets.map((a) => ({
    symbol: a.symbol,
    currentPrice: a.currentPrice,
    change24h: a.change24h,
    regime: a.marketRegime?.regime,
    description: a.marketRegime?.description,
    metrics: a.marketRegime?.metrics,
  }));
  return res.json({ success: true, data: dashboard });
};

const updateTickHandler = (req, res) => {
  const { symbol, price, change24h, volume24h } = req.body;
  if (!symbol || !price) return res.status(400).json({ success: false, message: "symbol and price required" });

  const updated = marketState.updateTick(symbol.toUpperCase(), Number(price), change24h, volume24h);
  return res.json({ success: true, data: updated });
};

module.exports = {
  getMarketState,
  getSignals,
  getSignalById,
  runScanner,
  getWatchlist,
  addToWatchlistHandler,
  removeFromWatchlistHandler,
  reorderWatchlistHandler,
  getAlerts,
  createAlertHandler,
  cancelAlertHandler,
  getPortfolioHandler,
  calculatePositionSizeHandler,
  getRiskOverviewHandler,
  createOrderPreviewHandler,
  executeOrderHandler,
  getExecutedOrdersHandler,
  runBacktestHandler,
  getRegimeDashboard,
  updateTickHandler,
};
