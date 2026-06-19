"use client";

import HeroCarousel from "@/components/HeroCarousel";
import LanguageCards from "@/components/LanguageCards";
import { FluidGradientText } from "@/components/fluid-gradient-text";
import { AngkorWatAbstract } from "@/components/AngkorWatAbstract";
import Link from "next/link";

export default function Home() {
  return (
  <main className="w-full flex flex-col bg-background min-h-screen">
  
  {/* Tile 1: Reintegrated Hero Carousel */}
  <div className="w-full max-w-7xl mx-auto border-x-2 border-primary/20 overflow-hidden">
  <HeroCarousel />
  </div>

  {/* Middle Line */}
  <hr className="border-t-2 border-primary/20 w-full" />

  {/* Tile 2: Apple-style Alternating Promotion Tiles (Books & Exams) */}
  <div className="w-full max-w-7xl mx-auto border-x-2 border-primary/20 relative">
  <section className="w-full bg-background py-4 relative">
  {/* Vertical line between the 2 cards */}
  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 border-l-2 border-primary/20" />
  
  <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
  {/* Books Card */}
  <div 
  className="bg-[#272729] rounded-[18px] border border-[#e0e0e0] dark:border-zinc-800 p-5 md:p-6 flex flex-col justify-between min-h-[180px] hover:border-primary transition-all active:scale-[0.99] bg-cover bg-center relative overflow-hidden group"
  style={{ backgroundImage: "url('/gradient/blockshelf.jpg')" }}
  >
  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
  <div className="flex flex-col gap-1.5 relative z-10">
  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/80 drop-shadow-sm">
  សៀវភៅសិក្សាឥតគិតថ្លៃ
  </span>
  <h2 className="text-[18px] md:text-[20px] font-bold tracking-[-0.28px] text-white drop-shadow-md">
  បណ្ណាល័យសៀវភៅកូដ
  </h2>
  </div>
  <div className="mt-4 flex items-center gap-3 relative z-10">
  <Link href="/books">
  <span className="inline-flex items-center justify-center bg-white/95 hover:bg-white text-[#1d1d1f] font-semibold rounded-full px-4 py-1.5 text-xs transition-transform active:scale-[0.95] shadow-sm">
  ស្វែងរកសៀវភៅ
  </span>
  </Link>
  <span className="text-[11px] text-white/80 drop-shadow-sm">
  សៀវភៅ PDF ឥតគិតថ្លៃ
  </span>
  </div>
  </div>

  {/* Exams Card */}
  <div 
  className="bg-[#272729] rounded-[18px] border border-[#e0e0e0] dark:border-zinc-800 p-5 md:p-6 flex flex-col justify-between min-h-[180px] hover:border-primary transition-all active:scale-[0.99] bg-cover bg-center relative overflow-hidden group"
  style={{ backgroundImage: "url('/gradient/exercise_bg.jpg')" }}
  >
  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
  <div className="flex flex-col gap-1.5 relative z-10">
  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/80 drop-shadow-sm">
  តេស្តសមត្ថភាព និងការប្រឡង
  </span>
  <h2 className="text-[18px] md:text-[20px] font-bold tracking-[-0.28px] text-white drop-shadow-md">
  លំហាត់អនុវត្តកូដ
  </h2>
  </div>
  <div className="mt-4 flex items-center gap-3 relative z-10">
  <Link href="/exercises">
  <span className="inline-flex items-center justify-center bg-white/95 hover:bg-white text-[#1d1d1f] font-semibold rounded-full px-4 py-1.5 text-xs transition-transform active:scale-[0.95] shadow-sm">
  ចាប់ផ្តើមតេស្តកូដ
  </span>
  </Link>
  <span className="text-[11px] text-white/80 drop-shadow-sm">
  លំហាត់កូដអន្តរកម្ម
  </span>
  </div>
  </div>
 </div>
 </section>
 </div>

  {/* Bottom Line */}
  <hr className="border-t-2 border-primary/20 w-full" />

 {/* Tile 3: Integrated Language Cards Grid */}
 <div className="w-full max-w-7xl mx-auto border-x-2 border-primary/20">
 <LanguageCards />
 </div>

  {/* Footer Top Line */}
  <hr className="border-t-2 border-primary/20 w-full" />

  {/* Parchment Footer Segment */}
  <div className="w-full max-w-7xl mx-auto border-x-2 border-primary/20 relative overflow-hidden bg-background">
  <footer className="w-full text-foreground flex flex-col pt-16 pb-0 relative z-10">
  <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
  
  {/* Left side: Logo, Text, Clocks */}
  <div className="flex flex-col gap-6 max-w-md">
  <div className="flex items-center gap-3">
  <span className="text-2xl font-serif font-bold text-primary">Rean2Code</span>
  </div>
  <p className="text-[13px] text-foreground/70 leading-relaxed font-medium">
  វេទិកាសិក្សាដ៏មានឥទ្ធិពលដែលពោរពេញដោយការសរសេរកូដអន្តរកម្ម។<br />
  Built in Cambodia. An independent coding platform.
  </p>
  
  {/* Clocks */}
  <div className="flex flex-wrap gap-8 mt-2">
  <div className="flex flex-col gap-1">
  <span className="font-mono text-[11px] font-bold tracking-wider">18:10:09</span>
  <span className="text-[9px] text-foreground/50 font-bold uppercase tracking-widest">Phnom Penh</span>
  <span className="text-[8px] text-foreground/40 uppercase tracking-widest">Asia</span>
  </div>
  <div className="flex flex-col gap-1">
  <span className="font-mono text-[11px] font-bold tracking-wider">06:10:09</span>
  <span className="text-[9px] text-foreground/50 font-bold uppercase tracking-widest">New York</span>
  <span className="text-[8px] text-foreground/40 uppercase tracking-widest">N. America</span>
  </div>
  <div className="flex flex-col gap-1">
  <span className="font-mono text-[11px] font-bold tracking-wider">12:10:09</span>
  <span className="text-[9px] text-foreground/50 font-bold uppercase tracking-widest">London</span>
  <span className="text-[8px] text-foreground/40 uppercase tracking-widest">Europe</span>
  </div>
  </div>
  </div>

  {/* Right side: Links */}
  <div className="flex gap-16 md:gap-24 mt-4 md:mt-0">
  <div className="flex flex-col gap-4">
  <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/50 mb-2">Product</span>
  <Link href="/courses" className="text-[13px] font-medium hover:text-primary transition-colors">Courses</Link>
  <Link href="/exercises" className="text-[13px] font-medium hover:text-primary transition-colors">Exercises</Link>
  <Link href="/forum" className="text-[13px] font-medium hover:text-primary transition-colors flex items-center gap-1">Forum <span className="text-[10px] opacity-50">↗</span></Link>
  </div>
  <div className="flex flex-col gap-4">
  <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/50 mb-2">Legal</span>
  <Link href="/privacy" className="text-[13px] font-medium hover:text-primary transition-colors">Privacy</Link>
  <Link href="/terms" className="text-[13px] font-medium hover:text-primary transition-colors">Terms</Link>
  <Link href="/dpa" className="text-[13px] font-medium hover:text-primary transition-colors">DPA</Link>
  </div>
  </div>
  </div>

  {/* Copyright Strip */}
  <div className="mt-20 md:mt-28 mb-32 md:mb-48 text-center relative z-10 px-4">
  <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/60 font-mono font-semibold flex items-center justify-center gap-3 flex-wrap">
  © 2026 REAN2CODE <span className="opacity-30">·</span> REAN2CODE.DEV <span className="opacity-30">·</span> HELLO@REAN2CODE.DEV <span className="opacity-30">·</span> BUILT IN CAMBODIA <span className="opacity-30">·</span> <span className="text-emerald-500">●</span> ALL SYSTEMS OPERATIONAL
  </p>
  <p className="text-[9px] text-foreground/40 mt-4 tracking-wide">
  Rean2Code is a trademark of Rean2Code, Inc. Rean2Code is not affiliated with, sponsored by, or endorsed by any external entities.
  </p>
  </div>

  {/* Angkor Wat Abstract Graphic */}
  <div className="absolute bottom-0 left-0 right-0 w-full opacity-30 pointer-events-none flex items-end">
  <AngkorWatAbstract />
  </div>
  </footer>
  </div>

 </main>
 );
}
