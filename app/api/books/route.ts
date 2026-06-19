import { NextRequest } from "next/server";
import { BookController } from "@/controllers";
import { ApiResponse } from "@/utils/response";

/**
 * GET /api/books
 * Get all books with optional category filter
 * Query params: category (optional)
 */
export async function GET(req: NextRequest) {
 try {
 // Extract query parameters
 const { searchParams } = new URL(req.url);
 const category = searchParams.get("category") || undefined;

 // Call controller
 const result = await BookController.getAllBooks(category);

 // Handle response
 if (result.success) {
 return ApiResponse.success(result.data);
 } else {
 return ApiResponse.error(result.error || "Failed to fetch books", 500);
 }
 } catch (error) {
 console.error("Error in GET /api/books:", error);
 return ApiResponse.serverError();
 }
}
