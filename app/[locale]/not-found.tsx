"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf9f5] dark:bg-[#181715] flex flex-col relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto pattern-border-x relative flex-1 flex flex-col items-center justify-center border-x border-[#cc785c]/20">
        
        {/* Horizontal Edge-to-Edge Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-px bg-[#cc785c]/20 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-px bg-[#cc785c]/20 pointer-events-none z-0" />

        {/* Top Logo */}
        <div className="absolute top-8 left-12 md:top-12 md:left-12 z-20">
          <Link
            href="/"
            className="text-2xl font-bold text-[#cc785c] hover:text-[#a9583e] transition-colors"
            
          >
            Rean2Code
          </Link>
        </div>

        <div className="flex flex-col items-center text-center gap-6 z-10 w-full max-w-2xl px-4 mt-[-8vh]">
          {/* 404 Headline */}
          <h1 
            className="text-6xl md:text-[80px] font-normal leading-[1.05] tracking-[-1.5px] text-[#141413] dark:text-[#faf9f5]"
            style={{ fontFamily: "'Copernicus', 'Tiempos Headline', serif" }}
          >
            404
          </h1>
          <h2 
            className="text-3xl md:text-[36px] font-normal leading-[1.15] tracking-[-0.5px] text-[#141413] dark:text-[#faf9f5] -mt-2"
            style={{ fontFamily: "'Copernicus', 'Tiempos Headline', serif" }}
          >
            Page not found
          </h2>

          {/* Body Text */}
          <p 
            className="text-base md:text-[16px] text-[#3d3d3a] dark:text-[#a09d96] max-w-md leading-[1.55] mt-2"
            style={{ fontFamily: "'StyreneB', 'Inter', sans-serif" }}
          >
            We couldn't find the page you're looking for. It may have been moved, deleted, or perhaps it never existed.
          </p>

          {/* Primary Button */}
          <Link href="/">
            <span 
              className="mt-6 inline-flex items-center justify-center bg-[#cc785c] hover:bg-[#a9583e] text-[#ffffff] transition-colors shadow-sm active:scale-[0.98]"
              style={{ 
                fontFamily: "'StyreneB', 'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "8px",
                padding: "12px 20px",
                height: "40px"
              }}
            >
              Return to homepage
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
