import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/config/auth"
import ProgressService from "@/services/progress.service"
import { Activity, Clock, BookOpen, ChevronRight } from "lucide-react"
import Link from "next/link"

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
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const [progress, streak] = await Promise.all([
    ProgressService.getUserProgress(session.user.id),
    ProgressService.getStreak(session.user.id)
  ])

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-16 md:pt-24">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight flex items-center gap-4 text-foreground mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            Your Progress
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl font-serif">
            Track your coding journey, completed lessons, and active learning time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Feature Card 1 */}
          <div className="bg-[#efe9de] dark:bg-[#181715] rounded-[12px] p-[32px] border border-border/60">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="font-sans font-medium text-[16px]">Completed Lessons</span>
            </div>
            <div className="text-4xl font-sans font-bold text-foreground">
              {progress.completedLessons}
              <span className="text-lg text-muted-foreground font-normal ml-2">/ {progress.totalLessons}</span>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#efe9de] dark:bg-[#181715] rounded-[12px] p-[32px] border border-border/60">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <Clock className="w-5 h-5" />
              <span className="font-sans font-medium text-[16px]">Time Spent Learning</span>
            </div>
            <div className="text-4xl font-sans font-bold text-foreground">
              {formatTime(progress.totalTimeSpent)}
            </div>
          </div>

          {/* Feature Card 3 - Streak */}
          <div className="bg-[#cc785c] text-white rounded-[12px] p-[32px] shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-white/80 mb-4">
                <Activity className="w-5 h-5" />
                <span className="font-sans font-medium text-[16px]">Current Streak</span>
              </div>
              <div className="text-4xl font-sans font-bold text-white">
                {streak.count} <span className="text-lg font-normal opacity-80">Days</span>
              </div>
            </div>
            {/* Background decorative graphic */}
            <Activity className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 opacity-30 pointer-events-none" />
          </div>
        </div>

        {/* Progress By Category */}
        {progress.progressByCategory.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold font-sans tracking-tight mb-8">Progress by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {progress.progressByCategory.map((p: any) => (
                <Link 
                  href={`/learn/${p.courseId}`} 
                  key={p.courseId}
                  className="group bg-card rounded-[12px] p-6 border border-border/60 hover:border-primary/50 transition-all block relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-sans font-semibold capitalize text-foreground group-hover:text-primary transition-colors">
                      {p.courseId}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{p._count.completed}</span> lessons completed
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-[12px] p-[48px] border border-border/60 text-center max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold font-sans mb-2">No learning history yet</h3>
            <p className="text-muted-foreground mb-8">
              Start a roadmap or a course to see your progress tracked here.
            </p>
            <Link 
              href="/roadmaps" 
              className="inline-flex items-center justify-center rounded-[8px] bg-[#cc785c] hover:bg-[#a9583e] text-white px-6 py-3 text-sm font-medium transition-colors"
            >
              Explore Roadmaps
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
