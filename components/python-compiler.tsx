"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/copy-button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const playChime = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); 
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error(e);
  }
}

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const DEFAULT_CODE = `# សួស្តី Python! 👋
name = "ពិភពលោក"
print(f"ជំរាបសួរ, {name}!")

# សាកល្បងគណិតវិទ្យា
a = 7
b = 5
print(f"ផលបូក: {a + b}")
print(f"ផលគុណ: {a * b}")

# រង្វិល
for i in range(1, 4):
    print(f"ជំហានទី {i}")`

type LogLine = { type: "log" | "info" | "warn" | "error"; text: string }

interface PythonCompilerProps {
  defaultCode?: string
  className?: string
  compact?: boolean
  fullHeight?: boolean
  onChange?: (code: string) => void
}

export function PythonCompiler({ defaultCode = DEFAULT_CODE, className, compact = false, fullHeight = false, onChange }: PythonCompilerProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [code, setCode] = React.useState(defaultCode)
  const [logs, setLogs] = React.useState<LogLine[]>([])
  const [copied, setCopied] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const [isRunning, setIsRunning] = React.useState(false)

  const runIdRef = React.useRef(0)
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)

  React.useEffect(() => {
    const handler = (e: MessageEvent) => {
      const data = e.data
      if (!data || data.__pythonCompiler == null) return
      if (data.runId !== runIdRef.current) return
      
      if (data.level === "system") {
        if (data.text === "READY") {
          // Pyodide is ready, or script execution finished
        } else if (data.text === "DONE") {
           setIsRunning(false)
        }
        return;
      }
      
      setLogs((prev) => [...prev, { type: data.level, text: data.text }])
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  const runCode = React.useCallback(() => {
    setIsRunning(true)
    const runId = runIdRef.current + 1
    runIdRef.current = runId
    setLogs([{ type: "info", text: "កំពុងរៀបចំ Python ដំណើរការ..." }])

    // Escaping backticks and dollars for the template string replacement
    const escapedCode = code.replace(/\\/g, "\\\\").replace(/\`/g, "\\`").replace(/\$/g, "\\$")

    const srcDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
</head><body><script>
(async function () {
  var RUN_ID = ${runId};
  function send(level, args) {
    var parts = [];
    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      try {
        if (typeof a === "object" && a !== null) parts.push(JSON.stringify(a, null, 2));
        else parts.push(String(a));
      } catch (e) { parts.push(String(a)); }
    }
    parent.postMessage({ __pythonCompiler: true, runId: RUN_ID, level: level, text: parts.join(" ") }, "*");
  }
  
  try {
    let pyodide = await loadPyodide({
      stdout: (text) => send("log", [text]),
      stderr: (text) => send("error", [text])
    });
    
    // Clear the loading message before actual output
    parent.postMessage({ __pythonCompiler: true, runId: RUN_ID, level: "system", text: "CLEAR" }, "*");
    
    await pyodide.runPythonAsync(\`${escapedCode}\`);
  } catch (err) {
    send("error", [err.message]);
  } finally {
    parent.postMessage({ __pythonCompiler: true, runId: RUN_ID, level: "system", text: "DONE" }, "*");
  }
})();
</script></body></html>`

    if (iframeRef.current) {
      iframeRef.current.srcdoc = srcDoc
    }
    toast.success("កូដត្រូវបានបញ្ជូនទៅដំណើរការ!")
  }, [code])

  // Replace initial loading message if CLEAR is received, but we'll just handle it simply here
  // by clearing logs on first real output or just let it append. 
  // Let's improve the message handler to clear logs if "CLEAR"
  React.useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data && e.data.__pythonCompiler && e.data.runId === runIdRef.current && e.data.level === "system" && e.data.text === "CLEAR") {
        setLogs([])
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  const resetCode = () => {
    setCode(defaultCode)
    setLogs([])
    toast("បានដកចេញ — ប្រភពដើម")
  }

  const clearConsole = () => setLogs([])

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success("ចម្លងកូដទុកជោគជ័យ!")
    setTimeout(() => setCopied(false), 2000)
  }

  const toolbar = isDark ? "bg-[#1d1d1f] border-white/10" : "bg-[#f3f3f3] border-black/10"
  const toolbarText = isDark ? "text-white/40" : "text-black/40"
  const toolbarBtn = isDark ? "text-white/50 hover:text-white hover:bg-white/10" : "text-black/50 hover:text-black hover:bg-black/8"
  const editorBg = isDark ? "bg-[#1d1d1f] border-white/10" : "bg-[#ffffff] border-black/10"
  const consoleBar = isDark ? "border-white/10 bg-[#2d2d2f] text-white/40" : "border-black/10 bg-[#f8f8f8] text-black/40"
  const consoleBg = isDark ? "bg-[#1a1a1c] text-white/90" : "bg-[#fafafa] text-black/90"
  const monacoTheme = isDark ? "vs-dark" : "light"

  const lineColor = (type: LogLine["type"]) => {
    if (type === "error") return "text-red-500"
    if (type === "warn") return "text-amber-500"
    if (type === "info") return isDark ? "text-sky-400" : "text-sky-600"
    return isDark ? "text-white/85" : "text-black/85"
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border shadow-md overflow-hidden transition-all duration-300",
        expanded && !compact ? "fixed inset-4 z-50 shadow-2xl" : "w-full",
        className
      )}
    >
      <div className={cn("flex items-center justify-between px-3 py-2 border-b transition-colors", toolbar)}>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className={cn("ml-3 text-xs font-medium tracking-wide", toolbarText)}>main.py</div>
        </div>

        <div className="flex items-center gap-1">
          <CopyButton
            text={code}
            onCopySuccess={() => {
              playChime()
              toast("ចម្លងកូដទុកជោគជ័យ!", {
                icon: <Check className="h-4 w-4" />,
                className: "bg-primary text-primary-foreground border-primary [&>svg]:text-primary-foreground"
              })
            }}
            variant="ghost"
            size="sm"
            className={cn("h-6 w-6 p-0", toolbarBtn)}
          />
          <Button variant="ghost" size="sm" onClick={resetCode} className={cn("h-6 w-6 p-0", toolbarBtn)}>
            <RotateCcw className="h-3 w-3" />
          </Button>
          {!compact && (
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className={cn("h-6 w-6 p-0", toolbarBtn)}>
              {expanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          )}
          <Button size="sm" onClick={runCode} disabled={isRunning} className="h-6 px-2.5 gap-1 bg-primary hover:bg-primary text-white text-[11px] rounded-md ml-1">
            <Play className="h-2.5 w-2.5 fill-white" />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2",
          "grid-rows-2 md:grid-rows-1",
          compact ? "h-[600px] md:h-[400px]" : expanded ? "h-[calc(100vh-100px)]" : fullHeight ? "h-full flex-1" : "h-[800px] md:h-[580px]"
        )}
      >
        <div className={cn("h-full border-b md:border-b-0 md:border-r overflow-hidden transition-colors", editorBg)}>
          <MonacoEditor
            height="100%"
            language="python"
            value={code}
            onChange={(val) => {
              const newCode = val ?? "";
              setCode(newCode);
              onChange?.(newCode);
            }}
            theme={monacoTheme}
            options={{
              fontSize: compact ? 12 : 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 4,
              renderLineHighlight: "line",
              padding: { top: 8, bottom: 8 },
              smoothScrolling: true,
              cursorSmoothCaretAnimation: "on",
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        <div className="h-full flex flex-col">
          <div className={cn("flex items-center gap-1.5 px-2 py-1 border-b text-[10px] font-mono shrink-0 transition-colors", consoleBar)}>
            <div className={cn("h-1.5 w-1.5 rounded-full", isRunning ? "bg-green-500 animate-pulse" : "bg-gray-400")} />
            Console
            <button onClick={clearConsole} className="ml-auto inline-flex items-center gap-1 hover:opacity-80">
              <Trash2 className="h-2.5 w-2.5" />
              Clear
            </button>
          </div>
          <div className={cn("flex-1 overflow-auto font-mono text-xs p-3 leading-relaxed transition-colors", consoleBg)}>
            {logs.length === 0 ? (
              <span className={isDark ? "text-white/30" : "text-black/30"}>{"# ចុច Run ដើម្បីមើលលទ្ធផល..."}</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={cn("whitespace-pre-wrap break-words", lineColor(l.type))}>
                  {l.text}
                </div>
              ))
            )}
          </div>
          <iframe ref={iframeRef} sandbox="allow-scripts allow-same-origin" title="Python Runner" className="hidden" />
        </div>
      </div>
    </div>
  )
}
