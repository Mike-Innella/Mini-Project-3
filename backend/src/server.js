import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";
import { setupSwagger } from "./swagger.js";
import { syncAllFromExternalAPI } from "./services/sync.service.js";

async function start() {
  await connectDB(ENV.MONGO_URI);

  const app = createApp();
  setupSwagger(app);

  app.listen(ENV.PORT, () => {
    console.log(`🚀 http://localhost:${ENV.PORT}`);
    console.log(`📚 Swagger: http://localhost:${ENV.PORT}/api-docs`);
  });

  if (ENV.SYNC_ON_START) {
    syncAllFromExternalAPI().catch((err) => {
      console.error("❌ Sync on start failed:", err.message || err);
    });
  }
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
