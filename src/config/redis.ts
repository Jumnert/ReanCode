// Redis Configuration
import { Redis } from "@upstash/redis";
import { env } from "./env";

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// Cache key generators
export const CacheKeys = {
  // User
  userProgress: (userId: string) => `user:${userId}:progress`,
  userStreak: (userId: string) => `user:${userId}:streak`,
  userProfile: (username: string) => `user:profile:${username}`,

  // Lessons
  lesson: (slug: string) => `lesson:${slug}`,
  lessonViews: (lessonId: string) => `lesson:${lessonId}:views`,

  // Books
  bookDownloads: (bookId: string) => `book:${bookId}:downloads`,
  bookList: (category?: string) => category ? `books:${category}` : `books:all`,
  book: (slug: string) => `book:${slug}`,
  bookCategories: () => `books:categories`,
  bookSearch: (query: string) => `books:search:${query.toLowerCase()}`,

  // Leaderboard
  leaderboardWeekly: () => `leaderboard:weekly`,
  leaderboardAllTime: () => `leaderboard:alltime`,

  // Content cache
  courseList: (category?: string) =>
    category ? `courses:${category}` : `courses:all`,
  course: (slug: string) => `course:${slug}`,
};

// Cache TTL (in seconds)
export const CacheTTL = {
  SHORT: 300,      // 5 minutes
  MEDIUM: 1800,    // 30 minutes
  LONG: 3600,      // 1 hour
  DAY: 86400,      // 24 hours
  WEEK: 604800,    // 7 days
};

export default redis;
