import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../config/.env")
});
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});