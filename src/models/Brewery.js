import axios from "axios";
import { ENV } from "../config/env.js";

const client = axios.create({
  baseURL: ENV.EXTERNAL_API_BASE,
  timeout: 15000,
});

export async function fetchUsers() {
  const { data } = await client.get("/users");
  return data;
}

export async function fetchPosts() {
  const { data } = await client.get("/posts");
  return data;
}
