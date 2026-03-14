import { useState, createContext, useContext } from "react"
import { FileText, FolderOpen, AlertTriangle, GitBranch, BookOpen, Loader2, CheckCircle2, MousePointer2, Code2, Terminal, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type ContextViewMode = "gathering" | "ready"

const ContextStateContext = createContext<{
  mode: ContextViewMode
  setMode: (m: ContextViewMode) => void
}>({ mode: "gathering", setMode: () => {} })

const SEGMENTS: { value: ContextViewMode; label: string; icon: React.ElementType }[] = [
  { value: "gathering", label: "Gathering", icon: Loader2 },
  { value: "ready", label: "Ready", icon: CheckCircle2 },
]

function SegmentedControl() {
  const { mode, setMode } = useContext(ContextStateContext)

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-muted/30 p-0.5">
      {SEGMENTS.map((seg) => {
        const Icon = seg.icon
        const isActive = mode === seg.value
        return (
          <button
            key={seg.value}
            type="button"
            onClick={() => setMode(seg.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            {seg.label}
          </button>
        )
      })}
    </div>
  )
}

interface ContextItem {
  icon: React.ElementType
  label: string
  detail?: string
}

const CONTEXT_ITEMS: ContextItem[] = [
  { icon: FileText, label: "Open files", detail: "3 files" },
  { icon: MousePointer2, label: "Cursor position", detail: "App.tsx:12:5" },
  { icon: Code2, label: "Selection", detail: "none" },
  { icon: FolderOpen, label: "Recent files", detail: "8 files" },
  { icon: AlertTriangle, label: "Lint errors", detail: "0 errors" },
  { icon: Terminal, label: "Terminal output", detail: "last 50 lines" },
  { icon: GitBranch, label: "Git status", detail: "main, 2 modified" },
  { icon: BookOpen, label: "Rules & AGENTS.md", detail: "3 rules" },
  { icon: Sparkles, label: "Skills", detail: "2 skills" },
]

function ContextCard() {
  const { mode } = useContext(ContextStateContext)
  const isGathering = mode === "gathering"
  const gatheringCutoff = 7

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-muted/30 flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Context Assembly</span>
        <span className="text-xs text-muted-foreground/60">
          {isGathering ? `${gatheringCutoff}/${CONTEXT_ITEMS.length}` : `${CONTEXT_ITEMS.length}/${CONTEXT_ITEMS.length}`}
        </span>
        {isGathering && (
          <>
            <span className="flex-1" />
            <Loader2 className="size-3 text-muted-foreground animate-spin" />
          </>
        )}
      </div>
      <div className="divide-y divide-border/50">
        {CONTEXT_ITEMS.map((item, i) => {
          const isDone = !isGathering || i < gatheringCutoff
          const isCurrentlyGathering = isGathering && i === gatheringCutoff - 1
          const isHidden = isGathering && i >= gatheringCutoff

          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-sm transition-opacity",
                isHidden && "opacity-0 h-0 py-0 overflow-hidden",
              )}
            >
              <item.icon className="size-3.5 text-muted-foreground shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.detail && (
                <span className="text-xs text-muted-foreground/60">{item.detail}</span>
              )}
              {isCurrentlyGathering ? (
                <Loader2 className="size-3.5 text-muted-foreground animate-spin" />
              ) : isDone ? (
                <CheckCircle2 className="size-3.5 text-emerald-500" />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ContextDemo() {
  const [mode, setMode] = useState<ContextViewMode>("gathering")

  return (
    <ContextStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <ContextCard />
      </div>
    </ContextStateContext.Provider>
  )
}
