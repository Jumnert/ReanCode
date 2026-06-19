import { useCallback, useEffect, useRef, useState } from "react"
import { playSound } from "@/lib/soundcn/sound-engine"
import type {
  SoundAsset,
  SoundControls,
  UseSoundOptions,
  UseSoundReturn,
} from "@/lib/soundcn/sound-types"

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {}
): UseSoundReturn {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options

  const [isPlaying, setIsPlaying] = useState(false)
  const activePlaybackRef = useRef<{ stop: () => void } | null>(null)

  const stop = useCallback(() => {
    if (activePlaybackRef.current) {
      activePlaybackRef.current.stop()
      activePlaybackRef.current = null
    }
    setIsPlaying(false)
    onStop?.()
  }, [onStop])

  const pause = useCallback(() => {
    stop()
    onPause?.()
  }, [stop, onPause])

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled) return

      if (interrupt && activePlaybackRef.current) {
        stop()
      }

      setIsPlaying(true)
      onPlay?.()

      playSound(sound.dataUri, {
        volume: overrides?.volume ?? volume,
        playbackRate: overrides?.playbackRate ?? playbackRate,
        onEnd: () => {
          setIsPlaying(false)
          activePlaybackRef.current = null
          onEnd?.()
        },
      })
        .then((playback) => {
          activePlaybackRef.current = playback
        })
        .catch((err) => {
          console.error("Failed to play sound:", err)
          setIsPlaying(false)
        })
    },
    [sound.dataUri, soundEnabled, interrupt, volume, playbackRate, stop, onPlay, onEnd]
  )

  useEffect(() => {
    return () => {
      if (activePlaybackRef.current) {
        activePlaybackRef.current.stop()
      }
    }
  }, [])

  const controls: SoundControls = {
    stop,
    pause,
    isPlaying,
    duration: sound.duration,
    sound,
  }

  return [play, controls] as const
}
