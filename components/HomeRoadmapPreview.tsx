"use client";

import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Code2, Compass, Layers, Sparkles, BookOpen, Terminal, Database, Globe, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-card p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export default function HomeRoadmapPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full bg-background py-8 md:py-12 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Text and Button */}
        <div className="flex flex-col items-start text-left max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-kantumruy mb-6 leading-tight">
            គន្លងសិក្សា <br/><span className="text-primary">Roadmaps</span>
          </h2>
          <p className="text-muted-foreground font-kantumruy text-lg mb-8 leading-relaxed">
            ជ្រើសរើសជំនាញដែលអ្នកចង់រៀន ហើយដើរតាមគន្លងមេរៀនដែលបានរៀបចំទុកជាជំហានៗ ដើម្បីក្លាយជាអ្នកជំនាញពិតប្រាកដ។
          </p>
          <Link href="/roadmaps">
            <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-95 font-kantumruy">
              ស្វែងរក Roadmap
              <Compass className="h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Right Side: Animated Beam */}
        <div
          className="relative flex h-[400px] w-full items-center justify-center overflow-hidden p-10"
          ref={containerRef}
        >
          <div className="relative z-20 flex size-full max-h-[300px] max-w-lg flex-col items-stretch justify-between gap-10">
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div1Ref}>
                <Globe className="text-foreground" />
              </Circle>
              <Circle ref={div5Ref}>
                <Database className="text-foreground" />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div2Ref}>
                <Terminal className="text-foreground" />
              </Circle>
              <Circle ref={div4Ref} className="size-20 bg-primary/10 border-primary/30">
                <Code2 className="size-8 text-primary" />
              </Circle>
              <Circle ref={div6Ref}>
                <Layers className="text-foreground" />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div3Ref}>
                <MonitorSmartphone className="text-foreground" />
              </Circle>
              <Circle ref={div7Ref}>
                <BookOpen className="text-foreground" />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            gradientStartColor="#e8a55a"
            gradientStopColor="#cc785c"
            duration={9}
            delay={0}
            pathWidth={4}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div4Ref}
            gradientStartColor="#e8a55a"
            gradientStopColor="#cc785c"
            duration={10.5}
            delay={0.5}
            pathWidth={4}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={75}
            endYOffset={10}
            gradientStartColor="#e8a55a"
            gradientStopColor="#cc785c"
            duration={12}
            delay={1}
            pathWidth={4}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            reverse
            gradientStartColor="#e8a55a"
            gradientStopColor="#cc785c"
            duration={8.5}
            delay={0.2}
            pathWidth={4}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div4Ref}
            reverse
            gradientStartColor="#e8a55a"
            gradientStopColor="#cc785c"
            duration={11}
            delay={0.8}
            pathWidth={4}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div7Ref}
            toRef={div4Ref}
            curvature={75}
            endYOffset={10}
            reverse
            gradientStartColor="#e8a55a"
            gradientStopColor="#cc785c"
            duration={13}
            delay={1.2}
            pathWidth={4}
          />
        </div>

      </div>
    </div>
  )
}
