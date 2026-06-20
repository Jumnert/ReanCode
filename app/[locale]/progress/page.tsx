import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/config/auth"
import ProgressService from "@/services/progress.service"
import { Activity, Clock, BookOpen, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getTranslations } from "next-intl/server"

export const metadata = {
  title: "Learning Progress - រៀន២កូដ",
  description: "Track your learning progress on Rean2Code.",
}

// Format seconds to readable string (e.g. 2h 15m)
const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  const rm = m % 60
  return `${h}h ${rm}m`
}

export default async function ProgressPage() {
  const t = await getTranslations('Progress')
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const [progress, streak] = await Promise.all([
    ProgressService.getUserProgress(session.user.id),
    ProgressService.getStreak(session.user.id)
  ])

  // Fetch course details to get total lessons per course and icons
  const { prisma } = await import("@/config/prisma")
  const courseIds = progress.progressByCategory.map((p: any) => p.courseId)
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
    include: { _count: { select: { lessons: { where: { published: true } } } } }
  })

  const enrichedProgress = progress.progressByCategory.map((p: any) => {
    const course = courses.find((c) => c.id === p.courseId)
    const totalLessons = course?._count.lessons || 1 // Avoid divide by zero
    const completed = p._count.completed
    const percentage = Math.round((completed / totalLessons) * 100)
    
    // Map common languages to their icons
    let iconPath = ""
    const cat = course?.category?.toLowerCase() || p.courseId.toLowerCase()
    if (cat.includes("html") || cat.includes("css")) iconPath = "/images/html.svg"
    else if (cat.includes("javascript") || cat.includes("js")) iconPath = "/images/javascript.svg"
    else if (cat.includes("python")) iconPath = "/images/python.svg"
    else if (cat.includes("react")) iconPath = "/images/react.svg"
    else if (cat.includes("typescript") || cat.includes("ts")) iconPath = "/images/typescript.svg"
    else if (cat.includes("vue")) iconPath = "/images/vue.svg"
    
    return {
      ...p,
      title: course?.title || p.courseId,
      totalLessons,
      percentage,
      iconPath
    }
  })

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#181715] transition-colors pb-32">
      <div className="max-w-3xl mx-auto border-x-2 border-[#cc785c]/30 bg-[#faf9f5] dark:bg-[#181715]">
        {/* Header Section */}
        <div className="pt-16 pb-10 px-6 md:px-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-[#cc785c]/10 rounded-none border-2 border-[#cc785c]/30 mb-6">
            <Activity className="h-8 w-8 text-[#cc785c]" />
          </div>
          <h1 className="text-[36px] md:text-[42px] font-['Copernicus',_serif] tracking-tight text-[#141413] dark:text-[#faf9f5] mb-4">
            {t('title')}
          </h1>
          <p className="text-[16px] text-[#6c6a64] dark:text-[#a09d96] font-['StyreneB',_sans-serif] max-w-lg mx-auto">
            {t('description')}
          </p>
          
          <div className="flex justify-center gap-8 md:gap-12 mt-10">
            <div className="flex flex-col text-center">
              <span className="text-[28px] font-['StyreneB',_sans-serif] font-bold text-[#141413] dark:text-[#faf9f5]">{progress.completedLessons}</span>
              <span className="text-[12px] text-[#8e8b82] dark:text-[#a09d96] font-medium uppercase tracking-wider mt-1">{t('lessons')}</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-[28px] font-['StyreneB',_sans-serif] font-bold text-[#141413] dark:text-[#faf9f5]">{formatTime(progress.totalTimeSpent)}</span>
              <span className="text-[12px] text-[#8e8b82] dark:text-[#a09d96] font-medium uppercase tracking-wider mt-1">{t('timeSpent')}</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-[28px] font-['StyreneB',_sans-serif] font-bold text-[#141413] dark:text-[#faf9f5]">{streak.count}</span>
              <span className="text-[12px] text-[#8e8b82] dark:text-[#a09d96] font-medium uppercase tracking-wider mt-1">{t('streak')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative separator matching leaderboard - Edge to Edge */}
      <div className="w-full h-8 border-y-2 border-[#cc785c]/30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }} />

      {/* Progress List */}
      <div className="max-w-3xl mx-auto border-x-2 border-[#cc785c]/30 min-h-[50vh]">
        <div className="bg-[#faf9f5] dark:bg-[#181715]">
          {enrichedProgress.length > 0 ? (
            <div className="flex flex-col">
              {enrichedProgress.map((p: any, index: number) => (
                <Link 
                  href={`/learn/${p.courseId}`} 
                  key={p.courseId}
                  className={cn(
                    "group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 px-6 md:px-10 py-6 border-b-2 border-[#cc785c]/30 transition-colors hover:bg-[#efe9de] dark:hover:bg-[#1f1e1b]",
                    index === enrichedProgress.length - 1 ? "border-b-0" : ""
                  )}
                >
                  <div className="flex items-center gap-4 min-w-[150px]">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-[#252320] rounded-none border-2 border-[#cc785c]/30">
                      {p.iconPath ? (
                        <Image src={p.iconPath} alt={p.title} width={24} height={24} />
                      ) : (
                        <BookOpen className="w-5 h-5 text-[#6c6a64] dark:text-[#a09d96]" />
                      )}
                    </div>
                    <span className="text-[18px] font-bold font-['StyreneB',_sans-serif] text-[#141413] dark:text-[#faf9f5] capitalize">
                      {p.title}
                    </span>
                  </div>
                  
                  <div className="flex-1 w-full flex items-center gap-4">
                    <div className="flex-1 h-[8px] bg-[#e6dfd8] dark:bg-[#252320] rounded-none overflow-hidden border border-[#141413]/10 dark:border-[#faf9f5]/10">
                      <div className="h-full bg-[#cc785c] rounded-none" style={{ width: `${Math.min(100, p.percentage)}%` }} />
                    </div>
                    <span className="text-[15px] font-bold font-mono text-[#141413] dark:text-[#faf9f5] w-12 text-right">
                      {p.percentage}%
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#8e8b82] dark:text-[#6c6a64] group-hover:text-[#cc785c] transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <BookOpen className="w-12 h-12 text-[#8e8b82] dark:text-[#6c6a64] mx-auto mb-6 opacity-80" />
              <h3 className="text-[22px] font-['StyreneB',_sans-serif] font-bold mb-3 text-[#141413] dark:text-[#faf9f5]">{t('noHistory')}</h3>
              <p className="text-[#6c6a64] dark:text-[#a09d96] mb-8 text-[16px]">
                {t('noHistoryDesc')}
              </p>
              <Link 
                href="/roadmaps" 
                className="inline-flex items-center justify-center rounded-none border-2 border-[#cc785c] bg-[#cc785c] hover:bg-transparent hover:text-[#cc785c] text-white px-6 py-3 text-[14px] font-bold transition-colors"
              >
                {t('exploreRoadmaps')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
