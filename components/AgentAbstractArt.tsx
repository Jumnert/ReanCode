"use client";

import React from "react";

export const AgentAbstractArt = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 500 380"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-xl mx-auto text-[#141413] dark:text-[#faf9f5]"
  >
    <defs>
      <pattern id="hexGrid" x="0" y="0" width="20" height="34.64" patternUnits="userSpaceOnUse">
        <path d="M 20 17.32 L 10 34.64 L 0 17.32 L 10 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#hexGrid)" />

    {/* Central AI Brain Node */}
    <circle cx="250" cy="190" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <circle cx="250" cy="190" r="30" fill="currentColor" opacity="0.1" />
    <circle cx="250" cy="190" r="10" fill="currentColor" className="text-[#cc785c]" opacity="0.8" />

    {/* Orbital Rings */}
    <ellipse cx="250" cy="190" rx="120" ry="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(30 250 190)" />
    <ellipse cx="250" cy="190" rx="120" ry="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(-30 250 190)" />

    {/* Nodes on orbits */}
    <circle cx="355" cy="130" r="8" fill="currentColor" className="text-[#cc785c]" opacity="0.9" />
    <circle cx="145" cy="250" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="355" cy="250" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="145" cy="130" r="8" fill="currentColor" opacity="0.2" />

    {/* Connecting branching logic (Tree structure) */}
    <path d="M 250 150 L 250 80 M 250 80 L 200 40 M 250 80 L 300 40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
    <rect x="180" y="20" width="40" height="20" rx="4" fill="currentColor" opacity="0.1" />
    <rect x="280" y="20" width="40" height="20" rx="4" fill="currentColor" opacity="0.1" />

    {/* Bottom flow */}
    <path d="M 250 230 L 250 300 M 250 300 L 150 350 M 250 300 L 350 350" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#cc785c]" opacity="0.5" />
    <circle cx="150" cy="350" r="12" fill="currentColor" opacity="0.2" />
    <circle cx="350" cy="350" r="12" fill="currentColor" className="text-[#cc785c]" opacity="0.4" />

  </svg>
);
