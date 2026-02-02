import { Router } from "express";
import { syncAllFromExternalAPI } from "../services/sync.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    await syncAllFromExternalAPI();
    res.json({ message: "Sync complete" });
  } catch (e) {
    next(e);
  }
});

export default router;
