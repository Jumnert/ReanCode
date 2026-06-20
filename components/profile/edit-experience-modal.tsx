"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import type { ExperiencePositionItemType } from "@/components/work-experience";

export function EditExperienceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [isCurrentEmployer, setIsCurrentEmployer] = useState(false);
  
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [skillsStr, setSkillsStr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !title || !start) return;

    setIsLoading(true);
    try {
      const position: Partial<ExperiencePositionItemType> = {
        id: crypto.randomUUID(),
        title,
        employmentPeriod: { start, end: isCurrentEmployer ? undefined : end || undefined },
        employmentType: employmentType || undefined,
        description: description || undefined,
        skills: skillsStr ? skillsStr.split(",").map(s => s.trim()) : undefined,
        isExpanded: true
      };

      const res = await fetch("/api/user/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          companyWebsite: companyWebsite || undefined,
          isCurrentEmployer,
          positions: [position]
        })
      });

      if (res.ok) {
        setIsOpen(false);
        setCompanyName("");
        setCompanyWebsite("");
        setTitle("");
        setStart("");
        setEnd("");
        setEmploymentType("");
        setDescription("");
        setSkillsStr("");
        setIsCurrentEmployer(false);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 font-mono border-primary/20 hover:bg-primary/5">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Work Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase">Company Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input required value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input type="url" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} placeholder="https://..." />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="current" checked={isCurrentEmployer} onCheckedChange={(c) => setIsCurrentEmployer(c as boolean)} />
              <Label htmlFor="current" className="font-normal cursor-pointer">I currently work here</Label>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase">Position Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input required value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Input value={employmentType} onChange={e => setEmploymentType(e.target.value)} placeholder="Full-time, Part-time..." />
              </div>
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input required value={start} onChange={e => setStart(e.target.value)} placeholder="MM.YYYY or YYYY" />
              </div>
              {!isCurrentEmployer && (
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input value={end} onChange={e => setEnd(e.target.value)} placeholder="MM.YYYY or YYYY" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Description (Markdown supported)</Label>
              <Textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="- Built awesome features..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Skills (comma separated)</Label>
              <Input value={skillsStr} onChange={e => setSkillsStr(e.target.value)} placeholder="React, Node.js, Typescript" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Experience"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
