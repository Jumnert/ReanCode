import { NextRequest } from "next/server";
import { CourseController } from "@/controllers";
import { ApiResponse } from "@/utils/response";

/**
 * GET /api/courses/[slug]
 * Get a single course by slug
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
 return ApiResponse.validationError("Course slug is required");
 }

 // Call controller
 const result = await CourseController.getCourseBySlug(slug);

 // Handle response
 if (result.success) {
 return ApiResponse.success(result.data);
 } else if (result.error === "Course not found") {
 return ApiResponse.notFound("Course not found");
 } else {
 return ApiResponse.error(result.error || "Failed to fetch course", 500);
 }
 } catch (error) {
 console.error("Error in GET /api/courses/[slug]:", error);
 return ApiResponse.serverError();
 }
}
