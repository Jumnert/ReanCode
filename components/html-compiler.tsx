"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <title>ទំព័ររបស់ខ្ញុំ</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f8fafc; color: #1d1d1f; }
    h1 { color: #0066cc; }
    button {
      background: #0066cc; color: white; border: none;
      padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 12px;
    }
    button:hover { background: #0071e3; }
  </style>
</head>
<body>
  <h1>សួស្តី ពិភពលោក! 👋</h1>
  <p>នេះជាទំព័រ HTML ដំបូងរបស់ខ្ញុំ។ ចូរសាកល្បងកែប្រែកូដ!</p>
  <button onclick="alert('ជំរាបសួរ!')">ចុចខ្ញុំ</button>
</body>
</html>`

interface HtmlCompilerProps {
  defaultCode?: string
  className?: string
  /** compact = embedded inside a lesson section (shorter, no fullscreen) */
  compact?: boolean
}

export function HtmlCompiler({ defaultCode = DEFAULT_CODE, className, compact = false }: HtmlCompilerProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [code, setCode] = React.useState(defaultCode)
  const [output, setOutput] = React.useState(defaultCode)
  const [copied, setCopied] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const runCode = React.useCallback(() => {
    setOutput(code)
    toast.success("កូដត្រូវបានដំណើរការ!")
  }, [code])

  const resetCode = () => {
    setCode(defaultCode)
    setOutput(defaultCode)
    toast("បានដកចេញ — ប្រភពដើម")
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success("ចម្លងកូដទុកជោគជ័យ!")
    setTimeout(() => setCopied(false), 2000)
  }

  React.useEffect(() => { setOutput(defaultCode) }, [defaultCode])

  const editorHeight = compact ? "400px" : expanded ? "calc(100% - 44px)" : "580px"

  /* ── Theme-aware tokens ── */
  const toolbar = isDark
    ? "bg-[#1e1e2e] border-white/10"
    : "bg-[#f3f3f3] border-black/10"

  const toolbarText = isDark
    ? "text-white/40"
    : "text-black/40"

  const toolbarBtn = isDark
    ? "text-white/50 hover:text-white hover:bg-white/10"
    : "text-black/50 hover:text-black hover:bg-black/8"

  const editorBg = isDark
    ? "bg-[#1e1e2e] border-white/10"
    : "bg-[#ffffff] border-black/10"

  const previewBar = isDark
    ? "border-white/10 bg-[#2a2a3a] text-white/40"
    : "border-black/10 bg-[#f8f8f8] text-black/40"

  const previewBg = isDark ? "bg-white" : "bg-white"

  const monacoTheme = isDark ? "vs-dark" : "light"

  return (
    <div
      className={cn(
        "rounded-xl border border-border shadow-md overflow-hidden transition-all duration-300",
        expanded && !compact ? "fixed inset-4 z-50 shadow-2xl" : "w-full",
        className
      )}
    >
      {/* Toolbar */}
      <div className={cn("flex items-center justify-between px-3 py-2 border-b transition-colors", toolbar)}>
        <div className="flex items-center gap-2">
          {/* Traffic-light dots */}
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className={cn("ml-2 flex items-center gap-1 text-[11px] font-mono", toolbarText)}>
            <Code2 className="h-3 w-3" />
            <span>HTML Compiler</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={copyCode}
            className={cn("h-6 w-6 p-0", toolbarBtn)}>
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetCode}
            className={cn("h-6 w-6 p-0", toolbarBtn)}>
            <RotateCcw className="h-3 w-3" />
          </Button>
          {!compact && (
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}
              className={cn("h-6 w-6 p-0", toolbarBtn)}>
              {expanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          )}
          <Button size="sm" onClick={runCode}
            className="h-6 px-2.5 gap-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-[11px] rounded-md ml-1">
            <Play className="h-2.5 w-2.5 fill-white" />
            Run
          </Button>
        </div>
      </div>

      {/* Split pane */}
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2",
        compact ? "h-[400px]" : expanded ? "h-[calc(100vh-100px)]" : "h-[580px]"
      )}>
        {/* Monaco Editor */}
        <div className={cn("h-full border-r overflow-hidden transition-colors", editorBg)}>
          <MonacoEditor
            height={editorHeight}
            language="html"
            value={code}
            onChange={(val) => setCode(val ?? "")}
            theme={monacoTheme}
            options={{
              fontSize: compact ? 12 : 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
              renderLineHighlight: "line",
              padding: { top: 8, bottom: 8 },
              smoothScrolling: true,
              cursorSmoothCaretAnimation: "on",
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        {/* Live Preview */}
        <div className="h-full flex flex-col">
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 border-b text-[10px] font-mono shrink-0 transition-colors",
            previewBar
          )}>
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Preview
          </div>
          <iframe
            srcDoc={output}
            sandbox="allow-scripts allow-forms"
            title="HTML Preview"
            className={cn("flex-1 w-full", previewBg)}
          />
        </div>
      </div>
    </div>
  )
}
