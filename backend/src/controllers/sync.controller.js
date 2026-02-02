import { syncAllFromExternalAPI } from "../services/sync.service.js";

export async function runSync(req, res, next) {
  try {
    const result = await syncAllFromExternalAPI();
    res.json({ message: "Sync complete", ...result });
  } catch (e) {
    next(e);
  }
}
