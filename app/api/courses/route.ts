import { NextRequest } from "next/server";
import { CourseController } from "@/controllers";
import { requireAdmin } from "@/middleware/auth.middleware";
import { ApiResponse } from "@/utils/response";

/**
 * GET /api/courses
 * Get all courses with optional category filter
 * Query params: category (optional)
 */
export async function GET(req: NextRequest) {
 try {
 // Extract query parameters
 const { searchParams } = new URL(req.url);
 const category = searchParams.get("category") || undefined;

 // Call controller
 const result = await CourseController.getAllCourses(category);

 // Handle response
 if (result.success) {
 return ApiResponse.success(result.data);
 } else {
 return ApiResponse.error(result.error || "Failed to fetch courses", 500);
 }
 } catch (error) {
 console.error("Error in GET /api/courses:", error);
 return ApiResponse.serverError();
 }
}

/**
 * POST /api/courses
 * Create a new course (admin only)
 * Body: Course data
 */
export async function POST(req: NextRequest) {
 try {
 // Check admin authentication
 const authResult = await requireAdmin(req);

 // If authentication failed, authResult is a NextResponse (error response)
 if (authResult instanceof Response) {
 return authResult;
 }

 // Parse request body
 const body = await req.json();

 // Validate required fields
 if (!body.title || !body.slug || !body.description) {
 return ApiResponse.validationError(
 "Missing required fields: title, slug, description"
 );
 }

 // Call controller
 const result = await CourseController.createCourse(body);

 // Handle response
 if (result.success) {
 return ApiResponse.created(result.data);
 } else {
 return ApiResponse.error(result.error || "Failed to create course", 500);
 }
 } catch (error) {
 console.error("Error in POST /api/courses:", error);
 return ApiResponse.serverError();
 }
}
