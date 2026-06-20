import { prisma } from "@/config/prisma";
import { redis, CacheKeys, CacheTTL } from "@/config/redis";

export class LeaderboardService {
  /**
   * Get all-time leaderboard
   */
  static async getAllTime() {
    const cacheKey = CacheKeys.leaderboardAllTime();
    
    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return typeof cached === 'string' ? JSON.parse(cached) : cached as any;
    }

    // Calculate leaderboard if not in cache
    const activities = await prisma.studyActivity.groupBy({
      by: ['userId'],
      _sum: {
        count: true,
      },
      orderBy: {
        _sum: {
          count: 'desc'
        }
      }
    });

    const userIds = activities.map(a => a.userId);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds }
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        avatarUrl: true
      }
    });

    const leaderboard = activities.map(a => {
      const u = users.find(user => user.id === a.userId);
      return {
        id: a.userId,
        name: u?.name || 'អនាមិក',
        username: u?.username,
        image: u?.image || u?.avatarUrl || '',
        points: a._sum.count || 0
      };
    });

    // Cache the result for SHORT duration (e.g. 5 mins) to keep it fresh
    await redis.setex(cacheKey, CacheTTL.SHORT, leaderboard);
    
    return leaderboard;
  }
}
