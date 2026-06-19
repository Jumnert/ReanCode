"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

import { useRouter } from "next/navigation"

export function EditProfileModal({ user, onUpdate }: { user: any, onUpdate?: () => void }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    title: user?.title || "",
    location: user?.location || "",
    phone: user?.phone || "",
    pronouns: user?.pronouns || "",
    portfolioUrl: user?.portfolioUrl || "",
    techStack: user?.techStack || []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTechStackChange = (idx: number, field: string, value: string) => {
    const newStack = [...formData.techStack]
    if (field === "items") {
      newStack[idx][field] = value.split(",").map(i => i.trim())
    } else {
      newStack[idx][field] = value
    }
    setFormData({ ...formData, techStack: newStack })
  }

  const addTechStackCategory = () => {
    const newId = (formData.techStack.length + 1).toString().padStart(2, "0")
    setFormData({
      ...formData,
      techStack: [...formData.techStack, { id: newId, category: "", items: [] }]
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64data = reader.result
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, image: base64data }),
        })
        if (res.ok) {
          if (onUpdate) onUpdate()
          router.refresh()
        }
      } catch (error) {
        console.error("Upload failed", error)
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        if (onUpdate) onUpdate()
        router.refresh()
        setOpen(false)
      } else {
        const data = await res.json()
        alert(data.error || "Failed to update profile")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 font-mono border-primary/20 hover:bg-primary/5">
          <Edit className="w-4 h-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Username (Public URL: /[username])</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title (e.g. Student @ Rean2Code)</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pronouns</label>
              <input type="text" name="pronouns" value={formData.pronouns} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Portfolio URL</label>
              <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border border-border rounded-md bg-background h-24" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Update Avatar</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "avatar")} className="w-full p-2 text-sm" />
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-bold">Tech Stack</h3>
            {formData.techStack.map((stack: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-md">
                <input 
                  type="text" 
                  placeholder="Category (e.g. Language)" 
                  value={stack.category} 
                  onChange={(e) => handleTechStackChange(idx, "category", e.target.value)}
                  className="p-2 border border-border rounded-md bg-background"
                />
                <input 
                  type="text" 
                  placeholder="Items (comma separated)" 
                  value={stack.items.join(", ")} 
                  onChange={(e) => handleTechStackChange(idx, "items", e.target.value)}
                  className="p-2 border border-border rounded-md bg-background"
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addTechStackCategory} className="w-full">
              + Add Tech Stack Category
            </Button>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
