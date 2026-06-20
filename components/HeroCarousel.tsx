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
 bgImage: "/gradient/yellow_crl.jpg",
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
 bgImage: "/gradient/bluebg_crl.jpg",
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
 bgImage: "/gradient/warmorrange_crl.jpg",
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
  if (isDragging) return;
  const timer = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 8000);
  return () => clearInterval(timer);
  }, [currentSlide, isDragging]);

 const handleTouchStart = (e: React.TouchEvent) => {
  setIsDragging(true);
  setTouchStart(e.targetTouches[0].clientX);
  };

 const handleTouchMove = (e: React.TouchEvent) => {
 setTouchEnd(e.targetTouches[0].clientX);
 };

 const handleTouchEnd = () => {
  setIsDragging(false);
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
 <div className="w-full bg-background pt-4 pb-0">
 <div className="w-full mx-auto px-4 md:px-6">
 <div 
 className="relative w-full h-[320px] overflow-hidden rounded-t-[18px] border border-[#e0e0e0] dark:border-zinc-800 hover:border-primary transition-all active:scale-[0.99] bg-white dark:bg-[#272729] shadow-none cursor-grab active:cursor-grabbing select-none"
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
  className="min-w-full h-full relative flex items-center p-8 md:p-16 overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('${slide.bgImage}')` }}
  >
 <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-5xl mx-auto">
 {/* Left content */}
 <div className="flex flex-col gap-3 relative z-10">
 <span className="text-[12px] md:text-[14px] font-semibold tracking-wider uppercase text-white/80 drop-shadow-sm">
 {slide.titleKh}
 </span>
 <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.32px] text-white drop-shadow-md leading-tight">
 {slide.title}
 </h2>
 <p className="text-[16px] md:text-[18px] text-white/90 drop-shadow-sm max-w-xl">
 {slide.description}
 </p>
 <div className="mt-8 flex items-center gap-4 relative z-10">
 {slide.title === "HTML & CSS" ? (
 <Link href={slide.link}>
 <span className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 py-3 text-sm transition-transform active:scale-[0.95] shadow-sm">
 {slide.cta}
 </span>
 </Link>
 ) : (
 <span className="inline-flex items-center justify-center bg-white/20 text-white/90 font-semibold rounded-full px-6 py-3 text-sm shadow-sm cursor-not-allowed">
 មកដល់ឆាប់ៗ
 </span>
 )}
 </div>
 </div>

 {/* Right content - Icon */}
 <div className="hidden md:flex flex-shrink-0 size-56 items-center justify-center text-white opacity-95 pointer-events-none z-10">
 <img src={slide.iconPath} alt={slide.title} className="w-36 h-36 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]" />
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
 ? "bg-primary w-5"
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
