"use server";

import { auth } from "@/config/auth";
import ProgressService from "@/services/progress.service";
import { prisma } from "@/config/prisma";

export async function getUserProgressAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const [progress, streak] = await Promise.all([
      ProgressService.getUserProgress(session.user.id),
      ProgressService.getStreak(session.user.id)
    ]);

    const courseIds = progress.progressByCategory.map((p: any) => p.courseId);
    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds } },
      include: { _count: { select: { lessons: { where: { published: true } } } } }
    });

    const enrichedProgress = progress.progressByCategory.map((p: any) => {
      const course = courses.find((c) => c.id === p.courseId);
      const totalLessons = course?._count.lessons || 1;
      const completed = p._count.completed || 0;
      const percentage = Math.round((completed / totalLessons) * 100);
      
      let iconPath = "";
      const cat = course?.category?.toLowerCase() || p.courseId.toLowerCase();
      if (cat.includes("html") || cat.includes("css")) iconPath = "/images/html.svg";
      else if (cat.includes("javascript") || cat.includes("js")) iconPath = "/images/javascript.svg";
      else if (cat.includes("python")) iconPath = "/images/python.svg";
      else if (cat.includes("react")) iconPath = "/images/react.svg";
      else if (cat.includes("typescript") || cat.includes("ts")) iconPath = "/images/typescript.svg";
      else if (cat.includes("vue")) iconPath = "/images/vue.svg";
      else iconPath = "/images/html.svg"; // Fallback icon
      
      return {
        id: p.courseId,
        title: course?.title || p.courseId,
        totalLessons,
        completed,
        percentage,
        iconPath
      };
    });

    return {
      success: true,
      data: {
        completedLessons: progress.completedLessons,
        totalTimeSpent: progress.totalTimeSpent,
        streak: streak.count,
        courses: enrichedProgress
      }
    };
  } catch (error) {
    console.error("Failed to fetch progress", error);
    return { success: false, error: "Failed to load progress" };
  }
}
