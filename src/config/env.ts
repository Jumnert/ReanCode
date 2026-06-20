// Environment Configuration
import { z } from "zod";

// Strip accidental surrounding quotes from env var values (common Vercel mistake)
const str = () => z.string().transform((s) => s.replace(/^["']|["']$/g, "").trim());
const url = () => str().pipe(z.string().url());

const envSchema = z.object({
  // Database
  DATABASE_URL: url(),
  DIRECT_URL: url().optional(),

  // NextAuth (NEXTAUTH_URL is deprecated in NextAuth v5 — removed)
  NEXTAUTH_SECRET: str().pipe(z.string().min(32)),

  // OAuth
  GOOGLE_CLIENT_ID: str().optional(),
  GOOGLE_CLIENT_SECRET: str().optional(),
  GITHUB_CLIENT_ID: str().optional(),
  GITHUB_CLIENT_SECRET: str().optional(),

  // Redis
  UPSTASH_REDIS_REST_URL: url(),
  UPSTASH_REDIS_REST_TOKEN: str(),

  // Email
  SMTP_HOST: str(),
  SMTP_PORT: str(),
  SMTP_USER: str().pipe(z.string().email()),
  SMTP_PASSWORD: str(),
  EMAIL_FROM: str().pipe(z.string().email()),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: str(),

  // App
  NEXT_PUBLIC_APP_URL: url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Admin (optional)
  ADMIN_EMAIL: str().pipe(z.string().email()).optional(),
  ADMIN_SECRET: str().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  // Skip validation during Next.js build phase
  if (process.env.SKIP_ENV_VALIDATION === "1") {
    return process.env as any as Env;
  }
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.issues.map((e) => e.path.join(".")).join(", ");
      throw new Error(`Missing or invalid environment variables: ${missing}`);
    }
    throw error;
  }
}

// Validate on module load
export const env = validateEnv();
