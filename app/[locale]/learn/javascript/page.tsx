"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Terminal, Zap, FileText, Database, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JsCompiler } from "@/components/js-compiler"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const playSuccessChime = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    const playNote = (freq: number, delay: number) => {
      const osc = ctx.createOscillator();
      osc.connect(gain);
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + Math.max(delay + 0.3, 0.8));
    };

    playNote(523.25, 0);    // C5
    playNote(659.25, 0.1);  // E5
    playNote(783.99, 0.2);  // G5
    playNote(1046.50, 0.3); // C6
  } catch (e) {
    console.error(e);
  }
}

/* ─────────────────────── Shared UI Components ─────────────────────── */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg text-sm text-foreground/90 my-4">
      {children}
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg text-sm text-foreground/90 my-4">
      {children}
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted text-foreground p-4 rounded-xl overflow-x-auto text-sm font-mono my-4 border border-border/50">
      {children}
    </pre>
  )
}

/* ─────────────────────── Starter Codes ─────────────────────── */
const code = {
  home: `console.log("Welcome to JavaScript Home!");`,
  intro: `// នេះគឺជាការបញ្ចេញសារទៅកាន់ Console
console.log("សួស្តីពិភពលោក! 👋");

// យើងអាចធ្វើការគណនាបាន
console.log("២ + ៣ =", 2 + 3);`,
  whereTo: `// JavaScript can be placed in <head> or <body>, or in an external file.
console.log("Executing from script tag");`,
  output: `// document.getElementById("demo").innerHTML = "Hello";
// document.write("Testing");
// window.alert("Warning!");
console.log("The standard output method for testing");`,
  syntax: `// Syntax rules
let x; // Declaration
x = 5; // Assignment
let y = 6;
let z = x + y;
console.log(z);`,
  operators: `let x = 5;
let y = 2;
let z = x * y;
console.log("Multiplication: " + z);`,
  conditions: `let time = 14;

if (time < 12) {
  console.log("អរុណសួស្តី! 🌅");
} else if (time < 18) {
  console.log("ទិវាសួស្តី! ☀️");
} else {
  console.log("រាត្រីសួស្តី! 🌙");
}

let isRaining = false;
let action = isRaining ? "យកឆ័ត្រទៅ" : "មិនបាច់យកឆ័ត្រទេ";
console.log(action);`,
  loops: `console.log("--- ការរាប់ពី ១ ដល់ ៣ ---");
for (let i = 1; i <= 3; i++) {
  console.log("លេខ:", i);
}

console.log("--- ការរាប់ថយក្រោយ ---");
let count = 3;
while (count > 0) {
  console.log("រាប់:", count);
  count--;
}
console.log("ចាប់ផ្តើម!");`,
  functions: `function greet(name) {
  return "សួស្តី, " + name + "!";
}
console.log(greet("ដារ៉ា"));

const multiply = (a, b) => a * b;
console.log("៥ គុណ ៤ =", multiply(5, 4));`,
  types: `let greeting = "សួស្តី"; // String
let score = 95.5; // Number
let isStudent = true; // Boolean
let colors = ["ក្រហម", "ខៀវ", "បៃតង"]; // Array
let person = { name: "ចាន់", age: 20 }; // Object

console.log("ប្រភេទអថេរ score គឺ:", typeof score);
console.log("ពណ៌ទីមួយគឺ:", colors[0]);`
};

/* ─────────────────────── Page ─────────────────────── */
export default function LearnJavascriptPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const CHAPTER_IDS = [
    "home", "intro", "whereto", "output", "syntax", "operators", "conditions", "loops", "strings", "numbers", 
    "functions", "objects", "scope", "dates", "temporal", "arrays", "sets", "maps", "iterations", "math", 
    "regexp", "datatypes", "errors", "debugging", "styleguide", "reference", "projects", "versions",
    "htmldom", "htmlevents", "htmlfirst",
    "advanced", "functions_adv", "objects_adv", "classes", "async", "modules", "meta", "typedarrays", 
    "domnav", "windows", "webapi", "ajax", "json", "jquery", "graphics", "examples", "reference_adv"
  ];

  const totalChapters = CHAPTER_IDS.length;

  useEffect(() => {
    const handler = (e: any) => {
      const idx = CHAPTER_IDS.indexOf(e.detail);
      if (idx !== -1) {
        setCurrentChapterIndex(idx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('chapterChange', handler);
    return () => window.removeEventListener('chapterChange', handler);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chapterChangeActive', { detail: CHAPTER_IDS[currentChapterIndex] }));
  }, [currentChapterIndex]);

  const advanceChapter = () => {
    playSuccessChime();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#cc785c', '#e09882', '#f5f5f7', '#ffd700']
    });
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = async () => {
    if (!session) {
      setShowLoginAlert(true);
      return;
    }
    if (currentChapterIndex < totalChapters - 1) {
      const activeId = CHAPTER_IDS[currentChapterIndex];
      // Mark as completed locally to update sidebar
      window.dispatchEvent(new CustomEvent('chapterCompleted', { detail: activeId }));

      // Record to DB
      fetch('/api/progress/javascript', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId: activeId })
      }).catch(console.error);

      // Record study contribution
      fetch('/api/study', { method: 'POST' }).catch(console.error);

      advanceChapter();
    }
  };

  const handleBack = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderChapterContent = (id: string) => {
    switch (id) {
      case "home":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to the JavaScript Tutorial! JavaScript is the world's most popular programming language.
              It is the language of the Web, making pages interactive.
            </p>
            <JsCompiler defaultCode={code.home} compact />
          </>
        )
      case "intro":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              JavaScript ត្រូវបានប្រើប្រាស់ដើម្បីបង្កើតអន្តរកម្មលើវេបសាយ។ ដើម្បីបង្ហាញលទ្ធផល វិធីដែលងាយស្រួលបំផុតគឺប្រើ <code>console.log()</code> សម្រាប់បង្ហាញសារ។
            </p>
            <JsCompiler defaultCode={code.intro} compact />
          </>
        )
      case "whereto":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              In HTML, JavaScript code is inserted between <code>&lt;script&gt;</code> and <code>&lt;/script&gt;</code> tags.
            </p>
            <JsCompiler defaultCode={code.whereTo} compact />
          </>
        )
      case "output":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              JavaScript can "display" data in different ways: writing to an HTML element using <code>innerHTML</code>, to the output using <code>document.write()</code>, into an alert box using <code>window.alert()</code>, or to the browser console using <code>console.log()</code>.
            </p>
            <JsCompiler defaultCode={code.output} compact />
          </>
        )
      case "syntax":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              JavaScript syntax is the set of rules, how JavaScript programs are constructed.
            </p>
            <JsCompiler defaultCode={code.syntax} compact />
          </>
        )
      case "operators":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              JavaScript uses arithmetic operators (<code>+</code> <code>-</code> <code>*</code> <code>/</code>) to compute values.
            </p>
            <JsCompiler defaultCode={code.operators} compact />
          </>
        )
      case "conditions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              យើងប្រើ <code>if</code>, <code>else if</code>, និង <code>else</code> ដើម្បីឲ្យកូដធ្វើការសម្រេចចិត្តដោយផ្អែកលើលក្ខខណ្ឌជាក់លាក់។
            </p>
            <JsCompiler defaultCode={code.conditions} compact />
          </>
        )
      case "loops":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Loops អនុញ្ញាតឲ្យអ្នករត់កូដដដែលៗច្រើនដង។ <code>for</code> loop ត្រូវបានប្រើនៅពេលអ្នកដឹងពីចំនួនដងដែលត្រូវរត់ រីឯ <code>while</code> loop ត្រូវបានប្រើនៅពេលអ្នកចង់ឲ្យវារត់ដរាបណាលក្ខខណ្ឌនៅតែពិត។
            </p>
            <JsCompiler defaultCode={code.loops} compact />
          </>
        )
      case "functions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              អនុគមន៍ (Function) គឺជាប្លុកនៃកូដដែលត្រូវបានសរសេរដើម្បីធ្វើកិច្ចការជាក់លាក់មួយ ហើយអ្នកអាចហៅវាឲ្យដំណើរការនៅពេលណាក៏បាន។
            </p>
            <Tip>
              បច្ចុប្បន្ន អ្នកសរសេរកម្មវិធីច្រើនប្រើ <strong>Arrow Functions</strong> <code>() =&gt; &#123; &#125;</code> ព្រោះវាខ្លី និងងាយស្រួលសរសេរជាងការប្រកាស Function ធម្មតា។
            </Tip>
            <JsCompiler defaultCode={code.functions} compact />
          </>
        )
      case "datatypes":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              JavaScript មានប្រភេទអថេរសំខាន់ៗជាច្រើនដូចជា៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li><strong>String:</strong> អក្សរ (ស្ថិតក្នុង <code>" "</code> ឬ <code>' '</code>)</li>
              <li><strong>Number:</strong> តួលេខ (ទសភាគ ឬ ចំនួនគត់)</li>
              <li><strong>Boolean:</strong> ការពិត (<code>true</code> ឬ <code>false</code>)</li>
              <li><strong>Array:</strong> បញ្ជីទិន្នន័យ (ស្ថិតក្នុង <code>[ ]</code>)</li>
              <li><strong>Object:</strong> វត្ថុដែលមាន properties (ស្ថិតក្នុង <code>&#123; &#125;</code>)</li>
            </ul>
            <JsCompiler defaultCode={code.types} compact />
          </>
        )
      default:
        // Generic fallback for all other chapters
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              មាតិកានៃជំពូកនេះកំពុងស្ថិតក្រោមការរៀបចំ។ សូមរង់ចាំការធ្វើបច្ចុប្បន្នភាពនៅពេលក្រោយ។
            </p>
            <JsCompiler defaultCode={`console.log("Testing ${id}...");`} compact />
          </>
        )
    }
  }

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10 pb-24">
        
        {/* ── Hero ── */}
        <div className="space-y-4 mb-12">
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-kantumruy">
            សិក្សាភាសា JavaScript ពីកម្រិតដំបូង
          </h1>
          <p className="text-muted-foreground font-kantumruy">
            JavaScript ជាភាសាសរសេរកូដដែលធ្វើឲ្យវេបសាយរបស់អ្នកមានជីវិត និងមានអន្តរកម្មជាមួយអ្នកប្រើប្រាស់។
          </p>
        </div>

        <div className="font-kantumruy min-h-[500px]">
          {CHAPTER_IDS.map((id, idx) => (
            <section 
              key={id} 
              style={{ display: currentChapterIndex === idx ? "block" : "none" }} 
              className="space-y-6 animate-in fade-in duration-500"
            >
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">{idx + 1}</span>
                <h2 className="text-2xl font-bold text-foreground">
                  {id.toUpperCase()}
                </h2>
              </div>
              
              {renderChapterContent(id)}
              
            </section>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <button 
            onClick={handleBack}
            disabled={currentChapterIndex === 0}
            className="px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            ← Back
          </button>
          <button 
            onClick={handleNext}
            disabled={currentChapterIndex === totalChapters - 1}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center gap-2"
          >
            {currentChapterIndex === totalChapters - 1 ? 'Finish Course' : 'Next Chapter'} →
          </button>
        </div>

      </div>

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-kantumruy">ទាមទារការចូលគណនី</AlertDialogTitle>
            <AlertDialogDescription>
              អ្នកត្រូវចូលគណនីដើម្បីរក្សាទុកវឌ្ឍនភាពរបស់អ្នក និងបន្តទៅមេរៀនបន្ទាប់។
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel>បោះបង់</AlertDialogCancel>
            <AlertDialogAction 
              variant="outline" 
              className="border-border text-foreground hover:bg-muted font-kantumruy" 
              onClick={() => {
                setShowLoginAlert(false);
                advanceChapter();
              }}
            >
              រំលង &gt;
            </AlertDialogAction>
            <AlertDialogAction onClick={() => router.push('/login')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              ចូលគណនី
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
