"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobAbstractArt = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 80 500 380"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-xl mx-auto text-foreground"
  >
    <defs>
      <pattern
        id="dotPattern"
        x="0"
        y="0"
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
      <pattern
        id="dotPatternDense"
        x="0"
        y="0"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
    </defs>

    {/* Background Circle / Sun/Light */}
    <circle cx="350" cy="180" r="100" fill="url(#dotPattern)" opacity="0.1" />

    {/* Desk Surface */}
    <path d="M 50,300 L 450,300 L 430,320 L 70,320 Z" fill="url(#dotPatternDense)" opacity="0.3" className="text-primary" />
    <rect x="70" y="320" width="10" height="130" fill="url(#dotPattern)" opacity="0.4" />
    <rect x="420" y="320" width="10" height="130" fill="url(#dotPattern)" opacity="0.4" />

    {/* File Cabinet (Left) */}
    <rect x="85" y="320" width="90" height="130" fill="url(#dotPattern)" opacity="0.5" />
    <rect x="95" y="335" width="70" height="25" fill="currentColor" opacity="0.1" />
    <rect x="95" y="375" width="70" height="25" fill="currentColor" opacity="0.1" />
    <rect x="95" y="415" width="70" height="25" fill="currentColor" opacity="0.1" />

    {/* Potted Plant (Left, on cabinet) */}
    <path d="M 100,260 Q 110,230 130,220 Q 150,230 160,260 Z" fill="url(#dotPatternDense)" opacity="0.6" className="text-primary" />
    <path d="M 130,220 Q 140,200 160,210 Q 150,240 130,260 Z" fill="url(#dotPattern)" opacity="0.4" className="text-primary" />
    <path d="M 100,260 L 160,260 L 150,300 L 110,300 Z" fill="url(#dotPatternDense)" opacity="0.2" />

    {/* Person (Center) */}
    <circle cx="250" cy="140" r="35" fill="url(#dotPatternDense)" opacity="0.6" />
    {/* Body */}
    <path d="M 210,210 Q 250,180 290,210 L 300,300 L 200,300 Z" fill="url(#dotPattern)" opacity="0.5" />
    {/* Arm typing */}
    <path d="M 230,220 L 320,260 L 300,290" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3" />

    {/* Laptop (Right, on desk) */}
    <path d="M 280,300 L 350,220 L 390,220 L 320,300 Z" fill="url(#dotPatternDense)" opacity="0.8" />
    <path d="M 260,300 L 360,300 L 380,310 L 250,310 Z" fill="url(#dotPatternDense)" opacity="0.9" />

    {/* Coffee Mug */}
    <rect x="230" y="270" width="25" height="30" rx="3" fill="url(#dotPatternDense)" opacity="0.4" className="text-primary" />
    <path d="M 230,280 C 215,280 215,290 230,290" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3" className="text-primary" />

    {/* Desk Lamp */}
    <path d="M 400,300 L 410,200" stroke="currentColor" strokeWidth="6" fill="none" opacity="0.4" />
    <path d="M 410,200 L 370,160" stroke="currentColor" strokeWidth="6" fill="none" opacity="0.4" />
    <path d="M 370,160 Q 360,150 340,160 L 370,190 Z" fill="url(#dotPatternDense)" opacity="0.6" className="text-primary" />
    <path d="M 340,160 Q 330,170 350,190" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" className="text-primary" />
    <circle cx="405" cy="300" r="15" fill="url(#dotPattern)" opacity="0.5" />

    {/* Stack of Books */}
    <rect x="370" y="270" width="60" height="10" fill="url(#dotPattern)" opacity="0.5" />
    <rect x="375" y="280" width="55" height="10" fill="url(#dotPatternDense)" opacity="0.4" />
    <rect x="365" y="290" width="65" height="10" fill="url(#dotPattern)" opacity="0.3" className="text-primary" />

  </svg>
);

export default function HomeJobsPreview() {
  return (
    <div className="w-full bg-surface-card dark:bg-surface-dark-soft py-12 md:py-16 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 max-w-6xl">
        
        {/* Left Side: Abstract Art */}
        <div className="flex justify-center items-center w-full">
          <JobAbstractArt />
        </div>

        {/* Right Side: Headlines and Buttons */}
        <div className="flex flex-col items-end text-right w-full">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-kantumruy mb-6 leading-tight">
            ស្វែងរកការងារ <br/><span className="text-primary">Tech Jobs</span>
          </h2>
          <p className="text-muted-foreground font-kantumruy text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            ភ្ជាប់ទំនាក់ទំនងជាមួយក្រុមហ៊ុនបច្ចេកវិទ្យាកំពូលៗក្នុងស្រុក និងស្វែងរកឱកាសការងារដែលសាកសមនឹងសមត្ថភាពរបស់អ្នក។
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 w-full">
            <Button asChild variant="outline" size="lg" className="border-2 border-primary/20 bg-transparent text-base font-semibold text-foreground hover:bg-primary/5 hover:text-foreground font-kantumruy w-full sm:w-auto justify-center">
              <Link href="/jobs/post">
                <Building2 className="h-5 w-5 text-primary mr-2" />
                Post a Job
              </Link>
            </Button>
            
            <Button asChild size="lg" className="bg-primary text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 font-kantumruy w-full sm:w-auto justify-center">
              <Link href="/jobs">
                Explore Jobs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
