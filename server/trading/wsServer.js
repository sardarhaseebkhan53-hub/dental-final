/**
 * Real-Time WebSocket Server
 * Syncs market state, signal lifecycle events, and price alerts across connected clients.
 */

const marketState = require("./marketState");

class TradingWebSocketServer {
  constructor() {
    this.clients = new Set();
    this.unsubscribeMarketState = null;
  }

  attach(server) {
    // Attach listener to marketState updates
    this.unsubscribeMarketState = marketState.subscribe(({ symbol, data }) => {
      this.broadcast({
        type: "TICK_UPDATE",
        symbol,
        data: {
          currentPrice: data.currentPrice,
          change24h: data.change24h,
          marketStatus: data.marketStatus,
          dataFreshness: data.dataFreshness,
          lastUpdate: data.lastUpdate,
          signal: data.activeSignals[0] || null,
        },
      });
    });
  }

  addClient(clientSocket) {
    this.clients.add(clientSocket);
    // Send initial snapshot on connection
    clientSocket.send(
      JSON.stringify({
        type: "INITIAL_SNAPSHOT",
        assets: marketState.getAllAssets(),
      })
    );
  }

  removeClient(clientSocket) {
    this.clients.delete(clientSocket);
  }

  broadcast(message) {
    const payload = JSON.stringify(message);
    for (const client of this.clients) {
      try {
        if (client.readyState === 1 /* OPEN */) {
          client.send(payload);
        }
      } catch (err) {
        this.clients.delete(client);
      }
    }
  }

  dispose() {
    if (this.unsubscribeMarketState) {
      this.unsubscribeMarketState();
    }
    this.clients.clear();
  }
}

const wsServer = new TradingWebSocketServer();

module.exports = wsServer;
