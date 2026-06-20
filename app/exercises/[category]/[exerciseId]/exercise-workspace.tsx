"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, Check, Lightbulb, Eye } from "lucide-react";
import { HtmlCompiler } from "@/components/html-compiler";
import { JsCompiler } from "@/components/js-compiler";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { useWebHaptics } from "web-haptics/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface TestCase {
  test?: string;
  input?: string;
  description?: string;
}

export interface ExerciseData {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hint?: string | null;
  points: number;
  testCases?: TestCase[];
  lesson?: {
    course?: {
      title: string;
    };
  };
}

export function ExerciseWorkspace({ exercise, rawCategory, isHtml }: { exercise: ExerciseData, rawCategory: string, isHtml: boolean }) {
  const [code, setCode] = useState(exercise.starterCode || "");
  const { trigger } = useWebHaptics();

  // Derive live test case states
  let parsedDoc: Document | null = null;
  if (typeof window !== "undefined" && isHtml) {
    const parser = new DOMParser();
    parsedDoc = parser.parseFromString(code, "text/html");
  }

  const checkTestCase = (tc: TestCase) => {
    const codeToTest = tc.test || tc.input;
    if (!codeToTest || (isHtml && !parsedDoc)) return false;
    try {
      // If the code contains "return", we don't need to prepend "return"
      const body = codeToTest.includes('return') ? codeToTest : `return ${codeToTest}`;
      const check = new Function('document', 'code', body);
      return check(parsedDoc, code) === true;
    } catch (e) {
      return false;
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswerDialog, setShowAnswerDialog] = useState(false);
  const [compilerKey, setCompilerKey] = useState(0);

  const evaluateCode = () => {
    let allPassed = true;
    
    if (exercise.testCases && Array.isArray(exercise.testCases)) {
      for (const tc of exercise.testCases) {
        if (!checkTestCase(tc)) {
          allPassed = false;
          break;
        }
      }
    }

    return allPassed;
  };

  const handleSubmit = async () => {
    // If no test cases are provided, we just assume it's right.
    const hasTests = Array.isArray(exercise.testCases) && exercise.testCases.some((t: TestCase) => t.test || t.input);
    const passed = hasTests ? evaluateCode() : true;

    if (passed) {
      trigger('success');
      toast.success("ពិតជាអស្ចារ្យ! ចម្លើយត្រឹមត្រូវ!", {
        icon: "🎉",
        className: "bg-green-500 text-white border-green-600"
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowSuccess(true);

      // API call to increment study contribution & mark solution as done
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exerciseId: exercise.id, points: exercise.points })
        });
        
        // Use server action to save the solution and mark it done globally
        const { saveExerciseSolution } = await import("@/actions/exercise.actions");
        await saveExerciseSolution(exercise.id, code, rawCategory);
      } catch (e) {
        console.error("Failed to save progress", e);
      }
    } else {
      trigger('error');
      toast.error("កូដរបស់អ្នកមិនទាន់ត្រូវទេ! សូមព្យាយាមម្តងទៀត។", {
        className: "bg-red-500 text-white border-red-600"
      });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto border-x-2 border-[#cc785c]/30 h-[calc(100vh-65px)] overflow-hidden flex flex-col bg-[#faf9f5] dark:bg-[#181715]">
      
      {/* Header Bar */}
      <header className="flex-shrink-0 h-16 border-b-2 border-[#cc785c]/30 flex items-center justify-between px-6 bg-[#faf9f5] dark:bg-[#181715]">
        <div className="flex items-center gap-4">
          <Link 
            href={`/exercises/${rawCategory}`}
            className="text-[#6c6a64] dark:text-[#a09d96] hover:text-[#cc785c] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-[2px] bg-[#cc785c]/30" />
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#cc785c] block leading-none">
              {exercise.lesson?.course?.title || "Course"}
            </span>
            <span className="text-[14px] font-['StyreneB',_sans-serif] font-bold text-[#141413] dark:text-[#faf9f5]">
              {exercise.title}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium font-mono text-[#6c6a64] dark:text-[#a09d96] bg-[#cc785c]/10 px-3 py-1.5 border-2 border-[#cc785c]/30">
            {exercise.points} PTS
          </span>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#cc785c] hover:bg-[#cc785c]/90 text-white font-medium text-[14px] rounded-none border-2 border-[#cc785c] shadow-[2px_2px_0_hsl(var(--primary))] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Submit
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        
        {/* Left Pane: Instructions */}
        <div className="w-full md:w-[35%] lg:w-[30%] flex-shrink-0 border-r-2 border-[#cc785c]/30 overflow-y-auto bg-white dark:bg-[#252320]">
          <div className="p-6 md:p-8">
            <div className="inline-flex items-center justify-center p-3 bg-[#cc785c]/10 rounded-none border-2 border-[#cc785c]/30 mb-6">
              <Code2 className="h-6 w-6 text-[#cc785c]" />
            </div>
            
            <h1 className="text-[28px] font-['Copernicus',_serif] text-[#141413] dark:text-[#faf9f5] mb-6">
              {exercise.title}
            </h1>
            
            <div className="prose prose-sm dark:prose-invert prose-p:text-[#6c6a64] dark:prose-p:text-[#a09d96] prose-headings:font-['StyreneB',_sans-serif] prose-headings:text-[#141413] dark:prose-headings:text-[#faf9f5] max-w-none">
              <div dangerouslySetInnerHTML={{ __html: exercise.description.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Hint & Answer Actions */}
            <div className="mt-6 flex flex-col gap-3">
              {exercise.hint && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors w-fit"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? "លាក់គន្លឹះ (Hide Hint)" : "បង្ហាញគន្លឹះ (Show Hint)"}
                  </button>
                  {showHint && (
                    <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500 text-sm text-amber-800 dark:text-amber-200 rounded-r-md">
                      {exercise.hint}
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={() => setShowAnswerDialog(true)}
                className="flex items-center gap-2 text-sm font-medium text-[#cc785c] hover:text-[#b06048] transition-colors w-fit mt-2"
              >
                <Eye className="w-4 h-4" />
                បង្ហាញចម្លើយ (Show Answer)
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t-2 border-[#cc785c]/20">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#141413] dark:text-[#faf9f5] mb-4">
                Test Cases
              </h3>
              <div className="flex flex-col gap-3">
                {Array.isArray(exercise.testCases) ? (exercise.testCases as any[]).map((tc, idx) => {
                  const isPassed = checkTestCase(tc);
                  return (
                    <div key={idx} className={cn(
                      "flex items-start gap-3 p-3 border transition-colors duration-300",
                      isPassed 
                        ? "bg-green-500/5 dark:bg-green-500/10 border-green-500/30" 
                        : "bg-[#faf9f5] dark:bg-[#181715] border-[#cc785c]/20"
                    )}>
                      <div className={cn(
                        "mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-300",
                        isPassed 
                          ? "border-green-500 bg-green-500 text-white" 
                          : "border-[#cc785c]/40"
                      )}>
                        {isPassed && <Check className="w-3 h-3" strokeWidth={3} />}
                      </div>
                      <span className={cn(
                        "text-[14px] transition-colors duration-300",
                        isPassed ? "text-green-700 dark:text-green-400 font-medium" : "text-[#6c6a64] dark:text-[#a09d96]"
                      )}>
                        {tc.description || tc}
                      </span>
                    </div>
                  );
                }) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Editor / Compiler */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] relative">
          {isHtml ? (
            <HtmlCompiler 
              key={`html-${compilerKey}`}
              defaultCode={compilerKey === 0 ? exercise.starterCode : exercise.solution} 
              className="h-full border-none shadow-none rounded-none !w-full flex-1"
              fullHeight={true}
              onChange={setCode}
            />
          ) : (rawCategory === 'javascript' || rawCategory === 'react') ? (
            <JsCompiler 
              key={`js-${compilerKey}`}
              defaultCode={compilerKey === 0 ? exercise.starterCode : exercise.solution} 
              className="h-full border-none shadow-none rounded-none !w-full flex-1"
              fullHeight={true}
              onChange={setCode}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/50 font-mono text-sm">
              Compiler for {rawCategory} is currently unavailable
            </div>
          )}
        </div>
        
      </div>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="border-2 border-[#cc785c]/30 rounded-2xl shadow-[4px_4px_0_hsl(var(--primary))]">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center text-[#141413] dark:text-[#faf9f5]">
              ពិតជាអស្ចារ្យ!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-[#6c6a64] dark:text-[#a09d96]">
              អ្នកបានបញ្ចប់លំហាត់នេះដោយជោគជ័យ។ តើអ្នកចង់បន្តទៅលំហាត់បន្ទាប់ទេ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3 sm:justify-center mt-4">
            <AlertDialogCancel className="rounded-xl border-2 border-[#cc785c]/30 text-[#cc785c] hover:bg-[#cc785c]/5 hover:text-[#cc785c] flex-1">
              នៅទីនេះសិន
            </AlertDialogCancel>
            <AlertDialogAction asChild className="rounded-xl bg-[#cc785c] hover:bg-[#cc785c]/90 text-white flex-1">
              <Link href={`/exercises/${rawCategory}`}>
                ទៅកាន់បញ្ជីលំហាត់
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Answer Confirmation Dialog */}
      <AlertDialog open={showAnswerDialog} onOpenChange={setShowAnswerDialog}>
        <AlertDialogContent className="border-2 border-[#cc785c]/30 rounded-2xl shadow-[4px_4px_0_hsl(var(--primary))]">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center text-[#141413] dark:text-[#faf9f5]">
              តើអ្នកពិតជាចង់មើលចម្លើយមែនទេ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-[#6c6a64] dark:text-[#a09d96]">
              ការមើលចម្លើយនឹងជំនួសកូដបច្ចុប្បន្នរបស់អ្នក។ តើអ្នកយល់ព្រមបន្តទេ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3 sm:justify-center mt-4">
            <AlertDialogCancel className="rounded-xl border-2 border-[#cc785c]/30 text-[#cc785c] hover:bg-[#cc785c]/5 hover:text-[#cc785c] flex-1">
              ទេ ខ្ញុំចង់ព្យាយាមខ្លួនឯង
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                setCode(exercise.solution);
                setCompilerKey(k => k + 1);
                toast.info("ចម្លើយត្រូវបានបង្ហាញនៅក្នុងកម្មវិធីកែសម្រួលកូដ (Editor)។");
              }}
              className="rounded-xl bg-[#cc785c] hover:bg-[#cc785c]/90 text-white flex-1"
            >
              បាទ/ចាស បង្ហាញចម្លើយ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
