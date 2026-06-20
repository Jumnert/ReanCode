import React from "react"
import Image from "next/image"
import { prisma } from "@/config/prisma"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StudyContributions } from "@/components/study-contributions"
import { auth } from "@/config/auth"
import { EditProfileModal } from "@/components/profile/edit-profile-modal"
import { EditExperienceModal } from "@/components/profile/edit-experience-modal"
import { WorkExperience } from "@/components/work-experience"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Volume2, 
  Code2, 
  Lightbulb, 
  MapPin, 
  Phone, 
  Link as LinkIcon, 
  Clock, 
  Monitor,
  Calendar,
  LogOut,
  Mail,
  UserCircle
} from "lucide-react"
import { logoutAction } from "@/actions/auth"
import { cn } from "@/lib/utils"
import { redis, CacheKeys, CacheTTL } from "@/config/redis"

import { AngkorWatAbstract } from "@/components/AngkorWatAbstract"

type ProfileUser = NonNullable<Awaited<ReturnType<typeof fetchUserFromDb>>>

async function fetchUserFromDb(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: {
      studyActivity: true,
      workExperiences: { orderBy: { createdAt: "desc" } },
      progress: {
        where: { completed: true },
        include: { course: true }
      }
    },
  })
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const session = await auth()
  const sessionEmail = session?.user?.email

  let user: ProfileUser | null = null

  // Skip cache for the owner so their edits are always fresh
  const cacheKey = CacheKeys.userProfile(username)

  if (!sessionEmail) {
    // Guest — try cache first
    const cached = await redis.get<ProfileUser>(cacheKey)
    if (cached) {
      user = cached
    }
  }

  if (!user) {
    user = await fetchUserFromDb(username)
    // Only cache public (non-owner) views
    if (user && user.email !== sessionEmail) {
      await redis.set(cacheKey, user, { ex: CacheTTL.SHORT })
    }
  }

  if (!user) {
    notFound()
  }

  const isOwner = sessionEmail === user.email
  const techStack = user.techStack ? (user.techStack as { id?: string; category: string; items: string[] }[]) : []
  
  // Aggregate language progress from completed lessons
  const progressMap = new Map<string, number>()
  if (user.progress) {
    user.progress.forEach(p => {
      if (p.course?.category) {
        progressMap.set(p.course.category, (progressMap.get(p.course.category) || 0) + 1)
      }
    })
  }

  const categories = Array.from(progressMap.keys())
  const coursesWithLessons = await prisma.course.findMany({
    where: { category: { in: categories } },
    select: { category: true, _count: { select: { lessons: { where: { published: true } } } } }
  })
  
  const totalLessonsMap = new Map<string, number>()
  coursesWithLessons.forEach(c => {
    totalLessonsMap.set(c.category, (totalLessonsMap.get(c.category) || 0) + c._count.lessons)
  })

  const courseProgress = Array.from(progressMap.entries()).map(([category, count]) => {
    const total = totalLessonsMap.get(category) || 1
    let iconPath = ""
    const cat = category.toLowerCase()
    if (cat.includes("html") || cat.includes("css")) iconPath = "/images/html.svg"
    else if (cat.includes("javascript") || cat.includes("js")) iconPath = "/images/javascript.svg"
    else if (cat.includes("python")) iconPath = "/images/python.svg"
    else if (cat.includes("react")) iconPath = "/images/react.svg"
    else if (cat.includes("typescript") || cat.includes("ts")) iconPath = "/images/typescript.svg"
    else if (cat.includes("vue")) iconPath = "/images/vue.svg"

    return {
      category,
      count,
      total,
      percentage: Math.min(100, Math.round((count / total) * 100)),
      iconPath
    }
  })

  // Format activities for the graph
  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setDate(today.getDate() - 365)
  
  type ActivityItem = { date: string; count: number; level: number }
  type StudyActivityItem = (typeof user.studyActivity)[number]
  const formattedActivities: ActivityItem[] = user.studyActivity
    .filter((a: StudyActivityItem) => new Date(a.date) >= oneYearAgo)
    .map((a: StudyActivityItem) => {
      const count = a.count
      return {
        date: new Date(a.date).toISOString().split('T')[0],
        count,
        level: count > 3 ? 4 : count > 2 ? 3 : count > 1 ? 2 : count > 0 ? 1 : 0
      }
    })

  // Ensure graph always displays exactly 365 days
  const todayStr = today.toISOString().split('T')[0]
  const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0]
  
  if (!formattedActivities.find((a: ActivityItem) => a.date === oneYearAgoStr)) {
    formattedActivities.push({ date: oneYearAgoStr, count: 0, level: 0 })
  }
  if (!formattedActivities.find((a: ActivityItem) => a.date === todayStr)) {
    formattedActivities.push({ date: todayStr, count: 0, level: 0 })
  }

  const activities = formattedActivities.sort((a: ActivityItem, b: ActivityItem) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto border-x border-border/60 min-h-screen">
        
        {/* Banner Section */}
        <div className="h-48 md:h-64 w-full bg-muted border-b border-border/60 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-40">
            <AngkorWatAbstract />
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-4 md:px-8 pb-8 border-b border-border/60">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 -mt-16 md:-mt-20 mb-6">
            <div className="flex flex-col gap-3">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background bg-muted">
                <AvatarImage src={user.avatarUrl || user.image || ""} alt={user.name || "User"} className="object-cover" referrerPolicy="no-referrer" />
                <AvatarFallback className="text-2xl"><UserCircle className="w-12 h-12 text-muted-foreground" /></AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-sans tracking-tight flex items-center gap-2">
                  {user.name || "Anonymous User"}
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                </h1>
                <div className="text-muted-foreground font-mono mt-1">
                  @{user.username}
                </div>
                {courseProgress.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {courseProgress.map(p => (
                      <div key={p.category} className="group flex items-center gap-3 bg-background border-2 border-primary/20 p-2 pr-4 rounded-none shadow-[2px_2px_0_hsl(var(--primary))] min-w-[200px]">
                        <div className="w-10 h-10 border-2 border-primary/20 flex flex-shrink-0 items-center justify-center bg-background p-1.5">
                          {p.iconPath ? (
                            <Image src={p.iconPath} alt={p.category} width={24} height={24} />
                          ) : (
                            <Code2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-kantumruy font-bold capitalize text-sm truncate">{p.category}</span>
                            <span className="text-xs font-mono font-bold text-primary">{p.percentage}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-primary/10 border border-primary/20">
                            <div className="h-full bg-primary" style={{ width: `${p.percentage}%` }} />
                          </div>
                          <div className="text-[10px] text-muted-foreground font-mono mt-1 opacity-80 uppercase tracking-wide">
                            {p.count} / {p.total} Lessons
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mb-2">
              {isOwner ? (
                <>
                  <EditProfileModal user={user} />
                  <EditExperienceModal />
                </>
              ) : (
                <div className="px-3 py-1.5 border border-primary/20 rounded-md text-xs font-mono text-primary bg-primary/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Online Now
                </div>
              )}
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-foreground max-w-2xl font-serif">
            {user.bio || "No bio provided."}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-4 md:px-8 py-6 font-mono text-sm border-b border-border/60">
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-foreground">{user.location || "Earth"}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span className="text-foreground">{user.phone || "Not provided"}</span>
          </div>
          {user.portfolioUrl && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <LinkIcon className="w-4 h-4" />
              <a href={user.portfolioUrl} className="text-primary hover:underline truncate">{user.portfolioUrl}</a>
            </div>
          )}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span className="text-foreground truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <UserCircle className="w-4 h-4" />
            <span className="text-foreground">{user.pronouns || "Not provided"}</span>
          </div>
        </div>

        {/* GitHub Contributions Section */}
        <div className="border-b border-border/60 pb-8 pt-8">
          <div className="px-4 md:px-8 mb-6">
            <h2 className="text-3xl font-bold font-sans tracking-tight">Study Contributions</h2>
            <p className="text-muted-foreground font-mono text-sm mt-1">
              Visualize year-long study contribution activity.
            </p>
          </div>
          
          <div className="flex justify-center px-4 md:px-8 overflow-x-auto">
            <StudyContributions
              contributions={activities}
            />
          </div>
        </div>

        {/* Pattern Separator */}
        <div className="h-8 border-t border-border/60" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(156, 146, 172, 0.1) 4px, rgba(156, 146, 172, 0.1) 5px)' }} />

        {/* Tech Stack Section */}
        <div className="border-t border-border/60">
          <div className="px-4 md:px-6 py-4 border-b border-border/60">
            <h2 className="text-3xl font-bold font-sans tracking-tight">Stack</h2>
          </div>
          
          <div className="flex flex-col">
            {techStack.length > 0 ? (
              techStack.map((section: { id?: string, category: string, items: string[] }, idx: number) => (
                <div 
                  key={section.id} 
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-[220px_1fr]",
                    idx !== techStack.length - 1 && "border-b border-border/60"
                  )}
                >
                  <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground md:border-r border-border/60 px-4 md:px-6 py-4">
                    <span className="opacity-50">{section.id}</span>
                    <span>{section.category}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 px-4 md:px-6 py-4 items-center">
                    {section.items.map((item: string) => (
                      <div 
                        key={item} 
                        className="px-3 py-1.5 rounded-md border border-border/60 bg-transparent text-xs font-mono text-foreground hover:bg-primary/5 transition-colors cursor-default flex items-center gap-2 shadow-sm"
                      >
                        <div className="w-3 h-3 rounded-sm bg-muted-foreground/20 flex items-center justify-center">
                          <Code2 className="w-2 h-2 text-muted-foreground" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 md:px-6 py-4 text-sm text-muted-foreground font-mono">
                No tech stack configured yet.
              </div>
            )}
          </div>
        </div>

        {/* Work Experience Section */}
        {user.workExperiences && user.workExperiences.length > 0 && (
          <>
            <div className="h-8 border-t border-border/60" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(156, 146, 172, 0.1) 4px, rgba(156, 146, 172, 0.1) 5px)' }} />
            <div className="border-t border-border/60">
              <div className="px-4 md:px-6 py-4 border-b border-border/60">
                <h2 className="text-3xl font-bold font-sans tracking-tight">Work Experience</h2>
              </div>
              <div className="p-4 md:p-6">
                <WorkExperience experiences={user.workExperiences.map(e => ({
                  id: e.id,
                  companyName: e.companyName,
                  companyLogo: e.companyLogo || undefined,
                  companyWebsite: e.companyWebsite || undefined,
                  isCurrentEmployer: e.isCurrentEmployer,
                  positions: e.positions as { id: string; title: string; employmentPeriod: { start: string; end?: string }; description?: string }[]
                }))} />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
