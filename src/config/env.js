import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT || 3000),
  MONGO_URI: process.env.MONGO_URI,
  EXTERNAL_API_BASE: process.env.EXTERNAL_API_BASE,
  SYNC_ON_START: process.env.SYNC_ON_START === "true",
};
