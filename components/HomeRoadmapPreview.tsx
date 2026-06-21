"use client";

import React from "react";
import { Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactAbstractArt } from "@/components/ReactAbstractArt";
import { MCPAbstractArt } from "@/components/MCPAbstractArt";
import { AgentAbstractArt } from "@/components/AgentAbstractArt";

const RoadmapAbstractArt = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 500 500"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto text-foreground"
  >
    <defs>
      <pattern id="roadDotPattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
      <pattern id="roadDotPatternDense" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
      <g id="map-pin">
        <path d="M0,0 C-15,-15 -25,-30 -25,-45 C-25,-60 -15,-70 0,-70 C15,-70 25,-60 25,-45 C25,-30 15,-15 0,0 Z" fill="currentColor" opacity="0.8" />
        <circle cx="0" cy="-45" r="10" fill="var(--canvas-color, #faf9f5)" />
      </g>
    </defs>
    <g opacity="0.05" stroke="currentColor" strokeWidth="1">
      {Array.from({ length: 20 }).map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i * 50 - 500} y1="0" x2={i * 50 + 500} y2="500" />
          <line x1={i * 50} y1="0" x2={i * 50 - 1000} y2="500" />
        </React.Fragment>
      ))}
    </g>
    <path d="M 100,500 L 400,500 C 400,300 100,250 200,150 C 250,100 350,100 350,50 L 300,50 C 300,100 200,100 150,150 C 50,250 300,300 100,500 Z" fill="url(#roadDotPatternDense)" opacity="0.4" />
    <path d="M 250,500 C 250,300 0,250 175,150 C 225,100 325,100 325,50" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 15" opacity="0.5" />
    <g transform="translate(320, 420)"><use href="#map-pin" className="text-blue-500" style={{ '--canvas-color': 'var(--background)' } as React.CSSProperties} /></g>
    <g transform="translate(130, 260) scale(0.85)"><use href="#map-pin" className="text-primary" style={{ '--canvas-color': 'var(--background)' } as React.CSSProperties} /></g>
    <g transform="translate(330, 45) scale(0.6)"><use href="#map-pin" className="text-emerald-500" style={{ '--canvas-color': 'var(--background)' } as React.CSSProperties} /></g>
  </svg>
);

export default function HomeRoadmapPreview() {
  return (
    <div className="w-full bg-background py-4 md:py-6 relative overflow-hidden flex flex-col items-center">
      
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[800px] opacity-5 pointer-events-none z-0">
        <RoadmapAbstractArt />
      </div>
      
      <div className="w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 max-w-6xl">
        
        {/* Left Side: Text and Button */}
        <div className="flex flex-col items-start text-left max-w-xl py-8 md:py-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-kantumruy mb-6 leading-tight">
            គន្លងសិក្សា <br/><span className="text-primary">Roadmaps</span>
          </h2>
          <p className="text-muted-foreground font-kantumruy text-lg mb-8 leading-relaxed">
            ជ្រើសរើសជំនាញដែលអ្នកចង់រៀន ហើយដើរតាមគន្លងមេរៀនដែលបានរៀបចំទុកជាជំហានៗ ដើម្បីក្លាយជាអ្នកជំនាញពិតប្រាកដ។
          </p>
          <Button asChild size="lg" className="bg-primary text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 font-kantumruy">
            <Link href="/roadmaps">
              ស្វែងរក Roadmap
              <Compass className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Right Side: Matrix Bento Grid (Line Design) */}
        <div className="w-full h-full min-h-[350px] grid grid-cols-2 border-l border-t border-[#cc785c]/20">
          
          {/* Tile 1: UI Libraries (Large) */}
          <Link href="/resources/react" className="col-span-2 group relative bg-[#efe9de]/50 dark:bg-[#181715]/50 flex flex-col justify-between border-r border-b border-[#cc785c]/20 p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all overflow-hidden min-h-[180px]">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
              <ReactAbstractArt />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-primary/80 mb-2 block">Components</span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  React & UI Libraries
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-[70%] mt-4">
                Explore curated UI component libraries and frameworks.
              </p>
            </div>
          </Link>

          {/* Tile 2: MCP Servers */}
          <Link href="/resources/mcp" className="col-span-1 group relative bg-[#efe9de]/50 dark:bg-[#181715]/50 flex flex-col justify-end border-r border-b border-[#cc785c]/20 p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-all overflow-hidden min-h-[160px]">
            <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none scale-150 origin-center">
              <MCPAbstractArt />
            </div>
            <div className="relative z-10 flex flex-col">
              <span className="text-[10px] font-bold tracking-wider uppercase text-primary/80 mb-1 block">Protocols</span>
              <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                MCP Servers
              </h3>
            </div>
          </Link>

          {/* Tile 3: Agent Skills */}
          <Link href="/resources/agents" className="col-span-1 group relative bg-[#efe9de]/50 dark:bg-[#181715]/50 flex flex-col justify-end border-r border-b border-[#cc785c]/20 p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-all overflow-hidden min-h-[160px]">
            <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none scale-125 origin-center">
              <AgentAbstractArt />
            </div>
            <div className="relative z-10 flex flex-col">
              <span className="text-[10px] font-bold tracking-wider uppercase text-primary/80 mb-1 block">Automation</span>
              <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                Agent Skills
              </h3>
            </div>
          </Link>

        </div>

      </div>
    </div>
  )
}
