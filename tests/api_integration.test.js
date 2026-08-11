/**
 * API Route Integration Test
 */

const test = require("node:test");
const assert = require("node:assert");
const app = require("../server/app");
const http = require("http");

let server;
let baseUrl;

test.before((_, done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    done();
  });
});

test.after((_, done) => {
  server.close(done);
});

test("API Endpoint: GET /api/trading/state", async () => {
  const res = await fetch(`${baseUrl}/api/trading/state`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(Array.isArray(json.data));
  assert.ok(json.data.length >= 6);
});

test("API Endpoint: GET /api/trading/signals", async () => {
  const res = await fetch(`${baseUrl}/api/trading/signals`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(json.data.active);
  assert.ok(json.data.historical);
});

test("API Endpoint: POST /api/trading/scanner", async () => {
  const res = await fetch(`${baseUrl}/api/trading/scanner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ timeframe: "15M", minConfidence: 0 }),
  });
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(json.data.results);
});

test("API Endpoint: GET /api/trading/watchlist", async () => {
  const res = await fetch(`${baseUrl}/api/trading/watchlist`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(Array.isArray(json.data));
});

test("API Endpoint: GET /api/trading/portfolio", async () => {
  const res = await fetch(`${baseUrl}/api/trading/portfolio`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(typeof json.data.totalValue === "number");
});

test("API Endpoint: POST /api/trading/orders/preview", async () => {
  const res = await fetch(`${baseUrl}/api/trading/orders/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      asset: "BTCUSDT",
      direction: "LONG",
      orderType: "MARKET",
      quantity: 0.1,
      stopLoss: 60000,
      takeProfit: 70000,
    }),
  });
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(json.data.preview.requiresExplicitConfirmation);
});

test("API Endpoint: POST /api/trading/backtest", async () => {
  const res = await fetch(`${baseUrl}/api/trading/backtest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol: "BTCUSDT", initialBalance: 10000 }),
  });
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.data.initialBalance, 10000);
});

test("API Endpoint: GET /api/trading/regime", async () => {
  const res = await fetch(`${baseUrl}/api/trading/regime`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(Array.isArray(json.data));
});
