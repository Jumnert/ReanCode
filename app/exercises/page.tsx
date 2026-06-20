import { Metadata } from "next";
import { prisma } from "@/config/prisma";
import { Activity, Code2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "លំហាត់អនុវត្តន៍ - រៀន២កូដ",
  description: "សាកល្បងសមត្ថភាពសរសេរកូដរបស់អ្នកតាមរយៈលំហាត់អនុវត្តន៍នានា",
};

export const revalidate = 3600; // Revalidate every hour

export default async function ExercisePage() {
  // Fetch all published courses with their lessons and exercise counts
  const courses = await prisma.course.findMany({
    where: { published: true },
    select: {
      category: true,
      lessons: {
        select: {
          _count: {
            select: { exercises: true }
          }
        }
      }
    }
  });

  // Group by category (language) and sum exercises
  const languageStats: Record<string, { count: number, name: string, iconPath: string }> = {};

  courses.forEach(course => {
    const cat = course.category.toLowerCase();
    
    // Determine language name and icon mapping
    let name = course.category;
    let iconPath = "";
    
    if (cat.includes("html") || cat.includes("css")) {
      name = "HTML/CSS";
      iconPath = "/images/html.svg";
    } else if (cat.includes("javascript") || cat.includes("js")) {
      name = "JavaScript";
      iconPath = "/images/javascript.svg";
    } else if (cat.includes("python")) {
      name = "Python";
      iconPath = "/images/python.svg";
    } else if (cat.includes("react")) {
      name = "React";
      iconPath = "/images/react.svg";
    } else if (cat.includes("typescript") || cat.includes("ts")) {
      name = "TypeScript";
      iconPath = "/images/typescript.svg";
    } else if (cat.includes("vue")) {
      name = "Vue";
      iconPath = "/images/vue.svg";
    }

    const totalExercises = course.lessons.reduce((acc, lesson) => acc + lesson._count.exercises, 0);

    if (!languageStats[name]) {
      languageStats[name] = { count: 0, name, iconPath };
    }
    
    languageStats[name].count += totalExercises;
  });

  // Inject mock HTML exercise if none exist
  if (!languageStats['HTML/CSS'] || languageStats['HTML/CSS'].count === 0) {
    languageStats['HTML/CSS'] = { count: 1, name: 'HTML/CSS', iconPath: '/images/html.svg' };
  }

  // Convert to array and filter out languages with 0 exercises
  const languages = Object.values(languageStats)
    .filter(lang => lang.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="h-[calc(100vh-65px)] overflow-hidden bg-[#faf9f5] dark:bg-[#181715] transition-colors">
      <div className="max-w-3xl mx-auto h-full border-x-2 border-[#cc785c]/30 bg-[#faf9f5] dark:bg-[#181715] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="pt-16 pb-10 px-6 md:px-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-[#cc785c]/10 rounded-none border-2 border-[#cc785c]/30 mb-6">
              <Code2 className="h-8 w-8 text-[#cc785c]" />
            </div>
            <h1 className="text-[36px] md:text-[42px] font-['Copernicus',_serif] tracking-tight text-[#141413] dark:text-[#faf9f5] mb-4">
              Exercises
            </h1>
            <p className="text-[16px] text-[#6c6a64] dark:text-[#a09d96] font-['StyreneB',_sans-serif] max-w-lg mx-auto">
              Test your programming skills with our interactive exercises across different languages.
            </p>
          </div>

        {/* Edge-to-Edge Pattern Line under header (before items) */}
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] h-8 border-y-2 border-[#cc785c]/30 bg-[#faf9f5] dark:bg-[#181715]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }} />

        {/* Language Grid / List */}
        <div className="bg-[#faf9f5] dark:bg-[#181715]">
          {languages.length > 0 ? (
            <div className="flex flex-col">
              {languages.map((lang, index) => (
                <Link 
                  href={`/exercises/${lang.name.toLowerCase().replace(/[\/\s]/g, '-')}`} 
                  key={lang.name}
                  className={cn(
                    "group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 px-6 md:px-10 py-6 border-b-2 border-[#cc785c]/30 transition-colors hover:bg-[#efe9de] dark:hover:bg-[#1f1e1b]",
                    index === languages.length - 1 ? "border-b-0" : ""
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-[#252320] rounded-none border-2 border-[#cc785c]/30">
                      {lang.iconPath ? (
                        <Image src={lang.iconPath} alt={lang.name} width={24} height={24} />
                      ) : (
                        <Code2 className="w-5 h-5 text-[#6c6a64] dark:text-[#a09d96]" />
                      )}
                    </div>
                    <div>
                      <span className="block text-[18px] font-bold font-['StyreneB',_sans-serif] text-[#141413] dark:text-[#faf9f5]">
                        {lang.name}
                      </span>
                      <span className="block text-[14px] text-[#6c6a64] dark:text-[#a09d96] font-medium mt-1">
                        {lang.count} {lang.count === 1 ? 'Exercise' : 'Exercises'} available
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-[#8e8b82] dark:text-[#6c6a64] group-hover:text-[#cc785c] transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <Code2 className="w-12 h-12 text-[#8e8b82] dark:text-[#6c6a64] mx-auto mb-6 opacity-80" />
              <h3 className="text-[22px] font-['StyreneB',_sans-serif] font-bold mb-3 text-[#141413] dark:text-[#faf9f5]">No exercises yet</h3>
              <p className="text-[#6c6a64] dark:text-[#a09d96] mb-8 text-[16px]">
                We haven't added any interactive exercises to the platform yet. Check back soon!
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
