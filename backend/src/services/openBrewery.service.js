import axios from "axios";

const client = axios.create({
  baseURL: "https://api.openbrewerydb.org/v1",
  timeout: 15000,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchBreweries({ perPage = 50, page = 1 } = {}) {
  const maxRetries = 3;
  let attempt = 0;

  while (true) {
    try {
      const { data } = await client.get("/breweries", {
        params: { per_page: perPage, page },
      });
      return data;
    } catch (error) {
      attempt += 1;
      const status = error?.response?.status;
      const retryAfterHeader = error?.response?.headers?.["retry-after"];
      const retryAfterSeconds = Number(retryAfterHeader);
      const retryAfterMs = Number.isFinite(retryAfterSeconds)
        ? retryAfterSeconds * 1000
        : 1000 * attempt;

      if (status === 429 && attempt <= maxRetries) {
        await sleep(retryAfterMs);
        continue;
      }

      throw error;
    }
  }
}
