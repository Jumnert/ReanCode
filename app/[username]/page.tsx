import React from "react"
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
    },
  })
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const session = await auth()
  const isOwner = session?.user?.email !== undefined

  let user: ProfileUser | null = null

  // Skip cache for the owner so their edits are always fresh
  const sessionEmail = session?.user?.email
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

  const isOwnerView = sessionEmail === user.email


  const techStack = user.techStack ? (user.techStack as any) : []
  
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
              </div>
            </div>

            <div className="flex gap-3 mb-2">
              {isOwner ? (
                <>
                  <EditProfileModal user={user} />
                  <EditExperienceModal />
                  <AlertDialog>
                    <AlertDialogTrigger 
                      render={<Button variant="outline" size="sm" className="gap-2 font-mono border-destructive/20 hover:bg-destructive/5 text-destructive hover:text-destructive" />}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will securely log you out of your account on this device.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={logoutAction}>
                          <Button type="submit" variant="destructive" className="font-mono">
                            Yes, Logout
                          </Button>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
              techStack.map((section: any, idx: number) => (
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
                  positions: e.positions as any
                }))} />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
