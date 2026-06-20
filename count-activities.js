require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const activities = await prisma.studyActivity.groupBy({
    by: ['userId'],
    _sum: { count: true }
  });
  console.log("Users with study activity:", activities.length);
  const users = await prisma.user.count();
  console.log("Total users:", users);
}
main().finally(() => prisma.$disconnect());
