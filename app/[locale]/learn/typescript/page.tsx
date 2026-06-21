"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Terminal, Zap, FileText, Database, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TsCompiler } from "@/components/ts-compiler"
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

/* ─────────────────── Reusable UI helpers ─────────────────── */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
      <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
      <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
      <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
      <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
    </div>
  )
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
      <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
    </div>
  )
}

function Good({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
      <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed border border-border my-4">
      {children}
    </pre>
  )
}

function Tag({ name }: { name: string }) {
  return (
    <code className="font-mono bg-muted text-foreground px-1.5 py-0.5 rounded text-[13px]">
      {name}
    </code>
  )
}

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

/* ─────────────────────── Quizzes ─────────────────────── */
const QUIZZES: Record<string, {
  questionKhmer: string;
  questionEnglish: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}> = {
  intro: {
    questionKhmer: "តើអ្វីទៅជា TypeScript?",
    questionEnglish: "What is TypeScript?",
    options: [
      "វាជា Framework របស់ JavaScript",
      "វាជាភាសាថ្មីស្រឡាងដែលមិនពាក់ព័ន្ធជាមួយ JavaScript ទេ",
      "វាជា JavaScript ដែលបន្ថែម Static Typing",
      "វាជា Database Query Language"
    ],
    correctIndex: 2,
    explanation: "TypeScript គឺជា Superset របស់ JavaScript ដែលមានន័យថាវាគឺជា JavaScript ដែលបានបន្ថែមមុខងារ Static Typing និងមុខងារថ្មីៗផ្សេងទៀត។"
  },
  types: {
    questionKhmer: "តើ Type មួយណាដែលគួរជៀសវាងការប្រើប្រាស់ព្រោះវាធ្វើឲ្យបាត់បង់អត្ថប្រយោជន៍របស់ TypeScript?",
    questionEnglish: "Which Type should be avoided as it defeats the purpose of TypeScript?",
    options: [
      "unknown",
      "any",
      "void",
      "never"
    ],
    correctIndex: 1,
    explanation: "ការប្រើប្រាស់ `any` នឹងបិទរាល់ការត្រួតពិនិត្យ Type (Type Checking) ទាំងអស់ដែលធ្វើឲ្យវាប្រៀបដូចជាការសរសេរ JavaScript ធម្មតាដែរ។"
  },
  interfaces: {
    questionKhmer: "តើយើងត្រូវប្រើសញ្ញាអ្វីដើម្បីបញ្ជាក់ថា Property មួយក្នុង Interface គឺជាជម្រើស (Optional)?",
    questionEnglish: "Which symbol is used to mark a property as optional in an Interface?",
    options: [
      "!",
      "?",
      "&",
      "|"
    ],
    correctIndex: 1,
    explanation: "សញ្ញា `?` (Question mark) ត្រូវបានដាក់នៅពីក្រោយឈ្មោះ Property ដើម្បីបញ្ជាក់ថា Property នោះអាចមានឬអត់ក៏បាន (Optional)។"
  },
  generics: {
    questionKhmer: "តើ Generics ជួយអ្វីខ្លះក្នុងការសរសេរកូដ?",
    questionEnglish: "How do Generics help in coding?",
    options: [
      "ធ្វើឲ្យកូដដំណើរការលឿនជាងមុន",
      "អនុញ្ញាតឲ្យបង្កើតកូដដែលអាចប្រើឡើងវិញបានជាមួយ Type ផ្សេងៗគ្នា",
      "បំប្លែងកូដទៅជាកូដម៉ាស៊ីន (Machine Code)",
      "ជួយលាក់ទិន្នន័យសម្ងាត់ (Encapsulation)"
    ],
    correctIndex: 1,
    explanation: "Generics ជួយឲ្យយើងសរសេរ Functions, Classes ឬ Interfaces តែមួយដែលអាចដំណើរការជាមួយប្រភេទ Type ណាមួយក៏បានដោយរក្សាបាននូវ Type Safety។"
  },
  enums: {
    questionKhmer: "បើយើងមិនកំណត់តម្លៃឲ្យសមាជិកដំបូងនៃ Enum ទេ តើវានឹងមានតម្លៃលំនាំដើមប៉ុន្មាន?",
    questionEnglish: "If no value is assigned to the first member of an Enum, what is its default value?",
    options: [
      "1",
      "-1",
      "undefined",
      "0"
    ],
    correctIndex: 3,
    explanation: "តាមលំនាំដើម (Default) Numeric Enums ចាប់ផ្តើមពី 0 បើយើងមិនបានកំណត់តម្លៃឲ្យវា។"
  },
  utility_types: {
    questionKhmer: "តើ Utility Type មួយណាដែលផ្លាស់ប្តូររាល់ Properties ទាំងអស់នៃ Type មួយឲ្យទៅជា Optional?",
    questionEnglish: "Which Utility Type changes all properties of a Type to be Optional?",
    options: [
      "Required<T>",
      "Partial<T>",
      "Readonly<T>",
      "Omit<T, K>"
    ],
    correctIndex: 1,
    explanation: "Partial<T> នឹងបម្លែងរាល់ Properties ទាំងអស់របស់ T ឲ្យទៅជាជម្រើស (Optional properties) ទាំងអស់។"
  }
}

/* ─────────────────────── Per-section starter code ─────────────────────── */
const code = {
  intro: `// សូមស្វាគមន៍មកកាន់ TypeScript!
let message: string = "សួស្តី, TypeScript!";
console.log(message);

// ប្រសិនបើអ្នកព្យាយាមផ្លាស់ប្តូរប្រភេទទិន្នន័យ (Type) TypeScript នឹងបង្ហាញកំហុស
// message = 123; // Error: Type 'number' is not assignable to type 'string'.`,

  types: `// 1. Primitive Types
let isDone: boolean = false;
let age: number = 25;
let firstName: string = "សុខ";

// 2. Arrays
let scores: number[] = [85, 90, 95];
let names: Array<string> = ["សុខ", "សៅ", "ចាន់"]; // Generic array syntax

// 3. Tuples (Array ដែលមានចំនួននិង Type ជាក់លាក់)
let personInfo: [string, number] = ["សុខ", 25];

// 4. Any & Unknown
let whatever: any = "អាចជាអ្វីក៏បាន";
whatever = 42; 
let safeValue: unknown = "សុវត្ថិភាពជាង any";

// 5. Void (សម្រាប់ Function ដែលមិន Return អ្វីសោះ)
function logMessage(msg: string): void {
    console.log(msg);
}

logMessage("សួស្តី!");`,

  interfaces: `// ការបង្កើត Interface សម្រាប់ Object
interface User {
    readonly id: number; // មិនអាចផ្លាស់ប្តូរបាន
    name: string;
    email: string;
    age?: number; // Optional (អាចមានឬអត់ក៏បាន)
}

let user1: User = {
    id: 1,
    name: "ម៉ាក់",
    email: "mak@example.com"
};

// Error ព្រោះ id ជា readonly
// user1.id = 2; 

console.log("User Info:", user1.name, "-", user1.email);

// ការបន្តលក្ខណៈ (Extending Interfaces)
interface Admin extends User {
    role: string;
}

let admin: Admin = {
    id: 2,
    name: "សំណាង",
    email: "samnang@example.com",
    age: 30,
    role: "SuperAdmin"
};

console.log("Admin Role:", admin.role);`,

  enums: `// 1. Numeric Enums
enum Direction {
    Up = 1,
    Down,  // 2
    Left,  // 3
    Right  // 4
}

let myDirection: Direction = Direction.Up;
console.log("ទិសដៅ:", myDirection); // 1

// 2. String Enums
enum Status {
    Success = "SUCCESS",
    Error = "ERROR",
    Loading = "LOADING"
}

let currentStatus: Status = Status.Loading;
console.log("ស្ថានភាព:", currentStatus);`,

  functions: `// 1. Function Types ធម្មតា
function add(x: number, y: number): number {
    return x + y;
}

// 2. Arrow Functions ជាមួយ Types
const multiply = (a: number, b: number): number => a * b;

// 3. Optional & Default Parameters
function greet(name: string, greeting: string = "សួស្តី", punctuation?: string): string {
    return greeting + " " + name + (punctuation || "!");
}

console.log(greet("ដារ៉ា")); // សួស្តី ដារ៉ា!
console.log(greet("ដារ៉ា", "ជម្រាបសួរ", "។")); // ជម្រាបសួរ ដារ៉ា។

// 4. Rest Parameters
function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log("សរុប:", sumAll(1, 2, 3, 4, 5));`,

  classes: `class Animal {
    // Access Modifiers
    public name: string;
    protected age: number;
    private isHungry: boolean;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.isHungry = true;
    }

    public eat(): void {
        this.isHungry = false;
        console.log(\`\${this.name} ញ៉ាំអាហាររួចហើយ។\`);
    }
}

class Dog extends Animal {
    constructor(name: string, age: number) {
        super(name, age);
    }

    public bark(): void {
        // អាចប្រើ protected property 'age' បាន
        console.log(\`\${this.name} ដែលមានអាយុ \${this.age} ឆ្នាំ កំពុងព្រុស!\`);
    }
}

let myDog = new Dog("កិកូ", 2);
myDog.bark();
myDog.eat();
// myDog.isHungry; // Error ព្រោះវាជា private
// myDog.age; // Error ព្រោះវាជា protected (អាចប្រើបានតែក្នុង Class មេ និងកូនប៉ុណ្ណោះ)`,

  generics: `// 1. Generic Functions
function identity<T>(arg: T): T {
    return arg;
}

let num = identity<number>(42);
let str = identity<string>("សួស្តី");
console.log("Number:", num, "String:", str);

// 2. Generic Interfaces
interface Box<T> {
    contents: T;
}

let stringBox: Box<string> = { contents: "កាដូ" };
let numberBox: Box<number> = { contents: 100 };

// 3. Generic Classes
class Storage<T> {
    private items: T[] = [];
    
    addItem(item: T) {
        this.items.push(item);
    }
    
    getItems(): T[] {
        return this.items;
    }
}

let stringStorage = new Storage<string>();
stringStorage.addItem("សៀវភៅ");
stringStorage.addItem("ប៊ិច");
console.log("របស់របរ:", stringStorage.getItems());`,

  utility_types: `interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// 1. Partial<T> - ធ្វើឲ្យគ្រប់ properties ទាំងអស់ក្លាយជា Optional
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
}

let myTodo: Todo = { title: "រៀន TS", description: "រៀន Generics", completed: false };
let updatedTodo = updateTodo(myTodo, { completed: true });
console.log("Updated Todo:", updatedTodo);

// 2. Readonly<T> - មិនឲ្យកែប្រែ properties
const finalTodo: Readonly<Todo> = { title: "រៀន React", description: "រៀន Hooks", completed: true };
// finalTodo.completed = false; // Error!

// 3. Pick<T, K> - រើសយក properties ខ្លះពី Type
type TodoPreview = Pick<Todo, "title" | "completed">;
const preview: TodoPreview = { title: "រៀន Node", completed: false };

// 4. Omit<T, K> - ដក properties ខ្លះចេញពី Type
type TodoWithoutDesc = Omit<Todo, "description">;
const shortTodo: TodoWithoutDesc = { title: "រៀន SQL", completed: false };

console.log("Utility Types ជួយសន្សំពេលវេលាបានច្រើនណាស់!");`
}

export default function LearnTypescriptPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // States for quizzes
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState<Record<string, boolean>>({});

  const CHAPTER_IDS = [
    "intro", 
    "types", 
    "interfaces", 
    "enums", 
    "functions", 
    "classes", 
    "generics", 
    "utility_types"
  ];
  
  const totalChapters = CHAPTER_IDS.length;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const index = CHAPTER_IDS.indexOf(hash);
        if (index !== -1) {
          setCurrentChapterIndex(index);
          window.scrollTo(0, 0);
          
          // Reset quiz state when changing chapter
          setSelectedAnswer(null);
          setShowExplanation(false);
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [CHAPTER_IDS]);

  const advanceChapter = () => {
    if (currentChapterIndex < totalChapters - 1) {
      const nextId = CHAPTER_IDS[currentChapterIndex + 1];
      window.location.hash = nextId;
      window.scrollTo(0, 0);
    } else {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleNext = () => {
    if (!session && currentChapterIndex > 1) {
      setShowLoginAlert(true);
      return;
    }
    
    // Require quiz completion to advance (optional check, but good for learning)
    const currentId = CHAPTER_IDS[currentChapterIndex];
    if (QUIZZES[currentId] && !quizCompleted[currentId]) {
      // You could force them to pass, or just let them go. Let's let them go but show a toast.
    }
    
    advanceChapter();
  };

  const handleBack = () => {
    if (currentChapterIndex > 0) {
      const prevId = CHAPTER_IDS[currentChapterIndex - 1];
      window.location.hash = prevId;
      window.scrollTo(0, 0);
    }
  };

  const handleQuizSubmit = (chapterId: string, index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === QUIZZES[chapterId].correctIndex) {
      setQuizCompleted({ ...quizCompleted, [chapterId]: true });
      playSuccessChime();
    }
  };

  const renderQuiz = (chapterId: string) => {
    const quiz = QUIZZES[chapterId];
    if (!quiz) return null;

    return (
      <Card className="mt-12 border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-muted/50 rounded-t-xl pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            សាកល្បងចំណេះដឹង (Quiz)
          </CardTitle>
          <p className="text-sm text-muted-foreground">{quiz.questionEnglish}</p>
        </CardHeader>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4 text-foreground leading-relaxed">
            {quiz.questionKhmer}
          </h3>
          <div className="space-y-3">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === quiz.correctIndex;
              const showResult = showExplanation;

              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ";
              
              if (!showResult) {
                btnClass += "hover:border-primary hover:bg-primary/5 bg-card text-card-foreground";
              } else {
                if (isCorrect) {
                  btnClass += "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 font-medium";
                } else if (isSelected && !isCorrect) {
                  btnClass += "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                } else {
                  btnClass += "border-border opacity-50 bg-card";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && handleQuizSubmit(chapterId, idx)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <span className="leading-relaxed">{option}</span>
                  {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`mt-6 p-4 rounded-xl border ${selectedAnswer === quiz.correctIndex ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} animate-in slide-in-from-top-2`}>
              <div className="flex items-start gap-3">
                {selectedAnswer === quiz.correctIndex ? 
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" /> : 
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                }
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {selectedAnswer === quiz.correctIndex ? 'ត្រឹមត្រូវ! (Correct)' : 'មិនទាន់ត្រឹមត្រូវទេ (Incorrect)'}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {quiz.explanation}
                  </p>
                </div>
              </div>
              
              {!quizCompleted[chapterId] && selectedAnswer !== quiz.correctIndex && (
                <button 
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                >
                  <RotateCcw className="h-4 w-4" /> សាកល្បងម្តងទៀត (Try Again)
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderChapterContent = (id: string) => {
    switch (id) {
      case "intro":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>TypeScript</strong> គឺជាភាសាសរសេរកូដដែលត្រូវបានបង្កើត និងអភិវឌ្ឍដោយក្រុមហ៊ុន Microsoft។ វាគឺជា <i>Superset</i> របស់ JavaScript ដែលមានន័យថារាល់កូដ JavaScript ទាំងអស់គឺជាកូដ TypeScript ដែរ ប៉ុន្តែ TypeScript បានបន្ថែមនូវមុខងារសំខាន់មួយគឺ <strong>Static Typing</strong>។
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4">ហេតុអ្វីត្រូវប្រើ TypeScript?</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 leading-relaxed">
              <li><strong>ចាប់កំហុសបានលឿន៖</strong> TypeScript អាចរកឃើញកំហុសពេលយើងកំពុងសរសេរកូដ (Compile time) មុនពេលកម្មវិធីដំណើរការ។</li>
              <li><strong>កូដមានភាពច្បាស់លាស់៖</strong> ការកំណត់ប្រភេទទិន្នន័យច្បាស់លាស់ ជួយឲ្យអ្នកអភិវឌ្ឍន៍ដទៃងាយយល់កូដរបស់យើង។</li>
              <li><strong>ការគាំទ្រពីកម្មវិធីសរសេរកូដ (IDE Support)៖</strong> កម្មវិធីដូចជា VS Code អាចផ្តល់នូវ Autocomplete, Navigation, និង Refactoring កាន់តែឆ្លាតវៃ។</li>
              <li><strong>ទំនើប៖</strong> វាអនុញ្ញាតឲ្យអ្នកប្រើប្រាស់មុខងារថ្មីៗរបស់ JavaScript (ESNext) បានមុនពេល Browser គាំទ្រពេញលេញ។</li>
            </ul>

            <Note>
              ដើម្បីឲ្យ Browser អាចយល់កូដ TypeScript បាន កូដនោះត្រូវតែត្រូវបានបំប្លែង (Compile/Transpile) ទៅជា JavaScript ជាមុនសិនតាមរយៈ TypeScript Compiler (`tsc`)។
            </Note>

            <h3 className="text-xl font-bold mt-8 mb-4">តើវាដំណើរការយ៉ាងដូចម្តេច?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              នៅពេលអ្នកសរសេរកូដ អ្នកនឹងកំណត់ប្រភេទទិន្នន័យទៅឲ្យអថេរ។ ប្រសិនបើអ្នកព្យាយាមផ្តល់តម្លៃដែលខុសពីប្រភេទទិន្នន័យដែលបានកំណត់ TypeScript នឹងព្រមានអ្នកភ្លាមៗ។
            </p>

            <CodeBlock>
{`let username: string = "វិចិត្រ";
// ត្រឹមត្រូវ ព្រោះវាជាអក្សរ
username = "សិរី"; 

// កំហុស (Error)! ព្រោះអ្នកព្យាយាមយកលេខទៅដាក់ក្នុងអថេរជាអក្សរ
username = 100; // Type 'number' is not assignable to type 'string'.`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">សាកល្បងសរសេរកូដ!</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              សូមសាកល្បងដំណើរការកូដខាងក្រោមក្នុង Interactive Compiler របស់យើង។ អ្នកអាចសាកល្បងដកសញ្ញា Comment (<code>//</code>) នៅបន្ទាត់ចុងក្រោយ ហើយចុច Run ដើម្បីមើលថាតើមានអ្វីកើតឡើង។
            </p>

            <TsCompiler defaultCode={code.intro} />
            
            {renderQuiz("intro")}
          </>
        )
      
      case "types":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              នៅក្នុង TypeScript អ្វីដែលសំខាន់បំផុតគឺ <strong>Types</strong> (ប្រភេទទិន្នន័យ)។ ការកំណត់ប្រភេទទិន្នន័យបានត្រឹមត្រូវ ធ្វើឲ្យកូដរបស់អ្នកមានសុវត្ថិភាព។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">១. Primitive Types (ប្រភេទទិន្នន័យមូលដ្ឋាន)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ប្រភេទទិន្នន័យមូលដ្ឋានមានបីដែលគេប្រើច្រើនជាងគេគឺ <Tag name="string" />, <Tag name="number" />, និង <Tag name="boolean" />។
            </p>
            
            <CodeBlock>
{`let isDone: boolean = false;
let age: number = 20; // អាចជាលេខគត់ ឬទសភាគ
let firstName: string = "សុខ"; // អក្សរ (ប្រើ '...' ឬ "..." ឬ \`...\`)`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">២. Arrays និង Tuples</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              យើងអាចកំណត់ Array នៃប្រភេទទិន្នន័យជាក់លាក់ណាមួយបាន។ ចំណែក <strong>Tuple</strong> គឺជា Array ដែលមានចំនួនធាតុ និងប្រភេទនៃធាតុនីមួយៗត្រូវបានកំណត់ទុកជាមុន។
            </p>

            <CodeBlock>
{`// Arrays
let list: number[] = [1, 2, 3];
// ឬសរសេរបែបនេះក៏បាន (Generic Array syntax)
let list2: Array<number> = [1, 2, 3];

// Tuple
let myTuple: [string, number];
myTuple = ["សួស្តី", 10]; // ត្រឹមត្រូវ
// myTuple = [10, "សួស្តី"]; // ខុស (Error) ដោយសារលំដាប់ Type មិនត្រូវគ្នា`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">៣. ប្រភេទ Any, Unknown, Void, និង Never</h3>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground ml-4 mb-4 leading-relaxed">
              <li>
                <strong><Tag name="any" />:</strong> អនុញ្ញាតឲ្យតម្លៃអាចជាអ្វីក៏បាន។ ការប្រើ <Tag name="any" /> ប្រៀបដូចជាការបិទភ្នែក TypeScript មិនឲ្យត្រួតពិនិត្យ Type អញ្ចឹង។ យើងគួរតែ<strong>ជៀសវាង</strong>ការប្រើវា។
              </li>
              <li>
                <strong><Tag name="unknown" />:</strong> ស្រដៀង <Tag name="any" /> ដែរ ប៉ុន្តែវាមានសុវត្ថិភាពជាង ព្រោះអ្នកត្រូវតែត្រួតពិនិត្យ Type ជាមុនសិន មុននឹងអាចប្រើប្រាស់មុខងាររបស់វាបាន។
              </li>
              <li>
                <strong><Tag name="void" />:</strong> ច្រើនប្រើសម្រាប់ Functions ដែលមិន Return តម្លៃអ្វីសោះ។
              </li>
              <li>
                <strong><Tag name="never" />:</strong> តំណាងឲ្យតម្លៃដែលមិនមានថ្ងៃនឹងកើតឡើង (ឧទាហរណ៍ Function ដែលតែងតែ Throw Error ឬរត់រហូតមិនចេះចប់ Loop)។
              </li>
            </ul>

            <Warn>
              សូមកុំប្រើប្រាស់ <Tag name="any" /> លុះត្រាតែអ្នកគ្មានជម្រើសផ្សេង។ ការប្រើវាធ្វើឲ្យអត្ថប្រយោជន៍នៃ TypeScript បាត់បង់ទាំងស្រុង!
            </Warn>

            <TsCompiler defaultCode={code.types} />
            {renderQuiz("types")}
          </>
        )

      case "interfaces":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Interface</strong> គឺជាមធ្យោបាយដ៏មានឥទ្ធិពលបំផុតក្នុងការកំណត់រូបរាង (Shape) របស់ Object នៅក្នុង TypeScript។ វាប្រៀបដូចជាកិច្ចសន្យាមួយដែលបញ្ជាក់ថា Object មួយត្រូវតែមាន Properties ឬ Methods អ្វីខ្លះ។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">ការបង្កើត និងប្រើប្រាស់ Interface</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              យើងប្រើពាក្យគន្លឹះ <Tag name="interface" /> ដើមម្បីបង្កើត។
            </p>

            <CodeBlock>
{`interface User {
  name: string;
  age: number;
}

// user1 ត្រូវតែមាន name ជា string និង age ជា number
let user1: User = {
  name: "បូរី",
  age: 22
};`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">Optional & Readonly Properties</h3>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground ml-4 mb-4 leading-relaxed">
              <li>
                <strong>Optional (<Tag name="?" />):</strong> បើកឲ្យ Property មួយអាចមានក៏បាន អត់ក៏បាន។ ដាក់សញ្ញា <code>?</code> នៅចុងឈ្មោះ Property។
              </li>
              <li>
                <strong>Readonly (<Tag name="readonly" />):</strong> រារាំងមិនឲ្យមានការកែប្រែតម្លៃនៃ Property បន្ទាប់ពីវាត្រូវបានផ្តល់តម្លៃដំបូង។
              </li>
            </ul>

            <CodeBlock>
{`interface Car {
  readonly brand: string; // មិនអាចប្តូរបានក្រោយពេលបង្កើត
  model: string;
  year?: number; // អាចមិនបញ្ជាក់ (Optional)
}

let myCar: Car = { brand: "Toyota", model: "Prius" };
// myCar.brand = "Honda"; // Error: Cannot assign to 'brand' because it is a read-only property.`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">ការបន្តលក្ខណៈ (Extending Interfaces)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Interface មួយអាចបន្តលក្ខណៈ (Extend) ពី Interface មួយទៀត ឬច្រើនបាន ដោយប្រើពាក្យគន្លឹះ <Tag name="extends" />។ នេះជួយកាត់បន្ថយការសរសេរកូដដដែលៗ។
            </p>

            <CodeBlock>
{`interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Dog ឥឡូវមានទាំង name និង breed
let myDog: Dog = { name: "តុកតា", breed: "Golden Retriever" };`}
            </CodeBlock>

            <TsCompiler defaultCode={code.interfaces} />
            {renderQuiz("interfaces")}
          </>
        )

      case "enums":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Enum</strong> (មកពីពាក្យ Enumeration) អនុញ្ញាតឲ្យយើងកំណត់សំណុំនៃតម្លៃថេរ (Named constants)។ ការប្រើ Enum ធ្វើឲ្យកូដងាយស្រួលអាន និងងាយស្រួលក្នុងការស្វែងរកកំហុស។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">១. Numeric Enums</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              តាមលំនាំដើម TypeScript ចាប់ផ្តើមលេខ Enum ពី <Tag name="0" /> ហើយបូកថែម <Tag name="1" /> ទៅសមាជិកបន្ទាប់ៗ។ ប៉ុន្តែយើងក៏អាចកំណត់លេខដំបូងបានដែរ។
            </p>

            <CodeBlock>
{`enum Direction {
  Up = 1,    // ចាប់ផ្តើមពី 1
  Down,      // ស្មើនឹង 2
  Left,      // ស្មើនឹង 3
  Right      // ស្មើនឹង 4
}

let move: Direction = Direction.Up;`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">២. String Enums</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              String Enums តម្រូវឲ្យយើងកំណត់តម្លៃជាអក្សរទៅឲ្យសមាជិកនីមួយៗច្បាស់លាស់។ វាមានប្រយោជន៍ខ្លាំងសម្រាប់ការ Debug ព្រោះវានឹងបង្ហាញអក្សរផ្ទាល់នៅពេលយើង console.log ជាជាងបង្ហាញលេខ។
            </p>

            <CodeBlock>
{`enum Status {
  Pending = "PENDING",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Failed = "FAILED"
}

let taskStatus: Status = Status.Completed;
console.log(taskStatus); // បង្ហាញពាក្យ "COMPLETED"`}
            </CodeBlock>

            <Tip>
              ប្រើ String Enums នៅពេលអ្នកចង់ឲ្យតម្លៃដែលផ្ទុកនៅក្នុង Database ឬ API ងាយយល់ (Human-readable) ជំនួសឲ្យការប្រើប្រាស់លេខកូដដែលពិបាកចាំ។
            </Tip>

            <TsCompiler defaultCode={code.enums} />
            {renderQuiz("enums")}
          </>
        )

      case "functions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Functions គឺជាបេះដូងនៃកម្មវិធី JavaScript។ TypeScript ផ្តល់សមត្ថភាពបន្ថែមក្នុងការគ្រប់គ្រង Type របស់ Functions ដើម្បីឲ្យប្រាកដថា Parameters និង Return values មានភាពត្រឹមត្រូវ។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">ការកំណត់ Type ឲ្យ Parameters និង Return Value</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              យើងអាចកំណត់ Type នៅពីក្រោយឈ្មោះ Parameter នីមួយៗ និងកំណត់ Return Type នៅក្រោយរង្វង់ក្រចក។
            </p>

            <CodeBlock>
{`function multiply(a: number, b: number): number {
  return a * b;
}

// Arrow function syntax
const divide = (a: number, b: number): number => {
  return a / b;
};`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">Optional និង Default Parameters</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              នៅក្នុង JavaScript Parameters ទាំងអស់គឺជា Optional (អាចដាក់ ឬមិនដាក់ក៏បាន)។ ប៉ុន្តែក្នុង TypeScript យើងត្រូវប្រើសញ្ញា <Tag name="?" /> ដើម្បីបញ្ជាក់ថា Parameter នោះជាជម្រើស។ យើងក៏អាចកំណត់តម្លៃ Default សម្រាប់ Parameter ផងដែរ។
            </p>

            <CodeBlock>
{`// 'lastName' គឺជា Optional
function buildName(firstName: string, lastName?: string): string {
  if (lastName) return firstName + " " + lastName;
  return firstName;
}

// 'greeting' មានតម្លៃ default "Hello"
function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name;
}`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">Rest Parameters</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ប្រសិនបើយើងចង់ទទួល Parameters ដែលមានចំនួនមិនកំណត់ចូលទៅក្នុង Array យើងប្រើ Rest syntax (<Tag name="..." />)។
            </p>

            <CodeBlock>
{`function sum(...numbers: number[]): number {
  return numbers.reduce((prev, curr) => prev + curr, 0);
}

sum(1, 2, 3, 4, 5); // ដំណើរការត្រឹមត្រូវ`}
            </CodeBlock>

            <TsCompiler defaultCode={code.functions} />
            {renderQuiz("functions")}
          </>
        )

      case "classes":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TypeScript ធ្វើឲ្យការសរសេរ Object-Oriented Programming (OOP) កាន់តែងាយស្រួលដោយបន្ថែម Access Modifiers ដែលមាននៅក្នុងភាសាដូចជា Java ឬ C#។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Access Modifiers (public, private, protected)</h3>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground ml-4 mb-4 leading-relaxed">
              <li><strong><Tag name="public" />:</strong> (Default) អាចចូលប្រើបានពីគ្រប់ទីកន្លែង។</li>
              <li><strong><Tag name="private" />:</strong> អាចចូលប្រើបាន<strong>តែ</strong>នៅក្នុង Class ដែលវាត្រូវបានប្រកាសប៉ុណ្ណោះ។</li>
              <li><strong><Tag name="protected" />:</strong> ស្រដៀង <code>private</code> ដែរ ប៉ុន្តែវាអនុញ្ញាតឲ្យ Class កូន (Subclasses) ចូលប្រើប្រាស់បាន។</li>
            </ul>

            <CodeBlock>
{`class Person {
  public name: string;
  private age: number;
  protected socialSecurityNumber: string;

  constructor(name: string, age: number, ssn: string) {
    this.name = name;
    this.age = age;
    this.socialSecurityNumber = ssn;
  }

  public getAge(): number {
    return this.age; // ត្រឹមត្រូវ ប្រើក្នុង Class ផ្ទាល់
  }
}

let p = new Person("វាសនា", 25, "123-45-678");
console.log(p.name); // ត្រឹមត្រូវ
// console.log(p.age); // Error: 'age' is private
// console.log(p.socialSecurityNumber); // Error: 'socialSecurityNumber' is protected`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">Readonly Properties និង Parameter Properties</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              អ្នកអាចប្រើ <Tag name="readonly" /> ដើម្បីឲ្យ Property ក្លាយជាទិន្នន័យដែលអានបានតែប៉ុណ្ណោះ។
              <br/><br/>
              <strong>Parameter Properties:</strong> ជាគន្លឹះសរសេរកូដឲ្យខ្លី ដោយដាក់ Access Modifier ផ្ទាល់នៅក្នុង Constructor វានឹងបង្កើតនិងកំណត់តម្លៃឲ្យ Property ដោយស្វ័យប្រវត្តិ។
            </p>

            <CodeBlock>
{`class Animal {
  // ការប្រើ Parameter Properties សន្សំសំចៃការសរសេរកូដបានច្រើន
  constructor(public name: string, readonly legs: number) {}
}

let cat = new Animal("ឆ្មា", 4);
console.log(cat.name);
// cat.legs = 5; // Error ព្រោះ legs គឺជា readonly`}
            </CodeBlock>

            <TsCompiler defaultCode={code.classes} />
            {renderQuiz("classes")}
          </>
        )

      case "generics":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Generics</strong> គឺជាឧបករណ៍ដ៏មានអានុភាពដែលអនុញ្ញាតឲ្យយើងបង្កើត Components (Functions, Classes, Interfaces) ដែលអាចធ្វើការជាមួយប្រភេទទិន្នន័យ (Types) ជាច្រើន ដោយរក្សាបាននូវ Type Safety។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">ហេតុអ្វីត្រូវការ Generics?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ស្រមៃថាអ្នកចង់បង្កើត Function មួយដែលទទួលយកតម្លៃមួយ ហើយ Return តម្លៃនោះមកវិញ។ បើយើងប្រើ <Tag name="any" /> យើងនឹងបាត់បង់ព័ត៌មានអំពី Type។
            </p>

            <CodeBlock>
{`// បើប្រើ 'any' យើងអត់ដឹងថា Return Type ជាអ្វីឲ្យប្រាកដទេ
function identityAny(arg: any): any {
  return arg;
}

// ការប្រើ Generics <T> រក្សាទុកនូវ Type ពិតប្រាកដ
function identity<T>(arg: T): T {
  return arg;
}

// ពេលហៅប្រើ
let output1 = identity<string>("សួស្តី"); // output1 ត្រូវបានដឹងថាជា string
let output2 = identity<number>(100);    // output2 ត្រូវបានដឹងថាជា number`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">Generic Classes និង Interfaces</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              យើងក៏អាចប្រើ Generics ជាមួយ Classes និង Interfaces ផងដែរ ដើម្បីបង្កើតធុងផ្ទុកទិន្នន័យដែលអាចបត់បែនបាន។
            </p>

            <CodeBlock>
{`// Generic Interface
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

let month: KeyValuePair<number, string> = { key: 1, value: "មករា" };

// Generic Class
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T) {
    this.data.push(item);
  }
  
  getAll(): T[] {
    return this.data;
  }
}

let stringStore = new DataStore<string>();
stringStore.add("Hello");`}
            </CodeBlock>

            <h3 className="text-xl font-bold mt-8 mb-4">Generic Constraints (ការដាក់លក្ខខណ្ឌ)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ជួនកាលយើងចង់ឲ្យ Generic Type របស់យើងមានលក្ខណៈសម្បត្តិជាក់លាក់ណាមួយ យើងប្រើ <Tag name="extends" /> ដើម្បីកំណត់លក្ខខណ្ឌ។
            </p>

            <CodeBlock>
{`interface Lengthwise {
  length: number;
}

// T ត្រូវតែជា Type ដែលមាន property 'length'
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("Hello"); // ដំណើរការ ព្រោះ string មាន .length
loggingIdentity([1, 2, 3]); // ដំណើរការ ព្រោះ array មាន .length
// loggingIdentity(10); // Error! លេខអត់មាន .length ទេ`}
            </CodeBlock>

            <TsCompiler defaultCode={code.generics} />
            {renderQuiz("generics")}
          </>
        )

      case "utility_types":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TypeScript ផ្តល់នូវ <strong>Utility Types</strong> ជាច្រើនដែលភ្ជាប់មកជាមួយស្រាប់ ដើម្បីជួយសម្រួលដល់ការកែច្នៃ Types ដែលមានស្រាប់ ទៅជា Types ថ្មីៗ។
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Utility Types សំខាន់ៗបំផុត</h3>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground ml-4 mb-4 leading-relaxed">
              <li>
                <strong><Tag name="Partial<Type>" />:</strong> ផ្លាស់ប្តូរគ្រប់ Properties ទាំងអស់របស់ Type ឲ្យក្លាយជាជម្រើស (Optional)។ មានប្រយោជន៍ពេលយើងចង់ Update ទិន្នន័យខ្លះៗ។
              </li>
              <li>
                <strong><Tag name="Required<Type>" />:</strong> ផ្ទុយពី Partial។ ផ្លាស់ប្តូរគ្រប់ Properties ដែលជា Optional ឲ្យក្លាយជា Required ទាំងអស់។
              </li>
              <li>
                <strong><Tag name="Readonly<Type>" />:</strong> ធ្វើឲ្យគ្រប់ Properties ទាំងអស់មិនអាចកែប្រែបាន។
              </li>
              <li>
                <strong><Tag name="Record<Keys, Type>" />:</strong> បង្កើត Object Type ដែលមាន Keys និង Values កំណត់ជាក់លាក់។
              </li>
              <li>
                <strong><Tag name="Pick<Type, Keys>" />:</strong> រើសយក Properties ជាក់លាក់ណាមួយពី Type។
              </li>
              <li>
                <strong><Tag name="Omit<Type, Keys>" />:</strong> ដក Properties ជាក់លាក់ណាមួយចេញពី Type។
              </li>
            </ul>

            <CodeBlock>
{`interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// ១. Partial
type UserUpdate = Partial<User>;
// UserUpdate ឥឡូវនេះមាន id?, name?, email?, phone?

// ២. Required
type CompleteUser = Required<User>;
// CompleteUser ឥឡូវនេះតម្រូវឲ្យមាន phone ជាដាច់ខាត

// ៣. Pick
type UserPreview = Pick<User, "id" | "name">;
// មានតែ id និង name ប៉ុណ្ណោះ

// ៤. Omit
type UserWithoutEmail = Omit<User, "email">;
// មានគ្រប់យ៉ាងលើកលែងតែ email

// ៥. Record
type Roles = "admin" | "user" | "guest";
const permissions: Record<Roles, boolean> = {
  admin: true,
  user: false,
  guest: false
};`}
            </CodeBlock>

            <Good>
              ការប្រើប្រាស់ Utility Types ជួយកាត់បន្ថយការសរសេរ Interface ថ្មីៗច្រើនដងដោយសារតែវាអាចយក Interface ចាស់មកកែច្នៃប្រើឡើងវិញយ៉ាងងាយស្រួល។
            </Good>

            <TsCompiler defaultCode={code.utility_types} />
            {renderQuiz("utility_types")}
          </>
        )

      default:
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              មាតិកានៃជំពូកនេះកំពុងស្ថិតក្រោមការរៀបចំ។ សូមរង់ចាំការធ្វើបច្ចុប្បន្នភាពនៅពេលក្រោយ។
            </p>
          </>
        )
    }
  }

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10 pb-24">
        
        {/* ── Hero ── */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 border border-primary/20">
            <Code2 className="w-4 h-4" />
            TypeScript Course
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-kantumruy">
            សិក្សាភាសា TypeScript ស៊ីជម្រៅ
          </h1>
          <p className="text-lg text-muted-foreground font-kantumruy leading-relaxed max-w-2xl">
            ស្វែងយល់ពី Static Typing និងរបៀបបង្កើតកម្មវិធីដែលមានសុវត្ថិភាពខ្ពស់ កាត់បន្ថយកំហុស និងងាយស្រួលថែទាំ ជាមួយ TypeScript។
          </p>
        </div>

        <div className="font-kantumruy min-h-[500px]">
          {CHAPTER_IDS.map((id, idx) => (
            <section 
              key={id} 
              style={{ display: currentChapterIndex === idx ? "block" : "none" }} 
              className="space-y-6 animate-in fade-in duration-500"
            >
              <div className="flex items-center gap-3 border-b pb-4 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-lg font-bold shrink-0 shadow-sm">{idx + 1}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground capitalize">
                  {id.replace("_", " ")}
                </h2>
              </div>
              
              {renderChapterContent(id)}
              
            </section>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
          <button 
            onClick={handleBack}
            disabled={currentChapterIndex === 0}
            className="px-6 py-3 rounded-xl border border-border bg-background hover:bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2 shadow-sm"
          >
            ← ត្រឡប់ក្រោយ (Back)
          </button>
          <div className="text-sm font-medium text-muted-foreground hidden md:block">
            ជំពូក {currentChapterIndex + 1} នៃ {totalChapters}
          </div>
          <button 
            onClick={handleNext}
            disabled={currentChapterIndex === totalChapters - 1 && quizCompleted[CHAPTER_IDS[currentChapterIndex]]}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md font-medium shadow-sm flex items-center gap-2"
          >
            {currentChapterIndex === totalChapters - 1 ? 'បញ្ចប់វគ្គសិក្សា 🎉' : 'ជំពូកបន្ទាប់ (Next) →'}
          </button>
        </div>

      </div>

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-kantumruy">ទាមទារការចូលគណនី</AlertDialogTitle>
            <AlertDialogDescription>
              អ្នកត្រូវចូលគណនីដើម្បីរក្សាទុកវឌ្ឍនភាពរបស់អ្នក និងបន្តទៅមេរៀនបន្ទាប់ដោយរលូន។
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 font-kantumruy">
            <AlertDialogCancel>បោះបង់</AlertDialogCancel>
            <AlertDialogAction 
              variant="outline" 
              className="border-border text-foreground hover:bg-muted" 
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
