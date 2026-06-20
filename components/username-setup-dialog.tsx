"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function UsernameSetupDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
        setOpen(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-sans">Welcome to Rean2Code! 🎉</DialogTitle>
          <DialogDescription>
            Please set a unique username to create your public profile. This is how others will find you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 bg-background">
            <span className="text-muted-foreground select-none">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError("") }}
              placeholder="your_username"
              className="bg-transparent outline-none flex-1"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          {error && <span className="text-sm text-destructive">{error}</span>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Skip for now
            </Button>
            <Button type="submit" disabled={loading || !username.trim()}>
              {loading ? "Saving..." : "Save Username"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
