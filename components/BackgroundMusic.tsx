"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Volume2, VolumeX, Music2, Check } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const TRACKS = [
  { id: "chill", name: "Default Chill", file: "/chill.mp3" },
  { id: "production", name: "Pulsebox Production", file: "/music/pulsebox-lofi-production-522875.mp3" },
  { id: "beats", name: "Mirostar Beats", file: "/music/mirostar-lofi-beats-531504.mp3" },
  { id: "smooth", name: "Pulsebox Smooth", file: "/music/pulsebox-lofi-smooth-522876.mp3" },
  { id: "mood", name: "Pulsebox Mood", file: "/music/pulsebox-lofi-mood-522871.mp3" },
  { id: "mountain", name: "The Mountain Lofi", file: "/music/the_mountain-lofi-lofi-music-496553.mp3" },
]

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(TRACKS.find(t => t.id === "mood") || TRACKS[0])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.file)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    } else {
      audioRef.current.src = currentTrack.file
    }
    
    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.warn("Autoplay blocked, waiting for interaction", e)
        const playOnInteract = () => {
          if (audioRef.current && isPlaying) {
            audioRef.current.play().catch(() => {})
          }
          document.removeEventListener('click', playOnInteract)
          document.removeEventListener('keydown', playOnInteract)
        }
        document.addEventListener('click', playOnInteract)
        document.addEventListener('keydown', playOnInteract)
      })
    } else {
      audioRef.current.pause()
    }
    
    return () => {}
  }, [currentTrack, isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e))
    }
    setIsPlaying(!isPlaying)
  }

  const selectTrack = (track: typeof TRACKS[0]) => {
    setCurrentTrack(track)
    if (!isPlaying) {
      setIsPlaying(true)
    }
  }

  return (
    <NavigationMenu delayDuration={100}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "bg-transparent px-2 h-9 data-[state=open]:bg-primary/5 hover:bg-primary/5 focus:bg-primary/5 transition-colors",
            isPlaying ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}>
            <div 
              onClick={togglePlay}
              className="flex items-center justify-center w-6 h-6 mr-1"
              title={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <Volume2 className="w-[18px] h-[18px]" />
              ) : (
                <VolumeX className="w-[18px] h-[18px] opacity-50" />
              )}
            </div>
          </NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <div className="w-[280px] p-2 bg-[#faf9f5] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] rounded-[12px] shadow-md">
              <div className="px-3 py-2 mb-1">
                <h4 className="text-[14px] font-['StyreneB',_sans-serif] font-medium text-[#141413] dark:text-[#faf9f5]">Background Music</h4>
                <p className="text-[12px] text-[#8e8b82] dark:text-[#a09d96]">Select a lofi track to chill to</p>
              </div>
              
              <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
                {TRACKS.map(track => {
                  const isActive = currentTrack.id === track.id
                  return (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(track)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-[6px] text-[13px] font-medium transition-colors w-full text-left",
                        isActive 
                          ? "bg-[#efe9de] dark:bg-[#1f1e1b] text-[#cc785c] dark:text-[#cc785c]" 
                          : "text-[#3d3d3a] dark:text-[#a09d96] hover:bg-[#f5f0e8] dark:hover:bg-[#252320] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Music2 className="w-4 h-4 opacity-70 flex-shrink-0" />
                        <span className="truncate">{track.name}</span>
                      </div>
                      {isActive && isPlaying && (
                        <div className="flex gap-[2px] items-end h-3 ml-2 flex-shrink-0">
                          <span className="w-1 bg-[#cc785c] animate-[music-bar_0.8s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 bg-[#cc785c] animate-[music-bar_1.2s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '200ms' }} />
                          <span className="w-1 bg-[#cc785c] animate-[music-bar_1s_ease-in-out_infinite_alternate] rounded-t-sm" style={{ animationDelay: '400ms' }} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
