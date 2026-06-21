"use client";

import React from "react";

export const MCPAbstractArt = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 500 380"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-xl mx-auto text-[#141413] dark:text-[#faf9f5]"
  >
    <defs>
      <pattern id="diagGrid" x="0" y="0" width="15" height="15" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#diagGrid)" />

    {/* Main Server Tower */}
    <rect x="180" y="80" width="140" height="220" rx="4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    
    {/* Server Blades */}
    <rect x="190" y="100" width="120" height="30" rx="2" fill="currentColor" opacity="0.1" />
    <circle cx="205" cy="115" r="4" fill="currentColor" opacity="0.5" />
    <circle cx="220" cy="115" r="4" fill="currentColor" opacity="0.2" />

    <rect x="190" y="140" width="120" height="30" rx="2" fill="currentColor" className="text-[#cc785c]" opacity="0.3" />
    <circle cx="205" cy="155" r="4" fill="currentColor" className="text-[#cc785c]" />
    <circle cx="220" cy="155" r="4" fill="currentColor" className="text-[#cc785c]" opacity="0.5" />
    <line x1="240" y1="155" x2="290" y2="155" stroke="currentColor" strokeWidth="2" className="text-[#cc785c]" opacity="0.8" />

    <rect x="190" y="180" width="120" height="30" rx="2" fill="currentColor" opacity="0.05" />
    <circle cx="205" cy="195" r="4" fill="currentColor" opacity="0.2" />

    <rect x="190" y="220" width="120" height="30" rx="2" fill="currentColor" opacity="0.1" />
    <circle cx="205" cy="235" r="4" fill="currentColor" opacity="0.5" />

    {/* Network Nodes and Lines */}
    <path d="M 180 115 L 100 115 L 100 150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
    <circle cx="100" cy="150" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <circle cx="100" cy="150" r="5" fill="currentColor" opacity="0.2" />

    <path d="M 320 155 L 400 155 L 400 200" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cc785c]" opacity="0.6" />
    <circle cx="400" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cc785c]" opacity="0.8" />
    <path d="M 390 200 L 410 200 M 400 190 L 400 210" stroke="currentColor" strokeWidth="2" className="text-[#cc785c]" />

    <path d="M 180 235 L 120 235 L 120 280" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <rect x="105" y="280" width="30" height="20" fill="currentColor" opacity="0.2" />

  </svg>
);
