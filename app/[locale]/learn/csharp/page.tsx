"use client"

import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Flame, Zap, Sparkles, FileText, Beaker, Check, X, XCircle, AlertCircle, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MockCompiler } from "@/components/mock-compiler"
import { useWebHaptics } from "web-haptics/react"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

const code = {
  cs_ch1: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 1\");
  }
}`,
  cs_ch2: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 2\");
  }
}`,
  cs_ch3: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 3\");
  }
}`,
  cs_ch4: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 4\");
  }
}`,
  cs_ch5: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 5\");
  }
}`,
  cs_ch6: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 6\");
  }
}`,
  cs_ch7: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 7\");
  }
}`,
  cs_ch8: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 8\");
  }
}`,
  cs_ch9: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 9\");
  }
}`,
  cs_ch10: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 10\");
  }
}`,
  cs_ch11: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 11\");
  }
}`,
  cs_ch12: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 12\");
  }
}`,
  cs_ch13: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 13\");
  }
}`,
  cs_ch14: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 14\");
  }
}`,
  cs_ch15: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 15\");
  }
}`,
  cs_ch16: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 16\");
  }
}`,
  cs_ch17: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 17\");
  }
}`,
  cs_ch18: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 18\");
  }
}`,
  cs_ch19: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 19\");
  }
}`,
  cs_ch20: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 20\");
  }
}`,
  cs_ch21: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 21\");
  }
}`,
  cs_ch22: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 22\");
  }
}`,
  cs_ch23: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 23\");
  }
}`,
  cs_ch24: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 24\");
  }
}`,
  cs_ch25: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 25\");
  }
}`,
  cs_ch26: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 26\");
  }
}`,
  cs_ch27: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 27\");
  }
}`,
  cs_ch28: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 28\");
  }
}`,
  cs_ch29: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 29\");
  }
}`,
  cs_ch30: `using System;\nclass Program {
  static void Main() {
    Console.WriteLine(\"Hello Chapter 30\");
  }
}`,
}


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

const QUIZZES: Record<string, any> = {
  "cs_ch1": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 1 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 1?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch2": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 2 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 2?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch3": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 3 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 3?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch4": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 4 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 4?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch5": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 5 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 5?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch6": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 6 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 6?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch7": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 7 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 7?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch8": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 8 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 8?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch9": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 9 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 9?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch10": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 10 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 10?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch11": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 11 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 11?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch12": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 12 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 12?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch13": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 13 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 13?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch14": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 14 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 14?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch15": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 15 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 15?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch16": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 16 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 16?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch17": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 17 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 17?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch18": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 18 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 18?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch19": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 19 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 19?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch20": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 20 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 20?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch21": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 21 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 21?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch22": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 22 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 22?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch23": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 23 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 23?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch24": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 24 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 24?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch25": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 25 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 25?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch26": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 26 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 26?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch27": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 27 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 27?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch28": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 28 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 28?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch29": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 29 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 29?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
  "cs_ch30": {
    questionKhmer: "តើលក្ខណៈពិសេសរបស់ C# នៅក្នុងមេរៀនទី 30 គឺអ្វី?",
    questionEnglish: "What is the special feature of C# in Chapter 30?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះវាឆ្លុះបញ្ចាំងពីលក្ខណៈ .NET ដ៏អស្ចារ្យ។"
  },
};

function Quiz({ chapterId, isCompleted, onCorrect }: { chapterId: string; isCompleted: boolean; onCorrect: () => void; }) {
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
        {quiz.options.map((option: string, idx: number) => {
          const isSelected = selectedOption === idx;
          const isCorrectChoice = idx === quiz.correctIndex;
          
          let cardBorder = "border-border bg-card/10 hover:bg-card/20";
          let letterBg = "bg-muted/40 text-muted-foreground";
          
          if (submitted) {
            if (selectedOption === quiz.correctIndex) {
              if (isCorrectChoice) cardBorder = "border-[#5db872] bg-[#5db872]/5";
            } else {
              if (isSelected) cardBorder = "border-[#c64545] bg-[#c64545]/5";
            }
          } else if (isSelected) {
            cardBorder = "border-primary bg-primary/5";
          }

          return (
            <button key={idx} disabled={submitted} onClick={() => handleOptionSelect(idx)} className={`w-full p-4 rounded-xl border text-sm text-left ${cardBorder}`}>
              <div className="flex items-center gap-4">
                <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {!submitted ? (
          <button disabled={selectedOption === null} onClick={handleSubmit} className="px-6 py-2.5 rounded-full bg-[#2d8a6b] hover:bg-[#206950] text-white">
            ផ្ទៀងផ្ទាត់ចម្លើយ
          </button>
        ) : (
          selectedOption !== quiz.correctIndex && (
            <button onClick={handleRetry} className="px-6 py-2.5 rounded-full bg-primary text-white">
              ព្យាយាមម្ដងទៀត
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default function LearnCsharpPage() {
  const { data: session } = useSession();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const totalChapters = 30;
  const CHAPTER_IDS = ["cs_ch1", "cs_ch2", "cs_ch3", "cs_ch4", "cs_ch5", "cs_ch6", "cs_ch7", "cs_ch8", "cs_ch9", "cs_ch10", "cs_ch11", "cs_ch12", "cs_ch13", "cs_ch14", "cs_ch15", "cs_ch16", "cs_ch17", "cs_ch18", "cs_ch19", "cs_ch20", "cs_ch21", "cs_ch22", "cs_ch23", "cs_ch24", "cs_ch25", "cs_ch26", "cs_ch27", "cs_ch28", "cs_ch29", "cs_ch30"];

  return <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
    <div className="flex-1 overflow-y-auto px-4 py-10 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">សិក្សាភាសា C# ជាមួយ .NET</h1>
        <div className="divide-y divide-zinc-200">

          <section style={{ display: currentChapterIndex === 0 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">1. មេរៀន C# ទី 1: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch1} output="Hello Chapter 1\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch1" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 1 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">2. មេរៀន C# ទី 2: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch2} output="Hello Chapter 2\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch2" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 2 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">3. មេរៀន C# ទី 3: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch3} output="Hello Chapter 3\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch3" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 3 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">4. មេរៀន C# ទី 4: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch4} output="Hello Chapter 4\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch4" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 4 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">5. មេរៀន C# ទី 5: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch5} output="Hello Chapter 5\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch5" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 5 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">6. មេរៀន C# ទី 6: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch6} output="Hello Chapter 6\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch6" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 6 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">7. មេរៀន C# ទី 7: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch7} output="Hello Chapter 7\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch7" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 7 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">8. មេរៀន C# ទី 8: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch8} output="Hello Chapter 8\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch8" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 8 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">9. មេរៀន C# ទី 9: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch9} output="Hello Chapter 9\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch9" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 9 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">10. មេរៀន C# ទី 10: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch10} output="Hello Chapter 10\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch10" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 10 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">11. មេរៀន C# ទី 11: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch11} output="Hello Chapter 11\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch11" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 11 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">12. មេរៀន C# ទី 12: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch12} output="Hello Chapter 12\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch12" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 12 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">13. មេរៀន C# ទី 13: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch13} output="Hello Chapter 13\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch13" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 13 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">14. មេរៀន C# ទី 14: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch14} output="Hello Chapter 14\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch14" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 14 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">15. មេរៀន C# ទី 15: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch15} output="Hello Chapter 15\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch15" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 15 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">16. មេរៀន C# ទី 16: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch16} output="Hello Chapter 16\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch16" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 16 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">17. មេរៀន C# ទី 17: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch17} output="Hello Chapter 17\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch17" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 17 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">18. មេរៀន C# ទី 18: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch18} output="Hello Chapter 18\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch18" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 18 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">19. មេរៀន C# ទី 19: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch19} output="Hello Chapter 19\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch19" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 19 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">20. មេរៀន C# ទី 20: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch20} output="Hello Chapter 20\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch20" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 20 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">21. មេរៀន C# ទី 21: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch21} output="Hello Chapter 21\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch21" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 21 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">22. មេរៀន C# ទី 22: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch22} output="Hello Chapter 22\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch22" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 22 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">23. មេរៀន C# ទី 23: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch23} output="Hello Chapter 23\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch23" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 23 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">24. មេរៀន C# ទី 24: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch24} output="Hello Chapter 24\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch24" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 24 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">25. មេរៀន C# ទី 25: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch25} output="Hello Chapter 25\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch25" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 25 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">26. មេរៀន C# ទី 26: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch26} output="Hello Chapter 26\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch26" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 26 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">27. មេរៀន C# ទី 27: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch27} output="Hello Chapter 27\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch27" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 27 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">28. មេរៀន C# ទី 28: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch28} output="Hello Chapter 28\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch28" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 28 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">29. មេរៀន C# ទី 29: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch29} output="Hello Chapter 29\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch29" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 29 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">30. មេរៀន C# ទី 30: .NET LINQ</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា C# ដែលបង្កើតឡើងដោយក្រុមហ៊ុន Microsoft សម្រាប់វេទិកា .NET ។</p>
            <p className="my-4">C# មានលក្ខណៈស្រដៀងទៅនឹង Java និង C++ តែវាត្រូវបានធ្វើឲ្យប្រសើរឡើងសម្រាប់ការអភិវឌ្ឍន៍កម្មវិធីលើ Windows ។</p>
            <p className="my-4">ការប្រើប្រាស់ LINQ, Async/Await ធ្វើឲ្យការសរសេរកូដកាន់តែងាយស្រួល និងខ្លី។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Developed by Microsoft</h3>
                <p className="text-sm">C# ត្រូវបានអភិវឌ្ឍន៍ឡើងតាំងពីឆ្នាំ ២០០០ មកម្ល៉េះ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Part of .NET</h3>
                <p className="text-sm">វាដំណើរការនៅលើ .NET runtime ដែលផ្តល់នូវ libraries រាប់ពាន់សម្រាប់ការអភិវឌ្ឍន៍។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">LINQ</h3>
                <p className="text-sm">Language Integrated Query អនុញ្ញាតឲ្យអ្នកទាញទិន្នន័យពី Collections ដូចសរសេរ SQL ដែរ។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Async/Await</h3>
                <p className="text-sm">សម្រួលដល់ការសរសេរកូដដែលដំណើរការព្រមៗគ្នា (Asynchronous) ដោយមិនបាច់ឈឺក្បាលជាមួយ Threads ។</p>
              </div>
            </div>
            <MockCompiler language="csharp" defaultCode={code.cs_ch30} output="Hello Chapter 30\n" />
            <div className="mt-8">
              <Quiz chapterId="cs_ch30" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>
}
