const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const course = await prisma.course.findUnique({ where: { slug: "html" } });
  console.log("Course:", course);
  const lessons = await prisma.lesson.findMany();
  console.log("Lessons:", lessons);
}
main().finally(() => prisma.$disconnect());
