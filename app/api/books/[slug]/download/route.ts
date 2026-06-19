import { NextRequest } from "next/server";
import { BookController } from "@/controllers";
import { requireAuth } from "@/middleware/auth.middleware";
import { ApiResponse } from "@/utils/response";

/**
 * POST /api/books/[slug]/download
 * Track and initiate book download (requires authentication)
 */
export async function POST(
 req: NextRequest,
 context: { params: Promise<{ slug: string }> }
) {
 try {
 // Check authentication
 const authResult = await requireAuth(req);

 // If authentication failed, authResult is a NextResponse (error response)
 if (authResult instanceof Response) {
 return authResult;
 }

 // Get authenticated user
 const { user } = authResult;
 if (!user) {
 return ApiResponse.unauthorized("User not found");
 }

 // Extract params (Next.js 15+ requires awaiting params)
 const params = await context.params;
 const { slug } = params;

 // Validate slug
 if (!slug) {
 return ApiResponse.validationError("Book slug is required");
 }

 // Call controller (slug is used as bookId for now)
 const result = await BookController.downloadBook(user.id, slug);

 // Handle response
 if (result.success) {
 return ApiResponse.success(result.data);
 } else if (result.error === "Book not found") {
 return ApiResponse.notFound("Book not found");
 } else {
 return ApiResponse.error(result.error || "Failed to download book", 500);
 }
 } catch (error) {
 console.error("Error in POST /api/books/[slug]/download:", error);
 return ApiResponse.serverError();
 }
}
