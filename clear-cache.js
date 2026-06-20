require('dotenv').config({ path: '.env.local' });
const { Redis } = require('@upstash/redis');

async function clear() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });
  await redis.del('leaderboard:alltime');
  console.log("Cleared leaderboard cache");
}
clear();
