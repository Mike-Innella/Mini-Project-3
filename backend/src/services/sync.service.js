import Brewery from "../models/Brewery.js";
import { fetchBreweries } from "./openBrewery.service.js";

export async function syncAllFromExternalAPI() {
  console.log("🔄 Syncing Open Brewery DB → MongoDB");

  const breweries = await fetchBreweries({ perPage: 50, page: 1 });

  if (!breweries?.length) {
    console.log("⚠️ No breweries received from external API");
    return { synced: 0 };
  }

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

  console.log(`✅ Synced ${breweries.length} breweries`);
  return { synced: breweries.length };
}
