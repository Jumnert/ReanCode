"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Code2, BookOpen, Layers, Type, Paintbrush, Link2, LayoutGrid, Terminal } from "lucide-react"

import {
 Sidebar,
 SidebarContent,
 SidebarGroup,
 SidebarGroupContent,
 SidebarGroupLabel,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 SidebarMenuSub,
 SidebarMenuSubButton,
 SidebarMenuSubItem,
 SidebarRail,
} from "@/components/ui/sidebar"

const htmlChapters = [
 {
 title: "សេចក្តីផ្តើម និងមូលដ្ឋានគ្រឹះ",
 icon: BookOpen,
 items: [
 {
 title: "១. ការចាប់ផ្តើមដំបូង",
 icon: Layers,
 subItems: [
 { title: "HTML Introduction", id: "intro", label: "សេចក្តីផ្តើមអំពី HTML" },
 { title: "HTML Editors", id: "editors", label: "កម្មវិធីសរសេរកូដ" },
 ]
 },
 {
 title: "២. រចនាសម្ព័ន្ធទូទៅ",
 icon: LayoutGrid,
 subItems: [
 { title: "HTML Basic", id: "basic", label: "មូលដ្ឋានគ្រឹះ HTML" },
 { title: "HTML Elements", id: "elements", label: "ធាតុរបស់ HTML" },
 ]
 }
 ]
 },
 {
 title: "ការបង្ហាញខ្លឹមសារទំព័រ",
 icon: Type,
 items: [
 {
 title: "១. អត្ថបទ និងចំណងជើង",
 icon: Type,
 subItems: [
 { title: "HTML Headings", id: "headings", label: "ចំណងជើង HTML" },
 { title: "HTML Paragraphs", id: "paragraphs", label: "កថាខណ្ឌ HTML" },
 ]
 },
 {
 title: "២. ការរចនាបថ និងកំណត់សម្គាល់",
 icon: Paintbrush,
 subItems: [
 { title: "HTML Styles", id: "styles", label: "ស្តាយ និងរចនាបថ" },
 { title: "HTML Formatting", id: "formatting", label: "ទម្រង់អត្ថបទ" },
 { title: "HTML Comments", id: "comments", label: "កំណត់ចំណាំ (Comments)" },
 ]
 }
 ]
 },
 {
 title: "តំណភ្ជាប់ និងមាតិកាផ្សព្វផ្សាយ",
 icon: Link2,
 items: [
 {
 title: "១. រូបភាព និងតំណភ្ជាប់",
 icon: Link2,
 subItems: [
 { title: "HTML Links", id: "links", label: "តំណភ្ជាប់ HTML" },
 { title: "HTML Images", id: "images", label: "រូបភាព HTML" },
 ]
 },
 {
 title: "២. រចនាសម្ព័ន្ធមាតិកាជឿនលឿន",
 icon: LayoutGrid,
 subItems: [
 { title: "HTML Tables", id: "tables", label: "តារាង HTML" },
 { title: "HTML Lists", id: "lists", label: "បញ្ជីរាយនាម" },
 ]
 }
 ]
 },
 {
 title: "Live Compiler",
 icon: Terminal,
 items: [
 {
 title: "សាកល្បងសរសេរកូដ",
 icon: Code2,
 subItems: [
 { title: "Live Compiler", id: "compiler", label: "ចូលប្រើ Compiler" },
 ]
 }
 ]
 }
]

export function AppSidebar() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = React.useState("intro")
  const [completedChapters, setCompletedChapters] = React.useState<string[]>([])

  React.useEffect(() => {
    fetch('/api/progress/html')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.completed) {
          setCompletedChapters(res.data.completed);
        }
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    const handler = (e: any) => {
      setCompletedChapters(prev => Array.from(new Set([...prev, e.detail])));
    }
    window.addEventListener('chapterCompleted', handler);
    return () => window.removeEventListener('chapterCompleted', handler);
  }, []);

 // Collect all section IDs from the chapter data
 const allIds = React.useMemo(
 () => htmlChapters.flatMap(c => c.items.flatMap(i => i.subItems.map(s => s.id))),
 []
 )

  // Use CustomEvents for syncing between Sidebar and Page instead of intersection observers
  React.useEffect(() => {
    const handler = (e: any) => setActiveItem(e.detail)
    window.addEventListener('chapterChangeActive', handler)
    return () => window.removeEventListener('chapterChangeActive', handler)
  }, [])

  const handleScrollTo = (id: string) => {
    setActiveItem(id)
    window.dispatchEvent(new CustomEvent('chapterChange', { detail: id }))
  }

 return (
 <Sidebar collapsible="icon">
 <SidebarContent className="py-4 gap-0">
 <SidebarGroup>
 <SidebarGroupLabel className="px-4 text-xs font-semibold tracking-wider text-sidebar-foreground/75 uppercase">
 មេរៀន HTML
 </SidebarGroupLabel>
 <SidebarGroupContent>
 <SidebarMenu>
 {htmlChapters.map((chapter, cIndex) => {
 const ChapterIcon = chapter.icon || BookOpen
 return (
 <Collapsible key={cIndex} defaultOpen className="group/collapsible" asChild>
 <SidebarMenuItem>
 <CollapsibleTrigger asChild>
 <SidebarMenuButton className="font-semibold text-sidebar-foreground/90 text-sm py-2">
 <ChapterIcon className="h-4 w-4 text-primary" />
 <span>{chapter.title}</span>
 <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
 </SidebarMenuButton>
 </CollapsibleTrigger>
 <CollapsibleContent>
 <SidebarMenuSub className="mr-0 pr-0">
 {chapter.items.map((subChapter, scIndex) => {
 const SubChapterIcon = subChapter.icon || Code2
 return (
 <SidebarMenuSubItem key={scIndex} className="list-none">
 <Collapsible defaultOpen className="group/sub-collapsible" asChild>
 <div>
 <CollapsibleTrigger asChild>
 <SidebarMenuButton className="text-sm text-sidebar-foreground/80 hover:text-foreground py-1.5">
 <SubChapterIcon className="h-4 w-4 text-muted-foreground" />
 <span>{subChapter.title}</span>
 <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-180" />
 </SidebarMenuButton>
 </CollapsibleTrigger>
 <CollapsibleContent>
 <SidebarMenuSub className="ml-4 border-l border-sidebar-border/60">
 {subChapter.subItems.map((item) => (
 <SidebarMenuSubItem key={item.id}>
 <SidebarMenuSubButton
 onClick={() => handleScrollTo(item.id)}
 isActive={activeItem === item.id}
 className="cursor-pointer text-sm py-1"
 >
 <div className="flex items-center justify-between w-full">
 <span>{item.label}</span>
 {completedChapters.includes(item.id) && (
 <svg className="h-3.5 w-3.5 text-green-500 ml-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
 </svg>
 )}
 </div>
 </SidebarMenuSubButton>
 </SidebarMenuSubItem>
 ))}
 </SidebarMenuSub>
 </CollapsibleContent>
 </div>
 </Collapsible>
 </SidebarMenuSubItem>
 ) })}
 </SidebarMenuSub>
 </CollapsibleContent>
 </SidebarMenuItem>
 </Collapsible>
 ) })}
 </SidebarMenu>
 </SidebarGroupContent>
 </SidebarGroup>
 </SidebarContent>
 <SidebarRail />
 </Sidebar>
 )
}
