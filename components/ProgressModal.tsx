"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Activity, Clock, Flame } from "lucide-react";
import Image from "next/image";
import { getUserProgressAction } from "@/actions/progress.actions";

// Format seconds to readable string (e.g. 2h 15m)
const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h ${rm}m`;
};

interface ProgressModalProps {
  children: React.ReactNode;
}

export function ProgressModal({ children }: ProgressModalProps) {
  const t = useTranslations("Progress");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (open && !data) {
      setLoading(true);
      getUserProgressAction().then((res) => {
        if (res.success) {
          setData(res.data);
        }
        setLoading(false);
      });
    }
  }, [open, data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[800px] w-[95vw] max-h-[85vh] overflow-y-auto bg-[#faf9f5] dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] rounded-xl p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-normal tracking-[-0.5px] text-[#141413] dark:text-[#faf9f5]" >
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#cc785c]"></div>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-8">
            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-4 pb-8 border-b border-[#e6dfd8] dark:border-white/10">
              <div className="flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg p-4">
                <Activity className="h-6 w-6 text-[#cc785c] mb-2" />
                <span className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]" >
                  {data.completedLessons}
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#a09d96] uppercase tracking-[1.5px] mt-1 font-medium" >
                  {t("lessons")}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg p-4">
                <Clock className="h-6 w-6 text-[#cc785c] mb-2" />
                <span className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]" >
                  {formatTime(data.totalTimeSpent)}
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#a09d96] uppercase tracking-[1.5px] mt-1 font-medium" >
                  {t("timeSpent")}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg p-4">
                <Flame className="h-6 w-6 text-[#cc785c] mb-2" />
                <span className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]" >
                  {data.streak}
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#a09d96] uppercase tracking-[1.5px] mt-1 font-medium" >
                  {t("streak")}
                </span>
              </div>
            </div>

            {/* Courses Progress */}
            <div>
              {data.courses && data.courses.length > 0 ? (
                <div className="grid gap-4">
                  {data.courses.map((course: any) => (
                    <div key={course.id} className="flex items-center gap-4 bg-[#efe9de] dark:bg-[#1f1e1b] rounded-[12px] p-5 border border-[#e6dfd8] dark:border-white/5">
                      <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-white/5 rounded-md flex items-center justify-center p-2 border border-[#e6dfd8] dark:border-transparent">
                        {course.iconPath ? (
                          <Image src={course.iconPath} alt={course.title} width={32} height={32} className="object-contain" />
                        ) : (
                          <Activity className="h-6 w-6 text-[#6c6a64] dark:text-[#a09d96]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-end mb-2">
                          <h4 className="text-[16px] font-medium text-[#141413] dark:text-[#faf9f5] truncate" >{course.title}</h4>
                          <span className="text-sm font-medium text-[#cc785c]">{course.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#e8e0d2] dark:bg-[#252320] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#cc785c] rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${course.percentage}%` }}
                          />
                        </div>
                        <div className="mt-2 text-[13px] text-[#3d3d3a] dark:text-[#a09d96] font-medium">
                          {course.completed} / {course.totalLessons} {t("lessons")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#6c6a64] dark:text-[#a09d96] text-[14px]" >
                  {t("noHistoryDesc")}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
