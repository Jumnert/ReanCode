// Lesson Controller
import { LessonService } from "@/services/lesson.service";
import { Prisma } from "@prisma/client";

/**
 * Controller response type
 */
type ControllerResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Lesson Controller
 * Handles lesson-related operations
 */
export class LessonController {
  /**
   * Get a lesson by course slug and lesson slug
   */
  static async getLesson(
    courseSlug: string,
    lessonSlug: string
  ): Promise<ControllerResponse> {
    try {
      const lesson = await LessonService.getBySlug(courseSlug, lessonSlug);

      if (!lesson) {
        return {
          success: false,
          error: "Lesson not found",
        };
      }

      return {
        success: true,
        data: lesson,
      };
    } catch (error) {
      console.error("Error in getLesson:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch lesson",
      };
    }
  }

  /**
   * Create a new lesson (admin only)
   */
  static async createLesson(
    data: Prisma.LessonCreateInput
  ): Promise<ControllerResponse> {
    try {
      const lesson = await LessonService.create(data);
      return {
        success: true,
        data: lesson,
      };
    } catch (error) {
      console.error("Error in createLesson:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create lesson",
      };
    }
  }

  /**
   * Update an existing lesson (admin only)
   */
  static async updateLesson(
    id: string,
    data: Prisma.LessonUpdateInput
  ): Promise<ControllerResponse> {
    try {
      const lesson = await LessonService.update(id, data);
      return {
        success: true,
        data: lesson,
      };
    } catch (error) {
      console.error("Error in updateLesson:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update lesson",
      };
    }
  }

  /**
   * Delete a lesson (admin only)
   */
  static async deleteLesson(id: string): Promise<ControllerResponse> {
    try {
      const lesson = await LessonService.delete(id);
      return {
        success: true,
        data: lesson,
      };
    } catch (error) {
      console.error("Error in deleteLesson:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete lesson",
      };
    }
  }

  /**
   * Get adjacent lessons (previous and next)
   */
  static async getAdjacentLessons(
    courseId: string,
    currentOrder: number
  ): Promise<ControllerResponse> {
    try {
      const adjacentLessons = await LessonService.getAdjacentLessons(
        courseId,
        currentOrder
      );
      return {
        success: true,
        data: adjacentLessons,
      };
    } catch (error) {
      console.error("Error in getAdjacentLessons:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch adjacent lessons",
      };
    }
  }
}

export default LessonController;
