"use client"

import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "sonner"
import { Code2 } from "lucide-react"

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="bg-transparent text-foreground min-h-[calc(100vh-64px)]">
        <div className="flex h-12 items-center border-b border-border/40 px-4 md:px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger className="text-primary" />
          <span className="ml-2 font-medium text-sm">C Learning</span>
          {/* Compiler shortcut */}
          <a
            href="#compiler"
            className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary hover:bg-primary text-white text-xs font-medium transition-colors"
          >
            <Code2 className="h-3 w-3" />
            Try Compiler
          </a>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </SidebarInset>
      <Toaster richColors position="bottom-right" />
    </>
  )
}
