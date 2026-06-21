"use client";

import React from "react";

export const ReactAbstractArt = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 500 380"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-xl mx-auto text-[#141413] dark:text-[#faf9f5]"
  >
    <defs>
      <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
      <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.2" />
      </pattern>
    </defs>

    {/* Background Grid */}
    <rect width="100%" height="100%" fill="url(#gridPattern)" />

    {/* Abstract UI Elements */}
    <rect x="50" y="80" width="300" height="200" rx="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <rect x="70" y="100" width="120" height="30" rx="4" fill="currentColor" opacity="0.1" />
    <rect x="210" y="100" width="120" height="30" rx="4" fill="url(#dotPattern)" className="text-[#cc785c]" opacity="0.4" />
    
    <rect x="70" y="150" width="260" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
    
    {/* Inner Card */}
    <rect x="90" y="170" width="100" height="60" rx="6" fill="currentColor" opacity="0.05" />
    <rect x="210" y="170" width="100" height="60" rx="6" fill="currentColor" opacity="0.05" />

    {/* Floating Elements (Cursor / Nodes) */}
    <path d="M 320 230 L 335 260 L 345 250 L 360 270 L 370 260 L 355 240 L 365 230 Z" fill="currentColor" className="text-[#cc785c]" />
    
    <circle cx="140" cy="200" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <circle cx="260" cy="200" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cc785c]" opacity="0.8" />

    {/* Decorative Lines */}
    <path d="M 350 150 L 420 150 L 420 200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
    <circle cx="420" cy="200" r="4" fill="currentColor" opacity="0.3" />

  </svg>
);
