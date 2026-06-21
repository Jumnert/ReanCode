"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  User, Home, Eye, LayoutGrid, Settings, Users, ArrowUpCircle, 
  Lock, FileText, DollarSign, GitCommit, LogOut, MessageSquareWarning,
  Music
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "@/i18n/routing"

export const MUSIC_TRACKS = [
  { id: "fassounds", name: "Cozy Chill (Default)", file: "/music/fassounds-good-night-lofi-cozy-chill-music-160166.mp3" },
  { id: "mood", name: "Lofi Mood", file: "/music/pulsebox-lofi-mood-522871.mp3" },
  { id: "production", name: "Lofi Production", file: "/music/pulsebox-lofi-production-522875.mp3" },
  { id: "smooth", name: "Lofi Smooth", file: "/music/pulsebox-lofi-smooth-522876.mp3" },
  { id: "mountain", name: "Mountain Lofi", file: "/music/the_mountain-lofi-lofi-music-496553.mp3" },
  { id: "beats", name: "Star Beats", file: "/music/mirostar-lofi-beats-531504.mp3" },
]

export type Track = typeof MUSIC_TRACKS[0]

interface SettingsModalProps {
  isAuthenticated: boolean;
  currentTrack: Track;
  setCurrentTrack: (track: Track) => void;
  isMusicPlaying: boolean;
  toggleMusicPlay: (e?: React.MouseEvent) => void;
  children: React.ReactNode;
}

export function SettingsModal({
  isAuthenticated,
  currentTrack,
  setCurrentTrack,
  isMusicPlaying,
  toggleMusicPlay,
  children
}: SettingsModalProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const t = useTranslations('Settings')

  const handleLogout = async () => {
    await signOut()
    setOpen(false)
    router.push('/')
  }

  const handleReport = () => {
    window.location.href = "mailto:support@reancode.com?subject=Report%20an%20Issue"
    setOpen(false)
  }

  const accountLinks = [
    { id: "profile", label: t('myProfile'), icon: User },
    { id: "general", label: t('general'), icon: Home },
    { id: "preferences", label: t('preferences'), icon: Eye },
    { id: "applications", label: t('applications'), icon: LayoutGrid },
  ]

  const workspaceLinks = [
    { id: "settings", label: t('settings'), icon: Settings },
    { id: "members", label: t('members'), icon: Users },
    { id: "upgrade", label: t('upgrade'), icon: ArrowUpCircle },
    { id: "security", label: t('security'), icon: Lock },
    { id: "templates", label: t('templates'), icon: FileText },
    { id: "billing", label: t('billing'), icon: DollarSign },
    { id: "roadmaps", label: t('roadmaps'), icon: GitCommit },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] w-[95vw] h-[85vh] p-0 flex gap-0 overflow-hidden bg-background border-border rounded-xl">
        {/* Hidden title for accessibility when removing header */}
        <DialogTitle className="sr-only">{t('settings')}</DialogTitle>
        
        {/* Left Sidebar */}
        <div className="w-64 border-r border-border bg-card/50 flex flex-col h-full overflow-y-auto py-6 px-3">
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">{t('account')}</h3>
            <ul className="space-y-1">
              {accountLinks.map(link => {
                const Icon = link.icon
                const isActive = activeTab === link.id
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => setActiveTab(link.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-auto">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">{t('workspace')}</h3>
            <ul className="space-y-1">
              {workspaceLinks.map(link => {
                const Icon = link.icon
                const isActive = activeTab === link.id
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => setActiveTab(link.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-4 border-t border-border space-y-1">
            <button
              onClick={handleReport}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            >
              <MessageSquareWarning className="w-4 h-4" />
              {t('reportIssue')}
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t('logout')}
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background p-8 md:p-12">
          
          {/* Notifications Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('myNotifications')}</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-medium text-foreground">{t('notifyWhen')}</h4>
                  <a href="#" className="text-base text-primary hover:underline">About notifications?</a>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">{t('emailDigest')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">{t('newExercises')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('mySettings')}</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div className="space-y-1">
                  <h4 className="text-base font-medium text-foreground">{t('appearance')}</h4>
                  <p className="text-sm text-muted-foreground">{t('appearanceDesc')}</p>
                </div>
                <div className="px-3 py-1.5 border border-border rounded-md text-base text-muted-foreground flex items-center gap-2 bg-card">
                  Light <span className="text-xs">▼</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div className="space-y-1">
                  <h4 className="text-base font-medium text-foreground">{t('twoFactor')}</h4>
                  <p className="text-sm text-muted-foreground">{t('twoFactorDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div className="space-y-1">
                  <h4 className="text-base font-medium text-foreground">{t('language')}</h4>
                  <p className="text-sm text-muted-foreground">{t('languageDesc')}</p>
                </div>
                <div className="px-3 py-1.5 border border-border rounded-md text-base text-muted-foreground flex items-center gap-2 bg-card">
                  English <span className="text-xs">▼</span>
                </div>
              </div>

              {/* Functional Lofi Music Selection integrated cleanly */}
              <div className="flex items-start justify-between border-b border-border/50 pb-6 pt-4">
                <div className="space-y-1">
                  <h4 className="text-base font-medium text-foreground flex items-center gap-2">
                    <Music className="w-4 h-4 text-primary" />
                    {t('lofiMusic')}
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-sm">{t('lofiMusicDesc')}</p>
                </div>
                
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-sm font-medium text-muted-foreground">{isMusicPlaying ? t('currentlyPlaying') : 'Paused'}</span>
                    <Switch 
                      checked={isMusicPlaying} 
                      onCheckedChange={() => toggleMusicPlay()} 
                    />
                  </div>
                  
                  <div className="border border-border rounded-md max-h-[160px] overflow-y-auto custom-scrollbar bg-card">
                    {MUSIC_TRACKS.map(track => {
                      const isActive = currentTrack.id === track.id
                      return (
                        <button
                          key={track.id}
                          onClick={() => {
                            setCurrentTrack(track)
                            if (!isMusicPlaying) toggleMusicPlay()
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-left border-b border-border/50 last:border-0",
                            isActive 
                              ? "bg-primary/5 text-primary font-medium" 
                              : "bg-transparent hover:bg-accent text-foreground"
                          )}
                        >
                          <span className="truncate">{track.name}</span>
                          {isActive && isMusicPlaying && (
                            <div className="flex gap-[2px] items-end h-2 ml-2 flex-shrink-0">
                              <span className="w-0.5 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '0ms' }} />
                              <span className="w-0.5 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '200ms' }} />
                              <span className="w-0.5 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '400ms' }} />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  )
}
