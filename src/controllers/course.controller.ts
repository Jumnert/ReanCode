// Course Controller
import { CourseService } from "@/services/course.service";
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
 * Course Controller
 * Handles course-related operations
 */
export class CourseController {
  /**
   * Get all courses (optionally filtered by category)
   */
  static async getAllCourses(
    category?: string
  ): Promise<ControllerResponse> {
    try {
      const courses = await CourseService.getAll(category);
      return {
        success: true,
        data: courses,
      };
    } catch (error) {
      console.error("Error in getAllCourses:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch courses",
      };
    }
  }

  /**
   * Get a single course by slug
   */
  static async getCourseBySlug(
    slug: string
  ): Promise<ControllerResponse> {
    try {
      const course = await CourseService.getBySlug(slug);

      if (!course) {
        return {
          success: false,
          error: "Course not found",
        };
      }

      return {
        success: true,
        data: course,
      };
    } catch (error) {
      console.error("Error in getCourseBySlug:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch course",
      };
    }
  }

  /**
   * Create a new course (admin only)
   */
  static async createCourse(
    data: Prisma.CourseCreateInput
  ): Promise<ControllerResponse> {
    try {
      const course = await CourseService.create(data);
      return {
        success: true,
        data: course,
      };
    } catch (error) {
      console.error("Error in createCourse:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create course",
      };
    }
  }

  /**
   * Update an existing course (admin only)
   */
  static async updateCourse(
    id: string,
    data: Prisma.CourseUpdateInput
  ): Promise<ControllerResponse> {
    try {
      const course = await CourseService.update(id, data);
      return {
        success: true,
        data: course,
      };
    } catch (error) {
      console.error("Error in updateCourse:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update course",
      };
    }
  }

  /**
   * Delete a course (admin only)
   */
  static async deleteCourse(id: string): Promise<ControllerResponse> {
    try {
      const course = await CourseService.delete(id);
      return {
        success: true,
        data: course,
      };
    } catch (error) {
      console.error("Error in deleteCourse:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete course",
      };
    }
  }

  /**
   * Get all course categories
   */
  static async getCategories(): Promise<ControllerResponse> {
    try {
      const categories = await CourseService.getCategories();
      return {
        success: true,
        data: categories,
      };
    } catch (error) {
      console.error("Error in getCategories:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch categories",
      };
    }
  }
}

export default CourseController;
