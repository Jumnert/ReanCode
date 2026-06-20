"use server"

import { auth } from "@/config/auth";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export async function saveExerciseSolution(exerciseId: string, code: string, language: string) {
  try {
    // Check if it's a mock exercise
    if (exerciseId.startsWith('mock-')) {
      const cookieStore = await cookies();
      cookieStore.set(`completed_${exerciseId}`, 'true', { maxAge: 60 * 60 * 24 * 30 }); // 30 days
      revalidatePath("/exercises/[category]", "page");
      return { success: true, mock: true };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Check if solution already exists
    const existing = await prisma.solution.findFirst({
      where: { userId, exerciseId }
    });

    if (existing) {
      await prisma.solution.update({
        where: { id: existing.id },
        data: { code, passed: true }
      });
    } else {
      await prisma.solution.create({
        data: {
          userId,
          exerciseId,
          code,
          language,
          passed: true
        }
      });
    }

    // Revalidate the categories page so the tick appears
    revalidatePath("/exercises/[category]", "page");

    return { success: true };
  } catch (error) {
    console.error("Failed to save solution:", error);
    return { success: false, error: "Internal server error" };
  }
}
