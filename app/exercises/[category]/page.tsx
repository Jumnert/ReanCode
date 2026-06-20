import { Metadata } from "next";
import { prisma } from "@/config/prisma";
import { Code2, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/config/auth";
import { CheckCircle2 } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    select: { category: true }
  });

  const categories = Array.from(new Set(courses.map(c => c.category)));
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const params = await props.params;
  const title = params.category.toUpperCase().replace('-', '/');
  return {
    title: `${title} Exercises - រៀន២កូដ`,
    description: `អនុវត្តន៍លំហាត់ ${title} ដើម្បីពង្រឹងសមត្ថភាពរបស់អ្នក`,
  };
}

export default async function CategoryExercisesPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const rawCategory = params.category.toLowerCase();
  
  // Map url category to db categories
  let dbCategories: string[] = [rawCategory];
  if (rawCategory === 'html-css') dbCategories = ['html', 'css'];
  if (rawCategory === 'javascript') dbCategories = ['javascript', 'js'];
  if (rawCategory === 'typescript') dbCategories = ['typescript', 'ts'];

  // Fetch all exercises that belong to courses in this category
  const session = await auth();
  let completedExerciseIds = new Set<string>();

  if (session?.user?.id) {
    const solutions = await prisma.solution.findMany({
      where: { userId: session.user.id, passed: true },
      select: { exerciseId: true }
    });
    completedExerciseIds = new Set(solutions.map(s => s.exerciseId));
  }

  // Check cookies for mock exercise completions
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  if (cookieStore.get("completed_mock-html-ex-1")?.value === "true") {
    completedExerciseIds.add("mock-html-ex-1");
  }

  const exercises = await prisma.exercise.findMany({
    where: {
      lesson: {
        course: {
          category: { in: dbCategories },
          published: true
        }
      }
    },
    include: {
      lesson: {
        select: {
          title: true,
          course: {
            select: { title: true }
          }
        }
      }
    },
    orderBy: [
      { lesson: { course: { order: 'asc' } } },
      { lesson: { order: 'asc' } }
    ]
  });

  if (exercises.length === 0 && dbCategories.includes('html')) {
    exercises.push({
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
    } as any);
  }

  const displayTitle = rawCategory === 'html-css' ? 'HTML & CSS' : 
                       rawCategory === 'javascript' ? 'JavaScript' :
                       rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  return (
    <div className="h-[calc(100vh-65px)] overflow-hidden bg-[#faf9f5] dark:bg-[#181715] transition-colors">
      <div className="max-w-3xl mx-auto h-full border-x-2 border-[#cc785c]/30 bg-[#faf9f5] dark:bg-[#181715] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="pt-16 pb-10 px-6 md:px-10">
            <Link 
              href="/exercises"
              className="inline-flex items-center text-[14px] font-medium text-[#6c6a64] dark:text-[#a09d96] hover:text-[#cc785c] dark:hover:text-[#cc785c] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Categories
            </Link>
            <div className="inline-flex items-center justify-center p-3 bg-[#cc785c]/10 rounded-none border-2 border-[#cc785c]/30 mb-6">
              <Code2 className="h-6 w-6 text-[#cc785c]" />
            </div>
            <h1 className="text-[32px] md:text-[38px] font-['Copernicus',_serif] tracking-tight text-[#141413] dark:text-[#faf9f5] mb-3">
              {displayTitle}
            </h1>
            <p className="text-[16px] text-[#6c6a64] dark:text-[#a09d96] font-['StyreneB',_sans-serif]">
              {exercises.length} {exercises.length === 1 ? 'Exercise' : 'Exercises'} available
            </p>
          </div>

        {/* Edge-to-Edge Pattern Line under header (before items) */}
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] h-8 border-y-2 border-[#cc785c]/30 bg-[#faf9f5] dark:bg-[#181715]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }} />

        {/* Exercise Grid / List */}
        <div className="bg-[#faf9f5] dark:bg-[#181715]">
          {exercises.length > 0 ? (
            <div className="flex flex-col">
              {exercises.map((exercise, index) => (
                <Link 
                  href={`/exercises/${rawCategory}/${exercise.id}`} 
                  key={exercise.id}
                  className={cn(
                    "group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 px-6 md:px-10 py-6 border-b-2 border-[#cc785c]/30 transition-colors hover:bg-[#efe9de] dark:hover:bg-[#1f1e1b]",
                    index === exercises.length - 1 ? "border-b-0" : ""
                  )}
                >
                  <div className="flex-1">
                    <span className="block text-[12px] font-bold uppercase tracking-wider text-[#cc785c] mb-1">
                      {exercise.lesson?.course?.title} • {exercise.lesson?.title}
                    </span>
                    <span className="block text-[18px] font-bold font-['StyreneB',_sans-serif] text-[#141413] dark:text-[#faf9f5]">
                      {exercise.title}
                    </span>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={cn(
                        "text-[12px] font-bold px-2 py-0.5 rounded-sm border",
                        exercise.difficulty === 'easy' ? "border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10" :
                        exercise.difficulty === 'medium' ? "border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10" :
                        "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10"
                      )}>
                        {exercise.difficulty ? exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1) : "Easy"}
                      </span>
                      <span className="text-[14px] text-[#6c6a64] dark:text-[#a09d96] font-medium font-mono">
                        {exercise.points} PTS
                      </span>
                      {completedExerciseIds.has(exercise.id) && (
                        <span className="inline-flex items-center gap-1 text-[12px] font-bold px-2 py-0.5 rounded-sm border border-[#cc785c]/30 text-[#cc785c] bg-[#cc785c]/10">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          DONE
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ChevronRight className={cn(
                      "w-5 h-5 transition-colors flex-shrink-0",
                      completedExerciseIds.has(exercise.id) 
                        ? "text-[#cc785c]" 
                        : "text-[#8e8b82] dark:text-[#6c6a64] group-hover:text-[#cc785c]"
                    )} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <Code2 className="w-12 h-12 text-[#8e8b82] dark:text-[#6c6a64] mx-auto mb-6 opacity-80" />
              <h3 className="text-[22px] font-['StyreneB',_sans-serif] font-bold mb-3 text-[#141413] dark:text-[#faf9f5]">No exercises available</h3>
              <p className="text-[#6c6a64] dark:text-[#a09d96] mb-8 text-[16px]">
                We haven't added any {displayTitle} exercises to the platform yet. Check back soon!
              </p>
            </div>
          )}
        </div>
        </div>
        
        {/* Bottom Edge-to-Edge Pattern Line (after items) */}
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] h-8 border-y-2 border-[#cc785c]/30 bg-[#faf9f5] dark:bg-[#181715] shrink-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }} />
      </div>
    </div>
  );
}
