import { Metadata } from "next";
import { prisma } from "@/config/prisma";
import { notFound } from "next/navigation";
import { HtmlCompiler } from "@/components/html-compiler";
import { ExerciseWorkspace, ExerciseData } from "./exercise-workspace";

export const revalidate = 0; // Dynamic route

export async function generateMetadata(props: { params: Promise<{ exerciseId: string }> }): Promise<Metadata> {
  const params = await props.params;
  const exercise = await prisma.exercise.findUnique({
    where: { id: params.exerciseId },
    select: { title: true }
  });
  
  if (!exercise && params.exerciseId === 'mock-html-ex-1') return { title: "បង្កើតប៊ូតុង (Create a Button) - រៀន២កូដ" };
  if (!exercise) return { title: "Exercise Not Found" };
  
  return {
    title: `${exercise.title} - រៀន២កូដ`,
  };
}

export default async function ExerciseSolvePage(props: { params: Promise<{ category: string, exerciseId: string }> }) {
  const params = await props.params;
  let exercise = await prisma.exercise.findUnique({
    where: { id: params.exerciseId },
    include: {
      lesson: {
        select: {
          title: true,
          course: {
            select: { title: true }
          }
        }
      }
    }
  });

  if (!exercise && params.exerciseId === 'mock-html-ex-1') {
    exercise = {
      id: 'mock-html-ex-1',
      title: 'បង្កើតប៊ូតុង (Create a Button)',
      difficulty: 'easy',
      points: 10,
      lesson: {
        title: 'មូលដ្ឋានគ្រឹះ HTML',
        course: { title: 'HTML/CSS' }
      },
      description: '<p>នៅក្នុងលំហាត់នេះ អ្នកត្រូវបង្កើតប៊ូតុងមួយ។</p><p>សូមប្រើប្រាស់ tag <code>&lt;button&gt;</code> របស់ HTML ដើម្បីបង្កើតវា។</p><p>កំណត់អត្ថបទនៅក្នុងប៊ូតុងនោះថា <strong>Click Me</strong>។</p>',
      starterCode: '<!DOCTYPE html>\n<html lang="km">\n<head>\n  <meta charset="UTF-8">\n  <title>Exercise</title>\n</head>\n<body>\n  <!-- សរសេរកូដរបស់អ្នកនៅទីនេះ -->\n  \n</body>\n</html>',
      testCases: [
        {
          description: 'ត្រូវមាន tag <button>',
          test: `
            const btn = document.querySelector('button');
            return btn !== null && code.includes('</button>');
          `
        },
        {
          description: 'ប៊ូតុងត្រូវមានពាក្យ "Click Me"',
          test: `
            const btn = document.querySelector('button');
            return btn && btn.textContent.trim() === 'Click Me';
          `
        }
      ]
    } as any;
  }

  if (!exercise) {
    notFound();
  }

  const rawCategory = params.category.toLowerCase();
  const isHtml = ['html-css', 'html', 'css'].includes(rawCategory);

  return (
    <ExerciseWorkspace 
      exercise={exercise as any as ExerciseData} 
      rawCategory={rawCategory} 
      isHtml={isHtml} 
    />
  );
}
