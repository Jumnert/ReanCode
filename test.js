const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const activities = await prisma.studyActivity.groupBy({
    by: ['userId'],
    _sum: { count: true }
  });
  console.log("Activities:", activities);
  
  const users = await prisma.user.findMany();
  console.log("Users total:", users.length);
}
main().finally(() => prisma.$disconnect());
