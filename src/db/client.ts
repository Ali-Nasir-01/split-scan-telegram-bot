import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as tables from "./index.ts";

const pool = createPool({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: "split_scan_mysql",
});

// @ts-ignore
export const db = drizzle(pool, { schema: tables, mode: "default" });
