import { NextRequest } from "next/server";
import { ProgressController } from "@/controllers";
import { requireAuth } from "@/middleware/auth.middleware";
import { ApiResponse } from "@/utils/response";

/**
 * POST /api/progress
 * Track user progress for a lesson (requires authentication)
 * Body: { lessonId: string, completed?: boolean, timeSpent?: number, score?: number }
 */
export async function POST(req: NextRequest) {
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

 // Parse request body
 const body = await req.json();
 const { lessonId, completed, timeSpent, score } = body;

 // Validate required fields
 if (!lessonId) {
 return ApiResponse.validationError("lessonId is required");
 }

 // Call controller
 const result = await ProgressController.trackProgress(user.id, lessonId, {
 completed,
 timeSpent,
 score,
 });

 // Handle response
 if (result.success) {
 return ApiResponse.success(result.data);
 } else {
 return ApiResponse.error(
 result.error || "Failed to track progress",
 500
 );
 }
 } catch (error) {
 console.error("Error in POST /api/progress:", error);
 return ApiResponse.serverError();
 }
}

/**
 * GET /api/progress
 * Get user's overall progress (requires authentication)
 */
export async function GET(req: NextRequest) {
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

 // Call controller
 const result = await ProgressController.getUserProgress(user.id);

 // Handle response
 if (result.success) {
 return ApiResponse.success(result.data);
 } else {
 return ApiResponse.error(
 result.error || "Failed to fetch user progress",
 500
 );
 }
 } catch (error) {
 console.error("Error in GET /api/progress:", error);
 return ApiResponse.serverError();
 }
}
