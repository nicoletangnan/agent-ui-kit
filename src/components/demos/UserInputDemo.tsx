import { useState, createContext, useContext } from "react"
import { ArrowUp, Paperclip, AtSign, Pen, MessageCircle, Bot, ChevronDown, CheckCircle2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type InputViewMode = "composing" | "submitted"

const InputStateContext = createContext<{
  mode: InputViewMode
  setMode: (m: InputViewMode) => void
}>({ mode: "composing", setMode: () => {} })

const SEGMENTS: { value: InputViewMode; label: string; icon: React.ElementType }[] = [
  { value: "composing", label: "Composing", icon: Pen },
  { value: "submitted", label: "Submitted", icon: CheckCircle2 },
]

function SegmentedControl() {
  const { mode, setMode } = useContext(InputStateContext)

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

const MODES = [
  { label: "Agent", icon: Bot, description: "自主执行" },
  { label: "Ask", icon: MessageCircle, description: "只回答" },
  { label: "Manual", icon: Pen, description: "手动确认" },
]

const MODELS = ["Claude Sonnet 4", "Claude Opus 4", "GPT-4o", "Gemini 2.5 Pro"]

function InputCard() {
  const { mode } = useContext(InputStateContext)
  const [selectedMode] = useState(0)
  const [selectedModel] = useState(0)

  if (mode === "submitted") {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="px-3 py-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge variant="secondary" className="gap-1 text-xs font-normal">
              <AtSign className="size-3" />
              src/App.tsx
            </Badge>
            <Badge variant="secondary" className="gap-1 text-xs font-normal">
              <AtSign className="size-3" />
              src/components/
            </Badge>
          </div>
          <p className="text-sm text-foreground">帮我用 React 写一个 TodoList 页面，要支持添加、删除、标记完成</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground">
          <Bot className="size-3.5" />
          <span>Agent</span>
          <span className="text-muted-foreground/40">·</span>
          <span>{MODELS[selectedModel]}</span>
          <span className="flex-1" />
          <Loader2 className="size-3 animate-spin" />
          <span>Processing...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex flex-wrap gap-1.5 px-3 pt-3">
        <Badge variant="secondary" className="gap-1 text-xs font-normal">
          <AtSign className="size-3" />
          src/App.tsx
        </Badge>
        <Badge variant="secondary" className="gap-1 text-xs font-normal">
          <AtSign className="size-3" />
          src/components/
        </Badge>
      </div>
      <div className="px-3 py-3">
        <p className="text-sm text-foreground">
          帮我用 React 写一个 TodoList 页面，要支持添加、删除、标记完成
          <span className="inline-block w-0.5 h-4 bg-foreground animate-pulse ml-0.5 align-text-bottom" />
        </p>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground transition-colors">
            <Paperclip className="size-4" />
          </button>
          <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground transition-colors">
            <AtSign className="size-4" />
          </button>

          {/* Mode Selector */}
          <div className="flex items-center gap-0.5 border border-border rounded-md px-1.5 py-0.5">
            {MODES[selectedMode].icon && (() => {
              const Icon = MODES[selectedMode].icon
              return <Icon className="size-3 text-muted-foreground" />
            })()}
            <span className="text-xs text-muted-foreground ml-0.5">{MODES[selectedMode].label}</span>
            <ChevronDown className="size-3 text-muted-foreground/50" />
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-0.5 border border-border rounded-md px-1.5 py-0.5">
            <span className="text-xs text-muted-foreground">{MODELS[selectedModel]}</span>
            <ChevronDown className="size-3 text-muted-foreground/50" />
          </div>
        </div>
        <button className="size-7 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
          <ArrowUp className="size-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  )
}

export function UserInputDemo() {
  const [mode, setMode] = useState<InputViewMode>("composing")

  return (
    <InputStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <InputCard />
      </div>
    </InputStateContext.Provider>
  )
}
