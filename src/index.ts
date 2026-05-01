import { Elysia } from "elysia";
import { db } from "./db";
import { sql } from "drizzle-orm";

const app = new Elysia()
  .get("/", async () => {
    try {
      // Test database connection
      await db.execute(sql`SELECT 1`);
      return {
        status: "success",
        message: "Elysia server is running and database is connected!",
      };
    } catch (error) {
      console.error("Database connection error:", error);
      return {
        status: "partial_success",
        message: "Elysia server is running, but database connection failed.",
        error: (error as Error).message,
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
