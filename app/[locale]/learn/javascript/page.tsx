"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Flame, Zap, Sparkles, FileText, Beaker, Check, X, XCircle, AlertCircle } from "lucide-react"
import { JsCompiler } from "@/components/js-compiler"
import { useWebHaptics } from "web-haptics/react"
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

/* ─────────────────────── Audio Success Chime ─────────────────────── */
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

/* ─────────────────────── Shared UI Helpers ─────────────────────── */
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
    <pre className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed border border-border">
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

/* ─────────────────────── Starter Codes ─────────────────────── */
const code = {
  home: `// សេចក្តីផ្តើមអំពី JavaScript
console.log("សួស្តីពី Rean2Code! 🚀");
console.log("JavaScript ធ្វើឱ្យទំព័រវេបសាយមានជីវិត។");`,

  whereto: `// การដាក់បញ្ចូលកូដ JS
// អ្នកអាចសរសេរកូដ JS ក្នុង Tag <script> ឬឯកសារក្រៅ .js
console.log("កូដដំណើរការពី Tag <script> ផ្ទាល់!");`,

  variables: `// ការប្រើប្រាស់ Variables (let, const)
let name = "ដារ៉ា";
const birthYear = 2005;

name = "សុខា"; // អាចប្តូរតម្លៃបាន
// birthYear = 2006; // Error! const មិនអាចប្តូរតម្លៃបានទេ

console.log("ឈ្មោះ:", name);
console.log("ឆ្នាំកំណើត:", birthYear);`,

  operators: `// ប្រមាណវិធីគណនា (Operators)
let x = 10;
let y = 3;

console.log("បូក:", x + y);
console.log("គុណ:", x * y);
console.log("ចែកយកសំណល់ (Modulo):", x % y);
console.log("តឹងរ៉ឹង x === '10':", x === "10"); // false`,

  conditions: `// លក្ខខណ្ឌ If...Else
let score = 75;

if (score >= 90) {
  console.log("និទ្ទេស A 🏆");
} else if (score >= 70) {
  console.log("និទ្ទេស B ⭐️");
} else {
  console.log("និទ្ទេស C ⚡️");
}

// Ternary Operator
let result = score >= 50 ? "ជាប់" : "ធ្លាក់";
console.log("លទ្ធផលប្រឡង:", result);`,

  loops: `// ការប្រើប្រាស់ Loops (For & While)
console.log("--- For Loop ---");
for (let i = 1; i <= 3; i++) {
  console.log("ចំនួនជុំ i =", i);
}

console.log("--- While Loop ---");
let count = 3;
while (count > 0) {
  console.log("រាប់ថយក្រោយ:", count);
  count--;
}`,

  functions: `// ការប្រើប្រាស់អនុគមន៍ (Functions)
// ១. ប្រកាសតាមបែបប្រពៃណី
function sum(a, b) {
  return a + b;
}

// ២. ប្រកាសតាមបែប Arrow Function
const multiply = (x, y) => x * y;

console.log("ផលបូក 5 + 10 =", sum(5, 10));
console.log("ផលគុណ 4 * 5 =", multiply(4, 5));`,

  objects: `// វត្ថុ (Objects) និងអារ៉េ (Arrays)
// ១. Array
let fruits = ["ផ្លែប៉ោម", "ចេក", "ក្រូច"];
fruits.push("ផ្លែស្វាយ"); // បន្ថែមទៅចុងក្រោយ

// ២. Object
let student = {
  name: "សាលី",
  age: 18,
  grade: "12"
};

console.log("ផ្លែឈើទាំងអស់:", fruits);
console.log("ឈ្មោះសិស្ស:", student.name);`,

  output: `// ការបង្ហាញលទ្ធផល (JS Output)
// ១. ប្រើ console.log() បង្ហាញលើ Console
console.log("បង្ហាញលើ Console 🚀");

// ២. ប្រើ alert() បង្ហាញផ្ទាំង Alert (mock alert)
const mockAlert = (msg) => console.log("Alert Window: " + msg);
mockAlert("សូមស្វាគមន៍!");`,

  syntax: `// វាក្យសម្ព័ន្ធ (Syntax) និង Comments
// នេះជា Single-line comment
/* នេះជា
   Multi-line comment */

let x = 5; // ប្រកាសអថេរ x
let y = 10;
let total = x + y; // ប្រមាណវិធីបូក
console.log("ផលបូក x + y =", total);`,

  datatypes: `// ប្រភេទទិន្នន័យ (Data Types)
let text = "Hello";      // String
let num = 42;            // Number
let isTrue = true;       // Boolean
let empty = null;        // Null
let undef;               // Undefined

console.log("ប្រភេទ text:", typeof text);
console.log("ប្រភេទ num:", typeof num);
console.log("ប្រភេទ isTrue:", typeof isTrue);
console.log("ប្រភេទ empty:", typeof empty); // object (JS behavior)
console.log("ប្រភេទ undef:", typeof undef);`,

  scope: `// ដែនកំណត់អថេរ (Scope)
let globalVar = "ខ្ញុំជា Global";

function testScope() {
  let localVar = "ខ្ញុំជា Local";
  console.log(globalVar); // អាចមើលឃើញ
  console.log(localVar);  // អាចមើលឃើញ
}

testScope();
// console.log(localVar); // Error! localVar មិនអាចប្រើក្រៅ function ទេ`,

  strings: `// ខ្សែអក្សរ (Strings)
let text = "រៀនសរសេរកូដ";
console.log("ប្រវែងអក្សរ:", text.length);

// string methods
let upper = "hello".toUpperCase();
console.log("អក្សរធំ:", upper);

// String interpolation (Template Literals)
let name = "សុខ";
console.log(\`សួស្តី \${name}!\`);`,

  numbers: `// លេខ និងគណិតវិទ្យា (Numbers & Math)
let price = 19.99;
console.log("ជិតបង្កើយ (Round):", Math.round(price));
console.log("តម្លៃខ្ពស់បំផុត:", Math.max(10, 5, 20, 8));
console.log("លេខចៃដន្យ (0 ដល់ 1):", Math.random());`,

  arrays: `// អារ៉េ (Arrays)
let courses = ["HTML", "CSS", "JS"];
courses.push("Python"); // បន្ថែមធាតុថ្មីទៅចុងបញ្ចប់

console.log("ចំនួនធាតុក្នុងអារ៉េ:", courses.length);
console.log("ធាតុទី២ (Index 1):", courses[1]);
console.log("អារ៉េទាំងមូល:", courses);`,

  dates: `// កាលបរិច្ឆេទ (Dates)
let now = new Date("2026-06-21T15:30:00");
console.log("កាលបរិច្ឆេទបច្ចុប្បន្ន:", now.toDateString());
console.log("ឆ្នាំ:", now.getFullYear());
console.log("ម៉ោង:", now.getHours());`,

  htmldom: `// ការគ្រប់គ្រង HTML DOM (Document Object Model)
// សាកល្បងសរសេរកូដ DOM Simulation
console.log("DOM Simulation:");
const mockDocument = {
  querySelector: (selector) => {
    return {
      textContent: "អត្ថបទដើម",
      style: { color: "black" }
    };
  }
};

const title = mockDocument.querySelector("h1");
title.textContent = "សួស្តីពិភពលោក!";
title.style.color = "#cc785c";

console.log("កែប្រែ Title textContent:", title.textContent);
console.log("កែref Title color:", title.style.color);`,

  events: `// ព្រឹត្តិការណ៍ (Events)
// សាកល្បងបង្កើត Mock Event Listener
const button = {
  addEventListener: (event, callback) => {
    console.log(\`បានចុះឈ្មោះសម្រាប់ព្រឹត្តិការណ៍: \${event}\`);
    // បញ្ឆេះព្រឹត្តិការណ៍ភ្លាមៗ
    callback({ type: event });
  }
};

button.addEventListener("click", (e) => {
  console.log("ព្រឹត្តិការណ៍ Click ត្រូវបានដំណើរការ! ⚡️");
});`,

  async: `// JS Asynchronous (Promises & Async/Await)
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("ទិន្នន័យពី Server 📥"), 1000);
  });
};

async function displayData() {
  console.log("កំពុងទាញយកទិន្នន័យ...");
  const data = await fetchData();
  console.log("ទទួលបាន:", data);
}

displayData();`,

  classes: `// Classes និងការសរសេរកូដបែប OOP
class Vehicle {
  constructor(name, brand) {
    this.name = name;
    this.brand = brand;
  }

  showInfo() {
    return this.brand + " " + this.name;
  }
}

const myCar = new Vehicle("Range Rover", "Land Rover");
console.log("ឡានរបស់ខ្ញុំគឺ:", myCar.showInfo());`,

  json: `// ទិន្នន័យ JSON (JavaScript Object Notation)
let jsonString = '{"name": "ដារ៉ា", "age": 20}';

// បំប្លែងពី JSON String ទៅជា Object
let obj = JSON.parse(jsonString);
console.log("ឈ្មោះ:", obj.name);

// បំប្លែងពី Object ទៅជា JSON String
let newJson = JSON.stringify(obj);
console.log("JSON String:", newJson);`,

  compiler: `// JS Playground
// សរសេរកូដ JS ដោយសេរីនៅទីនេះ
let a = 12;
let b = 30;
console.log("លទ្ធផល a + b =", a + b);`
};

/* ─────────────────────── Quizzes Registry ─────────────────────── */
const QUIZZES: Record<string, {
  questionKhmer: string;
  questionEnglish: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}> = {
  home: {
    questionKhmer: "តើភាសា JavaScript ត្រូវបានប្រើប្រាស់ចម្បងសម្រាប់អ្វីនៅលើវេបសាយ?",
    questionEnglish: "What is JavaScript primarily used for on web pages?",
    options: [
      "បង្កើតរចនាសម្ព័ន្ធទំព័រ (HTML)",
      "រចនាស្ទីល និងពណ៌ (CSS)",
      "បង្កើតអន្តរកម្ម និងភាពរស់រវើក (Interactive Logic)",
      "រក្សាទុកទិន្នន័យក្នុង Database"
    ],
    correctIndex: 2,
    explanation: "JavaScript ត្រូវបានប្រើដើម្បីបន្ថែមការគិត (Logic) និងអន្តរកម្មលើទំព័រវេបសាយ ធ្វើឱ្យទំព័រមានភាពរស់រវើក និងឆ្លើយតបទៅកាន់អ្នកប្រើប្រាស់។"
  },
  whereto: {
    questionKhmer: "តើត្រូវប្រើប្រាស់ HTML Tag មួយណាដើម្បីសរសេរកូដ JavaScript នៅក្នុងទំព័រ HTML?",
    questionEnglish: "Which HTML tag is used to write JavaScript?",
    options: [
      "<javascript>",
      "<js>",
      "<script>",
      "<link>"
    ],
    correctIndex: 2,
    explanation: "កូដ JavaScript ត្រូវតែសរសេរនៅចន្លោះ Tag <script> និង </script> ក្នុងឯកសារ HTML។"
  },
  output: {
    questionKhmer: "តើវិធីសាស្ត្រមួយណាដែលពេញនិយមបំផុតសម្រាប់បង្ហាញព័ត៌មាន ឬលទ្ធផលទៅកាន់ Developer Console?",
    questionEnglish: "Which method is most commonly used to print output to the developer console?",
    options: [
      "window.alert()",
      "document.write()",
      "console.log()",
      "innerHtml()"
    ],
    correctIndex: 2,
    explanation: "console.log() ត្រូវបានប្រើប្រាស់ទូទៅបំផុតដោយអ្នកអភិវឌ្ឍន៍ដើម្បីពិនិត្យមើលតម្លៃអថេរ ឬលទ្ធផលផ្សេងៗនៅលើ Console របស់ Browser។"
  },
  syntax: {
    questionKhmer: "នៅក្នុង JavaScript តើសញ្ញាមួយណាដែលប្រើសម្រាប់បង្កើត Single-line comment?",
    questionEnglish: "Which character is used to write a single-line comment in JavaScript?",
    options: [
      "//",
      "/*",
      "#",
      "<!--"
    ],
    correctIndex: 0,
    explanation: "សញ្ញា // ប្រើសម្រាប់សរសេរ comment មួយបន្ទាត់ (Single-line comment) រីឯ /* */ សម្រាប់សរសេរ comment ច្រើនបន្ទាត់។"
  },
  variables: {
    questionKhmer: "តើការប្រកាសអថេរ (Variable) មួយណាខាងក្រោមនេះដែលមិនអនុញ្ញាតឱ្យផ្លាស់ប្តូរតម្លៃឡើងវិញបាន?",
    questionEnglish: "Which variable declaration does not allow value reassignment?",
    options: [
      "var",
      "let",
      "const",
      "def"
    ],
    correctIndex: 2,
    explanation: "const (constant) ប្រើសម្រាប់ប្រកាសអថេរដែលជាតម្លៃថេរ និងមិនអាចសរសេរជាន់ ឬប្តូរតម្លៃថ្មីបានឡើយ បន្ទាប់ពីចាប់ផ្តើមដំបូង។"
  },
  datatypes: {
    questionKhmer: "តើតម្លៃ true និង false ស្ថិតក្នុងប្រភេទទិន្នន័យ (Data Type) មួយណា?",
    questionEnglish: "Which data type do true and false belong to?",
    options: [
      "String",
      "Number",
      "Boolean",
      "Undefined"
    ],
    correctIndex: 2,
    explanation: "តម្លៃ true និង false គឺជាប្រភេទទិន្នន័យឡូជីខល (Boolean) ដែលតំណាងឱ្យភាពពិត ឬមិនពិត។"
  },
  operators: {
    questionKhmer: "ប្រសិនបើ let x = 5; let y = \"5\"; តើលទ្ធផលនៃប្រមាណវិធី x === y ស្មើនឹងអ្វី?",
    questionEnglish: "If x = 5 and y = \"5\", what is the value of x === y?",
    options: [
      "true",
      "false",
      "undefined",
      "null"
    ],
    correctIndex: 1,
    explanation: "ប្រមាណវិធី === ផ្ទៀងផ្ទាត់ទាំងតម្លៃ និងប្រភេទអថេរ (Type)។ ដោយសារ 5 ជា Number និង \"5\" ជា String ដែលមានប្រភេទខុសគ្នា លទ្ធផលគឺ false។"
  },
  strings: {
    questionKhmer: "តើ property មួយណាដែលប្រើសម្រាប់វាស់ប្រវែង (ចំនួនតួអក្សរ) នៃខ្សែអក្សរ (String)?",
    questionEnglish: "Which property is used to find the length of a string?",
    options: [
      "size",
      "length",
      "count",
      "index"
    ],
    correctIndex: 1,
    explanation: "property ឈ្មោះ length ប្រើសម្រាប់បង្វិលសងមកវិញនូវចំនួនតួអក្សរ ឬប្រវែងសរុបនៃ String នោះ។"
  },
  numbers: {
    questionKhmer: "តើអនុគមន៍គណិតវិទ្យា Math.random() នឹងបង្វិលសងមកវិញនូវតម្លៃចន្លោះណា?",
    questionEnglish: "What range of values does Math.random() return?",
    options: [
      "ចន្លោះពី 1 ដល់ 10",
      "ចន្លោះពី 0 ដល់ 1 (មិនរួមបញ្ចូល 1)",
      "ចន្លោះពី -1 ដល់ 1",
      "ចន្លោះពី 0 ដល់ 100"
    ],
    correctIndex: 1,
    explanation: "Math.random() នឹងបង្វិលសងមកវិញនូវចំនួនទសភាគចៃដន្យ ចាប់ពី 0 (រួមបញ្ចូល) ដល់ក្រោម 1 (មិនរួមបញ្ចូល 1 ឡើយ)។"
  },
  conditions: {
    questionKhmer: "តើការប្រើប្រាស់ Ternary Operator មួយណាត្រឹមត្រូវសម្រាប់លក្ខខណ្ឌ៖ បើ age >= 18 ឱ្យទៅ \"Adult\" បើមិនអញ្ចឹងទេទៅ \"Minor\"?",
    questionEnglish: "Which Ternary expression is correct for: age >= 18 ? \"Adult\" : \"Minor\"?",
    options: [
      "let status = (age >= 18) ? \"Adult\" : \"Minor\";",
      "let status = (age >= 18) : \"Adult\" ? \"Minor\";",
      "let status = (age >= 18) ? \"Adult\" , \"Minor\";",
      "let status = if (age >= 18) \"Adult\" else \"Minor\";"
    ],
    correctIndex: 0,
    explanation: "ទម្រង់នៃការសរសេរ Ternary Operator គឺ៖ (លក្ខខណ្ឌ) ? តម្លៃបើលក្ខខណ្ឌពិត : តម្លៃបើលក្ខខណ្ឌមិនពិត។"
  },
  loops: {
    questionKhmer: "តើពាក្យគន្លឹះ (keyword) មួយណាដែលប្រើសម្រាប់បញ្ចប់ ឬចាកចេញពី Loop ភ្លាមៗតែម្តង?",
    questionEnglish: "Which keyword is used to exit a loop immediately?",
    options: [
      "continue",
      "exit",
      "break",
      "return"
    ],
    correctIndex: 2,
    explanation: "break ត្រូវបានប្រើដើម្បីបញ្ឈប់ដំណើរការរបស់ល្បិះជុំ (Loop) និងចាកចេញពីវាមកក្រៅភ្លាមៗ។"
  },
  functions: {
    questionKhmer: "តើការប្រកាស Arrow Function មួយណាដែលត្រឹមត្រូវសម្រាប់បូកពីរលេខ?",
    questionEnglish: "Which is the correct Arrow Function syntax to add two numbers?",
    options: [
      "const add = (a, b) => a + b;",
      "const add = (a, b) => { a + b };",
      "const add => (a, b) = a + b;",
      "function add => (a, b) { a + b };"
    ],
    correctIndex: 0,
    explanation: "Arrow Function បើគ្មានការប្រើសញ្ញាធ្នូ {} ទេ វានឹងធ្វើការ Return តម្លៃខាងក្រោយសញ្ញា => ដោយស្វ័យប្រវត្ត។ ចម្លើយទី២ គឺខុសដោយសារគ្មានពាក្យ return នៅក្នុង {}។"
  },
  scope: {
    questionKhmer: "ប្រសិនបើអថេរមួយត្រូវបានប្រកាសនៅក្នុង Function តើវាមាន Scope បែបណា?",
    questionEnglish: "If a variable is declared inside a function, what is its scope?",
    options: [
      "Global Scope",
      "Local / Function Scope",
      "Block Scope",
      "External Scope"
    ],
    correctIndex: 1,
    explanation: "អថេរដែលប្រកាសនៅក្នុង Function នឹងមាន Local Scope ឬ Function Scope ដែលអាចហៅប្រើបានតែនៅក្នុង Function នោះប៉ុណ្ណោះ។"
  },
  objects: {
    questionKhmer: "តើវិធីសាស្ត្រ (method) មួយណាដែលប្រើសម្រាប់បន្ថែមធាតុថ្មីទៅចុងបញ្ចប់នៃ Array?",
    questionEnglish: "Which array method adds a new element to the end of an array?",
    options: [
      "pop()",
      "push()",
      "shift()",
      "unshift()"
    ],
    correctIndex: 1,
    explanation: "push() បន្ថែមធាតុថ្មីទៅចុងបង្អស់នៃអារ៉េ (Array) ខណៈដែល pop() ដកធាតុចុងបង្អស់ចេញពីអារ៉េ។"
  },
  arrays: {
    questionKhmer: "តើសន្ទស្សន៍ (Index) ដំបូងបង្អស់នៃធាតុនៅក្នុង Array របស់ JavaScript គឺចាប់ផ្តើមពីលេខប៉ុន្មាន?",
    questionEnglish: "What is the starting index of elements in a JavaScript array?",
    options: [
      "1",
      "0",
      "-1",
      "វាអាស្រ័យលើប្រវែង Array"
    ],
    correctIndex: 1,
    explanation: "សន្ទស្សន៍ (Index) នៃ Array នៅក្នុង JavaScript (និងភាសាភាគច្រើន) គឺតែងតែចាប់ផ្តើមពីលេខ 0 ឡើងទៅ។"
  },
  dates: {
    questionKhmer: "តើពាក្យគន្លឹះ (constructor) មួយណាដែលប្រើសម្រាប់បង្កើត Object កាលបរិច្ឆេទថ្មីនៅក្នុង JS?",
    questionEnglish: "Which constructor is used to create a new date object?",
    options: [
      "new Date()",
      "getCurrentDate()",
      "Date.now()",
      "new Time()"
    ],
    correctIndex: 0,
    explanation: "new Date() ត្រូវបានប្រើប្រាស់សម្រាប់បង្កើត Object កាលបរិច្ឆេទថ្មីដែលតំណាងឱ្យពេលវេលាបច្ចុប្បន្ន ឬពេលវេលាកំណត់ណាមួយ។"
  },
  htmldom: {
    questionKhmer: "តើវិធីសាស្ត្រមួយណាដែលអនុញ្ញាតឱ្យយើងជ្រើសរើស Element ដំបូងគេដោយប្រើ CSS Selector ដូចជា class ឬ ID?",
    questionEnglish: "Which method selects the first element matching a CSS selector?",
    options: [
      "document.getElementById()",
      "document.querySelector()",
      "document.getElementsByClassName()",
      "document.querySelectorAll()"
    ],
    correctIndex: 1,
    explanation: "document.querySelector() ជ្រើសរើស Element ដំបូងគេដែលត្រូវនឹង CSS Selector (ដូចជា .my-class ឬ #my-id)។"
  },
  events: {
    questionKhmer: "តើព្រឹត្តិការណ៍ (Event) មួយណាដែលកើតឡើងនៅពេលអ្នកប្រើប្រាស់ចុចលើ HTML Element?",
    questionEnglish: "Which event occurs when a user clicks on an HTML element?",
    options: [
      "onmouseover",
      "onchange",
      "onclick",
      "onkeydown"
    ],
    correctIndex: 2,
    explanation: "onclick គឺជាព្រឹត្តិការណ៍ដែលកើតឡើងនៅពេលមានការចុច Mouse លើ Element ណាមួយ។"
  },
  classes: {
    questionKhmer: "នៅក្នុង Class តើវិធីសាស្ត្រពិសេសមួយណាដែលត្រូវបានហៅដំណើរការដោយស្វ័យប្រវត្តិនៅពេលបង្កើត Object ថ្មី?",
    questionEnglish: "Which special method is called automatically when initializing a new object?",
    options: [
      "constructor()",
      "initialize()",
      "new()",
      "main()"
    ],
    correctIndex: 0,
    explanation: "constructor() គឺជាវិធីសាស្ត្រពិសេស (Special Method) សម្រាប់បង្កើត និងចាប់ផ្តើមតម្លៃដំបូងរបស់វត្ថុ (Object initialization) នៅក្នុង Class។"
  },
  async: {
    questionKhmer: "តើពាក្យគន្លឹះគូ (keyword pair) ណាដែលប្រើសម្រាប់គ្រប់គ្រងកូដអសមកាល (Promises) ឱ្យមានលក្ខណៈដូចកូដដំណើរការជាលំដាប់លំដោយធម្មតា?",
    questionEnglish: "Which keyword pair handles asynchronous code sequentially?",
    options: [
      "promise / resolve",
      "async / await",
      "try / catch",
      "then / catch"
    ],
    correctIndex: 1,
    explanation: "async និង await ត្រូវបានប្រើជាមួយគ្នាដើម្បីសម្រួលការសរសេរកូដអសមកាល (Promises) ឱ្យមានលក្ខណៈសាមញ្ញ និងងាយអានដូចកូដ synchronous។"
  },
  json: {
    questionKhmer: "តើវិធីសាស្ត្រមួយណាដែលបំប្លែង JavaScript Object ទៅជា JSON String?",
    questionEnglish: "Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.toObject()",
      "JSON.toString()"
    ],
    correctIndex: 1,
    explanation: "JSON.stringify() ប្រើសម្រាប់បំប្លែង Object ទៅជា JSON String ចំណែកឯ JSON.parse() បំប្លែងពី JSON String មកជា Object វិញ។"
  },
  compiler: {
    questionKhmer: "តើលទ្ធផលនៃ console.log(typeof NaN); ស្មើនឹងអ្វី?",
    questionEnglish: "What is the type of NaN?",
    options: [
      "\"number\"",
      "\"string\"",
      "\"undefined\"",
      "\"nan\""
    ],
    correctIndex: 0,
    explanation: "នៅក្នុងភាសា JavaScript ប្រភេទអថេរ (typeof) របស់ NaN (Not-a-Number) គឺជា \"number\"។"
  }
};

/* ─────────────────────── Chapter Titles Mapping ─────────────────────── */
const CHAPTER_TITLES: Record<string, string> = {
  home: "សេចក្តីផ្តើមអំពី JS",
  whereto: "ការដាក់បញ្ចូលកូដ JS",
  output: "ការបង្ហាញលទ្ធផល & Debugging",
  syntax: "វាក្យសម្ព័ន្ធ & Comments",
  variables: "អថេរក្នុង JS",
  datatypes: "ប្រភេទអថេរ និងទិន្នន័យ",
  operators: "ប្រមាណវិធីគណនា",
  strings: "ខ្សែអក្សរ (Strings)",
  numbers: "លេខ និងគណិតវិទ្យា",
  conditions: "លក្ខខណ្ឌ If...Else",
  loops: "ការប្រើប្រាស់ Loops",
  functions: "អនុគមន៍ (Functions)",
  scope: "ដែនកំណត់អថេរ (Scope)",
  objects: "វត្ថុ (Objects)",
  arrays: "អារ៉េ (Arrays)",
  dates: "កាលបរិច្ឆេទ (Dates)",
  htmldom: "ការគ្រប់គ្រង HTML DOM",
  events: "ព្រឹត្តិការណ៍ (Events)",
  classes: "Classes និង OOP",
  async: "JS អសមកាល (Async)",
  json: "ទិន្នន័យ JSON",
  compiler: "កន្លែងសាកល្បងកូដ"
};

/* ─────────────────────── Quiz Component ─────────────────────── */
function Quiz({
  chapterId,
  isCompleted,
  onCorrect,
}: {
  chapterId: string;
  isCompleted: boolean;
  onCorrect: () => void;
}) {
  const quiz = QUIZZES[chapterId];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const { trigger } = useWebHaptics();

  useEffect(() => {
    if (isCompleted) {
      setSelectedOption(quiz?.correctIndex ?? null);
      setSubmitted(true);
    } else {
      setSelectedOption(null);
      setSubmitted(false);
    }
    setShowError(false);
  }, [chapterId, isCompleted, quiz]);

  if (!quiz) return null;

  const handleOptionSelect = (index: number) => {
    if (submitted) return;
    setSelectedOption(index);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === quiz.correctIndex) {
      setShowError(false);
      trigger("success");
      onCorrect();
    } else {
      setShowError(true);
      trigger("heavy");
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setShowError(false);
  };

  return (
    <div className="space-y-6 transition-all duration-300 font-sans">
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-normal tracking-tight font-serif">
          {quiz.questionKhmer}
        </h3>
        <p className="text-xs text-muted-foreground/80 tracking-widest uppercase">
          {quiz.questionEnglish}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrectChoice = idx === quiz.correctIndex;
          
          let cardBorder = "border-border bg-card/10 dark:bg-card/5 hover:bg-card/20 hover:border-primary/40";
          let letterBg = "bg-muted/40 text-muted-foreground border-r border-border";
          let icon = null;

          if (submitted) {
            const isCorrectAnswer = selectedOption === quiz.correctIndex;
            
            if (isCorrectAnswer) {
              if (isCorrectChoice) {
                cardBorder = "border-[#5db872] bg-[#5db872]/5";
                letterBg = "bg-[#5db872]/15 text-[#5db872] border-r border-[#5db872]/20";
                icon = (
                  <div className="w-5 h-5 rounded-full bg-[#5db872] flex items-center justify-center text-white shrink-0 mr-4">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                );
              } else {
                cardBorder = "border-border/60 opacity-60 bg-card/5";
                letterBg = "bg-muted/20 text-muted-foreground border-r border-border/40";
              }
            } else {
              if (isSelected) {
                cardBorder = "border-[#c64545] bg-[#c64545]/5";
                letterBg = "bg-[#c64545]/15 text-[#c64545] border-r border-[#c64545]/20";
                icon = (
                  <div className="w-5 h-5 rounded-full bg-[#c64545] flex items-center justify-center text-white shrink-0 mr-4">
                    <X className="h-3 w-3 stroke-[3]" />
                  </div>
                );
              } else {
                cardBorder = "border-border bg-card/10 dark:bg-card/5";
                letterBg = "bg-muted/40 text-muted-foreground border-r border-border";
              }
            }
          } else if (isSelected) {
            cardBorder = "border-primary bg-primary/5";
            letterBg = "bg-primary/10 text-primary border-r border-primary/20";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-0 overflow-hidden rounded-xl border text-sm transition-all duration-150 flex items-center justify-between gap-3 text-left font-sans ${cardBorder}`}
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Left letter block sidebar */}
                <div className={`w-12 py-4 flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none ${letterBg}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                {/* Choice Text */}
                <span className="text-foreground font-medium py-2 pr-2">{option}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {!submitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-[#2d8a6b] hover:bg-[#206950] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 font-medium text-sm shadow-sm font-sans"
          >
            ផ្ទៀងផ្ទាត់ចម្លើយ (Submit Answer)
          </button>
        ) : (
          selectedOption !== quiz.correctIndex && (
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white transition-all duration-150 font-medium text-sm shadow-sm font-sans"
            >
              ព្យាយាមម្ដងទៀត (Try Again)
            </button>
          )
        )}

        {showError && selectedOption !== quiz.correctIndex && (
          <div className="flex gap-2.5 bg-[#c64545]/5 dark:bg-[#c64545]/10 border-2 border-[#c64545]/20 rounded-xl p-4 text-xs md:text-sm text-[#c64545] font-sans max-w-3xl">
            <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold uppercase tracking-wider text-xs">ចម្លើយមិនទាន់ត្រឹមត្រូវទេ!</strong> សូមពិនិត្យខ្លឹមសារមេរៀនឡើងវិញ ហើយសាកល្បងម្ដងទៀត។
            </div>
          </div>
        )}

        {(isCompleted || (submitted && selectedOption === quiz.correctIndex)) && (
          <div className="flex gap-3 bg-[#5db872]/5 dark:bg-[#5db872]/10 border-2 border-[#5db872]/20 rounded-xl p-4 text-xs md:text-sm text-[#5db872] font-sans leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-3xl">
            <CheckCircle2 className="h-5 w-5 text-[#5db872] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-[#5db872] uppercase tracking-wider text-xs">
                {isCompleted ? "មេរៀនបានបញ្ចប់រួចរាល់" : "🎉 ត្រឹមត្រូវល្អណាស់!"}
              </div>
              <div>{quiz.explanation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── Page Component ─────────────────────── */
export default function LearnJavascriptPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  const CHAPTER_IDS = [
    "home", "whereto", "output", "syntax", "variables", "datatypes", "operators",
    "conditions", "loops", "functions", "scope", "objects", "strings", "numbers",
    "arrays", "dates", "htmldom", "events", "classes", "async", "json", "compiler"
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

  useEffect(() => {
    fetch('/api/progress/javascript')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.completed) {
          setCompletedChapters(res.data.completed);
        }
      })
      .catch(console.error);
  }, [session]);

  const handleNext = () => {
    if (!session) {
      setShowLoginAlert(true);
      return;
    }
    
    if (currentChapterIndex === totalChapters - 1) {
      playSuccessChime();
      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#cc785c', '#e09882', '#f5f5f7', '#ffd700']
      });
      setShowFinishAlert(true);
    } else {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              <strong className="text-foreground">JavaScript (JS)</strong> គឺជាភាសាសរសេរកូដកម្រិតខ្ពស់ និងជាគ្រឹះដ៏សំខាន់បំផុតមួយសម្រាប់បង្កើតវេបសាយទំនើប។
              បើ HTML ជាគ្រោងឆ្អឹង និង CSS ជាស្បែករចនា នោះ JavaScript គឺជា <strong className="text-foreground">ខួរក្បាល និងសាច់ដុំ</strong> ដែលធ្វើឱ្យទំព័រវេបសាយអាចគិត គណនា និងឆ្លើយតបជាមួយការចុចរបស់អ្នកប្រើប្រាស់។
            </p>
            <Tip>
              Browser ទំនើបៗទាំងអស់ដូចជា Google Chrome, Safari, Firefox សុទ្ធតែមានម៉ាស៊ីន (JavaScript Engine) សម្រាប់អាន និងដំណើរការកូដ JS ដោយមិនបាច់ដំឡើងកម្មវិធីបន្ថែមអ្វីទាំងអស់។
            </Tip>
            
            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសរសេរកូដបង្ហាញសារទៅកាន់ Console ចំនួនពីរជួរ៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្ហាញអត្ថបទ <code>"សួស្តីពី Rean2Code! 🚀"</code></li>
                <li>បង្ហាញអត្ថបទ <code>"JavaScript ធ្វើឱ្យទំព័រវេបសាយមានជីវិត។"</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>សួស្តីពី Rean2Code! 🚀</div>
                <div>JavaScript ធ្វើឱ្យទំព័រវេបសាយមានជីវិត។</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.home} compact />
          </>
        )

      case "whereto":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              យើងអាចសរសេរកូដ JavaScript នៅក្នុងឯកសារ HTML បានដោយប្រើ Tag <Tag name="&lt;script&gt;" />។
              ជាទូទៅ មានពីររបៀបក្នុងការដាក់បញ្ចូលកូដ៖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-kantumruy">
              <div className="p-4 rounded-xl border bg-card">
                <span className="font-semibold text-foreground text-sm">១. ផ្ទាល់ខ្លួន (Internal Script)</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">សរសេរកូដ JS ផ្ទាល់នៅក្នុង Tag <Tag name="&lt;script&gt;" /> ក្នុងផ្នែក head ឬ body។</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <span className="font-semibold text-foreground text-sm">២. ឯកសារក្រៅ (External Script)</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">សរសេរក្នុង file ដាច់ដោយឡែកដែលមានកន្ទុយ <Tag name=".js" /> រួចទាញចូលតាមរយៈ attribute <Tag name="src" />។</p>
              </div>
            </div>
            <CodeBlock>{`<!-- ឧទាហរណ៍ការទាញឯកសារក្រៅមកប្រើ -->
<script src="script.js"></script>`}</CodeBlock>
            <Note>
              ការដាក់ Tag script នៅខាងក្រោមបង្អស់នៃ <Tag name="&lt;body&gt;" /> ជួយឱ្យទំព័រវេបសាយ load រូបរាង និង HTML ចេញមកបានលឿនជាងមុន!
            </Note>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសរសេរកូដបង្ហាញសារ <code>"កូដដំណើរការពី Tag &lt;script&gt; ផ្ទាល់!"</code> ទៅកាន់ Console ដើម្បីបញ្ជាក់ថា Script របស់អ្នកដំណើរការបានល្អ។
              </p>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>កូដដំណើរការពី Tag &lt;script&gt; ផ្ទាល់!</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.whereto} compact />
          </>
        )

      case "output":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              ក្នុងភាសា JavaScript យើងមានរបៀបជាច្រើនក្នុងការបង្ហាញលទ្ធផល (Output) ទៅកាន់អ្នកប្រើប្រាស់ ឬសម្រាប់ការដោះស្រាយបញ្ហា (Debugging)៖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-kantumruy">
              <div className="p-4 rounded-xl border bg-card">
                <span className="font-semibold text-foreground text-sm font-sans">console.log()</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">បង្ហាញទិន្នន័យលើ Web Console របស់ Browser។ វាពេញនិយមបំផុតសម្រាប់ Developer ឆែកមើលកំហុសកូដ។</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <span className="font-semibold text-foreground text-sm font-sans">window.alert()</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">បង្ហាញផ្ទាំងសារលោត (Alert Box) ទៅកាន់ Screen របស់ភ្នែកអ្នកប្រើប្រាស់ផ្ទាល់។</p>
              </div>
            </div>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសរសេរកូដដើម្បីបង្ហាញទិន្នន័យតាមពីរវិធីផ្សេងគ្នា៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្ហាញសារ <code>"បង្ហាញលើ Console 🚀"</code> ដោយប្រើ <code>console.log()</code></li>
                <li>ហៅអនុគមន៍ <code>mockAlert("សូមស្វាគមន៍!")</code> ដើម្បីបង្ហាញសារសាកល្បង</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>បង្ហាញលើ Console 🚀</div>
                <div>Alert Window: សូមស្វាគមន៍!</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.output} compact />
          </>
        )

      case "syntax":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              <strong className="text-foreground">JavaScript Syntax</strong> គឺជាសំណុំនៃច្បាប់ស្តីពីរបៀបដែលកម្មវិធីត្រូវបានសរសេរ និងបង្កើតឡើង៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy">
              <li><strong>Statements:</strong> បញ្ជាកូដនីមួយៗបញ្ចប់ដោយសញ្ញាក្បៀសចំនុច <code>;</code> (Semicolon)។</li>
              <li><strong>Case Sensitive:</strong> អក្សរតូច និងអក្សរធំមានន័យខុសគ្នា (ឧទាហរណ៍៖ <code>lastName</code> និង <code>lastname</code> គឺជាអថេរពីរផ្សេងគ្នា)។</li>
              <li><strong>Comments:</strong> ប្រើ <code>//</code> សម្រាប់មួយបន្ទាត់ និង <code>/* ... */</code> សម្រាប់ច្រើនបន្ទាត់ ដើម្បីពន្យល់កូដ (កូដត្រង់នេះមិនដំណើរការទេ)។</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើតកម្មវិធីគណនាផលបូកជាមួយការកត់សម្គាល់កូដ៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បន្ថែម Single-line comment មួយជួរ ដើម្បីកត់សម្គាល់កូដ</li>
                <li>បង្កើតអថេរ <code>x = 5</code> និង <code>y = 10</code></li>
                <li>គណនាផលបូក <code>x + y</code> រួចរក្សាទុកក្នុងអថេរ <code>total</code></li>
                <li>បង្ហាញលទ្ធផល <code>"ផលបូក x + y = 15"</code> ទៅកាន់ Console</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ផលបូក x + y = 15</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.syntax} compact />
          </>
        )

      case "variables":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              អថេរ (Variables) ប្រើសម្រាប់រក្សាទុកទិន្នន័យ។ ក្នុង JavaScript ទំនើប (ES6+) យើងប្រើពាក្យគន្លឹះចំនួនពីរសម្រាប់ប្រកាសអថេរ៖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 font-kantumruy">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">let</code>
                <p className="text-xs text-muted-foreground leading-relaxed">ប្រើសម្រាប់រក្សាទុកតម្លៃដែលអាចកែប្រែ ឬផ្លាស់ប្តូរឡើងវិញបាន។</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">const</code>
                <p className="text-xs text-muted-foreground leading-relaxed">ប្រើសម្រាប់តម្លៃថេរ (Constant) ដែលមិនអាចកែប្រែ ឬផ្លាស់ប្តូរបានទេបន្ទាប់ពីប្រកាស។</p>
              </div>
            </div>
            <h4 className="font-semibold text-foreground mt-2 font-kantumruy">ប្រភេទទិន្នន័យ (Basic Data Types)៖</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 font-kantumruy">
              <li><strong>String:</strong> អក្សរអក្សរ ស្ថិតក្នុងសញ្ញាសម្រង់ <code>"..."</code> ឬ <code>'...'</code></li>
              <li><strong>Number:</strong> ចំនួនគត់ ឬចំនួនទសភាគ (ឧទាហរណ៍៖ <code>10</code>, <code>3.14</code>)</li>
              <li><strong>Boolean:</strong> តម្លៃពិត ឬមិនពិត (<code>true</code> ឬ <code>false</code>)</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើតអថេរពីរ៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>អថេរ <code>name</code> ដោយប្រើ <code>let</code> និងផ្តល់តម្លៃជាអក្សរ <code>"ដារ៉ា"</code></li>
                <li>អថេរ <code>birthYear</code> ដោយប្រើ <code>const</code> និងផ្តល់តម្លៃជាលេខ <code>2005</code></li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                បន្ទាប់មក បង្ហាញតម្លៃអថេរទាំងពីរទៅកាន់ Console។
              </p>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ឈ្មោះ: ដារ៉ា</div>
                <div>ឆ្នាំកំណើត: 2005</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.variables} compact />
          </>
        )

      case "datatypes":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              អថេរនីមួយៗក្នុង JavaScript អាចរក្សាទុកប្រភេទទិន្នន័យផ្សេងៗគ្នា។ យើងអាចប្រើប្រាស់ <code>typeof</code> operator ដើម្បីឆែកមើលប្រភេទទិន្នន័យរបស់អថេរបាន៖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 font-kantumruy">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="font-semibold text-foreground text-sm">String</span>
                <p className="text-xs text-muted-foreground leading-relaxed">រក្សាទុកអក្សរ (ឧទាហរណ៍៖ <code>"សួស្តី"</code>)</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="font-semibold text-foreground text-sm">Number</span>
                <p className="text-xs text-muted-foreground leading-relaxed">រក្សាទុកលេខគត់ ឬទសភាគ (ឧទាហរណ៍៖ <code>42</code>, <code>3.14</code>)</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="font-semibold text-foreground text-sm">Boolean</span>
                <p className="text-xs text-muted-foreground leading-relaxed">រក្សាទុកតម្លៃពិត ឬមិនពិត (<code>true</code> / <code>false</code>)</p>
              </div>
            </div>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើតអថេរ និងពិនិត្យប្រភេទទិន្នន័យរបស់ពួកវា៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>អថេរ <code>text = "Hello"</code>, <code>num = 42</code>, <code>isTrue = true</code></li>
                <li>អថេរ <code>empty = null</code> និង <code>undef</code> (មិនទាន់កំណត់តម្លៃ)</li>
                <li>ប្រើ <code>typeof</code> ដើម្បីបង្ហាញប្រភេទអថេរទាំងប្រាំទៅកាន់ Console តាមទម្រង់ដែលបានកំណត់</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ប្រភេទ text: string</div>
                <div>ប្រភេទ num: number</div>
                <div>ប្រភេទ isTrue: boolean</div>
                <div>ប្រភេទ empty: object</div>
                <div>ប្រភេទ undef: undefined</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.datatypes} compact />
          </>
        )

      case "operators":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              JavaScript ប្រើប្រាស់ Operators ដើម្បីគណនា និងប្រៀបធៀបទិន្នន័យ៖
            </p>
            <div className="overflow-x-auto rounded-lg border my-4 font-kantumruy">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">ប្រភេទ</th>
                    <th className="text-left p-3 font-semibold">សញ្ញា</th>
                    <th className="text-left p-3 font-semibold">ការពន្យល់</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Arithmetic (នព្វន្ត)", "+, -, *, /, %, **", "បូក ដក គុណ ចែក សំណល់ និងស្វ័យគុណ"],
                    ["Assignment (ប្រគល់តម្លៃ)", "=, +=, -=, *=", "កំណត់តម្លៃឱ្យអថេរ"],
                    ["Comparison (ប្រៀបធៀប)", "==, ===, !=, >, <", "ប្រៀបធៀបស្មើ (=== គឺតឹងរ៉ឹងបំផុត)"],
                    ["Logical (តក្កវិទ្យា)", "&&, ||, !", "និង (AND), ឬ (OR), មិន (NOT)"]
                  ].map(([type, op, desc]) => (
                    <tr key={type} className="hover:bg-muted/50">
                      <td className="p-3 font-medium text-foreground">{type}</td>
                      <td className="p-3 font-mono text-primary">{op}</td>
                      <td className="p-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Warn>
              ជានិច្ចកាលគួរប្រើប្រាស់សញ្ញា <Tag name="===" /> ជំនួសឱ្យ <Tag name="==" /> ដើម្បីប្រៀបធៀបទាំងតម្លៃ និងប្រភេទទិន្នន័យឱ្យបានច្បាស់លាស់ ចៀសវាងបញ្ហាកំហុសឡូជីខល។
            </Warn>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើតអថេរពីរគឺ <code>x = 10</code> និង <code>y = 3</code> រួចសរសេរកូដគណនា និងបង្ហាញលទ្ធផលដូចខាងក្រោម៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្ហាញផលបូក <code>x + y</code></li>
                <li>បង្ហាញផលគុណ <code>x * y</code></li>
                <li>បង្ហាញសំណល់ពីការចែក <code>x % y</code> (Modulo)</li>
                <li>បង្ហាញលទ្ធផលប្រៀបធៀបតឹងរ៉ឹង <code>x === "10"</code> (ផ្ទៀងផ្ទាត់ទាំងតម្លៃ និងប្រភេទអថេរ)</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>បូក: 13</div>
                <div>គុណ: 30</div>
                <div>ចែកយកសំណល់ (Modulo): 1</div>
                <div>តឹងរ៉ឹង x === '10': false</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.operators} compact />
          </>
        )

      case "conditions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              លក្ខខណ្ឌ (Conditions) ប្រើប្រាស់ដើម្បីឱ្យកម្មវិធីធ្វើការសម្រេចចិត្ត និងរត់កូដផ្សេងៗគ្នាផ្អែកលើស្ថានភាពជាក់ស្តែង។
            </p>
            <CodeBlock>{`if (លក្ខខណ្ឌទី១) {
  // រត់កូដត្រង់នេះបើលក្ខខណ្ឌទី១ ពិត
} else if (លក្ខខណ្ឌទី២) {
  // រត់កូដត្រង់នេះបើលក្ខខណ្ឌទី២ ពិត
} else {
  // រត់កូដត្រង់នេះបើគ្មានលក្ខខណ្ឌណាពិត
}`}</CodeBlock>
            <Tip>
              <strong>Ternary Operator:</strong> ជាទម្រង់សរសេរលក្ខខណ្ឌខ្លីមួយបន្ទាត់៖ <Tag name="let result = (លក្ខខណ្ឌ) ? valueIfTrue : valueIfFalse;" />។
            </Tip>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើតកម្មវិធីពិនិត្យពិន្ទុប្រឡងរបស់សិស្ស៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បើពិន្ទុ <code>score &gt;= 90</code> បង្ហាញ <code>"និទ្ទេស A 🏆"</code></li>
                <li>បើពិន្ទុ <code>score &gt;= 70</code> បង្ហាញ <code>"និទ្ទេស B ⭐️"</code></li>
                <li>ក្រៅពីនោះ បង្ហាញ <code>"និទ្ទេស C ⚡️"</code></li>
                <li>ប្រើប្រាស់ Ternary Operator ដើម្បីកាត់សេចក្តីលទ្ធផល៖ បើពិន្ទុចាប់ពី 50 ឡើងទៅ កំណត់តម្លៃអថេរ <code>result</code> ថា <code>"ជាប់"</code> បើមិនអញ្ចឹងទេគឺ <code>"ធ្លាក់"</code> រួចបង្ហាញសារទៅកាន់ Console។</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>និទ្ទេស B ⭐️</div>
                <div>លទ្ធផលប្រឡង: ជាប់</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.conditions} compact />
          </>
        )

      case "loops":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              ល្បិះជុំ (Loops) ត្រូវបានប្រើប្រាស់ដើម្បីដំណើរការកូដដដែលៗ ច្រើនដងទៅតាមចំនួនកំណត់ ឬរហូតដល់លក្ខខណ្ឌលែងពិត។
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 font-kantumruy">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-foreground text-sm mb-1">For Loop</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">ប្រើនៅពេលដែលយើងដឹងពីចំនួនដងច្បាស់លាស់ដែលត្រូវរត់ជុំកូដ។</p>
                <pre className="bg-muted p-2 rounded text-[11px] font-mono mt-2">{`for (let i = 0; i < 5; i++) {
  console.log(i);
}`}</pre>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-foreground text-sm mb-1">While Loop</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">ប្រើដើម្បីរត់ជុំកូដដរាបណាលក្ខខណ្ឌជាក់លាក់នៅតែពិត (true)។</p>
                <pre className="bg-muted p-2 rounded text-[11px] font-mono mt-2">{`while (condition) {
  // code
}`}</pre>
              </div>
            </div>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសរសេរកូដរង្វិលជុំពីរប្រភេទផ្សេងគ្នា៖
              </p>
              <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>ប្រើប្រាស់ <code>For Loop</code> ដើម្បីបង្ហាញសារចំនួនជុំរត់ឡើងពី <code>1</code> ដល់ <code>3</code>។</li>
                <li>ប្រើប្រាស់ <code>While Loop</code> ដើម្បីរាប់ថយក្រោយពី <code>3</code> ដល់ <code>1</code>។</li>
              </ol>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>--- For Loop ---</div>
                <div>ចំនួនជុំ i = 1</div>
                <div>ចំនួនជុំ i = 2</div>
                <div>ចំនួនជុំ i = 3</div>
                <div>--- While Loop ---</div>
                <div>រាប់ថយក្រោយ: 3</div>
                <div>រាប់ថយក្រោយ: 2</div>
                <div>រាប់ថយក្រោយ: 1</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.loops} compact />
          </>
        )

      case "functions":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed">
              អនុគមន៍ (Functions) គឺជាប្លុកនៃកូដដែលត្រូវបានសរសេរឡើងដើម្បីបំពេញកិច្ចការណាមួយ ហើយវាអាចហៅមកប្រើឡើងវិញបានច្រើនដង និងទទួលតម្លៃ parameters ចូលបាន។
            </p>
            <CodeBlock>{`// ១. របៀបប្រកាសធម្មតា (Function Declaration)
function square(number) {
  return number * number;
}

// ២. របៀបប្រកាសបែប Arrow Function (ES6)
const squareArrow = (number) => number * number;`}</CodeBlock>
            <Tip>
              ការប្រើប្រាស់ Arrow Functions <code>() =&gt; ...</code> ធ្វើឱ្យកូដមានភាពខ្លី ស្អាត និងងាយស្រួលយល់។
            </Tip>
            <JsCompiler defaultCode={code.functions} compact />
          </>
        )

      case "scope":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              ដែនកំណត់អថេរ (Scope) កំណត់ទីតាំងដែលអថេរអាចត្រូវបានចូលប្រើប្រាស់ និងមើលឃើញនៅក្នុងកូដ៖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 font-kantumruy">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="font-semibold text-foreground text-sm font-sans">Global Scope</span>
                <p className="text-xs text-muted-foreground leading-relaxed">អថេរប្រកាសនៅក្រៅ Function ទាំងអស់ អាចប្រើបានគ្រប់ទីកន្លែង។</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="font-semibold text-foreground text-sm font-sans">Function Scope</span>
                <p className="text-xs text-muted-foreground leading-relaxed">អថេរប្រកាសក្នុង Function អាចប្រើបានតែក្នុង Function នោះប៉ុណ្ណោះ។</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="font-semibold text-foreground text-sm font-sans">Block Scope</span>
                <p className="text-xs text-muted-foreground leading-relaxed">អថេរប្រកាសដោយ <code>let</code>/<code>const</code> ក្នុង <code>{"{}"}</code> អាចប្រើបានតែក្នុងប្លុកនោះ។</p>
              </div>
            </div>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើតអនុគមន៍ដើម្បីសាកល្បង Scope របស់អថេរ៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្កើតអថេរ Global មួយឈ្មោះ <code>globalVar = "ខ្ញុំជា Global"</code></li>
                <li>បង្កើតអនុគមន៍ <code>testScope()</code> រួចបង្កើតអថេរ Local មួយឈ្មោះ <code>localVar = "ខ្ញុំជា Local"</code> នៅខាងក្នុង</li>
                <li>បង្ហាញតម្លៃអថេរទាំងពីរទៅកាន់ Console ពីក្នុងអនុគមន៍</li>
                <li>ហៅដំណើរការអនុគមន៍ <code>testScope()</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ខ្ញុំជា Global</div>
                <div>ខ្ញុំជា Local</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.scope} compact />
          </>
        )

      case "objects":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              វត្ថុ (Objects) ប្រើសម្រាប់រក្សាទុកទិន្នន័យជាគូ Key-Value ដែលតំណាងឱ្យលក្ខណៈសម្បត្តិរបស់វត្ថុពិតជាក់ស្តែង។
            </p>
            <Tip>
              យើងអាចទាញយកតម្លៃមកប្រើប្រាស់ដោយប្រើ Dot notation (ឧទាហរណ៍៖ <code>student.name</code>) ឬ Bracket notation (ឧទាហរណ៍៖ <code>student["name"]</code>)។
            </Tip>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើត Object តំណាងឱ្យសិស្សម្នាក់ និងបង្ហាញតម្លៃរបស់វា៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្កើត Array ឈ្មោះ <code>fruits</code> រួចបន្ថែម <code>"ផ្លែស្វាយ"</code> ទៅចុងក្រោយ</li>
                <li>បង្កើត Object ឈ្មោះ <code>student</code> ដែលមាន properties គឺ <code>name: "សាលី"</code>, <code>age: 18</code>, និង <code>grade: "12"</code></li>
                <li>បង្ហាញបញ្ជីផ្លែឈើ និងឈ្មោះរបស់សិស្សទៅកាន់ Console</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ផ្លែឈើទាំងអស់: [ 'ផ្លែប៉ោម', 'ចេក', 'ក្រូច', 'ផ្លែស្វាយ' ]</div>
                <div>ឈ្មោះសិស្ស: សាលី</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.objects} compact />
          </>
        )

      case "strings":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              ខ្សែអក្សរ (Strings) ប្រើសម្រាប់រក្សាទុក និងគណនាទិន្នន័យជាអក្សរ។ ក្នុង JavaScript យើងអាចសរសេរ String ដោយប្រើសញ្ញាសម្រង់ <code>""</code>, <code>''</code> ឬ backticks <code>``</code>៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy font-sans">
              <li><strong>Length:</strong> ប្រើ <code>.length</code> ដើម្បីរកចំនួនតួអក្សរ។</li>
              <li><strong>Methods:</strong> ប្រើ <code>.toUpperCase()</code> / <code>.toLowerCase()</code> ដើម្បីប្តូរទម្រង់អក្សរ។</li>
              <li><strong>Template Literals:</strong> ប្រើ backticks និង <code>{"${variable}"}</code> ដើម្បីបញ្ចូលអថេរក្នុង String បានយ៉ាងងាយស្រួល។</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសាកល្បងលេងជាមួយ String Methods៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្ហាញប្រវែងនៃអថេរ <code>text</code> ទៅកាន់ Console</li>
                <li>បំប្លែងពាក្យ <code>"hello"</code> ទៅជាអក្សរធំ រួចបង្ហាញទៅកាន់ Console</li>
                <li>ប្រើប្រាស់ Template Literals ដើម្បីបង្ហាញអថេរ <code>name</code> ទៅកាន់ Console ឱ្យចេញលទ្ធផល <code>"សួស្តី សុខ!"</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ប្រវែងអក្សរ: 11</div>
                <div>អក្សរធំ: HELLO</div>
                <div>សួស្តី សុខ!</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.strings} compact />
          </>
        )

      case "numbers":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              JavaScript មានប្រភេទអថេរជាលេខតែមួយគត់គឺ <code>Number</code> សម្រាប់តំណាងឱ្យទាំងលេខគត់ និងលេខទសភាគ។ លើសពីនេះ យើងប្រើប្រាស់ <code>Math</code> object សម្រាប់ដោះស្រាយការគណនាគណិតវិទ្យា៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy font-sans">
              <li><strong>Math.round(x)</strong> — បង្គត់លេខទៅរកចំនួនគត់ដែលជិតបំផុត</li>
              <li><strong>Math.max(x, y, ...)</strong> — ស្វែងរកតម្លៃធំបំផុតក្នុងចំណោមលេខដែលផ្តល់ឱ្យ</li>
              <li><strong>Math.random()</strong> — បង្កើតលេខចៃដន្យចន្លោះ 0 ដល់ 1</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសាកល្បងប្រើវិធីសាស្ត្រគណិតវិទ្យា៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្គត់តម្លៃ <code>price = 19.99</code> រួចបង្ហាញទៅកាន់ Console</li>
                <li>ស្វែងរកតម្លៃខ្ពស់បំផុតក្នុងចំណោមលេខ <code>10, 5, 20, 8</code> រួចបង្ហាញទៅកាន់ Console</li>
                <li>បង្ហាញលេខទសភាគចៃដន្យមួយទៅកាន់ Console</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ជិតបង្កើយ (Round): 20</div>
                <div>តម្លៃខ្ពស់បំផុត: 20</div>
                <div className="text-muted-foreground/80">// លេខចៃដន្យ (0 ដល់ 1): [លេខចៃដន្យណាមួយ]</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.numbers} compact />
          </>
        )

      case "arrays":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              អារ៉េ (Arrays) ត្រូវបានប្រើប្រាស់ដើម្បីរក្សាទុកបញ្ជីទិន្នន័យច្រើនក្នុងអថេរតែមួយ។ ធាតុនីមួយៗក្នុង Array ត្រូវបានកំណត់អត្តសញ្ញាណដោយលេខសន្ទស្សន៍ (Index) ដែលចាប់ផ្តើមពី <code>0</code>៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy font-sans">
              <li><strong>Access:</strong> ហៅធាតុតាម <code>array[index]</code> (ឧទាហរណ៍៖ <code>courses[0]</code>)។</li>
              <li><strong>Length:</strong> ប្រើ <code>.length</code> ដើម្បីដឹងពីចំនួនធាតុសរុប។</li>
              <li><strong>Push:</strong> ប្រើ <code>.push(item)</code> ដើម្បីបន្ថែមធាតុថ្មីទៅចុងបញ្ចប់នៃ Array។</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើត និងកែប្រែបញ្ជីមុខវិជ្ជាសិក្សា៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្កើតអារ៉េ <code>courses</code> ដែលមានធាតុបីគឺ <code>"HTML", "CSS", "JS"</code></li>
                <li>ប្រើ <code>courses.push("Python")</code> ដើម្បីបន្ថែមធាតុមួយទៀត</li>
                <li>បង្ហាញចំនួនធាតុសរុប ធាតុទី២ (Index 1) និងអារ៉េទាំងមូលទៅកាន់ Console</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ចំនួនធាតុក្នុងអារ៉េ: 4</div>
                <div>ធាតុទី២ (Index 1): CSS</div>
                <div>អារ៉េទាំងមូល: [ 'HTML', 'CSS', 'JS', 'Python' ]</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.arrays} compact />
          </>
        )

      case "dates":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              JavaScript ប្រើប្រាស់ Date Object ដើម្បីធ្វើការងារជាមួយពេលវេលា និងកាលបរិច្ឆេទ (ឆ្នាំ ខែ ថ្ងៃ ម៉ោង នាទី វិនាទី)៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy font-sans">
              <li><strong>new Date()</strong> — បង្កើត Object កាលបរិច្ឆេទថ្មីសម្រាប់ពេលវេលាបច្ចុប្បន្ន។</li>
              <li><strong>toDateString()</strong> — បំប្លែងកាលបរិច្ឆេទឱ្យទៅជាទម្រង់អត្ថបទងាយស្រួលអាន (ឧទាហរណ៍៖ "Sun Jun 21 2026")។</li>
              <li><strong>getFullYear() / getMonth() / getHours()</strong> — ទាញយកតម្លៃឆ្នាំ ខែ ឬម៉ោងដាច់ដោយឡែក។</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្ហាញព័ត៌មានកាលបរិច្ឆេទដូចខាងក្រោម៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្កើត Object កាលបរិច្ឆេទថ្មីកំណត់ត្រឹម <code>"2026-06-21T15:30:00"</code> រក្សាទុកក្នុងអថេរ <code>now</code></li>
                <li>បង្ហាញទម្រង់អត្ថបទរបស់វាដោយប្រើ <code>now.toDateString()</code></li>
                <li>បង្ហាញតម្លៃឆ្នាំបច្ចុប្បន្នដោយប្រើ <code>now.getFullYear()</code></li>
                <li>បង្ហាញតម្លៃម៉ោងបច្ចុប្បន្នដោយប្រើ <code>now.getHours()</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>កាលបរិច្ឆេទបច្ចុប្បន្ន: Sun Jun 21 2026</div>
                <div>ឆ្នាំ: 2026</div>
                <div>ម៉ោង: 15</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.dates} compact />
          </>
        )

      case "htmldom":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              <strong className="text-foreground">DOM (Document Object Model)</strong> គឺជាគ្រោងរចនាសម្ព័ន្ធនៃទំព័រ HTML ដែល JavaScript អាចចូលទៅកែប្រែ ចាប់យក ឬលុប elements ផ្សេងៗបាន។
            </p>
            <h4 className="font-semibold text-foreground mt-4 font-kantumruy">វិធីសាស្ត្រ DOM ពេញនិយម៖</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy">
              <li><code>document.getElementById("id")</code> — ជ្រើសរើស Element តាមរយៈ ID</li>
              <li><code>document.querySelector(".class")</code> — ជ្រើសរើស Element ដំបូងគេតាម CSS Selector</li>
              <li><code>element.textContent = "អត្ថបទថ្មី"</code> — កែប្រែខ្លឹមសារអត្ថបទខាងក្នុង</li>
              <li><code>element.style.color = "red"</code> — កែប្រែស្ទីល និងពណ៌របស់ Element</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសាកល្បងប្រើប្រាស់ <code>mockDocument</code> ដើម្បីផ្លាស់ប្តូរខ្លឹមសារ និងស្ទីលរបស់ Element ដូចខាងក្រោម៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>ជ្រើសរើស Element ដោយប្រើ <code>mockDocument.querySelector("h1")</code> រួចរក្សាទុកក្នុងអថេរ <code>title</code></li>
                <li>កែប្រែអត្ថបទ <code>textContent</code> ទៅជា <code>"សួស្តីពិភពលោក!"</code></li>
                <li>កែប្រែពណ៌ <code>style.color</code> ទៅជា <code>"#cc785c"</code></li>
                <li>បង្ហាញតម្លៃទាំងពីរទៅកាន់ Console ដោយប្រើ <code>console.log</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>DOM Simulation:</div>
                <div>កែប្រែ Title textContent: សួស្តីពិភពលោក!</div>
                <div>កែប្រែ Title color: #cc785c</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.htmldom} compact />
          </>
        )

      case "events":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              ព្រឹត្តិការណ៍ HTML (HTML Events) គឺជា "អ្វីៗ" ដែលកើតឡើងទៅលើ Element នានា (ដូចជាការចុច Click ការវាយអត្ថបទ ឬការអូស Mouse) ហើយ JavaScript អាចចាប់យក និងឆ្លើយតបទៅកាន់សកម្មភាពទាំងនោះបាន៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy font-sans">
              <li><strong>onclick</strong> — កើតឡើងនៅពេលអ្នកប្រើប្រាស់ចុចលើ HTML Element។</li>
              <li><strong>onchange</strong> — កើតឡើងនៅពេលខ្លឹមសារ ឬតម្លៃរបស់ input element ត្រូវបានផ្លាស់ប្តូរ។</li>
              <li><strong>onmouseover / onmouseout</strong> — កើតឡើងនៅពេលអ្នកប្រើប្រាស់រំកិល mouse ចូល ឬចេញពី element។</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើត Mock Event Listener ដើម្បីចាប់ការចុច Button ដូចខាងក្រោម៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>ហៅដំណើរការ <code>button.addEventListener("click", callback)</code></li>
                <li>សរសេរ callback function ដើម្បីបង្ហាញសារ <code>"ព្រឹត្តិការណ៍ Click ត្រូវបានដំណើរការ! ⚡️"</code> ទៅកាន់ Console នៅពេលព្រឹត្តិការណ៍កើតឡើង</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>បានចុះឈ្មោះសម្រាប់ព្រឹត្តិការណ៍: click</div>
                <div>ព្រឹត្តិការណ៍ Click ត្រូវបានដំណើរការ! ⚡️</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.events} compact />
          </>
        )

      case "async":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              កូដអសមកាល (Asynchronous) អនុញ្ញាតឱ្យកម្មវិធីដំណើរការការងារធំៗ (ដូចជាការទាញយកទិន្នន័យពី Server) ក្នុងពេលដំណាលគ្នាដោយមិនធ្វើឱ្យទំព័រវេបសាយគាំង (blocking)។
            </p>
            <Note>
              JavaScript ប្រើប្រាស់ <strong className="text-foreground">Promises</strong> និងពាក្យគន្លឹះ <strong className="text-foreground">async / await</strong> ដើម្បីសរសេរកូដអសមកាលឱ្យមានរបៀបរៀបរយ និងងាយអាន។
            </Note>
            <pre className="bg-muted p-3 rounded-lg text-xs font-mono mb-4">{`// ឧទាហរណ៍ការប្រើ async / await
async function loadData() {
  let response = await fetch("https://api.com/users");
  let users = await response.json();
  console.log(users);
}`}</pre>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសរសេរកូដអសមកាលដើម្បីដំណើរការ និងរង់ចាំការទាញយកទិន្នន័យ៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>ហៅដំណើរការអនុគមន៍ <code>displayData()</code></li>
                <li>បង្ហាញសារដំបូង <code>"កំពុងទាញយកទិន្នន័យ..."</code></li>
                <li>ប្រើប្រាស់ <code>await</code> ដើម្បីរង់ចាំទិន្នន័យពី <code>fetchData()</code></li>
                <li>បង្ហាញសារចុងក្រោយរួមជាមួយទិន្នន័យដែលទទួលបាន <code>"ទទួលបាន: ទិន្នន័យពី Server 📥"</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>កំពុងទាញយកទិន្នន័យ...</div>
                <div>ទទួលបាន: ទិន្នន័យពី Server 📥</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.async} compact />
          </>
        )

      case "classes":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              <strong className="text-foreground">Classes</strong> ត្រូវបានណែនាំក្នុង ES6 ដើម្បីឱ្យការសរសេរកូដបែប OOP (Object-Oriented Programming) កាន់តែងាយស្រួល និងមានរចនាសម្ព័ន្ធច្បាស់លាស់។
            </p>
            <Tip>
              Class ដើរតួជាពុម្ពគំរូ (Template) សម្រាប់បង្កើតវត្ថុ (Objects) ដែលមានលក្ខណៈសម្បត្តិ (Properties) និងមុខងារ (Methods) ដូចៗគ្នា។
            </Tip>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមបង្កើត Class មួយ និងដំណើរការបង្កើត Object ដូចខាងក្រោម៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្កើត Class ឈ្មោះ <code>Vehicle</code> រួមមាន constructor សម្រាប់រក្សាទុក <code>name</code> និង <code>brand</code></li>
                <li>បង្កើត Method ឈ្មោះ <code>showInfo()</code> ដើម្បីចងក្រងឈ្មោះឡាន និងម៉ាកបញ្ចូលគ្នា</li>
                <li>បង្កើត Object មួយឈ្មោះ <code>myCar</code> ដោយប្រើពាក្យគន្លឹះ <code>new Vehicle("Range Rover", "Land Rover")</code></li>
                <li>បង្ហាញលទ្ធផលពីការហៅ <code>myCar.showInfo()</code> ទៅកាន់ Console</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ឡានរបស់ខ្ញុំគឺ: Land Rover Range Rover</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.classes} compact />
          </>
        )

      case "json":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              JSON (JavaScript Object Notation) គឺជាទម្រង់ទិន្នន័យស្រាល និងពេញនិយមបំផុតសម្រាប់រក្សាទុក ឬផ្ទេរទិន្នន័យរវាង Server និង Web Application របស់ប្រព័ន្ធ៖
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4 text-sm font-kantumruy font-sans">
              <li><strong>JSON.parse()</strong> — បំប្លែងពី JSON String ទៅជា JavaScript Object ដើម្បីយកមកប្រើការបន្ត។</li>
              <li><strong>JSON.stringify()</strong> — បំប្លែងពី JavaScript Object ទៅជា JSON String ដើម្បីផ្ញើទៅកាន់ Server។</li>
            </ul>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសាកល្បងបំប្លែងទិន្នន័យជាទម្រង់ JSON ដូចខាងក្រោម៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បំប្លែង <code>{"jsonString = '{\"name\": \"ដារ៉ា\", \"age\": 20}'"}</code> ទៅជា Object ឈ្មោះ <code>obj</code> រួចបង្ហាញ <code>"ឈ្មោះ: ដារ៉ា"</code> ទៅកាន់ Console</li>
                <li>បំប្លែង Object <code>obj</code> ត្រឡប់ទៅជា JSON String ឈ្មោះ <code>newJson</code> រួចបង្ហាញវាទៅកាន់ Console</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>ឈ្មោះ: ដារ៉ា</div>
                <div>{"JSON String: {\"name\":\"ដារ៉ា\",\"age\":20}"}</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.json} compact />
          </>
        )

      case "compiler":
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              សូមស្វាគមន៍មកកាន់ទីធ្លាសាកល្បងកូដ JavaScript! នៅទីនេះ អ្នកអាចសរសេរ ប្រកាស ឬដំណើរការកូដឡូជីខលណាមួយដែលអ្នកចង់សាកល្បង។
              លទ្ធផលនឹងបង្ហាញនៅផ្ទាំង Console ខាងក្រោមភ្លាមៗ។
            </p>

            <div className="my-6 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 font-kantumruy">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Beaker className="h-5 w-5" />
                <span>🎯 បេសកកម្មអនុវត្ត (Coding Exercise)</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                សូមសាកល្បងបង្កើតកម្មវិធីគណនាផលបូកសាមញ្ញ៖
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-2">
                <li>បង្កើតអថេរ <code>a = 12</code> និង <code>b = 30</code></li>
                <li>បង្ហាញផលបូក <code>a + b</code> ទៅកាន់ Console ឱ្យមានទម្រង់ <code>"លទ្ធផល a + b = 42"</code></li>
              </ul>
              <div className="bg-muted p-3 rounded-lg text-xs font-mono text-foreground space-y-1">
                <span className="font-semibold block text-muted-foreground">លទ្ធផលរំពឹងទុក (Expected Output)៖</span>
                <div>លទ្ធផល a + b = 42</div>
              </div>
            </div>

            <JsCompiler defaultCode={code.compiler} compact />
          </>
        )

      default:
        return (
          <>
            <p className="text-muted-foreground leading-relaxed font-kantumruy">
              មាតិកានៃជំពូកនេះកំពុងស្ថិតក្រោមការរៀបចំ។ សូមរង់ចាំការធ្វើបច្ចុប្បន្នភាពនៅពេលក្រោយ។
            </p>
          </>
        )
    }
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-10 pb-24 scroll-smooth">
        <div className="max-w-4xl mx-auto">

          {/* ── Hero ── */}
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Code2 className="h-3 w-3" />
              <span>ភាសា JavaScript — មេរៀនទី ២</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-serif">
              សិក្សាភាសា JavaScript ពីកម្រិតដំបូង
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-kantumruy">
              JavaScript ជាភាសាសរសេរកូដដែលធ្វើឱ្យទំព័រវេបសាយរបស់អ្នកមានជីវិត និងមានអន្តរកម្មឆ្លើយតបជាមួយអ្នកប្រើប្រាស់បានភ្លាមៗ។
            </p>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 [&>section]:py-16 first:[&>section]:pt-0">
            {CHAPTER_IDS.map((id, idx) => (
              <section 
                key={id} 
                id={id}
                style={{ display: currentChapterIndex === idx ? "block" : "none" }} 
                className="scroll-mt-20 space-y-6"
              >
                <div className="flex items-center gap-3 border-b pb-3 font-kantumruy">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">{idx + 1}</span>
                  <h2 className="text-2xl font-bold text-foreground">
                    {CHAPTER_TITLES[id] || "មេរៀន JavaScript"}
                  </h2>
                </div>

                <div className="font-kantumruy space-y-6">
                  {renderChapterContent(id)}
                </div>
              </section>
            ))}
          </div>

          {/* Quiz Gating Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <Quiz 
              chapterId={CHAPTER_IDS[currentChapterIndex]}
              isCompleted={completedChapters.includes(CHAPTER_IDS[currentChapterIndex])}
              onCorrect={() => {
                const activeId = CHAPTER_IDS[currentChapterIndex];
                if (completedChapters.includes(activeId)) return;
                
                const newCompleted = [...completedChapters, activeId];
                setCompletedChapters(newCompleted);

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

                // Play mini success feedback
                playSuccessChime();
                confetti({
                  particleCount: 150,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#cc785c', '#e09882', '#f5f5f7', '#ffd700']
                });
              }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-border font-kantumruy">
            <button 
              onClick={handleBack}
              disabled={currentChapterIndex === 0}
              className="px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <button 
              onClick={handleNext}
              disabled={!completedChapters.includes(CHAPTER_IDS[currentChapterIndex])}
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
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 font-kantumruy">
            <AlertDialogCancel>បោះបង់</AlertDialogCancel>
            <AlertDialogAction 
              variant="outline" 
              className="border-border text-foreground hover:bg-muted" 
              onClick={() => {
                setShowLoginAlert(false);
                if (currentChapterIndex === totalChapters - 1) {
                  setShowFinishAlert(true);
                } else {
                  setCurrentChapterIndex(prev => prev + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              รំលង &gt;
            </AlertDialogAction>
            <AlertDialogAction onClick={() => router.push('/login')} className="bg-primary text-primary-foreground hover:bg-primary/90 font-kantumruy">
              ចូលគណនី
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showFinishAlert} onOpenChange={setShowFinishAlert}>
        <AlertDialogContent className="font-kantumruy">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-center text-primary flex items-center justify-center gap-2">
              🎉 អបអរសាទរ!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-foreground text-base mt-2 leading-relaxed">
              អ្នកបានបញ្ចប់វគ្គសិក្សា <strong>JavaScript Basics</strong> ទាំងស្រុងដោយជោគជ័យ! <br/>
              បន្តការរៀនសរសេរកូដរបស់អ្នកជាមួយភាសាផ្សេងៗទៀត។
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center sm:justify-center mt-4">
            <AlertDialogAction onClick={() => {
              setShowFinishAlert(false);
              router.push('/');
            }} className="px-8 bg-primary text-white hover:bg-primary/90 font-kantumruy">
              ត្រឡប់ទៅទំព័រដើម
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
