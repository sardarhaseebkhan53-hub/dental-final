/**
 * Automated Test Suite for Phase 13 Operations, Health, Controls & Safety Gates
 */

const test = require("node:test");
const assert = require("node:assert");
const app = require("../server/app");
const http = require("http");
const { getSystemControls, updateSystemControls } = require("../server/trading/controls");

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

test("Phase 13: GET /api/trading/health returns detailed service health status", async () => {
  const res = await fetch(`${baseUrl}/api/trading/health`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(json.data.status);
  assert.ok(json.data.services.backendApi);
  assert.ok(json.data.services.marketFeed);
  assert.ok(json.data.services.webSocket);
  assert.ok(json.data.services.aiService);
  assert.ok(json.data.services.signalEngine);
  assert.ok(json.data.services.orderEngine);
});

test("Phase 13: Operational Controls - Disabling signals halts signal generation safely", async () => {
  // Disable signals via control update
  updateSystemControls({ signalsEnabled: false }, "test_admin");

  const res = await fetch(`${baseUrl}/api/trading/signals`);
  assert.strictEqual(res.status, 200);

  // Restore signals control
  updateSystemControls({ signalsEnabled: true }, "test_admin");
});

test("Phase 13: Operational Controls - Disabling orders blocks order previews safely", async () => {
  // Disable orders via control update
  updateSystemControls({ ordersEnabled: false }, "test_admin");

  const res = await fetch(`${baseUrl}/api/trading/orders/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ asset: "BTCUSDT", direction: "LONG", orderType: "MARKET", quantity: 0.1 }),
  });

  assert.strictEqual(res.status, 400);
  const json = await res.json();
  assert.strictEqual(json.success, false);
  assert.ok(json.message.includes("ORDER EXECUTION DISABLED"));

  // Restore orders control
  updateSystemControls({ ordersEnabled: true }, "test_admin");
});

test("Phase 13: Operational Controls - Audit log tracks control changes", async () => {
  updateSystemControls({ aiEnabled: false }, "test_admin");
  updateSystemControls({ aiEnabled: true }, "test_admin");

  const res = await fetch(`${baseUrl}/api/trading/audit-logs`);
  assert.strictEqual(res.status, 200);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(Array.isArray(json.data));
  assert.ok(json.data.length >= 2);
});
