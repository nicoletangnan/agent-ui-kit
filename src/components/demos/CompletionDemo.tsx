import { useState, createContext, useContext } from "react"
import { CheckCircle2, MessageCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

type CompletionViewMode = "turn_complete" | "idle"

const CompletionStateContext = createContext<{
  mode: CompletionViewMode
  setMode: (m: CompletionViewMode) => void
}>({ mode: "turn_complete", setMode: () => {} })

const SEGMENTS: { value: CompletionViewMode; label: string; icon: React.ElementType }[] = [
  { value: "turn_complete", label: "Turn Complete", icon: CheckCircle2 },
  { value: "idle", label: "Idle", icon: Clock },
]

function SegmentedControl() {
  const { mode, setMode } = useContext(CompletionStateContext)

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

function CompletionCard() {
  const { mode } = useContext(CompletionStateContext)
  const { t } = useLocale()

  const followUps = [
    t("completion.followup.1"),
    t("completion.followup.2"),
    t("completion.followup.3"),
  ]

  if (mode === "idle") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground/50">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs">Turn complete</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0 text-muted-foreground/50" />
            <span className="font-medium text-foreground/60">Conversation idle</span>
            <span className="text-xs text-muted-foreground/40 flex-1 text-left">{t("completion.idle.waiting")}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested follow-ups</p>
          <div className="flex flex-wrap gap-2">
            {followUps.map((text, i) => (
              <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted/50 transition-colors font-normal text-xs py-1">
                <MessageCircle className="size-3 mr-1" />
                {text}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-muted-foreground/50">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs">Turn complete</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Suggested follow-ups</p>
        <div className="flex flex-wrap gap-2">
          {followUps.map((text, i) => (
            <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted/50 transition-colors font-normal text-xs py-1">
              {text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CompletionDemo() {
  const [mode, setMode] = useState<CompletionViewMode>("turn_complete")

  return (
    <CompletionStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <CompletionCard />
      </div>
    </CompletionStateContext.Provider>
  )
}
