import Brewery from "../models/Brewery.js";
import { fetchBreweries } from "./openBrewery.service.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function syncAllFromExternalAPI() {
  console.log("🔄 Syncing Open Brewery DB → MongoDB");

  let page = 1;
  let total = 0;

  while (true) {
    const breweries = await fetchBreweries({ perPage: 25, page });

    if (!breweries?.length) break;

    await Brewery.bulkWrite(
      breweries.map((b) => ({
        updateOne: {
          filter: { externalId: b.id },
          update: {
            $set: {
              externalId: b.id,
              name: b.name,
              breweryType: b.brewery_type,
              city: b.city,
              state: b.state,
              country: b.country,
              websiteUrl: b.website_url,
            },
          },
          upsert: true,
        },
      }))
    );

    total += breweries.length;
    page += 1;
    await sleep(300);
  }

  console.log(`✅ Synced ${total} breweries`);
  return { synced: total };
}
