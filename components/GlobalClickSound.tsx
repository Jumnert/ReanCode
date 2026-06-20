"use client"

import { useEffect, useRef } from "react"

export function GlobalClickSound() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const playClickSound = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }

      // Create a short, high-pitched "tick" sound for UI clicks
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05)
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    }

    const handleClick = (e: MouseEvent) => {
      // Check if the click target or its parent is a button or anchor
      let target = e.target as HTMLElement | null
      let shouldPlay = false
      
      while (target && target !== document.body) {
        const tagName = target.tagName.toLowerCase()
        const role = target.getAttribute('role')
        if (tagName === 'button' || tagName === 'a' || role === 'button' || role === 'link' || target.onclick) {
          shouldPlay = true
          break
        }
        target = target.parentElement
      }

      if (shouldPlay) {
        playClickSound()
      }
    }

    document.addEventListener("click", handleClick, true)
    
    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [])

  return null
}
