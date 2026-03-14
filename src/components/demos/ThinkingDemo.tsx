import { useState, createContext, useContext } from "react"
import { ChevronDown, Brain, Loader2, CheckCircle2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

type ThinkingViewMode = "started" | "streaming" | "complete"

const ThinkingStateContext = createContext<{
  mode: ThinkingViewMode
  setMode: (m: ThinkingViewMode) => void
}>({ mode: "started", setMode: () => {} })

const SEGMENTS: { value: ThinkingViewMode; label: string; icon: React.ElementType }[] = [
  { value: "started", label: "Started", icon: Loader2 },
  { value: "streaming", label: "Streaming", icon: Sparkles },
  { value: "complete", label: "Complete", icon: CheckCircle2 },
]

function SegmentedControl() {
  const { mode, setMode } = useContext(ThinkingStateContext)

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

function CotContent() {
  const { t } = useLocale()
  return (
    <div className="border-t border-border/50 bg-muted/20 px-3 py-2.5 text-sm text-muted-foreground leading-relaxed">
      <p>{t("thinking.cot.intro")}</p>
      <p className="mt-2">{t("thinking.cot.line1")}</p>
      <p>{t("thinking.cot.line2")}</p>
      <p>{t("thinking.cot.line3")}</p>
      <p className="mt-2">{t("thinking.cot.conclusion")}</p>
    </div>
  )
}

function ExpandableThinkingCard({ duration, statusIcon }: {
  duration?: string
  statusIcon: React.ReactNode
}) {
  const { t } = useLocale()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="group/think w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:bg-muted/30 cursor-pointer transition-colors"
      >
        <span className="relative size-4 shrink-0">
          <Brain className="size-4 absolute inset-0 transition-opacity duration-150 group-hover/think:opacity-0" />
          <ChevronDown className={cn(
            "size-4 absolute inset-0 opacity-0 group-hover/think:opacity-100 transition-all duration-150",
            expanded && "rotate-180",
          )} />
        </span>
        <span className="font-medium text-foreground">Thinking</span>
        <span className="text-xs text-muted-foreground/60 truncate flex-1 text-left">
          {expanded ? "" : t("thinking.preview")}
        </span>
        {duration && (
          <span className="text-[11px] text-muted-foreground/50 tabular-nums shrink-0">{duration}</span>
        )}
        {statusIcon}
      </button>
      {expanded && <CotContent />}
    </div>
  )
}

function ThinkingCard() {
  const { mode } = useContext(ThinkingStateContext)

  if (mode === "started") {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground opacity-75">
          <Brain className="size-4 shrink-0" />
          <span className="font-medium text-foreground">Thinking</span>
          <span className="inline-flex gap-0.5 ml-1">
            <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
            <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
            <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
          </span>
          <span className="flex-1" />
          <Loader2 className="size-3.5 text-muted-foreground animate-spin" />
        </div>
      </div>
    )
  }

  if (mode === "streaming") {
    return (
      <ExpandableThinkingCard
        statusIcon={<Loader2 className="size-3.5 text-muted-foreground animate-spin shrink-0" />}
      />
    )
  }

  return (
    <ExpandableThinkingCard
      duration="1.2s"
      statusIcon={<CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />}
    />
  )
}

export function ThinkingDemo() {
  const [mode, setMode] = useState<ThinkingViewMode>("started")

  return (
    <ThinkingStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <ThinkingCard />
      </div>
    </ThinkingStateContext.Provider>
  )
}
