"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Volume2, VolumeX } from "lucide-react"

const TRACK_FILE = "/fassounds-good-night-lofi-cozy-chill-music-160166.mp3"

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(TRACK_FILE)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
    
    let playOnInteract: (() => void) | null = null;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.warn("Autoplay blocked, waiting for interaction", e)
        playOnInteract = () => {
          if (audioRef.current && isPlaying) {
            audioRef.current.play().catch(() => {})
          }
          if (playOnInteract) {
            document.removeEventListener('click', playOnInteract)
            document.removeEventListener('keydown', playOnInteract)
          }
        }
        document.addEventListener('click', playOnInteract)
        document.addEventListener('keydown', playOnInteract)
      })
    } else {
      audioRef.current.pause()
    }
    
    return () => {
      if (playOnInteract) {
        document.removeEventListener('click', playOnInteract)
        document.removeEventListener('keydown', playOnInteract)
      }
    }
  }, [isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        // Do not set to null, otherwise StrictMode creates a duplicate overlapping audio object
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
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-50" />
      )}
    </button>
  )
}
