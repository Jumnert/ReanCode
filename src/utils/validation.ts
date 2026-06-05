// Validation Utilities
import { z } from "zod";

/**
 * Validate request body with Zod schema
 */
export async function validateBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      };
    }
    return { success: false, error: "Invalid request body" };
  }
}

/**
 * Validate query params
 */
export function validateQuery<T>(
  params: URLSearchParams,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  try {
    const obj = Object.fromEntries(params.entries());
    const parsed = schema.parse(obj);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      };
    }
    return { success: false, error: "Invalid query parameters" };
  }
}

// Common validation schemas
export const Schemas = {
  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number"),

  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),

  url: z.string().url("Invalid URL"),

  pagination: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),

  id: z.string().cuid("Invalid ID format"),
};

export default { validateBody, validateQuery, Schemas };
