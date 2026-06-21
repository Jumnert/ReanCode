"use client";

import { motion, AnimatePresence } from "framer-motion";
import { resources } from "@/lib/resources";
import { ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactAbstractArt } from "@/components/ReactAbstractArt";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ReactResourcesPage() {
  const reactResources = resources.filter((r) => r.category === "react" || r.category === "ui");

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-zinc-950 py-12 text-[#141413] dark:text-zinc-50 relative overflow-hidden">
      
      {/* Edge-to-edge top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-px bg-[#cc785c]/20 pointer-events-none z-0" />

      {/* Main Grid Wrapper */}
      <div className="max-w-[1440px] mx-auto border-x-2 border-[#cc785c]/20 relative">
        
        {/* Header Hero Section with Abstract Art */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 pt-12 pb-16 relative z-10">
          
          <div className="flex flex-col items-start space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#141413] dark:text-zinc-50 font-serif"
              style={{ fontWeight: 400, letterSpacing: '-1px' }}
            >
              React & UI <br/><span className="text-[#cc785c]">Libraries</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-[#3d3d3a] dark:text-zinc-400 font-sans max-w-lg"
            >
              Essential building blocks for modern web interfaces. Explore curated UI component libraries, animation tools, and structural frameworks.
            </motion.p>
          </div>

          <div className="flex justify-center items-center w-full">
            <ReactAbstractArt />
          </div>

        </div>

        {/* Diagonal Striped Pattern Divider (Edge to Edge) */}
        <div className="relative w-full">
          <div className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-8 border-y-2 border-[#cc785c]/20 z-0" 
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }}>
          </div>
          {/* Invisible spacer to maintain layout flow */}
          <div className="h-8 w-full" />
        </div>

        {/* Why use a UI Library? Accordion (Ledger Header Style) */}
        <div className="mb-10 w-[100vw] relative left-1/2 -translate-x-1/2 border-y border-[#cc785c]/20">
          <Accordion className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <div className="flex flex-col divide-y divide-[#cc785c]/20 w-full">
                
                <div className="w-full">
                  <div className="w-full max-w-[1440px] mx-auto px-12 py-1.5 text-left">
                    <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7a7a7a] dark:text-zinc-400 block">
                      Developer Insight
                    </span>
                  </div>
                </div>

                <div className="w-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <AccordionTrigger className="w-full max-w-[1440px] mx-auto px-12 py-1.5 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180 flex justify-between items-center">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.28px] text-[#141413] dark:text-[#faf9f5]">
                      Why do we need to use a UI library?
                    </h2>
                  </AccordionTrigger>
                </div>

                <AccordionContent className="w-full bg-[#efe9de]/30 dark:bg-[#181715]/30 m-0 border-t-0 data-[state=closed]:border-t-0">
                  <div className="w-full max-w-[1440px] mx-auto px-12 py-6 text-left">
                    <p className="text-[17px] text-[#3d3d3a] dark:text-zinc-400 max-w-4xl italic leading-relaxed border-l-4 border-[#cc785c] pl-6">
                      "Using a UI library accelerates development, ensures a consistent design language, and provides out-of-the-box accessibility. Instead of reinventing the wheel for complex, bug-prone components like dropdowns, combo-boxes, and modals, you can focus your engineering time on your app's core business logic and unique user experience."
                    </p>
                  </div>
                </AccordionContent>

              </div>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Resources Grid */}
        <div className="px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-[#cc785c]/20 relative z-10">
            {reactResources.map((resource) => (
              <Link 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={resource.id} 
                className="group relative flex flex-col p-8 border-r border-[#cc785c]/20 transition-colors hover:bg-black/5 dark:hover:bg-white/5 min-h-[250px]"
              >
                {/* Bottom Edge-to-Edge Line for this grid cell's row */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-px bg-[#cc785c]/20 pointer-events-none z-0" />

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    {resource.icon && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <img src={resource.icon} alt={resource.name} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c] transition-colors">
                      {resource.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#6c6a64] group-hover:text-[#cc785c] transition-colors mt-1" />
                </div>
                
                <p className="text-[#3d3d3a] dark:text-[#a09d96] text-base flex-grow mb-6 relative z-10">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#cc785c]/10 text-[#cc785c] rounded-full border border-[#cc785c]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {reactResources.length === 0 && (
            <div className="text-center py-20 text-[#6c6a64] dark:text-[#8e8b82]">
              No resources found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
