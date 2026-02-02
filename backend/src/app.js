import express from "express";
import cors from "cors";
import morgan from "morgan";

import breweriesRoutes from "./routes/breweries.routes.js";
import syncRoutes from "./routes/sync.routes.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/breweries", breweriesRoutes);
  app.use("/sync", syncRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
