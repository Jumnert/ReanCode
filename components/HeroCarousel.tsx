"use client";

import { useState, useEffect, ReactNode } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  description: string;
  bgGradient: string;
  icon: ReactNode;
  cta: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "JavaScript",
    description: "ភាសាកម្មវិធីដ៏ពេញនិយមបំផុតសម្រាប់បង្កើតភាពរស់រវើក និងអន្តរកម្មស្មុគស្មាញលើគេហទំព័រ។",
    bgGradient: "from-yellow-500/25 via-yellow-500/10 to-background dark:via-yellow-950/5",
    icon: (
      <svg
        className="w-24 h-24 md:w-44 md:h-44 transition-transform duration-500 hover:rotate-3 hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(247,223,30,0.3)]"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" rx="15%" fill="#f7df1e" />
        <path d="M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z" fill="#000" />
      </svg>
    ),
    cta: "រៀន JavaScript",
    link: "/learn/javascript",
  },
  {
    id: 2,
    title: "Python",
    description: "ភាសាកម្មវិធីដ៏មានឥទ្ធិពល ងាយស្រួលរៀន ពេញនិយមសម្រាប់ការអភិវឌ្ឍ AI, ទិន្នន័យ (Data Science) និង Backend។",
    bgGradient: "from-blue-500/25 via-blue-500/10 to-background dark:via-blue-950/5",
    icon: (
      <svg
        className="w-24 h-24 md:w-44 md:h-44 transition-transform duration-500 hover:rotate-3 hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(55,118,171,0.3)]"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#3776ab"
          d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1h-9.5S2.1 8.8 2.1 16.005s4.287 7.018 4.287 7.018h2.56v-3.59s-.146-4.287 4.22-4.287h6.67s4.089.063 4.089-3.967V6.234s.607-4.134-7.041-4.134zm-3.71 2.35a1.342 1.342 0 1 1 0 2.683 1.342 1.342 0 0 1 0-2.683z"
        />
        <path
          fill="#ffd43b"
          d="M16.085 29.91c7.1 0 6.651-3.07 6.651-3.07v-3.19h-6.751v-1h9.5S30 23.2 30 15.995s-4.287-7.018-4.287-7.018h-2.56v3.59s.146 4.287-4.22 4.287h-6.67s-4.089-.063-4.089 3.967v6.955s-.607 4.134 7.041 4.134h-.13zm3.71-2.35a1.342 1.342 0 1 1 0-2.683 1.342 1.342 0 0 1 0 2.683z"
        />
      </svg>
    ),
    cta: "រៀន Python",
    link: "/learn/python",
  },
  {
    id: 3,
    title: "React",
    description: "បណ្ណាល័យ UI ឈានមុខគេលើពិភពលោក ប្រើសម្រាប់បង្កើតគេហទំព័រទំនើប លឿនរហ័ស និងមានប្រសិទ្ធភាពខ្ពស់។",
    bgGradient: "from-cyan-500/25 via-cyan-500/10 to-background dark:via-cyan-950/5",
    icon: (
      <svg
        className="w-24 h-24 md:w-44 md:h-44 transition-transform duration-500 hover:rotate-12 hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(83,193,222,0.3)]"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z"
          fill="#53C1DE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z"
          fill="#53C1DE"
        />
      </svg>
    ),
    cta: "រៀន React",
    link: "/learn/react",
  },
  {
    id: 4,
    title: "TypeScript",
    description: "ភាសាកម្មវិធីដែលបន្ថែមប្រព័ន្ធ Static Typing លើ JavaScript ដើម្បីបង្កើនភាពរឹងមាំ និងងាយស្រួលថែទាំកូដ។",
    bgGradient: "from-blue-600/25 via-blue-600/10 to-background dark:via-blue-950/5",
    icon: (
      <svg
        className="w-24 h-24 md:w-44 md:h-44 transition-transform duration-500 hover:rotate-3 hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(49,120,198,0.3)]"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" rx="15%" fill="#3178c6" />
        <path
          fill="#fff"
          d="m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z"
        />
      </svg>
    ),
    cta: "រៀន TypeScript",
    link: "/learn/typescript",
  },
  {
    id: 5,
    title: "HTML & CSS",
    description: "ភាសាគ្រឹះដែលខានមិនបានសម្រាប់កំណត់រចនាសម្ព័ន្ធ និងរចនាគេហទំព័រឱ្យមានភាពទាក់ទាញខ្លាំង។",
    bgGradient: "from-orange-500/25 via-orange-500/10 to-background dark:via-orange-950/5",
    icon: (
      <svg
        className="w-24 h-24 md:w-44 md:h-44 transition-transform duration-500 hover:rotate-3 hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(228,79,38,0.3)]"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="5.902 27.201 3.655 2 28.345 2 26.095 27.197 15.985 30 5.902 27.201"
          fill="#e44f26"
        />
        <polygon
          points="16 27.858 24.17 25.593 26.092 4.061 16 4.061 16 27.858"
          fill="#f1662a"
        />
        <polygon
          points="16 13.407 11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498 16 13.407"
          fill="#ebebeb"
        />
        <polygon
          points="16 21.434 15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65 16 21.434"
          fill="#ebebeb"
        />
        <polygon
          points="15.989 13.407 15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.437 15.989 24.653 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407 15.989 13.407"
          fill="#fff"
        />
        <polygon
          points="15.989 7.151 15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.445 10.242 23.517 9.548 23.658 7.981 23.732 7.151 15.989 7.151"
          fill="#fff"
        />
      </svg>
    ),
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
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide for better reading time

    return () => clearInterval(timer);
  }, [currentSlide]); // Reset timer when slide changes

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }

    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - currentX;
    if (diff > 75) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -75) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
      <div
        className="relative w-full h-[400px] md:h-[350px] overflow-hidden bg-background border border-divider rounded-2xl cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative flex items-center justify-center overflow-hidden"
            >
              {/* Language Brand Color Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />

              {/* Content Container (Flex Row for Left-Icon, Right-Text) */}
              <div className="relative container mx-auto px-6 md:px-16 z-10 w-full">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-4xl mx-auto">

                  {/* Left Side: Brand Icon Box (Standing freely and very large) */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {slide.icon}
                  </div>

                  {/* Right Side: Technology Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-foreground tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl mb-5 md:mb-6 text-foreground/80 leading-relaxed font-medium">
                      {slide.description}
                    </p>
                    <div className="flex justify-center md:justify-start">
                      <Link href={slide.link}>
                        <Button
                          size="lg"
                          
                          className="font-bold shadow-lg hover:scale-[1.02] transition-transform px-8"
                        >
                          {slide.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dot Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-foreground w-6"
                  : "bg-foreground/20 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
