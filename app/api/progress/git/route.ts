import { NextRequest } from "next/server";
import { ProgressController } from "@/controllers";
import { requireAuth } from "@/middleware/auth.middleware";
import { ApiResponse } from "@/utils/response";
import { prisma } from "@/config/prisma";

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) return authResult;
    const { user } = authResult;
    if (!user) return ApiResponse.unauthorized("User not found");

    const { chapterId } = await req.json();
    if (!chapterId) return ApiResponse.validationError("chapterId is required");

    // 1. Ensure the Git course exists
    let course = await prisma.course.findUnique({ where: { slug: "git" } });
    if (!course) {
      course = await prisma.course.create({
        data: {
          slug: "git",
          title: "Git Course",
          description: "Basic Git Course",
          category: "git",
          published: true,
        }
      });
    }

    // 2. Ensure the specific lesson exists
    let lesson = await prisma.lesson.findUnique({
      where: {
        courseId_slug: {
          courseId: course.id,
          slug: chapterId
        }
      }
    });

    if (!lesson) {
      lesson = await prisma.lesson.create({
        data: {
          courseId: course.id,
          slug: chapterId,
          title: `Git: ${chapterId}`,
          content: "Git content",
          published: true,
        }
      });
    }

    // 3. Track progress using the actual database lesson.id
    const result = await ProgressController.trackProgress(user.id, lesson.id, {
      completed: true,
    });

    if (result.success) {
      return ApiResponse.success(result.data);
    } else {
      return ApiResponse.error(result.error || "Failed", 500);
    }
  } catch (error) {
    console.error("Error in POST /api/progress/git:", error);
    return ApiResponse.serverError();
  }
}

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) return authResult;
    const { user } = authResult;
    if (!user) return ApiResponse.unauthorized("User not found");

    // Get all completed Git lessons for this user
    const completedProgress = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
        completed: true,
        lesson: {
          course: {
            slug: "git"
          }
        }
      },
      include: {
        lesson: true
      }
    });

    type ProgressItem = (typeof completedProgress)[number]
    const completedChapterIds = completedProgress.map((p: ProgressItem) => p.lesson?.slug).filter(Boolean);
    return ApiResponse.success({ completed: completedChapterIds });
  } catch (error) {
    console.error("Error in GET /api/progress/git:", error);
    return ApiResponse.serverError();
  }
}
