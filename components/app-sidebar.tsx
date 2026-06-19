"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Code2, BookOpen } from "lucide-react"

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
    items: [
      {
        title: "១. ការចាប់ផ្តើមដំបូង",
        subItems: [
          { title: "HTML Introduction", id: "intro", label: "សេចក្តីផ្តើមអំពី HTML" },
          { title: "HTML Editors", id: "editors", label: "កម្មវិធីសរសេរកូដ" },
        ]
      },
      {
        title: "២. រចនាសម្ព័ន្ធទូទៅ",
        subItems: [
          { title: "HTML Basic", id: "basic", label: "មូលដ្ឋានគ្រឹះ HTML" },
          { title: "HTML Elements", id: "elements", label: "ធាតុរបស់ HTML" },
        ]
      }
    ]
  },
  {
    title: "ការបង្ហាញខ្លឹមសារទំព័រ",
    items: [
      {
        title: "១. អត្ថបទ និងចំណងជើង",
        subItems: [
          { title: "HTML Headings", id: "headings", label: "ចំណងជើង HTML" },
          { title: "HTML Paragraphs", id: "paragraphs", label: "កថាខណ្ឌ HTML" },
        ]
      },
      {
        title: "២. ការរចនាបថ និងកំណត់សម្គាល់",
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
    items: [
      {
        title: "១. រូបភាព និងតំណភ្ជាប់",
        subItems: [
          { title: "HTML Links", id: "links", label: "តំណភ្ជាប់ HTML" },
          { title: "HTML Images", id: "images", label: "រូបភាព HTML" },
        ]
      },
      {
        title: "២. រចនាសម្ព័ន្ធមាតិកាជឿនលឿន",
        subItems: [
          { title: "HTML Tables", id: "tables", label: "តារាង HTML" },
          { title: "HTML Lists", id: "lists", label: "បញ្ជីរាយនាម" },
        ]
      }
    ]
  },
  {
    title: "🛠 Live Compiler",
    items: [
      {
        title: "សាកល្បងសរសេរកូដ",
        subItems: [
          { title: "Live Compiler", id: "compiler", label: "🚀 ចូលប្រើ Compiler" },
        ]
      }
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = React.useState("intro")

  // Collect all section IDs from the chapter data
  const allIds = React.useMemo(
    () => htmlChapters.flatMap(c => c.items.flatMap(i => i.subItems.map(s => s.id))),
    []
  )

  // Track scroll position → update active section
  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveItem(id)
          }
        },
        {
          // Fire when the top of the section hits ~20% from top of viewport
          rootMargin: "-10% 0px -70% 0px",
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [allIds])

  const handleScrollTo = (id: string) => {
    setActiveItem(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
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
              {htmlChapters.map((chapter, cIndex) => (
                <Collapsible key={cIndex} defaultOpen className="group/collapsible" asChild>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="font-semibold text-sidebar-foreground/90 text-sm py-2">
                        <BookOpen className="h-4 w-4 text-[#0066cc]" />
                        <span>{chapter.title}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="mr-0 pr-0">
                        {chapter.items.map((subChapter, scIndex) => (
                          <SidebarMenuSubItem key={scIndex} className="list-none">
                            <Collapsible defaultOpen className="group/sub-collapsible" asChild>
                              <div>
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuButton className="text-sm text-sidebar-foreground/80 hover:text-foreground py-1.5">
                                    <Code2 className="h-4 w-4 text-muted-foreground" />
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
                                          {item.label}
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    ))}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </div>
                            </Collapsible>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
