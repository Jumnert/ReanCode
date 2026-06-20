"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const RoadmapNode = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-16 w-36 items-center justify-center border-2 border-primary/20 bg-background text-foreground shadow-sm font-kantumruy",
        className
      )}
    >
      <span className="font-semibold text-sm tracking-tight">{children}</span>
    </div>
  );
});

RoadmapNode.displayName = "RoadmapNode";

export function FrontendRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const node5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-[800px] flex-col items-center justify-center gap-12 py-10 overflow-hidden border-2 border-primary/10 bg-surface-pearl mx-auto"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="flex w-full flex-col justify-center items-center gap-16 relative z-10 px-8">
        <div className="flex w-full justify-between items-center px-4">
          <RoadmapNode ref={node1Ref} className="bg-white dark:bg-black">
            HTML & CSS
          </RoadmapNode>
          <RoadmapNode ref={node2Ref} className="bg-white dark:bg-black">
            JavaScript
          </RoadmapNode>
        </div>
        
        <div className="flex w-full justify-center">
          <RoadmapNode ref={node3Ref} className="bg-surface-tile-1 text-on-dark w-48 h-20 border-primary/40 shadow-lg scale-105">
            React.js
          </RoadmapNode>
        </div>

        <div className="flex w-full justify-between items-center px-4">
          <RoadmapNode ref={node4Ref} className="bg-white dark:bg-black">
            Tailwind CSS
          </RoadmapNode>
          <RoadmapNode ref={node5Ref} className="bg-primary text-white border-primary">
            Next.js
          </RoadmapNode>
        </div>
      </div>

      {/* Node 1 to Node 3 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node1Ref}
        toRef={node3Ref}
        curvature={75}
        endYOffset={-10}
        gradientStartColor="#ffaa40"
        gradientStopColor="#cc785c"
      />
      {/* Node 2 to Node 3 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node2Ref}
        toRef={node3Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
        gradientStartColor="#9c40ff"
        gradientStopColor="#cc785c"
      />
      {/* Node 3 to Node 4 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node3Ref}
        toRef={node4Ref}
        curvature={75}
        startYOffset={10}
        gradientStartColor="#cc785c"
        gradientStopColor="#ffaa40"
      />
      {/* Node 3 to Node 5 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node3Ref}
        toRef={node5Ref}
        curvature={-75}
        startYOffset={10}
        reverse
        gradientStartColor="#cc785c"
        gradientStopColor="#9c40ff"
      />
    </div>
  );
}
