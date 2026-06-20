"use client";

import React, { useState, useRef } from "react";
import { Download, BookOpen, Search } from "lucide-react";
import { haptic } from "../../src/lib/haptic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  useGSAP(() => {
    gsap.from(".book-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    });
  }, { scope: container, dependencies: [searchQuery] });

  const handleDownload = () => {
    haptic();
  };

  const filteredBooks = goalKickerBooks.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full bg-background min-h-screen" ref={container}>
      <div className="max-w-7xl mx-auto border-x-2 border-primary/20">
        <div>
          {/* Header */}
          <div className="mb-10 text-center md:text-left flex flex-col gap-3 pt-12 pb-4">
            <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7a7a7a] dark:text-zinc-400">
              បណ្ណាល័យ (Library)
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
              សៀវភៅបច្ចេកវិទ្យាឥតគិតថ្លៃ
            </h1>
            <p className="text-[15px] text-[#7a7a7a] dark:text-zinc-400 max-w-xl leading-relaxed mx-auto md:mx-0">
              ទាញយកសៀវភៅ GoalKicker ជា PDF ដើម្បីអានក្រៅបណ្តាញដោយឥតគិតថ្លៃ។
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md mx-auto md:mx-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 bg-card border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              placeholder="ស្វែងរកសៀវភៅ (ឧ. HTML, Python, React)..."
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
                        ទាញយក PDF
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
              មិនមានសៀវភៅ "{searchQuery}" ទេ
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
