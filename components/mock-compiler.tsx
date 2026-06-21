"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { Play, RotateCcw, Copy, Check, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface MockCompilerProps {
  language: string
  defaultCode: string
  output?: string
  className?: string
  compact?: boolean
  onChange?: (code: string) => void
}

export function MockCompiler({ language, defaultCode, output = "Program exited successfully.", className, compact = false, onChange }: MockCompilerProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [code, setCode] = React.useState(defaultCode)
  const [copied, setCopied] = React.useState(false)
  const [isRunning, setIsRunning] = React.useState(false)
  const [terminalOutput, setTerminalOutput] = React.useState<string | null>(null)

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode)
      onChange?.(newCode)
    }
  }

  const runCode = () => {
    setIsRunning(true)
    setTerminalOutput(null)
    toast("កំពុងដំណើរការកូដ...")
    
    // Simulate compilation/execution delay
    setTimeout(() => {
      setIsRunning(false)
      setTerminalOutput(output)
      toast.success("ដំណើរការជោគជ័យ!")
    }, 800)
  }

  const resetCode = () => {
    setCode(defaultCode)
    setTerminalOutput(null)
    toast("បានត្រឡប់ទៅកូដដើម")
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success("បានចម្លងកូដ")
    setTimeout(() => setCopied(false), 2000)
  }

  React.useEffect(() => { setCode(defaultCode) }, [defaultCode])

  const toolbar = isDark
    ? "bg-[#181715] border-[#2A2A2A] text-[#A1A1A1]"
    : "bg-white border-[#E5E5E5] text-[#666666]"

  return (
    <div className={cn("flex flex-col border rounded-xl overflow-hidden shadow-sm", toolbar, className)}>
      {/* Header Toolbar */}
      <div className={cn("flex items-center justify-between px-4 py-2 border-b", isDark ? "border-[#2A2A2A]" : "border-[#E5E5E5]")}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider opacity-60 flex items-center gap-1">
            <Terminal className="w-3 h-3" /> {language}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={resetCode} title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyCode} title="Copy">
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning} className="h-7 text-xs px-3 ml-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <Play className="h-3.5 w-3.5 mr-1" /> Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative w-full" style={{ height: compact ? "250px" : "350px" }}>
        <MonacoEditor
          height="100%"
          language={language}
          theme={isDark ? "vs-dark" : "light"}
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "var(--font-geist-mono), monospace",
            lineHeight: 1.5,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            wordWrap: "on"
          }}
        />
      </div>

      {/* Output Console */}
      <div className={cn("border-t p-4 font-mono text-sm min-h-[80px]", isDark ? "border-[#2A2A2A] bg-[#0A0A0A] text-green-400" : "border-[#E5E5E5] bg-gray-50 text-green-600")}>
        {isRunning ? (
          <span className="animate-pulse text-muted-foreground">Compiling...</span>
        ) : terminalOutput ? (
          <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
        ) : (
          <span className="opacity-40">Output will appear here...</span>
        )}
      </div>
    </div>
  )
}
