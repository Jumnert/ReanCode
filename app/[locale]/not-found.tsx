"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";

import { AppleHelloEffectEnglish } from "@/components/apple-hello-effect/apple-hello-effect-english";
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect/apple-hello-effect-hindi";
import { AppleHelloEffectSpanish } from "@/components/apple-hello-effect/apple-hello-effect-spanish";
import { AppleHelloEffectVietnamese } from "@/components/apple-hello-effect/apple-hello-effect-vietnamese";

export default function NotFound() {
  const [index, setIndex] = useState(0);

  const handleAnimationEnd = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const demos = [
    <AppleHelloEffectEnglish
      key="english"
      onAnimationComplete={handleAnimationEnd}
    />,
  ];

  return (
    <main className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Top Logo */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12">
        <Link
          href="/"
          className="text-2xl font-serif font-bold text-primary hover:opacity-80 transition-opacity"
        >
          Rean2Code
        </Link>
      </div>

      <div className="flex flex-col items-center gap-8 md:gap-16 z-10 w-full max-w-3xl px-4 mt-[-8vh]">
        {/* Animated Hello text */}
        <div className="h-24 md:h-40 w-full flex items-center justify-center text-[#1d1d1f] dark:text-white">
          <AnimatePresence mode="sync">{demos[index]}</AnimatePresence>
        </div>

        {/* 404 Content */}
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f] dark:text-white">
            404
          </h1>
          <p className="text-base md:text-xl text-[#1d1d1f]/60 dark:text-white/60 max-w-md leading-relaxed font-medium">
            We couldn't find the page you were looking for. It might have been
            moved or doesn't exist.
          </p>

          <Link href="/">
            <span className="mt-6 inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-3.5 transition-transform active:scale-[0.95] shadow-sm">
              Return to Homepage
            </span>
          </Link>
        </div>
      </div>

      {/* Decorative Background 404 */}
      <div className="absolute -bottom-16 left-0 right-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] select-none flex justify-center">
        <span className="text-foreground text-[40vw] font-bold text-center leading-none tracking-tighter whitespace-nowrap">
          404
        </span>
      </div>
    </main>
  );
}
