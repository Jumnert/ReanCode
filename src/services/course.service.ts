// Course Service
import { prisma } from "@/config/prisma";
import { redis, CacheKeys, CacheTTL } from "@/config/redis";
import { Prisma } from "@prisma/client";

export class CourseService {
  // Get all courses
  static async getAll(category?: string) {
    const cacheKey = CacheKeys.courseList(category);

    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) return cached;

    // Query DB
    const courses = await prisma.course.findMany({
      where: {
        published: true,
        ...(category && { category }),
      },
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { lessons: true },
        },
      },
    });

    // Cache result
    await redis.setex(cacheKey, CacheTTL.LONG, JSON.stringify(courses));

    return courses;
  }

  // Get single course by slug
  static async getBySlug(slug: string) {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          where: { published: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            slug: true,
            title: true,
            estimatedMinutes: true,
            difficulty: true,
            order: true,
          },
        },
      },
    });
  }

  // Create course (admin)
  static async create(data: Prisma.CourseCreateInput) {
    const course = await prisma.course.create({ data });

    // Invalidate cache
    await redis.del(CacheKeys.courseList());

    return course;
  }

  // Update course (admin)
  static async update(id: string, data: Prisma.CourseUpdateInput) {
    const course = await prisma.course.update({
      where: { id },
      data,
    });

    // Invalidate cache
    await redis.del(CacheKeys.courseList());
    await redis.del(CacheKeys.courseList(course.category));

    return course;
  }

  // Delete course (admin)
  static async delete(id: string) {
    const course = await prisma.course.delete({ where: { id } });

    // Invalidate cache
    await redis.del(CacheKeys.courseList());

    return course;
  }

  // Get course categories
  static async getCategories() {
    return prisma.course.groupBy({
      by: ["category"],
      where: { published: true },
      _count: true,
    });
  }
}

export default CourseService;
