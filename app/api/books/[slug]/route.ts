import { NextRequest } from "next/server";
import { BookController } from "@/controllers";
import { ApiResponse } from "@/utils/response";

/**
 * GET /api/books/[slug]
 * Get a single book by slug
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // Extract params (Next.js 15+ requires awaiting params)
    const params = await context.params;
    const { slug } = params;

    // Validate slug
    if (!slug) {
      return ApiResponse.validationError("Book slug is required");
    }

    // Call controller
    const result = await BookController.getBookBySlug(slug);

    // Handle response
    if (result.success) {
      return ApiResponse.success(result.data);
    } else if (result.error === "Book not found") {
      return ApiResponse.notFound("Book not found");
    } else {
      return ApiResponse.error(result.error || "Failed to fetch book", 500);
    }
  } catch (error) {
    console.error("Error in GET /api/books/[slug]:", error);
    return ApiResponse.serverError();
  }
}
