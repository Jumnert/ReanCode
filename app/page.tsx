"use client";

import HeroCarousel from "@/components/HeroCarousel";
import LanguageCards from "@/components/LanguageCards";
import Link from "next/link";
import { FluidGradientText } from "@/components/fluid-gradient-text";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-background overflow-hidden">
      
      {/* Tile 1: Reintegrated Hero Carousel */}
      <HeroCarousel />

      {/* Tile 2: Apple-style Alternating Promotion Tiles (Books & Exams) */}
      <section className="w-full bg-[#f5f5f7] dark:bg-[#1d1d1f] pt-2 pb-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Books Card */}
          <div className="bg-white dark:bg-[#272729] rounded-[18px] border border-[#e0e0e0] dark:border-zinc-800 p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:border-[#0066cc] dark:hover:border-[#2997ff] transition-all active:scale-[0.99]">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#7a7a7a]">
                សៀវភៅសិក្សាឥតគិតថ្លៃ
              </span>
              <h2 className="text-[20px] font-semibold tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
                បណ្ណាល័យសៀវភៅកូដ
              </h2>
              <p className="text-[13px] text-[#7a7a7a] dark:text-zinc-400 leading-relaxed max-w-md">
                ទាញយកសៀវភៅណែនាំ និងមេរៀនសរសេរកូដជាភាសាខ្មែរជាច្រើនមុខវិជ្ជា រៀបចំឡើងយ៉ាងពិសេសសម្រាប់ស្វ័យសិក្សា និងជាឯកសារយោងរហ័ស។
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/books">
                <span className="inline-flex items-center justify-center bg-[#0066cc] hover:bg-[#0071e3] text-white font-medium rounded-full px-4 py-1.5 text-xs transition-transform active:scale-[0.95]">
                  ស្វែងរកសៀវភៅ
                </span>
              </Link>
              <span className="text-[11px] text-[#7a7a7a] dark:text-zinc-400">
                សៀវភៅ PDF ឥតគិតថ្លៃ
              </span>
            </div>
          </div>

          {/* Exams Card */}
          <div className="bg-white dark:bg-[#272729] rounded-[18px] border border-[#e0e0e0] dark:border-zinc-800 p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:border-[#0066cc] dark:hover:border-[#2997ff] transition-all active:scale-[0.99]">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#7a7a7a]">
                តេស្តសមត្ថភាព និងការប្រឡង
              </span>
              <h2 className="text-[20px] font-semibold tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
                លំហាត់អនុវត្តកូដ
              </h2>
              <p className="text-[13px] text-[#7a7a7a] dark:text-zinc-400 leading-relaxed max-w-md">
                វាស់ស្ទង់កម្រិតយល់ដឹងកូដរបស់អ្នកតាមរយៈលំហាត់ និងការប្រឡងអនុវត្តជាក់ស្តែង ជាមួយនឹងប្រព័ន្ធផ្ទៀងផ្ទាត់លទ្ធផលភ្លាមៗ។
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/exercises">
                <span className="inline-flex items-center justify-center bg-[#0066cc] hover:bg-[#0071e3] text-white font-medium rounded-full px-4 py-1.5 text-xs transition-transform active:scale-[0.95]">
                  ចាប់ផ្តើមតេស្តកូដ
                </span>
              </Link>
              <span className="text-[11px] text-[#7a7a7a] dark:text-zinc-400">
                លំហាត់កូដអន្តរកម្ម
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tile 3: Integrated Language Cards Grid */}
      <LanguageCards />

      {/* Parchment Footer Segment */}
      <footer className="w-full bg-white dark:bg-background text-zinc-500 dark:text-zinc-400 py-16 px-4 md:px-8 border-t border-[#e0e0e0] dark:border-zinc-800">
        {/* Fluid Gradient Text Footer Logo */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <div className="relative w-full text-[#1d1d1f] dark:text-white h-[100px] sm:h-[150px]">
            <FluidGradientText 
              text="Rean2Code" 
              svgViewBoxWidth={800} 
              svgViewBoxHeight={150} 
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Last updated on May 3, 2026</p>
        </div>
      </footer>

    </main>
  );
}
