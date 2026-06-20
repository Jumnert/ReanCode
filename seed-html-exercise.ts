const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Check if an HTML course exists
  let course = await prisma.course.findFirst({
    where: { category: 'html' }
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'HTML & CSS ថ្នាក់ដំបូង',
        slug: 'html-css-basics',
        description: 'រៀនមូលដ្ឋានគ្រឹះនៃការបង្កើតគេហទំព័រជាមួយ HTML និង CSS',
        category: 'html',
        published: true,
        order: 1
      }
    });
  }

  // 2. Check if a lesson exists
  let lesson = await prisma.lesson.findFirst({
    where: { courseId: course.id }
  });

  if (!lesson) {
    lesson = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'សេចក្តីផ្តើម HTML',
        slug: 'intro-to-html',
        content: 'HTML គឺជាភាសាគ្រឹះសម្រាប់បង្កើតគេហទំព័រ។',
        published: true,
        order: 1
      }
    });
  }

  // 3. Create an exercise
  const exercise = await prisma.exercise.create({
    data: {
      lessonId: lesson.id,
      title: 'បង្កើតប៊ូតុង',
      description: 'សូមបង្កើតប៊ូតុង (Button) មួយនៅក្នុង HTML ជាមួយពាក្យថា "ចុចខ្ញុំ" (Click Me)។\n\n**តម្រូវការ:**\n- បង្កើត Tag `<button>`\n- ដាក់អត្ថបទខាងក្នុងថា "ចុចខ្ញុំ"',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>លំហាត់ទី១</title>\n</head>\n<body>\n  <!-- សរសេរកូដរបស់អ្នកនៅទីនេះ -->\n  \n</body>\n</html>',
      solution: '<!DOCTYPE html>\n<html>\n<head>\n  <title>លំហាត់ទី១</title>\n</head>\n<body>\n  <!-- សរសេរកូដរបស់អ្នកនៅទីនេះ -->\n  <button>ចុចខ្ញុំ</button>\n</body>\n</html>',
      testCases: [
        { description: "ត្រូវមាន tag button", expected: "true", input: "document.querySelector('button') !== null" }
      ],
      difficulty: 'easy',
      points: 10
    }
  });

  console.log("Created exercise: ", exercise.id);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
