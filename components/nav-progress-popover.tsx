"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Activity, Clock, BookOpen, Loader2 } from "lucide-react"

type ProgressSummary = {
  totalLessons: number;
  completedLessons: number;
  totalTimeSpent: number; // in seconds
  progressByCategory: { courseId: string; _count: { completed: number } }[];
  completionRate: number;
}

export function NavProgressPopover() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState<ProgressSummary | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && !progress && !loading) {
      setLoading(true)
      fetch("/api/progress")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProgress(data.data)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [open, progress, loading])

  // Format seconds to readable string (e.g. 2h 15m)
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const m = Math.floor(seconds / 60)
    if (m < 60) return `${m}m`
    const h = Math.floor(m / 60)
    const rm = m % 60
    return `${h}h ${rm}m`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <Activity className="h-5 w-5" />
        <span className="sr-only">Learning Progress</span>
      </PopoverTrigger>
      
      {/* Follows DESIGN.md: dark surface for product chrome popups */}
      <PopoverContent align="end" className="w-80 bg-[#181715] text-[#faf9f5] border-[#252320] rounded-[12px] p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#cc785c]/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#cc785c]" />
          </div>
          <h3 className="font-sans font-medium text-[16px] text-[#faf9f5]">Your Progress</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-6 w-6 text-[#cc785c] animate-spin mb-2" />
            <p className="text-[#a09d96] text-[13px] font-sans">Loading progress...</p>
          </div>
        ) : progress ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1f1e1b] rounded-[8px] p-3 border border-[#252320]">
                <div className="flex items-center gap-2 text-[#a09d96] mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-sans">Lessons</span>
                </div>
                <div className="text-[18px] font-sans font-medium text-[#faf9f5]">
                  {progress.completedLessons}
                </div>
              </div>
              
              <div className="bg-[#1f1e1b] rounded-[8px] p-3 border border-[#252320]">
                <div className="flex items-center gap-2 text-[#a09d96] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-sans">Time</span>
                </div>
                <div className="text-[18px] font-sans font-medium text-[#faf9f5]">
                  {formatTime(progress.totalTimeSpent)}
                </div>
              </div>
            </div>

            {progress.progressByCategory.length > 0 && (
              <div>
                <h4 className="text-[13px] text-[#a09d96] font-medium font-sans mb-3 uppercase tracking-wider">By Category</h4>
                <div className="space-y-2">
                  {progress.progressByCategory.map((p) => (
                    <div key={p.courseId} className="flex items-center justify-between">
                      <span className="text-[14px] font-sans capitalize text-[#faf9f5]">{p.courseId}</span>
                      <span className="text-[13px] font-sans bg-[#252320] text-[#a09d96] px-2 py-0.5 rounded-full">
                        {p._count.completed} completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-[#a09d96] text-[14px] font-sans py-4 text-center">No progress data available yet.</p>
        )}
      </PopoverContent>
    </Popover>
  )
}
