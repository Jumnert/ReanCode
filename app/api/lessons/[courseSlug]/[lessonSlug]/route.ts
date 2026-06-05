import { NextRequest } from "next/server";
import { LessonController } from "@/controllers";
import { ApiResponse } from "@/utils/response";

/**
 * GET /api/lessons/[courseSlug]/[lessonSlug]
 * Get a specific lesson by course slug and lesson slug
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ courseSlug: string; lessonSlug: string }> }
) {
  try {
    // Extract params (Next.js 15+ requires awaiting params)
    const params = await context.params;
    const { courseSlug, lessonSlug } = params;

    // Validate slugs
    if (!courseSlug || !lessonSlug) {
      return ApiResponse.validationError(
        "Both course slug and lesson slug are required"
      );
    }

    // Call controller
    const result = await LessonController.getLesson(courseSlug, lessonSlug);

    // Handle response
    if (result.success) {
      return ApiResponse.success(result.data);
    } else if (result.error === "Lesson not found") {
      return ApiResponse.notFound("Lesson not found");
    } else {
      return ApiResponse.error(result.error || "Failed to fetch lesson", 500);
    }
  } catch (error) {
    console.error(
      "Error in GET /api/lessons/[courseSlug]/[lessonSlug]:",
      error
    );
    return ApiResponse.serverError();
  }
}
