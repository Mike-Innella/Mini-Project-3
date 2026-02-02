import axios from "axios";

const client = axios.create({
  baseURL: "https://api.openbrewerydb.org/v1",
  timeout: 15000,
});

export async function fetchBreweries() {
  const { data } = await client.get("/breweries", {
    params: { per_page: 50 },
  });
  return data;
}
