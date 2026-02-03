import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import breweriesRoutes from "./routes/breweries.routes.js";
import syncRoutes from "./routes/sync.routes.js";
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  const requireDb = (req, res, next) => {
    if (mongoose.connection.readyState === 1) return next();
    return res
      .status(503)
      .json({ ok: false, error: "MongoDB not connected" });
  };

  const apiRouter = express.Router();

  apiRouter.get("/", (req, res) =>
    res.json({
      ok: true,
      message: "Mini-Project 3 API is running.",
      routes: {
        health: "/health",
        breweries: "/breweries",
        sync: "/sync",
        docs: "/api-docs",
      },
    })
  );

  apiRouter.get("/health", (req, res) => res.json({ ok: true }));

  apiRouter.use("/breweries", requireDb, breweriesRoutes);
  apiRouter.use("/sync", requireDb, syncRoutes);

  app.use("/", apiRouter);
  app.use("/api", apiRouter);

  return app;
}
