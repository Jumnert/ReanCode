"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import type { Roadmap } from "../roadmap-data";

const RoadmapNode = React.forwardRef<
  HTMLDivElement,
  { step: { title: string; desc: string }; index: number; isMilestone: boolean; className?: string }
>(({ step, index, isMilestone, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex flex-col justify-center w-60 px-5 py-4 border-2 shadow-sm font-kantumruy transition-colors",
        isMilestone
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-primary/20 hover:border-primary/50",
        className
      )}
    >
      <span className="flex items-center gap-2 text-xs font-mono opacity-70 mb-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="font-semibold text-sm tracking-tight leading-snug">{step.title}</span>
      <span
        className={cn(
          "text-xs mt-1 leading-snug",
          isMilestone ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        {step.desc}
      </span>
    </div>
  );
});

RoadmapNode.displayName = "RoadmapNode";

const GRADIENTS = [
  { start: "#ffaa40", stop: "#cc785c" },
  { start: "#cc785c", stop: "#9c40ff" },
  { start: "#9c40ff", stop: "#cc785c" },
  { start: "#cc785c", stop: "#ffaa40" },
];

export function RoadmapFlow({ roadmap }: { roadmap: Roadmap }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = roadmap.steps;

  return (
    <div
      ref={containerRef}
      className="relative flex w-full max-w-[820px] flex-col gap-12 py-12 px-6 md:px-16 overflow-hidden border-2 border-primary/10 bg-accent mx-auto"
    >
      {steps.map((step, i) => {
        const onLeft = i % 2 === 0;
        const isMilestone = i === Math.floor((steps.length - 1) / 2);
        return (
          <div
            key={step.title}
            className={cn(
              "flex w-full relative z-10",
              onLeft ? "justify-start" : "justify-end"
            )}
          >
            <RoadmapNode
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              step={step}
              index={i}
              isMilestone={isMilestone}
            />
          </div>
        );
      })}

      {steps.slice(0, -1).map((_, i) => {
        const g = GRADIENTS[i % GRADIENTS.length];
        const fromLeft = i % 2 === 0;
        return (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            // eslint-disable-next-line react-hooks/refs
            fromRef={{ current: nodeRefs.current[i] }}
            // eslint-disable-next-line react-hooks/refs
            toRef={{ current: nodeRefs.current[i + 1] }}
            curvature={fromLeft ? 30 : -30}
            reverse={!fromLeft}
            duration={4}
            delay={i * 0.3}
            gradientStartColor={g.start}
            gradientStopColor={g.stop}
          />
        );
      })}
    </div>
  );
}
