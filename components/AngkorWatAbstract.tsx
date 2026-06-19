export function AngkorWatAbstract() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#1d1d1f] dark:text-white"
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

      {/* Sun */}
      <circle cx="1020" cy="110" r="70" fill="url(#dotPattern)" opacity="0.25" />
      <path d="M 940,120 L 1100,120" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M 950,135 L 1090,135" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M 970,150 L 1070,150" stroke="currentColor" strokeWidth="2" opacity="0.2" />

      {/* Cloud 1 */}
      <path d="M 200,80 Q 210,60 230,60 Q 250,60 260,80 L 290,80 Q 300,80 300,90 L 170,90 Q 170,80 180,80 Z" fill="url(#dotPattern)" opacity="0.2" />
      {/* Cloud 2 */}
      <path d="M 450,150 Q 460,140 470,140 Q 480,140 490,150 L 510,150 Q 520,150 520,160 L 430,160 Q 430,150 440,150 Z" fill="url(#dotPattern)" opacity="0.2" />
      
      {/* Birds */}
      <path d="M 780,120 Q 785,115 790,120 Q 795,115 800,120" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M 795,100 Q 800,95 805,100 Q 810,95 815,100" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* Angkor Wat Base Tiers */}
      <path d="M 0,300 L 1200,300 L 1150,260 L 50,260 Z" fill="url(#dotPattern)" opacity="0.1" />
      <path d="M 150,260 L 1050,260 L 1000,230 L 200,230 Z" fill="url(#dotPatternDense)" opacity="0.15" />
      <path d="M 300,230 L 900,230 L 870,200 L 330,200 Z" fill="url(#dotPattern)" opacity="0.2" />

      {/* Left Tower */}
      <path d="M 380,200 L 430,80 L 480,200 Z" fill="url(#dotPattern)" opacity="0.45" />

      {/* Right Tower */}
      <path d="M 720,200 L 770,80 L 820,200 Z" fill="url(#dotPattern)" opacity="0.45" />

      {/* Center Main Tower */}
      <path d="M 520,200 L 600,20 L 680,200 Z" fill="url(#dotPatternDense)" opacity="0.75" />
      
      {/* Center Tower Details (Lotus bud shape simulation using stacked triangles) */}
      <path d="M 545,140 L 600,60 L 655,140 Z" fill="currentColor" opacity="0.1" />
      <path d="M 565,100 L 600,40 L 635,100 Z" fill="currentColor" opacity="0.1" />

    </svg>
  );
}
