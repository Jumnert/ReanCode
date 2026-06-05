"use client";

import HeroCarousel from "@/components/HeroCarousel";
import LanguageCards from "@/components/LanguageCards";
import { Button, Card, CardContent } from "@heroui/react";
import Link from "next/link";
import { BookOpen, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Side Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Books Card */}
          <Card className="relative overflow-hidden h-[180px] bg-[#1abc9c] border-none text-white shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
              <svg
                className="w-16 h-16 mb-2 drop-shadow-md"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Flat, pre-calculated paths with original book SVG colors to ensure perfect cross-browser rendering */}
                <path d="m3 8v2 1 3 1 5 1c0 1.105 0.8954 2 2 2h14c1.105 0 2-0.895 2-2v-1-5-4-3h-18z" fill="#16a085" />
                <path d="m3 7v2 1 3 1 5 1c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-1-5-4-3h-18z" fill="#ecf0f1" />
                <path d="m3 6v2 1 3 1 5 1c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-1-5-4-3h-18z" fill="#bdc3c7" />
                <path d="m3 5v2 1 3 1 5 1c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-1-5-4-3h-18z" fill="#ecf0f1" />
                <path d="m5 1c-1.1046 0-2 0.8954-2 2v1 4 2 1 3 1 5 1c0 1.105 0.8954 2 2 2h2v-1h-1.5c-0.8284 0-1.5-0.672-1.5-1.5s0.6716-1.5 1.5-1.5h12.5 1c1.105 0 2-0.895 2-2v-1-5-4-3-1c0-1.1046-0.895-2-2-2h-4-10z" fill="#16a085" />
                <path d="m8 1v18h1 9 1c1.105 0 2-0.895 2-2v-1-5-4-3-1c0-1.1046-0.895-2-2-2h-4-6-1z" fill="#1abc9c" />
              </svg>
              <h3 className="text-2xl font-bold mb-1 text-white">សៀវភៅជ្រើសរើស</h3>
              <p className="text-sm mb-3 text-white/90">
                បញ្ជីសៀវភៅកំពូលការរៀនសូត្រ
              </p>
              <Link href="/books">
                <Button
                  size="sm"
                  className="bg-white text-[#16a085] font-bold hover:bg-neutral-100 shadow-md"
                >
                  ស្រាវជ្រាវ
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Exercises Card */}
          <Card className="relative overflow-hidden h-[180px] bg-background border border-divider">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=400&fit=crop)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/30" />
            </div>
            <CardContent className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
              <Trophy className="size-12 mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-3">លំហាត់ប្រចាំថ្ងៃ</h3>
              <p className="text-sm mb-4 text-foreground/80">
                សំរួលលំហាត់ដែលអនុំ្ញាត
              </p>
              <Link href="/exercises">
                <Button
                  size="sm"
                  
                  className="font-semibold"
                >
                  ចាប់ផ្តើម
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Language Cards Section */}
      <LanguageCards />

      {/* Additional Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">ស្វាគមន៍មកកាន់ រៀន២កូដ</h1>
          <p className="text-lg text-foreground/80">
            រៀនសរសេរកូដដោយសេរី និងគ្មានព្រំប្រទល់
          </p>
        </div>
      </div>
    </main>
  );
}
