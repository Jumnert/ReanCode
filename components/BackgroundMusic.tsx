"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Music, Music4 } from "lucide-react"

const TRACK_FILE = "/fassounds-good-night-lofi-cozy-chill-music-160166.mp3"

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(TRACK_FILE)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
    
    // Attempt autoplay once on mount
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(e => {
          console.warn("Autoplay blocked, waiting for manual interaction", e)
          setIsPlaying(false)
        })
    }
    
    // We intentionally do not use a global click listener anymore since the user
    // wants to toggle it manually via the navbar icon.
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const togglePlay = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (!audioRef.current) return
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e))
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <button
      onClick={togglePlay}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isPlaying ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
      )}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <Music className="w-5 h-5" />
      ) : (
        <div className="relative">
          <Music className="w-5 h-5 opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[120%] h-0.5 bg-current rotate-45 opacity-50"></div>
          </div>
        </div>
      )}
    </button>
  )
}
