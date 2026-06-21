"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Terminal, Zap, FileText, Database, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PythonCompiler } from "@/components/python-compiler"
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
  home: `print("Welcome to Python Home!")`,
  intro: `# នេះគឺជាការបញ្ចេញសារទៅកាន់ Console
print("សួស្តីពិភពលោក! 👋")

# យើងអាចធ្វើការគណនាបាន
print(f"២ + ៣ = {2 + 3}")`,
  syntax: `# Syntax rules
x = 5 # Assignment
y = 6
z = x + y
print(z)`,
  operators: `x = 5
y = 2
z = x * y
print("Multiplication: " + str(z))`,
  conditions: `time = 14

if time < 12:
    print("អរុណសួស្តី! 🌅")
elif time < 18:
    print("ទិវាសួស្តី! ☀️")
else:
    print("រាត្រីសួស្តី! 🌙")

is_raining = False
action = "យកឆ័ត្រទៅ" if is_raining else "មិនបាច់យកឆ័ត្រទេ"
print(action)`,
  loops: `print("--- ការរាប់ពី ១ ដល់ ៣ ---")
for i in range(1, 4):
    print(f"លេខ: {i}")

print("--- ការរាប់ថយក្រោយ ---")
count = 3
while count > 0:
    print(f"រាប់: {count}")
    count -= 1
print("ចាប់ផ្តើម!")`,
  functions: `def greet(name):
    return "សួស្តី, " + name + "!"

print(greet("ដារ៉ា"))

multiply = lambda a, b: a * b
print(f"៥ គុណ ៤ = {multiply(5, 4)}")`,
  types: `greeting = "សួស្តី" # str
score = 95.5 # float
is_student = True # bool
colors = ["ក្រហម", "ខៀវ", "បៃតង"] # list
person = {"name": "ចាន់", "age": 20} # dict

print("ប្រភេទអថេរ score គឺ:", type(score))
print("ពណ៌ទីមួយគឺ:", colors[0])`
};

/* ─────────────────────── Page ─────────────────────── */
export default function LearnPythonPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const CHAPTER_IDS = [
    "home", "intro", "syntax", "comments", "variables", "datatypes", "numbers", "casting", "strings", "booleans", 
    "operators", "lists", "tuples", "sets", "dictionaries", "conditions", "while_loops", "for_loops", "functions", "lambda",
    "arrays", "classes", "inheritance", "iterators", "polymorphism", "scope", "modules", "dates", "math", "json",
    "regexp", "pip", "try_except", "user_input", "string_formatting", "file_handling", "read_files", "write_create_files", "delete_files"
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
      colors: ['#4b8bbe', '#ffe873', '#ffd43b', '#306998']
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
      fetch('/api/progress/python', { 
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
              Welcome to the Python Tutorial! Python is a popular programming language created by Guido van Rossum, and released in 1991.
            </p>
            <PythonCompiler defaultCode={code.home} compact />
          </>
        )
      case "intro":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Python ត្រូវបានប្រើប្រាស់សម្រាប់ការអភិវឌ្ឍន៍វេបសាយ (server-side), ការវិភាគទិន្នន័យ, វិទ្យាសាស្ត្រទិន្នន័យ, បញ្ញាសិប្បនិម្មិត ជាដើម។
            </p>
            <PythonCompiler defaultCode={code.intro} compact />
          </>
        )
      case "syntax":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Python ប្រើ indentation (ចន្លោះទទេ) ដើម្បីបញ្ជាក់ពីប្លុកកូដ ជំនួសឲ្យការប្រើសញ្ញា {} ដូចភាសាដទៃ។
            </p>
            <PythonCompiler defaultCode={code.syntax} compact />
          </>
        )
      case "operators":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Python uses arithmetic operators (<code>+</code> <code>-</code> <code>*</code> <code>/</code>) to compute values.
            </p>
            <PythonCompiler defaultCode={code.operators} compact />
          </>
        )
      case "conditions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              យើងប្រើ <code>if</code>, <code>elif</code>, និង <code>else</code> ដើម្បីឲ្យកូដធ្វើការសម្រេចចិត្តដោយផ្អែកលើលក្ខខណ្ឌជាក់លាក់។
            </p>
            <PythonCompiler defaultCode={code.conditions} compact />
          </>
        )
      case "for_loops":
      case "while_loops":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Loops អនុញ្ញាតឲ្យអ្នករត់កូដដដែលៗ។ <code>for</code> loop ត្រូវបានប្រើសម្រាប់រត់តាមធាតុនីមួយៗក្នុងបញ្ជី រីឯ <code>while</code> loop រត់ដរាបណាលក្ខខណ្ឌពិត។
            </p>
            <PythonCompiler defaultCode={code.loops} compact />
          </>
        )
      case "functions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              អនុគមន៍ (Function) ក្នុង Python ត្រូវបានបង្កើតដោយប្រើពាក្យគន្លឹះ <code>def</code>។
            </p>
            <PythonCompiler defaultCode={code.functions} compact />
          </>
        )
      case "datatypes":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              Python មានប្រភេទអថេរសំខាន់ៗជាច្រើនដូចជា៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li><strong>str:</strong> អក្សរ</li>
              <li><strong>int, float:</strong> តួលេខ</li>
              <li><strong>bool:</strong> ការពិត (<code>True</code> ឬ <code>False</code>)</li>
              <li><strong>list, tuple, range:</strong> Sequence types</li>
              <li><strong>dict:</strong> Mapping type</li>
            </ul>
            <PythonCompiler defaultCode={code.types} compact />
          </>
        )
      default:
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              មាតិកានៃជំពូកនេះកំពុងស្ថិតក្រោមការរៀបចំ។ សូមរង់ចាំការធ្វើបច្ចុប្បន្នភាពនៅពេលក្រោយ។
            </p>
            <PythonCompiler defaultCode={`print("Testing ${id}...")`} compact />
          </>
        )
    }
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 md:py-12 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-24 pb-20">
        
        {/* ── Hero ── */}
        <div className="space-y-4 mb-12">
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-kantumruy">
            សិក្សាភាសា Python ពីកម្រិតដំបូង
          </h1>
          <p className="text-muted-foreground font-kantumruy">
            Python គឺជាភាសាសរសេរកូដដ៏មានប្រជាប្រិយភាព និងងាយស្រួលរៀនសម្រាប់អ្នកចាប់ផ្តើមដំបូង។
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
                  {id.replace(/_/g, " ").toUpperCase()}
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
