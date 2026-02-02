import Brewery from "../models/Brewery.js";
import { fetchBreweries } from "./openBrewery.service.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function syncAllFromExternalAPI() {
  console.log("🔄 Syncing Open Brewery DB → MongoDB");

  const perPage = 10;
  const maxPages = 1000;
  const eastCoastStates = [
    "Maine",
    "New Hampshire",
    "Vermont",
    "Massachusetts",
    "Rhode Island",
    "Connecticut",
    "New York",
    "New Jersey",
    "Pennsylvania",
    "Delaware",
    "Maryland",
    "District of Columbia",
    "Virginia",
    "West Virginia",
    "North Carolina",
    "South Carolina",
    "Georgia",
    "Florida",
  ];
  let page = 1;
  let total = 0;

  // Remove previously synced records so the dataset is refreshed.
  await Brewery.deleteMany({
    externalId: { $exists: true },
  });

  while (page <= maxPages) {
    const breweries = await fetchBreweries({
      perPage,
      page,
      country: "United States",
    });

    if (!breweries?.length) break;

    await Brewery.bulkWrite(
      breweries
        .filter((b) => eastCoastStates.includes(b.state))
        .map((b) => ({
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

    total += breweries.filter((b) => eastCoastStates.includes(b.state)).length;
    page += 1;
    await sleep(300);
  }

  console.log(`✅ Synced ${total} breweries`);
  return { synced: total };
}
