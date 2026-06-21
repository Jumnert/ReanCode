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
  "git-home": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git HOME ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git HOME?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git HOME គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-intro": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Intro ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Intro?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Intro គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-install": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Install ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Install?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Install គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-config": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Config ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Config?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Config គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-get-started": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Get Started ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Get Started?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Get Started គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-new-files": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git New Files ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git New Files?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git New Files គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-staging": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Staging ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Staging?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Staging គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-commit": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Commit ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Commit?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Commit គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-tagging": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Tagging ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Tagging?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Tagging គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-stash": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Stash ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Stash?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Stash គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-history": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git History ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git History?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git History គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-help": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Help ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Help?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Help គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-branch": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Branch ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Branch?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Branch គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-merge": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Merge ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Merge?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Merge គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-workflow": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Workflow ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Workflow?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Workflow គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-best-practices": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Best Practices ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Best Practices?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Best Practices គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-glossary": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Glossary ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Glossary?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Glossary គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-get-started": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Get Started ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Get Started?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Get Started គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-what-is-ssh": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git What is SSH? ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git What is SSH??",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git What is SSH? គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-add-ssh": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Add SSH ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Add SSH?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Add SSH គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-set-remote": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Set Remote ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Set Remote?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Set Remote គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-edit-code": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Edit Code ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Edit Code?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Edit Code គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "pull-from-github": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Pull from GitHub ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Pull from GitHub?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Pull from GitHub គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "push-to-github": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Push to GitHub ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Push to GitHub?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Push to GitHub គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-branch": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Branch ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Branch?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Branch គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "pull-branch-from-github": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Pull Branch from GitHub ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Pull Branch from GitHub?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Pull Branch from GitHub គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "push-branch-to-github": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Push Branch to GitHub ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Push Branch to GitHub?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Push Branch to GitHub គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-flow": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Flow ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Flow?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Flow គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-pages": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Pages ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Pages?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Pages គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-gui-clients": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git GUI Clients ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git GUI Clients?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git GUI Clients គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-fork": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Fork ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Fork?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Fork គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-clone-from-github": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Clone from GitHub ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Clone from GitHub?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Clone from GitHub គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "github-send-pull-request": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច GitHub Send Pull Request ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of GitHub Send Pull Request?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "GitHub Send Pull Request គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-revert": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Revert ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Revert?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Revert គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-reset": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Reset ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Reset?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Reset គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-amend": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Amend ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Amend?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Amend គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-rebase": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Rebase ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Rebase?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Rebase គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-reflog": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Reflog ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Reflog?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Reflog គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-recovery": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Recovery ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Recovery?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Recovery គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-gitignore": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git .gitignore ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git .gitignore?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git .gitignore គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-gitattributes": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git .gitattributes ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git .gitattributes?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git .gitattributes គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-lfs": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Large File Storage (LFS) ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Large File Storage (LFS)?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Large File Storage (LFS) គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-signing": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Signing Commits/Tags ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Signing Commits/Tags?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Signing Commits/Tags គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-cherrypick-patch": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Cherrypick & Patch ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Cherrypick & Patch?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Cherrypick & Patch គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-merge-conflicts": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Merge Conflicts ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Merge Conflicts?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Merge Conflicts គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-cicd": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git CI/CD ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git CI/CD?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git CI/CD គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-hooks": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Hooks ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Hooks?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Hooks គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-submodules": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Submodules ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Submodules?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Submodules គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-remote-advanced": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Remote Advanced ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Remote Advanced?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Remote Advanced គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-cert": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Cert ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Cert?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Cert គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-certificate": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Certificate ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Certificate?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Certificate គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-exercises": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Exercises ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Exercises?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Exercises គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-quiz": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Quiz ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Quiz?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Quiz គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-syllabus": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Syllabus ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Syllabus?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Syllabus គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
  },
  "git-study-plan": {
    questionKhmer: "តើអ្នកយល់ដឹងច្បាស់ពីចំណុច Git Study Plan ដែរឬទេ?",
    questionEnglish: "Do you understand the key concept of Git Study Plan?",
    options: [
      "យល់ដឹងច្បាស់លាស់ និងអាចយកទៅប្រើប្រាស់បាន",
      "យល់ខ្លះៗ ប៉ុន្តែត្រូវការអនុវត្តបន្ថែម",
      "មិនទាន់យល់ច្បាស់ទេ",
      "កំពុងតែសិក្សានៅឡើយ"
    ],
    correctIndex: 0,
    explanation: "Git Study Plan គឺជាចំណុចគ្រឹះយ៉ាងសំខាន់សម្រាប់ការគ្រប់គ្រង និងតាមដានកូដជាមួយ Git ឲ្យមានប្រសិទ្ធភាព។"
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
export default function LearnGitPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const totalChapters = 55;

  const CHAPTER_IDS = [
    "git-home",
    "git-intro",
    "git-install",
    "git-config",
    "git-get-started",
    "git-new-files",
    "git-staging",
    "git-commit",
    "git-tagging",
    "git-stash",
    "git-history",
    "git-help",
    "git-branch",
    "git-merge",
    "git-workflow",
    "git-best-practices",
    "git-glossary",
    "github-get-started",
    "git-what-is-ssh",
    "github-add-ssh",
    "github-set-remote",
    "github-edit-code",
    "pull-from-github",
    "push-to-github",
    "github-branch",
    "pull-branch-from-github",
    "push-branch-to-github",
    "github-flow",
    "github-pages",
    "git-gui-clients",
    "github-fork",
    "git-clone-from-github",
    "github-send-pull-request",
    "git-revert",
    "git-reset",
    "git-amend",
    "git-rebase",
    "git-reflog",
    "git-recovery",
    "git-gitignore",
    "git-gitattributes",
    "git-lfs",
    "git-signing",
    "git-cherrypick-patch",
    "git-merge-conflicts",
    "git-cicd",
    "git-hooks",
    "git-submodules",
    "git-remote-advanced",
    "git-cert",
    "git-certificate",
    "git-exercises",
    "git-quiz",
    "git-syllabus",
    "git-study-plan"
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
    fetch('/api/progress/git')
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
              <span>ប្រព័ន្ធ Git — មេរៀនទី ១</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              សិក្សាប្រព័ន្ធគ្រប់គ្រងកំណែកូដ Git
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
              Git គឺជា Distributed Version Control System ដែលពេញនិយមបំផុតសម្រាប់តាមដានរាល់ការផ្លាស់ប្តូរកូដ សម្រួលដល់ការធ្វើការងារជាក្រុម និងគ្រប់គ្រងប្រវត្តិនៃការអភិវឌ្ឍន៍កម្មវិធី។
            </p>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 [&>section]:py-16 first:[&>section]:pt-0">
            {/* ══════════════════════════════════════════════
            1. Git HOME
            ══════════════════════════════════════════════ */}
            <section id="git-home" style={{ display: currentChapterIndex === 0 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">1</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ទំព័រដើម Git (Git HOME)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git HOME</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git HOME ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git HOME
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            2. Git Intro
            ══════════════════════════════════════════════ */}
            <section id="git-intro" style={{ display: currentChapterIndex === 1 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">2</span>
                <h2 className="text-2xl font-bold text-foreground">
                  សេចក្តីផ្តើមអំពី Git (Git Intro)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Intro</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Intro ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Intro
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            3. Git Install
            ══════════════════════════════════════════════ */}
            <section id="git-install" style={{ display: currentChapterIndex === 2 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">3</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការដំឡើង Git (Git Install)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Install</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Install ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Install
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            4. Git Config
            ══════════════════════════════════════════════ */}
            <section id="git-config" style={{ display: currentChapterIndex === 3 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">4</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការកំណត់ Config ក្នុង Git (Git Config)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Config</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Config ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Config
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            5. Git Get Started
            ══════════════════════════════════════════════ */}
            <section id="git-get-started" style={{ display: currentChapterIndex === 4 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">5</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការចាប់ផ្តើមដំបូង (Git Get Started)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Get Started</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Get Started ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Get Started
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            6. Git New Files
            ══════════════════════════════════════════════ */}
            <section id="git-new-files" style={{ display: currentChapterIndex === 5 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">6</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ឯកសារថ្មីក្នុង Git (Git New Files)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git New Files</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git New Files ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git New Files
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            7. Git Staging
            ══════════════════════════════════════════════ */}
            <section id="git-staging" style={{ display: currentChapterIndex === 6 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">7</span>
                <h2 className="text-2xl font-bold text-foreground">
                  តំបន់ Staging (Git Staging)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Staging</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Staging ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Staging
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            8. Git Commit
            ══════════════════════════════════════════════ */}
            <section id="git-commit" style={{ display: currentChapterIndex === 7 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">8</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការ Commit ឯកសារ (Git Commit)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Commit</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Commit ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Commit
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            9. Git Tagging
            ══════════════════════════════════════════════ */}
            <section id="git-tagging" style={{ display: currentChapterIndex === 8 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">9</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការបង្កើត Tag (Git Tagging)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Tagging</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Tagging ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Tagging
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            10. Git Stash
            ══════════════════════════════════════════════ */}
            <section id="git-stash" style={{ display: currentChapterIndex === 9 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">10</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការប្រើប្រាស់ Stash (Git Stash)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Stash</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Stash ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Stash
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            11. Git History
            ══════════════════════════════════════════════ */}
            <section id="git-history" style={{ display: currentChapterIndex === 10 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">11</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ប្រវត្តិនៃ Commits (Git History)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git History</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git History ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git History
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            12. Git Help
            ══════════════════════════════════════════════ */}
            <section id="git-help" style={{ display: currentChapterIndex === 11 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">12</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ជំនួយរហ័ស Git Help (Git Help)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Help</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Help ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Help
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            13. Git Branch
            ══════════════════════════════════════════════ */}
            <section id="git-branch" style={{ display: currentChapterIndex === 12 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">13</span>
                <h2 className="text-2xl font-bold text-foreground">
                  មែកធាង Git Branch (Git Branch)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Branch</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Branch ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Branch
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            14. Git Merge
            ══════════════════════════════════════════════ */}
            <section id="git-merge" style={{ display: currentChapterIndex === 13 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">14</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការច្របាច់បញ្ចូលគ្នា (Git Merge)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Merge</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Merge ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Merge
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            15. Git Workflow
            ══════════════════════════════════════════════ */}
            <section id="git-workflow" style={{ display: currentChapterIndex === 14 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">15</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លំហូរការងារ Git Workflow (Git Workflow)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Workflow</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Workflow ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Workflow
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            16. Git Best Practices
            ══════════════════════════════════════════════ */}
            <section id="git-best-practices" style={{ display: currentChapterIndex === 15 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">16</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការអនុវត្តល្អបំផុត (Git Best Practices)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Best Practices</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Best Practices ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Best Practices
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            17. Git Glossary
            ══════════════════════════════════════════════ */}
            <section id="git-glossary" style={{ display: currentChapterIndex === 16 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">17</span>
                <h2 className="text-2xl font-bold text-foreground">
                  វចនានុក្រម Git Glossary (Git Glossary)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Glossary</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Glossary ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Glossary
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            18. GitHub Get Started
            ══════════════════════════════════════════════ */}
            <section id="github-get-started" style={{ display: currentChapterIndex === 17 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">18</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ចាប់ផ្តើមជាមួយ GitHub (GitHub Get Started)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Get Started</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Get Started ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Get Started
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            19. Git What is SSH?
            ══════════════════════════════════════════════ */}
            <section id="git-what-is-ssh" style={{ display: currentChapterIndex === 18 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">19</span>
                <h2 className="text-2xl font-bold text-foreground">
                  តើអ្វីទៅជា SSH? (Git What is SSH?)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git What is SSH?</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git What is SSH? ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git What is SSH?
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            20. GitHub Add SSH
            ══════════════════════════════════════════════ */}
            <section id="github-add-ssh" style={{ display: currentChapterIndex === 19 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">20</span>
                <h2 className="text-2xl font-bold text-foreground">
                  បន្ថែមសោ SSH ទៅ GitHub (GitHub Add SSH)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Add SSH</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Add SSH ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Add SSH
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            21. GitHub Set Remote
            ══════════════════════════════════════════════ */}
            <section id="github-set-remote" style={{ display: currentChapterIndex === 20 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">21</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កំណត់ Remote Server (GitHub Set Remote)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Set Remote</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Set Remote ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Set Remote
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            22. GitHub Edit Code
            ══════════════════════════════════════════════ */}
            <section id="github-edit-code" style={{ display: currentChapterIndex === 21 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">22</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កែប្រែកូដលើ GitHub (GitHub Edit Code)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Edit Code</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Edit Code ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Edit Code
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            23. Pull from GitHub
            ══════════════════════════════════════════════ */}
            <section id="pull-from-github" style={{ display: currentChapterIndex === 22 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">23</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការទាញកូដ Pull (Pull from GitHub)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Pull from GitHub</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Pull from GitHub ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Pull from GitHub
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            24. Push to GitHub
            ══════════════════════════════════════════════ */}
            <section id="push-to-github" style={{ display: currentChapterIndex === 23 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">24</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការបញ្ជូនកូដ Push (Push to GitHub)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Push to GitHub</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Push to GitHub ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Push to GitHub
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            25. GitHub Branch
            ══════════════════════════════════════════════ */}
            <section id="github-branch" style={{ display: currentChapterIndex === 24 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">25</span>
                <h2 className="text-2xl font-bold text-foreground">
                  មែកធាងលើ GitHub (GitHub Branch)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Branch</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Branch ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Branch
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            26. Pull Branch from GitHub
            ══════════════════════════════════════════════ */}
            <section id="pull-branch-from-github" style={{ display: currentChapterIndex === 25 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">26</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ទាញមែកធាង Pull Branch (Pull Branch from GitHub)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Pull Branch from GitHub</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Pull Branch from GitHub ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Pull Branch from GitHub
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            27. Push Branch to GitHub
            ══════════════════════════════════════════════ */}
            <section id="push-branch-to-github" style={{ display: currentChapterIndex === 26 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">27</span>
                <h2 className="text-2xl font-bold text-foreground">
                  បញ្ជូនមែកធាង Push Branch (Push Branch to GitHub)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Push Branch to GitHub</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Push Branch to GitHub ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Push Branch to GitHub
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            28. GitHub Flow
            ══════════════════════════════════════════════ */}
            <section id="github-flow" style={{ display: currentChapterIndex === 27 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">28</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លំហូរ GitHub Flow (GitHub Flow)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Flow</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Flow ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Flow
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            29. GitHub Pages
            ══════════════════════════════════════════════ */}
            <section id="github-pages" style={{ display: currentChapterIndex === 28 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">29</span>
                <h2 className="text-2xl font-bold text-foreground">
                  បង្កើតទំព័រ GitHub Pages (GitHub Pages)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Pages</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Pages ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Pages
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            30. Git GUI Clients
            ══════════════════════════════════════════════ */}
            <section id="git-gui-clients" style={{ display: currentChapterIndex === 29 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">30</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កម្មវិធី Git GUI (Git GUI Clients)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git GUI Clients</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git GUI Clients ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git GUI Clients
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            31. GitHub Fork
            ══════════════════════════════════════════════ */}
            <section id="github-fork" style={{ display: currentChapterIndex === 30 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">31</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការ Fork គម្រោង (GitHub Fork)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Fork</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Fork ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Fork
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            32. Git Clone from GitHub
            ══════════════════════════════════════════════ */}
            <section id="git-clone-from-github" style={{ display: currentChapterIndex === 31 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">32</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការ Clone គម្រោង (Git Clone from GitHub)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Clone from GitHub</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Clone from GitHub ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Clone from GitHub
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            33. GitHub Send Pull Request
            ══════════════════════════════════════════════ */}
            <section id="github-send-pull-request" style={{ display: currentChapterIndex === 32 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">33</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ផ្ញើ Pull Request (GitHub Send Pull Request)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">GitHub Send Pull Request</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា GitHub Send Pull Request ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for GitHub Send Pull Request
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            34. Git Revert
            ══════════════════════════════════════════════ */}
            <section id="git-revert" style={{ display: currentChapterIndex === 33 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">34</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការ Revert កូដ (Git Revert)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Revert</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Revert ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Revert
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            35. Git Reset
            ══════════════════════════════════════════════ */}
            <section id="git-reset" style={{ display: currentChapterIndex === 34 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">35</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការ Reset កូដ (Git Reset)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Reset</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Reset ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Reset
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            36. Git Amend
            ══════════════════════════════════════════════ */}
            <section id="git-amend" style={{ display: currentChapterIndex === 35 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">36</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កែប្រែ Commit ចុងក្រោយ (Git Amend)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Amend</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Amend ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Amend
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            37. Git Rebase
            ══════════════════════════════════════════════ */}
            <section id="git-rebase" style={{ display: currentChapterIndex === 36 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">37</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការផ្ទេរគល់ Git Rebase (Git Rebase)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Rebase</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Rebase ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Rebase
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            38. Git Reflog
            ══════════════════════════════════════════════ */}
            <section id="git-reflog" style={{ display: currentChapterIndex === 37 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">38</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កំណត់ហេតុ Reflog (Git Reflog)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Reflog</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Reflog ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Reflog
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            39. Git Recovery
            ══════════════════════════════════════════════ */}
            <section id="git-recovery" style={{ display: currentChapterIndex === 38 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">39</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការស្ដារកូដដែលបាត់បង់ (Git Recovery)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Recovery</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Recovery ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Recovery
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            40. Git .gitignore
            ══════════════════════════════════════════════ */}
            <section id="git-gitignore" style={{ display: currentChapterIndex === 39 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">40</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការដកចេញ .gitignore (Git .gitignore)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git .gitignore</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git .gitignore ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git .gitignore
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            41. Git .gitattributes
            ══════════════════════════════════════════════ */}
            <section id="git-gitattributes" style={{ display: currentChapterIndex === 40 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">41</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កំណត់លក្ខណៈឯកសារ (Git .gitattributes)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git .gitattributes</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git .gitattributes ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git .gitattributes
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            42. Git Large File Storage (LFS)
            ══════════════════════════════════════════════ */}
            <section id="git-lfs" style={{ display: currentChapterIndex === 41 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">42</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ផ្ទុកឯកសារធំៗ Git LFS (Git Large File Storage (LFS))
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Large File Storage (LFS)</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Large File Storage (LFS) ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Large File Storage (LFS)
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            43. Git Signing Commits/Tags
            ══════════════════════════════════════════════ */}
            <section id="git-signing" style={{ display: currentChapterIndex === 42 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">43</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការចុះហត្ថលេខាឌីជីថល (Git Signing Commits/Tags)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Signing Commits/Tags</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Signing Commits/Tags ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Signing Commits/Tags
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            44. Git Cherrypick & Patch
            ══════════════════════════════════════════════ */}
            <section id="git-cherrypick-patch" style={{ display: currentChapterIndex === 43 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">44</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Cherrypick & Patch (Git Cherrypick & Patch)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Cherrypick & Patch</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Cherrypick & Patch ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Cherrypick & Patch
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            45. Git Merge Conflicts
            ══════════════════════════════════════════════ */}
            <section id="git-merge-conflicts" style={{ display: currentChapterIndex === 44 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">45</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ដោះស្រាយជម្លោះកូដ (Git Merge Conflicts)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Merge Conflicts</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Merge Conflicts ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Merge Conflicts
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            46. Git CI/CD
            ══════════════════════════════════════════════ */}
            <section id="git-cicd" style={{ display: currentChapterIndex === 45 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">46</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ការរួមបញ្ចូលស្វ័យប្រវត្ត CI/CD (Git CI/CD)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git CI/CD</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git CI/CD ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git CI/CD
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            47. Git Hooks
            ══════════════════════════════════════════════ */}
            <section id="git-hooks" style={{ display: currentChapterIndex === 46 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">47</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ស្គ្រីបស្វ័យប្រវត្ត Git Hooks (Git Hooks)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Hooks</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Hooks ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Hooks
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            48. Git Submodules
            ══════════════════════════════════════════════ */}
            <section id="git-submodules" style={{ display: currentChapterIndex === 47 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">48</span>
                <h2 className="text-2xl font-bold text-foreground">
                  គម្រោងរង Git Submodules (Git Submodules)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Submodules</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Submodules ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Submodules
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            49. Git Remote Advanced
            ══════════════════════════════════════════════ */}
            <section id="git-remote-advanced" style={{ display: currentChapterIndex === 48 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">49</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Remote Advanced (Git Remote Advanced)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Remote Advanced</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Remote Advanced ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Remote Advanced
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            50. Git Cert
            ══════════════════════════════════════════════ */}
            <section id="git-cert" style={{ display: currentChapterIndex === 49 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">50</span>
                <h2 className="text-2xl font-bold text-foreground">
                  Git Cert (Git Cert)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Cert</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Cert ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Cert
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            51. Git Certificate
            ══════════════════════════════════════════════ */}
            <section id="git-certificate" style={{ display: currentChapterIndex === 50 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">51</span>
                <h2 className="text-2xl font-bold text-foreground">
                  វិញ្ញាបនបត្រ Git (Git Certificate)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Certificate</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Certificate ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Certificate
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            52. Git Exercises
            ══════════════════════════════════════════════ */}
            <section id="git-exercises" style={{ display: currentChapterIndex === 51 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">52</span>
                <h2 className="text-2xl font-bold text-foreground">
                  លំហាត់អនុវត្ត Git (Git Exercises)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Exercises</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Exercises ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Exercises
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            53. Git Quiz
            ══════════════════════════════════════════════ */}
            <section id="git-quiz" style={{ display: currentChapterIndex === 52 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">53</span>
                <h2 className="text-2xl font-bold text-foreground">
                  កម្រងសំណួរ Git Quiz (Git Quiz)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Quiz</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Quiz ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Quiz
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            54. Git Syllabus
            ══════════════════════════════════════════════ */}
            <section id="git-syllabus" style={{ display: currentChapterIndex === 53 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">54</span>
                <h2 className="text-2xl font-bold text-foreground">
                  មាតិកាវគ្គសិក្សា (Git Syllabus)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Syllabus</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Syllabus ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Syllabus
git status`}</CodeBlock>
            </section>
            {/* ══════════════════════════════════════════════
            55. Git Study Plan
            ══════════════════════════════════════════════ */}
            <section id="git-study-plan" style={{ display: currentChapterIndex === 54 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b pb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">55</span>
                <h2 className="text-2xl font-bold text-foreground">
                  ផែនការសិក្សា Git (Git Study Plan)
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                នៅក្នុងមេរៀននេះ យើងនឹងស្វែងយល់អំពី <strong className="text-foreground">Git Study Plan</strong> ដែលជាបច្ចេកទេស និងបទបញ្ជាសំខាន់នៅក្នុង Git។
              </p>

              <Note>
                យល់ដឹងពីមូលដ្ឋានគ្រឹះ និងរបៀបបញ្ជា Git Study Plan ក្នុងការងារប្រចាំថ្ងៃ។
              </Note>

              <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍បញ្ជា (Command Example)</h3>
              <CodeBlock>{`# Example command for Git Study Plan
git status`}</CodeBlock>
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
                fetch('/api/progress/git', { 
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
              អ្នកបានបញ្ចប់វគ្គសិក្សា <strong>Git Basics</strong> ទាំងស្រុងដោយជោគជ័យ! <br/>
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
