const app = require("./app");
const env = require("./config/env");

app.listen(env.PORT, env.HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Junaid Dental Care server running at http://localhost:${env.PORT}`);
  console.log(`   Environment: ${env.NODE_ENV}`);
  if (!env.DATABASE_URL) {
    // eslint-disable-next-line no-console
    console.warn("   ⚠️  DATABASE_URL is not set. Copy .env.example to .env first.");
  }
});
