"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function LearnLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
 <main className="min-h-screen bg-[#faf9f5] dark:bg-[#181715] flex flex-col relative font-sans">
 <div className="w-full max-w-[1440px] mx-auto pattern-border-x relative flex-1 flex flex-col border-x border-[#e6dfd8] dark:border-[#252320]">
 {/* Top Horizontal Line */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-px bg-[#e6dfd8] dark:bg-[#252320] pointer-events-none z-0" />
 
 <SidebarProvider
 style={{ "--sidebar-top": "64px" } as React.CSSProperties}
 className="w-full"
 >
 {children}
 </SidebarProvider>
 </div>
 </main>
 )
}
