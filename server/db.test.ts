import { describe, expect, it } from "vitest";
import mysql from "mysql2/promise";

describe("Railway MySQL connection", () => {
  it("connects to Railway MySQL and finds articles table", async () => {
    const url = process.env.RAILWAY_DATABASE_URL;
    expect(url).toBeTruthy();
    const pool = mysql.createPool({ uri: url!, connectionLimit: 1 });
    const [rows] = await pool.execute("SELECT COUNT(*) as cnt FROM articles");
    const count = (rows as any)[0].cnt;
    expect(count).toBeGreaterThan(0);
    await pool.end();
  });
});
