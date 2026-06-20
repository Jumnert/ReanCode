"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowRight, X } from "lucide-react"

export function UsernameSetupBanner() {
  const router = useRouter()
  const [dismissed, setDismissed] = useState(false)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (dismissed) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const trimmed = username.trim()
    if (!trimmed) return
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("Only letters, numbers and _ allowed")
      return
    }
    if (trimmed.length < 3) {
      setError("Minimum 3 characters")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmed }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push(`/${trimmed}`)
        router.refresh()
      } else {
        setError(data.error || "Failed to set username")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3 flex-wrap">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span className="text-sm font-medium">
        Set your username to access your profile
      </span>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-w-[260px]">
        <div className="flex items-center gap-1 bg-primary-foreground/15 rounded-md px-2 text-sm">
          <span className="opacity-70 select-none">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError("") }}
            placeholder="your_username"
            className="bg-transparent outline-none py-1 w-36 placeholder:opacity-50 text-primary-foreground"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="flex items-center gap-1 bg-primary-foreground text-primary text-sm font-medium px-3 py-1 rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Saving…" : <>Save <ArrowRight className="w-3 h-3" /></>}
        </button>
        {error && (
          <span className="text-xs text-primary-foreground/80 bg-destructive/30 px-2 py-0.5 rounded">
            {error}
          </span>
        )}
      </form>

      <button
        onClick={() => setDismissed(true)}
        className="ml-auto opacity-70 hover:opacity-100 transition-opacity shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
