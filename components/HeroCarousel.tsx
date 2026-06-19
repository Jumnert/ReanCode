"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "JavaScript",
    titleKh: "ភាសា JavaScript",
    description: "ភាសាកម្មវិធីដ៏ពេញនិយមបំផុតសម្រាប់ការអភិវឌ្ឍគេហទំព័រដែលមានអន្តរកម្មខ្ពស់ និងរស់រវើក។",
    bgClass: "bg-amber-500/5 dark:bg-amber-500/2",
    accentColor: "#f7df1e",
    iconPath: "/images/javascript.svg",
    cta: "រៀន JavaScript",
    link: "/learn/javascript",
  },
  {
    id: 2,
    title: "Python",
    titleKh: "ភាសា Python",
    description: "ភាសាកម្មវិធីងាយស្រួលយល់ និងពេញនិយមបំផុតសម្រាប់ការវិភាគទិន្នន័យ ស្វ័យប្រវត្តិកម្ម និងបញ្ញាសិប្បនិម្មិត (AI)។",
    bgClass: "bg-blue-500/5 dark:bg-blue-500/2",
    accentColor: "#3776ab",
    iconPath: "/images/python.svg",
    cta: "រៀន Python",
    link: "/learn/python",
  },
  {
    id: 3,
    title: "HTML & CSS",
    titleKh: "ភាសា HTML & CSS",
    description: "ភាសាគ្រឹះដែលមិនអាចខ្វះបានសម្រាប់បង្កើត និងរចនាទម្រង់ប្លង់គេហទំព័រឱ្យស្រស់ស្អាត។",
    bgClass: "bg-orange-500/5 dark:bg-orange-500/2",
    accentColor: "#e44f26",
    iconPath: "/images/html.svg",
    cta: "រៀន HTML & CSS",
    link: "/learn/html",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe Left (Next)
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (touchStart - touchEnd < -50) {
      // Swipe Right (Prev)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.clientX;
    if (startX - endX > 50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (startX - endX < -50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full bg-[#f5f5f7] dark:bg-[#1d1d1f] pt-8 pb-2">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="relative w-full h-[320px] overflow-hidden rounded-[18px] border border-[#e0e0e0] dark:border-zinc-800 bg-white dark:bg-[#272729] shadow-none cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* Slider content */}
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`min-w-full h-full relative flex items-center p-8 md:p-16 overflow-hidden ${slide.bgClass}`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-5xl mx-auto">
                  {/* Left content */}
                  <div className="flex-1 text-center md:text-left flex flex-col gap-3">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#7a7a7a] dark:text-zinc-400">
                      {slide.titleKh}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
                      {slide.title}
                    </h2>
                    <p className="text-[15px] text-[#7a7a7a] dark:text-zinc-400 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="mt-2 flex justify-center md:justify-start">
                      <Link href={slide.link}>
                        <Button className="bg-[#0066cc] hover:bg-[#0071e3] text-white font-medium rounded-full px-6 py-2 transition-transform active:scale-[0.95] text-sm shadow-none">
                          {slide.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right content - Icon */}
                  <div className="hidden md:flex flex-shrink-0 size-44 items-center justify-center text-[#1d1d1f] dark:text-white opacity-85 pointer-events-none">
                    <img src={slide.iconPath} alt={slide.title} className="w-20 h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-[#0066cc] w-5"
                    : "bg-[#7a7a7a]/30 dark:bg-zinc-700 hover:bg-[#7a7a7a]/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
