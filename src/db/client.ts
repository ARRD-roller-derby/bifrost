import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle({
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    database: process.env.DB_NAME || "bifrost",
    password: process.env.DB_PASSWORD || "password",
    port: Number(process.env.DB_PORT) || 3306,
  },
});