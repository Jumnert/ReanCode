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

const javascriptChapters = [
  {
    title: "JS Tutorial",
    icon: BookOpen,
    items: [
      {
        title: "Introduction & Basics",
        icon: Layers,
        subItems: [
          { title: "JS Home", id: "home", label: "JS Home" },
          { title: "JS Introduction", id: "intro", label: "JS Introduction" },
          { title: "JS Where To", id: "whereto", label: "JS Where To" },
          { title: "JS Output", id: "output", label: "JS Output" },
          { title: "JS Syntax", id: "syntax", label: "JS Syntax" },
          { title: "JS Operators", id: "operators", label: "JS Operators" },
          { title: "JS If Conditions", id: "conditions", label: "JS If Conditions" },
          { title: "JS Loops", id: "loops", label: "JS Loops" },
          { title: "JS Strings", id: "strings", label: "JS Strings" },
          { title: "JS Numbers", id: "numbers", label: "JS Numbers" },
          { title: "JS Functions", id: "functions", label: "JS Functions" },
          { title: "JS Objects", id: "objects", label: "JS Objects" },
          { title: "JS Scope", id: "scope", label: "JS Scope" },
          { title: "JS Dates", id: "dates", label: "JS Dates" },
          { title: "JS Temporal New", id: "temporal", label: "JS Temporal New" },
          { title: "JS Arrays", id: "arrays", label: "JS Arrays" },
          { title: "JS Sets", id: "sets", label: "JS Sets" },
          { title: "JS Maps", id: "maps", label: "JS Maps" },
          { title: "JS Iterations", id: "iterations", label: "JS Iterations" },
          { title: "JS Math", id: "math", label: "JS Math" },
          { title: "JS RegExp", id: "regexp", label: "JS RegExp" },
          { title: "JS Data Types", id: "datatypes", label: "JS Data Types" },
          { title: "JS Errors", id: "errors", label: "JS Errors" },
          { title: "JS Debugging", id: "debugging", label: "JS Debugging" },
          { title: "JS Style Guide", id: "styleguide", label: "JS Style Guide" },
          { title: "JS Reference", id: "reference", label: "JS Reference" },
          { title: "JS Projects New", id: "projects", label: "JS Projects New" },
          { title: "JS Versions", id: "versions", label: "JS Versions" },
        ]
      }
    ]
  },
  {
    title: "JS HTML DOM",
    icon: LayoutGrid,
    items: [
      {
        title: "DOM",
        icon: LayoutGrid,
        subItems: [
          { title: "JS HTML DOM", id: "htmldom", label: "JS HTML DOM" },
          { title: "JS HTML Events", id: "htmlevents", label: "JS HTML Events" },
          { title: "JS HTML First", id: "htmlfirst", label: "JS HTML First" },
        ]
      }
    ]
  },
  {
    title: "JS Advanced",
    icon: Type,
    items: [
      {
        title: "Advanced",
        icon: Type,
        subItems: [
          { title: "JS Advanced", id: "advanced", label: "JS Advanced" },
          { title: "JS Functions Advanced", id: "functions_adv", label: "JS Functions Advanced" },
          { title: "JS Objects Advanced", id: "objects_adv", label: "JS Objects Advanced" },
          { title: "JS Classes", id: "classes", label: "JS Classes" },
          { title: "JS Asynchronous", id: "async", label: "JS Asynchronous" },
          { title: "JS Modules", id: "modules", label: "JS Modules" },
          { title: "JS Meta & Proxy", id: "meta", label: "JS Meta & Proxy" },
          { title: "JS Typed Arrays", id: "typedarrays", label: "JS Typed Arrays" },
          { title: "JS DOM Navigation", id: "domnav", label: "JS DOM Navigation" },
          { title: "JS Windows", id: "windows", label: "JS Windows" },
          { title: "JS Web API", id: "webapi", label: "JS Web API" },
          { title: "JS AJAX", id: "ajax", label: "JS AJAX" },
          { title: "JS JSON", id: "json", label: "JS JSON" },
          { title: "JS jQuery", id: "jquery", label: "JS jQuery" },
          { title: "JS Graphics", id: "graphics", label: "JS Graphics" },
          { title: "JS Examples", id: "examples", label: "JS Examples" },
          { title: "JS Reference Advanced", id: "reference_adv", label: "JS Reference Advanced" },
        ]
      }
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const isJs = pathname?.includes("/learn/javascript") ?? false
  const chapters = isJs ? javascriptChapters : htmlChapters
  const groupLabel = isJs ? "មេរៀន JavaScript" : "មេរៀន HTML"
  const progressEndpoint = isJs ? "/api/progress/javascript" : "/api/progress/html"
  const [activeItem, setActiveItem] = React.useState("intro")
  const [completedChapters, setCompletedChapters] = React.useState<string[]>([])

  React.useEffect(() => {
    fetch(progressEndpoint)
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.completed) {
          setCompletedChapters(res.data.completed);
        }
      })
      .catch(console.error);
  }, [progressEndpoint]);

  React.useEffect(() => {
    const handler = (e: any) => {
      setCompletedChapters(prev => Array.from(new Set([...prev, e.detail])));
    }
    window.addEventListener('chapterCompleted', handler);
    return () => window.removeEventListener('chapterCompleted', handler);
  }, []);

 // Collect all section IDs from the chapter data
 const allIds = React.useMemo(
 () => chapters.flatMap(c => c.items.flatMap(i => i.subItems.map(s => s.id))),
 [chapters]
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
 {groupLabel}
 </SidebarGroupLabel>
 <SidebarGroupContent>
 <SidebarMenu>
 {chapters.map((chapter, cIndex) => {
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
