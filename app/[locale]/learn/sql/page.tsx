"use client"

import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Flame, Zap, Sparkles, FileText, Beaker, Check, X, XCircle } from "lucide-react"
import { useWebHaptics } from "web-haptics/react"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
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
    <pre className="bg-[#1e1e1e] text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed border border-border my-4">
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
  "sql-intro": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Intro ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Intro?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Intro គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-syntax": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Syntax ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Syntax?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Syntax គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-select": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Select ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Select?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Select គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-select-distinct": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Select Distinct ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Select Distinct?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Select Distinct គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-where": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Where ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Where?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Where គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-order-by": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Order By ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Order By?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Order By គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-and": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL And ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL And?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL And គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-or": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Or ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Or?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Or គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-not": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Not ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Not?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Not គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-insert-into": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Insert Into ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Insert Into?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Insert Into គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-null-values": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Null Values ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Null Values?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Null Values គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-update": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Update ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Update?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Update គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-delete": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Delete ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Delete?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Delete គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-select-top": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Select Top ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Select Top?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Select Top គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-aggregate-functions": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Aggregate Functions ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Aggregate Functions?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Aggregate Functions គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-min": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Min ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Min?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Min គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-max": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Max ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Max?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Max គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-count": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Count ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Count?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Count គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-sum": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Sum ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Sum?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Sum គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-avg": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Avg ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Avg?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Avg គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-like": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Like ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Like?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Like គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-wildcards": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Wildcards ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Wildcards?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Wildcards គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-in": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL In ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL In?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL In គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-between": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Between ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Between?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Between គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-aliases": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Aliases ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Aliases?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Aliases គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-joins": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Joins ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Joins?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Joins គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-inner-join": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Inner Join ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Inner Join?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Inner Join គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-left-join": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Left Join ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Left Join?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Left Join គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-right-join": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Right Join ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Right Join?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Right Join គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-full-join": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Full Join ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Full Join?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Full Join គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-self-join": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Self Join ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Self Join?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Self Join គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-union": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Union ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Union?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Union គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-union-all": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Union All ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Union All?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Union All គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-group-by": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Group By ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Group By?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Group By គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-having": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Having ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Having?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Having គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-exists": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Exists ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Exists?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Exists គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-any": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Any ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Any?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Any គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-all": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL All ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL All?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL All គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-select-into": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Select Into ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Select Into?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Select Into គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-insert-into-select": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Insert Into Select ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Insert Into Select?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Insert Into Select គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-case": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Case ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Case?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Case គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-null-functions": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Null Functions ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Null Functions?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Null Functions គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-stored-procedures": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Stored Procedures ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Stored Procedures?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Stored Procedures គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-comments": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Comments ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Comments?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Comments គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-operators": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Operators ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Operators?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Operators គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-database": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Database ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Database?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Database គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-create-db": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Create DB ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Create DB?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Create DB គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-drop-db": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Drop DB ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Drop DB?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Drop DB គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-backup-db": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Backup DB ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Backup DB?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Backup DB គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-create-table": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Create Table ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Create Table?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Create Table គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-drop-table": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Drop Table ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Drop Table?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Drop Table គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-alter-table": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Alter Table ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Alter Table?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Alter Table គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-constraints": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Constraints ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Constraints?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Constraints គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-not-null": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Not Null ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Not Null?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Not Null គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-unique": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Unique ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Unique?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Unique គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-primary-key": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Primary Key ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Primary Key?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Primary Key គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-foreign-key": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Foreign Key ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Foreign Key?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Foreign Key គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-check": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Check ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Check?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Check គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-default": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Default ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Default?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Default គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-create-index": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Create Index ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Create Index?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Create Index គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-auto-increment": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Auto Increment ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Auto Increment?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Auto Increment គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-dates": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Dates ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Dates?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Dates គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-views": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Views ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Views?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Views គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-injection": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Injection ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Injection?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Injection គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-parameters": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Parameters ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Parameters?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Parameters គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-prepared-statements": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Prepared Statements ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Prepared Statements?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Prepared Statements គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-hosting": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Hosting ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Hosting?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Hosting គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-cert": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Cert ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Cert?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Cert គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-certificate": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Certificate ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Certificate?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Certificate គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-references": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL References ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL References?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL References គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-data-types": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Data Types ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Data Types?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Data Types គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "sql-keywords": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច SQL Keywords ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of SQL Keywords?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "SQL Keywords គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
  "mysql-functions": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច MySQL Functions ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of MySQL Functions?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "MySQL Functions គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការសរសេរកូដ និងរៀបចំ Database SQL ឲ្យមានប្រសិទ្ធភាព។"
  },
};

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
              className={`w-full p-0 overflow-hidden rounded-xl border text-sm transition-all duration-150 flex items-center justify-between gap-3 text-left font-sans ${cardBorder}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 py-4 flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none ${letterBg}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
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

/* ─────────────────────── Page ─────────────────────── */
export default function LearnSqlPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const totalChapters = 73;

  const CHAPTER_IDS = [
    "sql-intro",
    "sql-syntax",
    "sql-select",
    "sql-select-distinct",
    "sql-where",
    "sql-order-by",
    "sql-and",
    "sql-or",
    "sql-not",
    "sql-insert-into",
    "sql-null-values",
    "sql-update",
    "sql-delete",
    "sql-select-top",
    "sql-aggregate-functions",
    "sql-min",
    "sql-max",
    "sql-count",
    "sql-sum",
    "sql-avg",
    "sql-like",
    "sql-wildcards",
    "sql-in",
    "sql-between",
    "sql-aliases",
    "sql-joins",
    "sql-inner-join",
    "sql-left-join",
    "sql-right-join",
    "sql-full-join",
    "sql-self-join",
    "sql-union",
    "sql-union-all",
    "sql-group-by",
    "sql-having",
    "sql-exists",
    "sql-any",
    "sql-all",
    "sql-select-into",
    "sql-insert-into-select",
    "sql-case",
    "sql-null-functions",
    "sql-stored-procedures",
    "sql-comments",
    "sql-operators",
    "sql-database",
    "sql-create-db",
    "sql-drop-db",
    "sql-backup-db",
    "sql-create-table",
    "sql-drop-table",
    "sql-alter-table",
    "sql-constraints",
    "sql-not-null",
    "sql-unique",
    "sql-primary-key",
    "sql-foreign-key",
    "sql-check",
    "sql-default",
    "sql-create-index",
    "sql-auto-increment",
    "sql-dates",
    "sql-views",
    "sql-injection",
    "sql-parameters",
    "sql-prepared-statements",
    "sql-hosting",
    "sql-cert",
    "sql-certificate",
    "sql-references",
    "sql-data-types",
    "sql-keywords",
    "mysql-functions"
  ];

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
    fetch('/api/progress/sql')
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

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-10 pb-24 scroll-smooth">
        <div className="max-w-4xl mx-auto">

          {/* ── Hero ── */}
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Code2 className="h-3 w-3" />
              <span>ភាសា SQL — មេរៀនទី ១</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              សិក្សាភាសា SQL ពីកម្រិតដំបូង
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
              SQL (Structured Query Language) គឺជាភាសាស្តង់ដារសម្រាប់ទំនាក់ទំនងជាមួយ Database។ វាប្រើសម្រាប់សួរទិន្នន័យ (Query) បញ្ចូល កែប្រែ និងគ្រប់គ្រងទិន្នន័យ។
            </p>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 [&>section]:py-16 first:[&>section]:pt-0">
            {/* ══════════════════════════════════════════════
            1. SQL Intro
            ══════════════════════════════════════════════ */}
            <section id="sql-intro" style={{ display: currentChapterIndex === 0 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">1</span>
                <h2 className="text-2xl font-bold text-foreground">
                  សេចក្តីផ្តើមអំពី SQL (SQL Intro)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Intro</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Intro ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Intro
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            2. SQL Syntax
            ══════════════════════════════════════════════ */}
            <section id="sql-syntax" style={{ display: currentChapterIndex === 1 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">2</span>
                <h2 className="text-2xl font-bold text-foreground">
                  វាក្យសម្ព័ន្ធ SQL (SQL Syntax)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Syntax</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Syntax ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Syntax
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            3. SQL Select
            ══════════════════════════════════════════════ */}
            <section id="sql-select" style={{ display: currentChapterIndex === 2 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">3</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL Select Statement (SQL Select)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Select</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Select ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Select
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            4. SQL Select Distinct
            ══════════════════════════════════════════════ */}
            <section id="sql-select-distinct" style={{ display: currentChapterIndex === 3 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">4</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL Select Distinct (SQL Select Distinct)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Select Distinct</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Select Distinct ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Select Distinct
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            5. SQL Where
            ══════════════════════════════════════════════ */}
            <section id="sql-where" style={{ display: currentChapterIndex === 4 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">5</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លក្ខខណ្ឌ Where (SQL Where)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Where</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Where ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Where
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            6. SQL Order By
            ══════════════════════════════════════════════ */}
            <section id="sql-order-by" style={{ display: currentChapterIndex === 5 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">6</span>
                <h2 className="text-2xl font-bold text-foreground">
                  តម្រៀប Order By (SQL Order By)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Order By</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Order By ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Order By
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            7. SQL And
            ══════════════════════════════════════════════ */}
            <section id="sql-and" style={{ display: currentChapterIndex === 6 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">7</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ប្រមាណវិធី And (SQL And)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL And</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL And ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL And
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            8. SQL Or
            ══════════════════════════════════════════════ */}
            <section id="sql-or" style={{ display: currentChapterIndex === 7 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">8</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ប្រមាណវិធី Or (SQL Or)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Or</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Or ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Or
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            9. SQL Not
            ══════════════════════════════════════════════ */}
            <section id="sql-not" style={{ display: currentChapterIndex === 8 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">9</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ប្រមាណវិធី Not (SQL Not)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Not</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Not ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Not
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            10. SQL Insert Into
            ══════════════════════════════════════════════ */}
            <section id="sql-insert-into" style={{ display: currentChapterIndex === 9 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">10</span>
                <h2 className="text-2xl font-bold text-foreground">
                  បញ្ចូលទិន្នន័យ Insert (SQL Insert Into)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Insert Into</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Insert Into ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Insert Into
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            11. SQL Null Values
            ══════════════════════════════════════════════ */}
            <section id="sql-null-values" style={{ display: currentChapterIndex === 10 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">11</span>
                <h2 className="text-2xl font-bold text-foreground">
                  តម្លៃទទេ Null (SQL Null Values)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Null Values</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Null Values ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Null Values
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            12. SQL Update
            ══════════════════════════════════════════════ */}
            <section id="sql-update" style={{ display: currentChapterIndex === 11 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">12</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កែប្រែទិន្នន័យ Update (SQL Update)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Update</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Update ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Update
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            13. SQL Delete
            ══════════════════════════════════════════════ */}
            <section id="sql-delete" style={{ display: currentChapterIndex === 12 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">13</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លុបទិន្នន័យ Delete (SQL Delete)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Delete</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Delete ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Delete
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            14. SQL Select Top
            ══════════════════════════════════════════════ */}
            <section id="sql-select-top" style={{ display: currentChapterIndex === 13 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">14</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កំណត់ទិន្នន័យ Select Top (SQL Select Top)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Select Top</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Select Top ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Select Top
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            15. SQL Aggregate Functions
            ══════════════════════════════════════════════ */}
            <section id="sql-aggregate-functions" style={{ display: currentChapterIndex === 14 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">15</span>
                <h2 className="text-2xl font-bold text-foreground">
                  អនុគមន៍ប្រមូលផ្តុំ (SQL Aggregate Functions)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Aggregate Functions</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Aggregate Functions ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Aggregate Functions
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            16. SQL Min
            ══════════════════════════════════════════════ */}
            <section id="sql-min" style={{ display: currentChapterIndex === 15 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">16</span>
                <h2 className="text-2xl font-bold text-foreground">
                  តម្លៃតូចបំផុត Min() (SQL Min)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Min</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Min ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Min
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            17. SQL Max
            ══════════════════════════════════════════════ */}
            <section id="sql-max" style={{ display: currentChapterIndex === 16 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">17</span>
                <h2 className="text-2xl font-bold text-foreground">
                  តម្លៃធំបំផុត Max() (SQL Max)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Max</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Max ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Max
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            18. SQL Count
            ══════════════════════════════════════════════ */}
            <section id="sql-count" style={{ display: currentChapterIndex === 17 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">18</span>
                <h2 className="text-2xl font-bold text-foreground">
                  រាប់ចំនួន Count() (SQL Count)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Count</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Count ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Count
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            19. SQL Sum
            ══════════════════════════════════════════════ */}
            <section id="sql-sum" style={{ display: currentChapterIndex === 18 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">19</span>
                <h2 className="text-2xl font-bold text-foreground">
                  បូកសរុប Sum() (SQL Sum)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Sum</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Sum ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Sum
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            20. SQL Avg
            ══════════════════════════════════════════════ */}
            <section id="sql-avg" style={{ display: currentChapterIndex === 19 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">20</span>
                <h2 className="text-2xl font-bold text-foreground">
                  មធ្យមភាគ Avg() (SQL Avg)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Avg</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Avg ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Avg
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            21. SQL Like
            ══════════════════════════════════════════════ */}
            <section id="sql-like" style={{ display: currentChapterIndex === 20 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">21</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ស្វែងរក Like (SQL Like)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Like</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Like ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Like
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            22. SQL Wildcards
            ══════════════════════════════════════════════ */}
            <section id="sql-wildcards" style={{ display: currentChapterIndex === 21 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">22</span>
                <h2 className="text-2xl font-bold text-foreground">
                  សញ្ញាជំនួស Wildcards (SQL Wildcards)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Wildcards</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Wildcards ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Wildcards
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            23. SQL In
            ══════════════════════════════════════════════ */}
            <section id="sql-in" style={{ display: currentChapterIndex === 22 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">23</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លក្ខខណ្ឌ In (SQL In)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL In</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL In ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL In
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            24. SQL Between
            ══════════════════════════════════════════════ */}
            <section id="sql-between" style={{ display: currentChapterIndex === 23 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">24</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លក្ខខណ្ឌ Between (SQL Between)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Between</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Between ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Between
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            25. SQL Aliases
            ══════════════════════════════════════════════ */}
            <section id="sql-aliases" style={{ display: currentChapterIndex === 24 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">25</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ឈ្មោះជំនួស Aliases (SQL Aliases)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Aliases</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Aliases ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Aliases
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            26. SQL Joins
            ══════════════════════════════════════════════ */}
            <section id="sql-joins" style={{ display: currentChapterIndex === 25 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">26</span>
                <h2 className="text-2xl font-bold text-foreground">
                  សេចក្តីផ្តើមអំពី Joins (SQL Joins)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Joins</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Joins ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Joins
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            27. SQL Inner Join
            ══════════════════════════════════════════════ */}
            <section id="sql-inner-join" style={{ display: currentChapterIndex === 26 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">27</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Inner Join (SQL Inner Join)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Inner Join</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Inner Join ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Inner Join
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            28. SQL Left Join
            ══════════════════════════════════════════════ */}
            <section id="sql-left-join" style={{ display: currentChapterIndex === 27 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">28</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Left Join (SQL Left Join)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Left Join</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Left Join ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Left Join
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            29. SQL Right Join
            ══════════════════════════════════════════════ */}
            <section id="sql-right-join" style={{ display: currentChapterIndex === 28 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">29</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Right Join (SQL Right Join)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Right Join</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Right Join ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Right Join
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            30. SQL Full Join
            ══════════════════════════════════════════════ */}
            <section id="sql-full-join" style={{ display: currentChapterIndex === 29 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">30</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Full Join (SQL Full Join)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Full Join</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Full Join ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Full Join
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            31. SQL Self Join
            ══════════════════════════════════════════════ */}
            <section id="sql-self-join" style={{ display: currentChapterIndex === 30 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">31</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Self Join (SQL Self Join)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Self Join</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Self Join ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Self Join
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            32. SQL Union
            ══════════════════════════════════════════════ */}
            <section id="sql-union" style={{ display: currentChapterIndex === 31 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">32</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Union (SQL Union)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Union</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Union ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Union
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            33. SQL Union All
            ══════════════════════════════════════════════ */}
            <section id="sql-union-all" style={{ display: currentChapterIndex === 32 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">33</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Union All (SQL Union All)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Union All</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Union All ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Union All
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            34. SQL Group By
            ══════════════════════════════════════════════ */}
            <section id="sql-group-by" style={{ display: currentChapterIndex === 33 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">34</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Group By (SQL Group By)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Group By</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Group By ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Group By
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            35. SQL Having
            ══════════════════════════════════════════════ */}
            <section id="sql-having" style={{ display: currentChapterIndex === 34 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">35</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Having (SQL Having)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Having</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Having ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Having
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            36. SQL Exists
            ══════════════════════════════════════════════ */}
            <section id="sql-exists" style={{ display: currentChapterIndex === 35 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">36</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Exists (SQL Exists)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Exists</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Exists ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Exists
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            37. SQL Any
            ══════════════════════════════════════════════ */}
            <section id="sql-any" style={{ display: currentChapterIndex === 36 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">37</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Any (SQL Any)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Any</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Any ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Any
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            38. SQL All
            ══════════════════════════════════════════════ */}
            <section id="sql-all" style={{ display: currentChapterIndex === 37 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">38</span>
                <h2 className="text-2xl font-bold text-foreground">
                  All (SQL All)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL All</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL All ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL All
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            39. SQL Select Into
            ══════════════════════════════════════════════ */}
            <section id="sql-select-into" style={{ display: currentChapterIndex === 38 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">39</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Select Into (SQL Select Into)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Select Into</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Select Into ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Select Into
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            40. SQL Insert Into Select
            ══════════════════════════════════════════════ */}
            <section id="sql-insert-into-select" style={{ display: currentChapterIndex === 39 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">40</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Insert Into Select (SQL Insert Into Select)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Insert Into Select</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Insert Into Select ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Insert Into Select
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            41. SQL Case
            ══════════════════════════════════════════════ */}
            <section id="sql-case" style={{ display: currentChapterIndex === 40 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">41</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លក្ខខណ្ឌ Case (SQL Case)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Case</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Case ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Case
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            42. SQL Null Functions
            ══════════════════════════════════════════════ */}
            <section id="sql-null-functions" style={{ display: currentChapterIndex === 41 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">42</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Null Functions (SQL Null Functions)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Null Functions</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Null Functions ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Null Functions
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            43. SQL Stored Procedures
            ══════════════════════════════════════════════ */}
            <section id="sql-stored-procedures" style={{ display: currentChapterIndex === 42 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">43</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Stored Procedures (SQL Stored Procedures)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Stored Procedures</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Stored Procedures ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Stored Procedures
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            44. SQL Comments
            ══════════════════════════════════════════════ */}
            <section id="sql-comments" style={{ display: currentChapterIndex === 43 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">44</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Comments (SQL Comments)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Comments</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Comments ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Comments
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            45. SQL Operators
            ══════════════════════════════════════════════ */}
            <section id="sql-operators" style={{ display: currentChapterIndex === 44 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">45</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Operators (SQL Operators)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Operators</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Operators ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Operators
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            46. SQL Database
            ══════════════════════════════════════════════ */}
            <section id="sql-database" style={{ display: currentChapterIndex === 45 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">46</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL Database (SQL Database)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Database</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Database ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Database
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            47. SQL Create DB
            ══════════════════════════════════════════════ */}
            <section id="sql-create-db" style={{ display: currentChapterIndex === 46 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">47</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Create DB (SQL Create DB)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Create DB</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Create DB ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Create DB
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            48. SQL Drop DB
            ══════════════════════════════════════════════ */}
            <section id="sql-drop-db" style={{ display: currentChapterIndex === 47 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">48</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Drop DB (SQL Drop DB)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Drop DB</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Drop DB ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Drop DB
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            49. SQL Backup DB
            ══════════════════════════════════════════════ */}
            <section id="sql-backup-db" style={{ display: currentChapterIndex === 48 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">49</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Backup DB (SQL Backup DB)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Backup DB</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Backup DB ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Backup DB
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            50. SQL Create Table
            ══════════════════════════════════════════════ */}
            <section id="sql-create-table" style={{ display: currentChapterIndex === 49 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">50</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Create Table (SQL Create Table)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Create Table</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Create Table ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Create Table
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            51. SQL Drop Table
            ══════════════════════════════════════════════ */}
            <section id="sql-drop-table" style={{ display: currentChapterIndex === 50 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">51</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Drop Table (SQL Drop Table)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Drop Table</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Drop Table ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Drop Table
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            52. SQL Alter Table
            ══════════════════════════════════════════════ */}
            <section id="sql-alter-table" style={{ display: currentChapterIndex === 51 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">52</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Alter Table (SQL Alter Table)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Alter Table</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Alter Table ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Alter Table
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            53. SQL Constraints
            ══════════════════════════════════════════════ */}
            <section id="sql-constraints" style={{ display: currentChapterIndex === 52 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">53</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Constraints (SQL Constraints)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Constraints</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Constraints ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Constraints
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            54. SQL Not Null
            ══════════════════════════════════════════════ */}
            <section id="sql-not-null" style={{ display: currentChapterIndex === 53 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">54</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Not Null (SQL Not Null)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Not Null</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Not Null ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Not Null
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            55. SQL Unique
            ══════════════════════════════════════════════ */}
            <section id="sql-unique" style={{ display: currentChapterIndex === 54 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">55</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Unique (SQL Unique)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Unique</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Unique ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Unique
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            56. SQL Primary Key
            ══════════════════════════════════════════════ */}
            <section id="sql-primary-key" style={{ display: currentChapterIndex === 55 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">56</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Primary Key (SQL Primary Key)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Primary Key</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Primary Key ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Primary Key
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            57. SQL Foreign Key
            ══════════════════════════════════════════════ */}
            <section id="sql-foreign-key" style={{ display: currentChapterIndex === 56 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">57</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Foreign Key (SQL Foreign Key)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Foreign Key</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Foreign Key ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Foreign Key
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            58. SQL Check
            ══════════════════════════════════════════════ */}
            <section id="sql-check" style={{ display: currentChapterIndex === 57 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">58</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Check Constraint (SQL Check)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Check</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Check ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Check
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            59. SQL Default
            ══════════════════════════════════════════════ */}
            <section id="sql-default" style={{ display: currentChapterIndex === 58 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">59</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Default (SQL Default)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Default</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Default ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Default
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            60. SQL Create Index
            ══════════════════════════════════════════════ */}
            <section id="sql-create-index" style={{ display: currentChapterIndex === 59 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">60</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Create Index (SQL Create Index)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Create Index</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Create Index ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Create Index
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            61. SQL Auto Increment
            ══════════════════════════════════════════════ */}
            <section id="sql-auto-increment" style={{ display: currentChapterIndex === 60 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">61</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Auto Increment (SQL Auto Increment)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Auto Increment</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Auto Increment ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Auto Increment
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            62. SQL Dates
            ══════════════════════════════════════════════ */}
            <section id="sql-dates" style={{ display: currentChapterIndex === 61 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">62</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កាលបរិច្ឆេទ Dates (SQL Dates)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Dates</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Dates ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Dates
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            63. SQL Views
            ══════════════════════════════════════════════ */}
            <section id="sql-views" style={{ display: currentChapterIndex === 62 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">63</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Views (SQL Views)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Views</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Views ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Views
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            64. SQL Injection
            ══════════════════════════════════════════════ */}
            <section id="sql-injection" style={{ display: currentChapterIndex === 63 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">64</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL Injection (SQL Injection)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Injection</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Injection ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Injection
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            65. SQL Parameters
            ══════════════════════════════════════════════ */}
            <section id="sql-parameters" style={{ display: currentChapterIndex === 64 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">65</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Parameters (SQL Parameters)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Parameters</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Parameters ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Parameters
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            66. SQL Prepared Statements
            ══════════════════════════════════════════════ */}
            <section id="sql-prepared-statements" style={{ display: currentChapterIndex === 65 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">66</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Prepared Statements (SQL Prepared Statements)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Prepared Statements</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Prepared Statements ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Prepared Statements
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            67. SQL Hosting
            ══════════════════════════════════════════════ */}
            <section id="sql-hosting" style={{ display: currentChapterIndex === 66 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">67</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Hosting (SQL Hosting)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Hosting</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Hosting ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Hosting
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            68. SQL Cert
            ══════════════════════════════════════════════ */}
            <section id="sql-cert" style={{ display: currentChapterIndex === 67 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">68</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL Cert (SQL Cert)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Cert</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Cert ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Cert
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            69. SQL Certificate
            ══════════════════════════════════════════════ */}
            <section id="sql-certificate" style={{ display: currentChapterIndex === 68 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">69</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL Certificate (SQL Certificate)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Certificate</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Certificate ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Certificate
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            70. SQL References
            ══════════════════════════════════════════════ */}
            <section id="sql-references" style={{ display: currentChapterIndex === 69 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">70</span>
                <h2 className="text-2xl font-bold text-foreground">
                  SQL References (SQL References)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL References</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL References ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL References
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            71. SQL Data Types
            ══════════════════════════════════════════════ */}
            <section id="sql-data-types" style={{ display: currentChapterIndex === 70 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">71</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Data Types (SQL Data Types)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Data Types</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Data Types ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Data Types
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            72. SQL Keywords
            ══════════════════════════════════════════════ */}
            <section id="sql-keywords" style={{ display: currentChapterIndex === 71 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">72</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Keywords (SQL Keywords)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">SQL Keywords</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ SQL Keywords ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for SQL Keywords
SELECT * FROM table_name;`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            73. MySQL Functions
            ══════════════════════════════════════════════ */}
            <section id="mysql-functions" style={{ display: currentChapterIndex === 72 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">73</span>
                <h2 className="text-2xl font-bold text-foreground">
                  MySQL Functions (MySQL Functions)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងរៀនអំពី <strong className="text-foreground">MySQL Functions</strong> ដែលជាផ្នែកមួយដ៏សំខាន់ក្នុងការសរសេរ SQL។
              </p>

              <Note>
                រៀនពីមូលដ្ឋានគ្រឹះនៃ MySQL Functions ដើម្បីប្រើប្រាស់វាក្នុងការគ្រប់គ្រងទិន្នន័យ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍កូដ (Code Example)</h3>
              <CodeBlock>{`-- Example SQL for MySQL Functions
SELECT * FROM table_name;`}</CodeBlock>
            </section>
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
                fetch('/api/progress/sql', { 
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
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
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
              រំលង &gt;
            </AlertDialogAction>
            <AlertDialogAction onClick={() => router.push('/login')}>
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
              អ្នកបានបញ្ចប់វគ្គសិក្សា <strong>SQL Basics</strong> ទាំងស្រុងដោយជោគជ័យ! <br/>
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
