import { Router } from "express";
import { runSync } from "../controllers/sync.controller.js";

const router = Router();

/**
 * @swagger
 * /sync:
 *   post:
 *     summary: Sync breweries from Open Brewery DB into MongoDB
 *     responses:
 *       200:
 *         description: Sync complete
 */
router.post("/", runSync);

export default router;
