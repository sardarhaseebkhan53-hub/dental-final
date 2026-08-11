/**
 * Trading Intelligence API Routes
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/trading.controller");

// Market State & Regimes
router.get("/state", controller.getMarketState);
router.get("/regime", controller.getRegimeDashboard);

// Signals
router.get("/signals", controller.getSignals);
router.get("/signals/:id", controller.getSignalById);

// Scanner
router.post("/scanner", controller.runScanner);

// Watchlist
router.get("/watchlist", controller.getWatchlist);
router.post("/watchlist/add", controller.addToWatchlistHandler);
router.post("/watchlist/remove", controller.removeFromWatchlistHandler);
router.post("/watchlist/reorder", controller.reorderWatchlistHandler);

// Alerts
router.get("/alerts", controller.getAlerts);
router.post("/alerts", controller.createAlertHandler);
router.post("/alerts/:id/cancel", controller.cancelAlertHandler);

// Portfolio & Risk
router.get("/portfolio", controller.getPortfolioHandler);
router.post("/risk/position-size", controller.calculatePositionSizeHandler);
router.get("/risk/overview", controller.getRiskOverviewHandler);

// Orders
router.post("/orders/preview", controller.createOrderPreviewHandler);
router.post("/orders/execute", controller.executeOrderHandler);
router.get("/orders", controller.getExecutedOrdersHandler);

// Backtesting
router.post("/backtest", controller.runBacktestHandler);

// Demo Price Tick Update
router.post("/tick", controller.updateTickHandler);

module.exports = router;
