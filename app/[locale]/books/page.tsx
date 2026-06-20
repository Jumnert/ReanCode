"use client";

import React, { useState, useRef } from "react";
import { Download, BookOpen, Search } from "lucide-react";
import { haptic } from "../../../src/lib/haptic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

const goalKickerBooks = [
  {
    name: ".NET Framework",
    coverUrl:
      "https://books.goalkicker.com/DotNETFrameworkBook/DotNETFrameworkGrow.png",
    url: "https://goalkicker.com/DotNETFrameworkBook/DotNETFrameworkNotesForProfessionals.pdf",
  },
  {
    name: "Algorithms",
    coverUrl: "https://books.goalkicker.com/AlgorithmsBook/AlgorithmsGrow.png",
    url: "https://goalkicker.com/AlgorithmsBook/AlgorithmsNotesForProfessionals.pdf",
  },
  {
    name: "Android",
    coverUrl: "https://books.goalkicker.com/AndroidBook/AndroidGrow.png",
    url: "https://goalkicker.com/AndroidBook/AndroidNotesForProfessionals.pdf",
  },
  {
    name: "Angular 2",
    coverUrl: "https://books.goalkicker.com/Angular2Book/Angular2Grow.png",
    url: "https://goalkicker.com/Angular2Book/Angular2NotesForProfessionals.pdf",
  },
  {
    name: "AngularJS",
    coverUrl: "https://books.goalkicker.com/AngularJSBook/AngularJSGrow.png",
    url: "https://goalkicker.com/AngularJSBook/AngularJSNotesForProfessionals.pdf",
  },
  {
    name: "Bash",
    coverUrl: "https://books.goalkicker.com/BashBook/BashGrow.png",
    url: "https://goalkicker.com/BashBook/BashNotesForProfessionals.pdf",
  },
  {
    name: "C",
    coverUrl: "https://books.goalkicker.com/CBook/CGrow.png",
    url: "https://goalkicker.com/CBook/CNotesForProfessionals.pdf",
  },
  {
    name: "C++",
    coverUrl: "https://books.goalkicker.com/CPlusPlusBook/CPlusPlusGrow.png",
    url: "https://goalkicker.com/CPlusPlusBook/CPlusPlusNotesForProfessionals.pdf",
  },
  {
    name: "C#",
    coverUrl: "https://books.goalkicker.com/CSharpBook/CSharpGrow.png",
    url: "https://goalkicker.com/CSharpBook/CSharpNotesForProfessionals.pdf",
  },
  {
    name: "CSS",
    coverUrl: "https://books.goalkicker.com/CSSBook/CSSGrow.png",
    url: "https://goalkicker.com/CSSBook/CSSNotesForProfessionals.pdf",
  },
  {
    name: "Entity Framework",
    coverUrl:
      "https://books.goalkicker.com/EntityFrameworkBook/EntityFrameworkGrow.png",
    url: "https://goalkicker.com/EntityFrameworkBook/EntityFrameworkNotesForProfessionals.pdf",
  },
  {
    name: "Excel VBA",
    coverUrl: "https://books.goalkicker.com/ExcelVBABook/ExcelVBAGrow.png",
    url: "https://goalkicker.com/ExcelVBABook/ExcelVBANotesForProfessionals.pdf",
  },
  {
    name: "Git",
    coverUrl: "https://books.goalkicker.com/GitBook/GitGrow.png",
    url: "https://goalkicker.com/GitBook/GitNotesForProfessionals.pdf",
  },
  {
    name: "Haskell",
    coverUrl: "https://books.goalkicker.com/HaskellBook/HaskellGrow.png",
    url: "https://goalkicker.com/HaskellBook/HaskellNotesForProfessionals.pdf",
  },
  {
    name: "Hibernate",
    coverUrl: "https://books.goalkicker.com/HibernateBook/HibernateGrow.png",
    url: "https://goalkicker.com/HibernateBook/HibernateNotesForProfessionals.pdf",
  },
  {
    name: "HTML5",
    coverUrl: "https://books.goalkicker.com/HTML5Book/HTML5Grow.png",
    url: "https://goalkicker.com/HTML5Book/HTML5NotesForProfessionals.pdf",
  },
  {
    name: "HTML5 Canvas",
    coverUrl:
      "https://books.goalkicker.com/HTML5CanvasBook/HTML5CanvasGrow.png",
    url: "https://goalkicker.com/HTML5CanvasBook/HTML5CanvasNotesForProfessionals.pdf",
  },
  {
    name: "iOS",
    coverUrl: "https://books.goalkicker.com/iOSBook/iOSGrow.png",
    url: "https://goalkicker.com/iOSBook/iOSNotesForProfessionals.pdf",
  },
  {
    name: "Java",
    coverUrl: "https://books.goalkicker.com/JavaBook/JavaGrow.png",
    url: "https://goalkicker.com/JavaBook/JavaNotesForProfessionals.pdf",
  },
  {
    name: "JavaScript",
    coverUrl: "https://books.goalkicker.com/JavaScriptBook/JavaScriptGrow.png",
    url: "https://goalkicker.com/JavaScriptBook/JavaScriptNotesForProfessionals.pdf",
  },
  {
    name: "jQuery",
    coverUrl: "https://books.goalkicker.com/jQueryBook/jQueryGrow.png",
    url: "https://goalkicker.com/jQueryBook/jQueryNotesForProfessionals.pdf",
  },
  {
    name: "Kotlin",
    coverUrl: "https://books.goalkicker.com/KotlinBook/KotlinGrow.png",
    url: "https://goalkicker.com/KotlinBook/KotlinNotesForProfessionals.pdf",
  },
  {
    name: "LaTeX",
    coverUrl: "https://books.goalkicker.com/LaTeXBook/LaTeXGrow.png",
    url: "https://goalkicker.com/LaTeXBook/LaTeXNotesForProfessionals.pdf",
  },
  {
    name: "Linux",
    coverUrl: "https://books.goalkicker.com/LinuxBook/LinuxGrow.png",
    url: "https://goalkicker.com/LinuxBook/LinuxNotesForProfessionals.pdf",
  },
  {
    name: "MATLAB",
    coverUrl: "https://books.goalkicker.com/MATLABBook/MATLABGrow.png",
    url: "https://goalkicker.com/MATLABBook/MATLABNotesForProfessionals.pdf",
  },
  {
    name: "Microsoft SQL Server",
    coverUrl:
      "https://books.goalkicker.com/MicrosoftSQLServerBook/MicrosoftSQLServerGrow.png",
    url: "https://goalkicker.com/MicrosoftSQLServerBook/MicrosoftSQLServerNotesForProfessionals.pdf",
  },
  {
    name: "MongoDB",
    coverUrl: "https://books.goalkicker.com/MongoDBBook/MongoDBGrow.png",
    url: "https://goalkicker.com/MongoDBBook/MongoDBNotesForProfessionals.pdf",
  },
  {
    name: "MySQL",
    coverUrl: "https://books.goalkicker.com/MySQLBook/MySQLGrow.png",
    url: "https://goalkicker.com/MySQLBook/MySQLNotesForProfessionals.pdf",
  },
  {
    name: "Node.js",
    coverUrl: "https://books.goalkicker.com/NodeJSBook/NodeJSGrow.png",
    url: "https://goalkicker.com/NodeJSBook/NodeJSNotesForProfessionals.pdf",
  },
  {
    name: "Objective-C",
    coverUrl: "https://books.goalkicker.com/ObjectiveCBook/ObjectiveCGrow.png",
    url: "https://goalkicker.com/ObjectiveCBook/ObjectiveCNotesForProfessionals.pdf",
  },
  {
    name: "Oracle Database",
    coverUrl:
      "https://books.goalkicker.com/OracleDatabaseBook/OracleDatabaseGrow.png",
    url: "https://goalkicker.com/OracleDatabaseBook/OracleDatabaseNotesForProfessionals.pdf",
  },
  {
    name: "Perl",
    coverUrl: "https://books.goalkicker.com/PerlBook/PerlGrow.png",
    url: "https://goalkicker.com/PerlBook/PerlNotesForProfessionals.pdf",
  },
  {
    name: "PHP",
    coverUrl: "https://books.goalkicker.com/PHPBook/PHPGrow.png",
    url: "https://goalkicker.com/PHPBook/PHPNotesForProfessionals.pdf",
  },
  {
    name: "PostgreSQL",
    coverUrl: "https://books.goalkicker.com/PostgreSQLBook/PostgreSQLGrow.png",
    url: "https://goalkicker.com/PostgreSQLBook/PostgreSQLNotesForProfessionals.pdf",
  },
  {
    name: "PowerShell",
    coverUrl: "https://books.goalkicker.com/PowerShellBook/PowerShellGrow.png",
    url: "https://goalkicker.com/PowerShellBook/PowerShellNotesForProfessionals.pdf",
  },
  {
    name: "Python",
    coverUrl: "https://books.goalkicker.com/PythonBook/PythonGrow.png",
    url: "https://goalkicker.com/PythonBook/PythonNotesForProfessionals.pdf",
  },
  {
    name: "R",
    coverUrl: "https://books.goalkicker.com/RBook/RGrow.png",
    url: "https://goalkicker.com/RBook/RNotesForProfessionals.pdf",
  },
  {
    name: "React JS",
    coverUrl: "https://books.goalkicker.com/ReactJSBook/ReactJSGrow.png",
    url: "https://goalkicker.com/ReactJSBook/ReactJSNotesForProfessionals.pdf",
  },
  {
    name: "React Native",
    coverUrl:
      "https://books.goalkicker.com/ReactNativeBook/ReactNativeGrow.png",
    url: "https://goalkicker.com/ReactNativeBook/ReactNativeNotesForProfessionals.pdf",
  },
  {
    name: "Ruby",
    coverUrl: "https://books.goalkicker.com/RubyBook/RubyGrow.png",
    url: "https://goalkicker.com/RubyBook/RubyNotesForProfessionals.pdf",
  },
  {
    name: "Ruby on Rails",
    coverUrl:
      "https://books.goalkicker.com/RubyOnRailsBook/RubyOnRailsGrow.png",
    url: "https://goalkicker.com/RubyOnRailsBook/RubyOnRailsNotesForProfessionals.pdf",
  },
  {
    name: "Spring Framework",
    coverUrl:
      "https://books.goalkicker.com/SpringFrameworkBook/SpringFrameworkGrow.png",
    url: "https://goalkicker.com/SpringFrameworkBook/SpringFrameworkNotesForProfessionals.pdf",
  },
  {
    name: "SQL",
    coverUrl: "https://books.goalkicker.com/SQLBook/SQLGrow.png",
    url: "https://goalkicker.com/SQLBook/SQLNotesForProfessionals.pdf",
  },
  {
    name: "Swift",
    coverUrl: "https://books.goalkicker.com/SwiftBook/SwiftGrow.png",
    url: "https://goalkicker.com/SwiftBook/SwiftNotesForProfessionals.pdf",
  },
  {
    name: "TypeScript",
    coverUrl: "https://books.goalkicker.com/TypeScriptBook/TypeScriptGrow.png",
    url: "https://goalkicker.com/TypeScriptBook/TypeScriptNotesForProfessionals.pdf",
  },
  {
    name: "VBA",
    coverUrl: "https://books.goalkicker.com/VBABook/VBAGrow.png",
    url: "https://goalkicker.com/VBABook/VBANotesForProfessionals.pdf",
  },
  {
    name: "Visual Basic .NET",
    coverUrl:
      "https://books.goalkicker.com/VisualBasic_NETBook/VisualBasic_NETGrow.png",
    url: "https://goalkicker.com/VisualBasic_NETBook/VisualBasic_NETNotesForProfessionals.pdf",
  },
  {
    name: "Xamarin Forms",
    coverUrl:
      "https://books.goalkicker.com/XamarinFormsBook/XamarinFormsGrow.png",
    url: "https://goalkicker.com/XamarinFormsBook/XamarinFormsNotesForProfessionals.pdf",
  },
];

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Books');

  useGSAP(() => {
    gsap.from(".book-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    });
    // Header Animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // Cards Stagger Animation
    gsap.fromTo(
      ".book-card",
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.2)",
        clearProps: "all",
      }
    );
  }, []);

  const filteredBooks = goalKickerBooks.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = () => {
    haptic();
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center pt-8 md:pt-16 px-4 md:px-0 font-sans">
      <div className="w-full max-w-7xl mx-auto border-x-2 border-primary/20 bg-background/50 backdrop-blur-sm relative">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center py-12 md:py-20 px-4 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6 shadow-sm border border-primary/20">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight drop-shadow-sm" style={{ fontFamily: "var(--font-kantumruy-pro)" }}>
            {t('title')}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6 mb-8">
            <div className="h-px w-12 bg-primary/30"></div>
            <p className="text-lg md:text-xl text-muted-foreground font-medium bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
              {t('subtitle')}
            </p>
            <div className="h-px w-12 bg-primary/30"></div>
          </div>

          <p className="text-[15px] text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-auto text-center mb-10">
            {t('description')}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 bg-card border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Diagonal Separator */}
        <div className="h-8 border-y-2 border-primary/20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, var(--primary-10, rgba(204, 120, 92, 0.1)) 4px, var(--primary-10, rgba(204, 120, 92, 0.1)) 5px)' }}></div>

        {/* Strict Grid */}
        {filteredBooks.length > 0 ? (
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mr-[2px]">
              {filteredBooks.map((book) => (
                <div
                  key={book.name}
                  className="book-card relative flex flex-col aspect-[3/4] border-r-2 border-b-2 border-primary/20 overflow-hidden group bg-primary/5 p-2 md:p-3 transition-colors hover:bg-primary/10"
                >
                {/* Book Poster Container */}
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300 bg-white">
                  {/* Full Background Image */}
                  <img
                    src={book.coverUrl}
                    alt={`${book.name} Book Cover`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-0"
                    loading="lazy"
                  />

                  {/* Gradient Overlay (Bottom 50% only) */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-5 justify-end">
                    <h3 className="font-bold text-[18px] text-white leading-tight mb-1 drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {book.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-300 mb-4 drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <BookOpen className="w-3.5 h-3.5 text-primary" />
                      <span>Notes for Professionals</span>
                    </div>

                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleDownload}
                        className="flex w-full items-center justify-center gap-2 bg-white/15 hover:bg-primary text-white font-semibold py-2.5 px-4 rounded-full backdrop-blur-md transition-all duration-300 text-[13px] active:scale-[0.97] border border-white/20 hover:border-transparent shadow-lg"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {t('downloadPdf')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground text-lg">
              {t('noBooksFound', { query: searchQuery })}
            </p>
          </div>
        )}

        {/* CC BY-SA Footer */}
        <div className="mt-16 pt-8 border-t-2 border-primary/20">
          <p className="text-[13px] text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            <strong>ចំណាំ៖</strong> សៀវភៅ GoalKicker ត្រូវបានចងក្រងពីខ្លឹមសារ
            Stack Overflow Documentation ហើយត្រូវបានចែកចាយក្រោមអាជ្ញាប័ណ្ណ{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Creative Commons Attribution-ShareAlike (CC BY-SA)
            </a>
            ។ រក្សាសិទ្ធិដើមដោយអ្នកចូលរួមលើ Stack Overflow។
          </p>
        </div>
      </div>
    </div>
  );
}
