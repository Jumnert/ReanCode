"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings, Music, LogOut, MessageSquareWarning } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

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

  const handleLogout = async () => {
    await signOut()
    setOpen(false)
    router.push('/')
  }

  const handleReport = () => {
    window.location.href = "mailto:support@reancode.com?subject=Report%20an%20Issue"
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            ការកំណត់ (Settings)
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          
          {/* Music Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium leading-none flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
                តន្ត្រីកំដរ (Background Music)
              </h4>
              <button
                onClick={toggleMusicPlay}
                className={cn(
                  "text-xs px-2 py-1 rounded-md transition-colors font-medium border",
                  isMusicPlaying 
                    ? "bg-primary text-white border-primary" 
                    : "bg-transparent text-muted-foreground border-input hover:bg-accent"
                )}
              >
                {isMusicPlaying ? "កំពុងលេង (Playing)" : "បិទ (Paused)"}
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
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
                      "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors text-left border",
                      isActive 
                        ? "bg-primary/10 border-primary/20 text-primary" 
                        : "bg-transparent border-transparent hover:bg-accent text-foreground"
                    )}
                  >
                    <span className="truncate">{track.name}</span>
                    {isActive && isMusicPlaying && (
                      <div className="flex gap-[2px] items-end h-3 ml-2 flex-shrink-0">
                        <span className="w-1 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '200ms' }} />
                        <span className="w-1 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '400ms' }} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-border w-full" />

          {/* User Settings / Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium leading-none">សកម្មភាព (Actions)</h4>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-muted-foreground"
                onClick={handleReport}
              >
                <MessageSquareWarning className="w-4 h-4 mr-2" />
                រាយការណ៍បញ្ហា (Report Issue)
              </Button>

              {isAuthenticated && (
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  ចាកចេញ (Log out)
                </Button>
              )}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
