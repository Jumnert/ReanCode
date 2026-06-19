"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-[#fdfdfc] dark:bg-[#121212]">
      <SidebarProvider
        style={{ "--sidebar-top": "64px" } as React.CSSProperties}
        className="max-w-7xl mx-auto w-full"
      >
        {children}
      </SidebarProvider>
    </div>
  )
}
