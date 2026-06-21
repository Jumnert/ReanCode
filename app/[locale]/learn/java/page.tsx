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
  java_ch1: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 1\");
  }
}`,
  java_ch2: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 2\");
  }
}`,
  java_ch3: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 3\");
  }
}`,
  java_ch4: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 4\");
  }
}`,
  java_ch5: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 5\");
  }
}`,
  java_ch6: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 6\");
  }
}`,
  java_ch7: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 7\");
  }
}`,
  java_ch8: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 8\");
  }
}`,
  java_ch9: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 9\");
  }
}`,
  java_ch10: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 10\");
  }
}`,
  java_ch11: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 11\");
  }
}`,
  java_ch12: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 12\");
  }
}`,
  java_ch13: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 13\");
  }
}`,
  java_ch14: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 14\");
  }
}`,
  java_ch15: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 15\");
  }
}`,
  java_ch16: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 16\");
  }
}`,
  java_ch17: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 17\");
  }
}`,
  java_ch18: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 18\");
  }
}`,
  java_ch19: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 19\");
  }
}`,
  java_ch20: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 20\");
  }
}`,
  java_ch21: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 21\");
  }
}`,
  java_ch22: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 22\");
  }
}`,
  java_ch23: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 23\");
  }
}`,
  java_ch24: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 24\");
  }
}`,
  java_ch25: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 25\");
  }
}`,
  java_ch26: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 26\");
  }
}`,
  java_ch27: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 27\");
  }
}`,
  java_ch28: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 28\");
  }
}`,
  java_ch29: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 29\");
  }
}`,
  java_ch30: `public class Main {
  public static void main(String[] args) {
    System.out.println(\"Hello Chapter 30\");
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
  "java_ch1": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 1 នេះ?",
    questionEnglish: "What are the key points in Chapter 1?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch2": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 2 នេះ?",
    questionEnglish: "What are the key points in Chapter 2?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch3": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 3 នេះ?",
    questionEnglish: "What are the key points in Chapter 3?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch4": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 4 នេះ?",
    questionEnglish: "What are the key points in Chapter 4?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch5": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 5 នេះ?",
    questionEnglish: "What are the key points in Chapter 5?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch6": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 6 នេះ?",
    questionEnglish: "What are the key points in Chapter 6?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch7": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 7 នេះ?",
    questionEnglish: "What are the key points in Chapter 7?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch8": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 8 នេះ?",
    questionEnglish: "What are the key points in Chapter 8?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch9": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 9 នេះ?",
    questionEnglish: "What are the key points in Chapter 9?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch10": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 10 នេះ?",
    questionEnglish: "What are the key points in Chapter 10?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch11": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 11 នេះ?",
    questionEnglish: "What are the key points in Chapter 11?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch12": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 12 នេះ?",
    questionEnglish: "What are the key points in Chapter 12?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch13": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 13 នេះ?",
    questionEnglish: "What are the key points in Chapter 13?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch14": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 14 នេះ?",
    questionEnglish: "What are the key points in Chapter 14?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch15": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 15 នេះ?",
    questionEnglish: "What are the key points in Chapter 15?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch16": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 16 នេះ?",
    questionEnglish: "What are the key points in Chapter 16?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch17": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 17 នេះ?",
    questionEnglish: "What are the key points in Chapter 17?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch18": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 18 នេះ?",
    questionEnglish: "What are the key points in Chapter 18?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch19": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 19 នេះ?",
    questionEnglish: "What are the key points in Chapter 19?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch20": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 20 នេះ?",
    questionEnglish: "What are the key points in Chapter 20?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch21": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 21 នេះ?",
    questionEnglish: "What are the key points in Chapter 21?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch22": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 22 នេះ?",
    questionEnglish: "What are the key points in Chapter 22?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch23": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 23 នេះ?",
    questionEnglish: "What are the key points in Chapter 23?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch24": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 24 នេះ?",
    questionEnglish: "What are the key points in Chapter 24?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch25": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 25 នេះ?",
    questionEnglish: "What are the key points in Chapter 25?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch26": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 26 នេះ?",
    questionEnglish: "What are the key points in Chapter 26?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch27": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 27 នេះ?",
    questionEnglish: "What are the key points in Chapter 27?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch28": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 28 នេះ?",
    questionEnglish: "What are the key points in Chapter 28?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch29": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 29 នេះ?",
    questionEnglish: "What are the key points in Chapter 29?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
  },
  "java_ch30": {
    questionKhmer: "តើចំណុចសំខាន់អ្វីខ្លះនៅក្នុងមេរៀនទី 30 នេះ?",
    questionEnglish: "What are the key points in Chapter 30?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "ចម្លើយត្រឹមត្រូវគឺ A ពីព្រោះ..."
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

export default function LearnJavaPage() {
  const { data: session } = useSession();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const totalChapters = 30;
  const CHAPTER_IDS = ["java_ch1", "java_ch2", "java_ch3", "java_ch4", "java_ch5", "java_ch6", "java_ch7", "java_ch8", "java_ch9", "java_ch10", "java_ch11", "java_ch12", "java_ch13", "java_ch14", "java_ch15", "java_ch16", "java_ch17", "java_ch18", "java_ch19", "java_ch20", "java_ch21", "java_ch22", "java_ch23", "java_ch24", "java_ch25", "java_ch26", "java_ch27", "java_ch28", "java_ch29", "java_ch30"];

  return <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
    <div className="flex-1 overflow-y-auto px-4 py-10 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">សិក្សាភាសា Java (កម្រិតដំបូងដល់កម្រិតខ្ពស់)</h1>
        <div className="divide-y divide-zinc-200">

          <section style={{ display: currentChapterIndex === 0 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">1. មេរៀន Java ទី 1: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 1 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch1} output="Hello Chapter 1\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch1" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 1 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">2. មេរៀន Java ទី 2: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 2 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch2} output="Hello Chapter 2\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch2" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 2 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">3. មេរៀន Java ទី 3: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 3 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch3} output="Hello Chapter 3\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch3" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 3 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">4. មេរៀន Java ទី 4: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 4 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch4} output="Hello Chapter 4\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch4" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 4 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">5. មេរៀន Java ទី 5: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 5 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch5} output="Hello Chapter 5\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch5" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 5 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">6. មេរៀន Java ទី 6: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 6 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch6} output="Hello Chapter 6\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch6" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 6 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">7. មេរៀន Java ទី 7: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 7 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch7} output="Hello Chapter 7\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch7" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 7 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">8. មេរៀន Java ទី 8: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 8 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch8} output="Hello Chapter 8\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch8" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 8 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">9. មេរៀន Java ទី 9: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 9 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch9} output="Hello Chapter 9\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch9" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 9 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">10. មេរៀន Java ទី 10: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 10 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch10} output="Hello Chapter 10\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch10" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 10 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">11. មេរៀន Java ទី 11: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 11 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch11} output="Hello Chapter 11\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch11" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 11 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">12. មេរៀន Java ទី 12: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 12 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch12} output="Hello Chapter 12\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch12" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 12 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">13. មេរៀន Java ទី 13: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 13 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch13} output="Hello Chapter 13\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch13" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 13 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">14. មេរៀន Java ទី 14: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 14 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch14} output="Hello Chapter 14\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch14" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 14 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">15. មេរៀន Java ទី 15: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 15 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch15} output="Hello Chapter 15\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch15" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 15 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">16. មេរៀន Java ទី 16: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 16 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch16} output="Hello Chapter 16\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch16" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 16 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">17. មេរៀន Java ទី 17: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 17 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch17} output="Hello Chapter 17\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch17" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 17 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">18. មេរៀន Java ទី 18: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 18 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch18} output="Hello Chapter 18\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch18" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 18 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">19. មេរៀន Java ទី 19: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 19 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch19} output="Hello Chapter 19\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch19" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 19 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">20. មេរៀន Java ទី 20: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 20 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch20} output="Hello Chapter 20\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch20" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 20 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">21. មេរៀន Java ទី 21: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 21 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch21} output="Hello Chapter 21\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch21" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 21 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">22. មេរៀន Java ទី 22: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 22 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch22} output="Hello Chapter 22\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch22" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 22 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">23. មេរៀន Java ទី 23: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 23 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch23} output="Hello Chapter 23\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch23" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 23 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">24. មេរៀន Java ទី 24: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 24 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch24} output="Hello Chapter 24\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch24" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 24 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">25. មេរៀន Java ទី 25: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 25 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch25} output="Hello Chapter 25\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch25" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 25 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">26. មេរៀន Java ទី 26: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 26 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch26} output="Hello Chapter 26\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch26" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 26 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">27. មេរៀន Java ទី 27: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 27 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch27} output="Hello Chapter 27\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch27" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 27 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">28. មេរៀន Java ទី 28: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 28 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch28} output="Hello Chapter 28\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch28" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 28 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">29. មេរៀន Java ទី 29: Fundamentals</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 29 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch29} output="Hello Chapter 29\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch29" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>
          <section style={{ display: currentChapterIndex === 29 ? "block" : "none" }} className="py-16">
            <h2 className="text-2xl font-bold">30. មេរៀន Java ទី 30: OOP</h2>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <p className="my-4">នេះគឺជាមេរៀនទី 30 នៃភាសា Java ដែលផ្តោតទៅលើការសរសេរកូដប្រកបដោយប្រសិទ្ធភាព។</p>
            <p className="my-4">Java គឺជាភាសាកម្មវិធីដ៏មានប្រជាប្រិយភាពមួយនៅលើពិភពលោក ដែលត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយ។</p>
            <p className="my-4">លក្ខណៈពិសេសរបស់ Java រួមមាន Object-Oriented, Platform Independent (JVM) និង Security ខ្ពស់។</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Platform Independent</h3>
                <p className="text-sm">Write Once, Run Anywhere ដោយសារមាន JVM (Java Virtual Machine) ជាអ្នកបកប្រែកូដទៅជាម៉ាស៊ីន។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Object-Oriented</h3>
                <p className="text-sm">Java ផ្តោតលើ Objects និង Classes ដែលជួយឲ្យកូដមានរបៀបរៀបរយ និងងាយស្រួលថែរក្សា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Strongly Typed</h3>
                <p className="text-sm">អ្នកត្រូវតែប្រកាសប្រភេទនៃអថេរជានិច្ច មុននឹងប្រើប្រាស់វា។</p>
              </div>
              <div className="p-4 border rounded-xl shadow-sm bg-card">
                <h3 className="font-bold">Garbage Collection</h3>
                <p className="text-sm">Java នឹងលុបចោលនូវ Memory ដែលមិនប្រើប្រាស់ដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <MockCompiler language="java" defaultCode={code.java_ch30} output="Hello Chapter 30\nProcess finished with exit code 0" />
            <div className="mt-8">
              <Quiz chapterId="java_ch30" isCompleted={false} onCorrect={() => {}} />
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>
}
