// Progress Service
import { prisma } from "@/config/prisma";
import { redis, CacheKeys, CacheTTL } from "@/config/redis";

export class ProgressService {
  // Track lesson progress
  static async trackLesson(
    userId: string,
    lessonId: string,
    data: {
      completed?: boolean;
      timeSpent?: number;
      score?: number;
    }
  ) {
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        ...data,
        lastAccessed: new Date(),
      },
      update: {
        ...data,
        lastAccessed: new Date(),
        ...(data.timeSpent && {
          timeSpent: { increment: data.timeSpent },
        }),
      },
    });

    // Invalidate user progress cache
    await redis.del(CacheKeys.userProgress(userId));

    // Update streak
    await this.updateStreak(userId);

    return progress;
  }

  // Get user progress summary
  static async getUserProgress(userId: string) {
    const cacheKey = CacheKeys.userProgress(userId);

    // Try cache
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached as string);

    // Query DB
    const [totalLessons, completedLessons, totalTimeSpent] = await Promise.all([
      prisma.userProgress.count({ where: { userId } }),
      prisma.userProgress.count({ where: { userId, completed: true } }),
      prisma.userProgress.aggregate({
        where: { userId },
        _sum: { timeSpent: true },
      }),
    ]);

    const progressByCourse = await prisma.userProgress.groupBy({
      by: ["courseId"],
      where: { userId, courseId: { not: null } },
      _count: { completed: true },
    });

    const summary = {
      totalLessons,
      completedLessons,
      totalTimeSpent: totalTimeSpent._sum.timeSpent || 0,
      progressByCategory: progressByCourse,
      completionRate: totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0,
    };

    // Cache for 5 minutes
    await redis.setex(cacheKey, CacheTTL.SHORT, JSON.stringify(summary));

    return summary;
  }

  // Update learning streak
  static async updateStreak(userId: string) {
    const streakKey = CacheKeys.userStreak(userId);
    const today = new Date().toISOString().split("T")[0];

    const streakData = await redis.get(streakKey);
    let streak = streakData
      ? JSON.parse(streakData as string)
      : { count: 0, lastDate: null };

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    if (streak.lastDate === yesterday) {
      // Continue streak
      streak.count += 1;
      streak.lastDate = today;
    } else if (streak.lastDate !== today) {
      // Reset streak
      streak.count = 1;
      streak.lastDate = today;
    }

    await redis.set(streakKey, JSON.stringify(streak));

    return streak;
  }

  // Get user streak
  static async getStreak(userId: string) {
    const streakKey = CacheKeys.userStreak(userId);
    const data = await redis.get(streakKey);

    return data ? JSON.parse(data as string) : { count: 0, lastDate: null };
  }

  // Get course progress
  static async getCourseProgress(userId: string, courseId: string) {
    const lessons = await prisma.lesson.findMany({
      where: { courseId, published: true },
      select: { id: true },
    });

    const completed = await prisma.userProgress.count({
      where: {
        userId,
        courseId,
        completed: true,
      },
    });

    return {
      total: lessons.length,
      completed,
      percentage: lessons.length > 0
        ? Math.round((completed / lessons.length) * 100)
        : 0,
    };
  }
}

export default ProgressService;
