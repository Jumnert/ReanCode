// Lesson Service
import { prisma } from "@/config/prisma";
import { redis, CacheKeys, CacheTTL } from "@/config/redis";
import { Prisma } from "@prisma/client";

export class LessonService {
  // Get lesson by slug
  static async getBySlug(courseSlug: string, lessonSlug: string) {
    const cacheKey = CacheKeys.lesson(`${courseSlug}/${lessonSlug}`);

    // Try cache
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached as string);

    // Query DB
    const lesson = await prisma.lesson.findFirst({
      where: {
        slug: lessonSlug,
        course: { slug: courseSlug },
        published: true,
      },
      include: {
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            category: true,
          },
        },
        codeExamples: {
          orderBy: { order: "asc" },
        },
        exercises: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            points: true,
          },
        },
        quizzes: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (lesson) {
      // Cache for 1 hour
      await redis.setex(cacheKey, CacheTTL.LONG, JSON.stringify(lesson));

      // Increment view count
      await this.incrementViews(lesson.id);
    }

    return lesson;
  }

  // Increment lesson views
  static async incrementViews(lessonId: string) {
    const viewKey = CacheKeys.lessonViews(lessonId);
    const views = await redis.incr(viewKey);

    // Update DB every 10 views
    if (views % 10 === 0) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { views: { increment: 10 } },
      });
    }
  }

  // Create lesson (admin)
  static async create(data: Prisma.LessonCreateInput) {
    return prisma.lesson.create({ data });
  }

  // Update lesson (admin)
  static async update(id: string, data: Prisma.LessonUpdateInput) {
    const lesson = await prisma.lesson.update({
      where: { id },
      data,
    });

    // Invalidate cache
    const course = await prisma.course.findUnique({
      where: { id: lesson.courseId },
    });

    if (course) {
      await redis.del(CacheKeys.lesson(`${course.slug}/${lesson.slug}`));
    }

    return lesson;
  }

  // Delete lesson (admin)
  static async delete(id: string) {
    return prisma.lesson.delete({ where: { id } });
  }

  // Get next/prev lesson
  static async getAdjacentLessons(courseId: string, currentOrder: number) {
    const [prev, next] = await Promise.all([
      prisma.lesson.findFirst({
        where: {
          courseId,
          order: { lt: currentOrder },
          published: true,
        },
        orderBy: { order: "desc" },
        select: { id: true, slug: true, title: true },
      }),
      prisma.lesson.findFirst({
        where: {
          courseId,
          order: { gt: currentOrder },
          published: true,
        },
        orderBy: { order: "asc" },
        select: { id: true, slug: true, title: true },
      }),
    ]);

    return { prev, next };
  }
}

export default LessonService;
