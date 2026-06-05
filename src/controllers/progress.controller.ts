// Progress Controller
import { ProgressService } from "@/services/progress.service";

/**
 * Controller response type
 */
type ControllerResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Progress tracking data type
 */
type ProgressData = {
  completed?: boolean;
  timeSpent?: number;
  score?: number;
};

/**
 * Progress Controller
 * Handles user progress tracking operations
 */
export class ProgressController {
  /**
   * Track user progress for a lesson
   */
  static async trackProgress(
    userId: string,
    lessonId: string,
    data: ProgressData
  ): Promise<ControllerResponse> {
    try {
      // Validate input
      if (!userId || !lessonId) {
        return {
          success: false,
          error: "userId and lessonId are required",
        };
      }

      const progress = await ProgressService.trackLesson(
        userId,
        lessonId,
        data
      );

      return {
        success: true,
        data: progress,
      };
    } catch (error) {
      console.error("Error in trackProgress:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to track progress",
      };
    }
  }

  /**
   * Get user's overall progress summary
   */
  static async getUserProgress(
    userId: string
  ): Promise<ControllerResponse> {
    try {
      if (!userId) {
        return {
          success: false,
          error: "userId is required",
        };
      }

      const progress = await ProgressService.getUserProgress(userId);

      return {
        success: true,
        data: progress,
      };
    } catch (error) {
      console.error("Error in getUserProgress:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch user progress",
      };
    }
  }

  /**
   * Get user's progress for a specific course
   */
  static async getCourseProgress(
    userId: string,
    courseId: string
  ): Promise<ControllerResponse> {
    try {
      if (!userId || !courseId) {
        return {
          success: false,
          error: "userId and courseId are required",
        };
      }

      const progress = await ProgressService.getCourseProgress(
        userId,
        courseId
      );

      return {
        success: true,
        data: progress,
      };
    } catch (error) {
      console.error("Error in getCourseProgress:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch course progress",
      };
    }
  }

  /**
   * Get user's learning streak
   */
  static async getUserStreak(userId: string): Promise<ControllerResponse> {
    try {
      if (!userId) {
        return {
          success: false,
          error: "userId is required",
        };
      }

      const streak = await ProgressService.getStreak(userId);

      return {
        success: true,
        data: streak,
      };
    } catch (error) {
      console.error("Error in getUserStreak:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch user streak",
      };
    }
  }
}

export default ProgressController;
