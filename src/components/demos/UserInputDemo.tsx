import { useState, createContext, useContext } from "react"
import { ArrowUp, Paperclip, AtSign, Pen, MessageCircle, Bot, ChevronDown, CheckCircle2, Square } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

type InputViewMode = "empty" | "composing" | "submitted"

const InputStateContext = createContext<{
  mode: InputViewMode
  setMode: (m: InputViewMode) => void
}>({ mode: "empty", setMode: () => {} })

const SEGMENTS: { value: InputViewMode; label: string; icon: React.ElementType }[] = [
  { value: "empty", label: "Empty", icon: MessageCircle },
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

const MODELS = ["Claude Sonnet 4", "Claude Opus 4", "GPT-4o", "Gemini 2.5 Pro"]

function InputCard() {
  const { mode } = useContext(InputStateContext)
  const { t } = useLocale()
  const [selectedMode] = useState(0)
  const [selectedModel] = useState(0)

  const MODES = [
    { label: "Agent", icon: Bot, description: t("userInput.mode.agent.description") },
    { label: "Ask", icon: MessageCircle, description: t("userInput.mode.ask.description") },
    { label: "Manual", icon: Pen, description: t("userInput.mode.manual.description") },
  ]

  const promptText = t("userInput.prompt")

  const isSubmitted = mode === "submitted"
  const showContent = mode === "composing"

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {showContent && (
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
      )}
      <div className="px-3 py-3">
        {showContent ? (
          <p className="text-sm text-foreground">
            {promptText}
            <span className="inline-block w-0.5 h-4 bg-foreground animate-pulse ml-0.5 align-text-bottom" />
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/50">Plan, @ for context, / for commands</p>
        )}
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground transition-colors">
            <Paperclip className="size-4" />
          </button>
          <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground transition-colors">
            <AtSign className="size-4" />
          </button>

          <div className="flex items-center gap-0.5 border border-border rounded-md px-1.5 py-0.5">
            {MODES[selectedMode].icon && (() => {
              const Icon = MODES[selectedMode].icon
              return <Icon className="size-3 text-muted-foreground" />
            })()}
            <span className="text-xs text-muted-foreground ml-0.5">{MODES[selectedMode].label}</span>
            <ChevronDown className="size-3 text-muted-foreground/50" />
          </div>

          <div className="flex items-center gap-0.5 border border-border rounded-md px-1.5 py-0.5">
            <span className="text-xs text-muted-foreground">{MODELS[selectedModel]}</span>
            <ChevronDown className="size-3 text-muted-foreground/50" />
          </div>
        </div>
        {isSubmitted ? (
          <button
            type="button"
            className="size-7 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors cursor-pointer"
            title="Stop"
          >
            <Square className="size-3 fill-background text-background" />
          </button>
        ) : (
          <button className="size-7 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
            <ArrowUp className="size-4 text-primary-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}

export function UserInputDemo() {
  const [mode, setMode] = useState<InputViewMode>("empty")

  return (
    <InputStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <InputCard />
      </div>
    </InputStateContext.Provider>
  )
}
