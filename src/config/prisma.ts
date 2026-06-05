// Prisma Client Configuration
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

// Read DATABASE_URL from process.env or directly from .env.local
function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  // Fallback: read directly from file (Turbopack server workers may not have env injected)
  for (const file of [".env.local", ".env"]) {
    try {
      const content = fs.readFileSync(
        path.resolve(process.cwd(), file),
        "utf-8"
      );
      const match = content.match(/^DATABASE_URL=["']?([^"'\n\r]+)["']?/m);
      if (match?.[1]) {
        process.env.DATABASE_URL = match[1].trim();
        return process.env.DATABASE_URL;
      }
    } catch {}
  }
  throw new Error("DATABASE_URL is not set. Check your .env.local file.");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = getDatabaseUrl();
  // Use HTTP driver — works in all environments without WebSocket setup
  // @ts-ignore - PrismaNeonHttp types might be outdated
  const adapter = new PrismaNeonHttp(connectionString);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
