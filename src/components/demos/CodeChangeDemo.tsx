import { Clock, CheckCircle2, XCircle } from "lucide-react"
import { StateCard } from "@/components/catalog/StateCard"
import { CodeChangeOverview, CODE_CHANGE_CATEGORIES } from "./code-changes/CodeChangeOverview"
import { CodeChangeStateProvider, useCodeChangeState, type CodeChangeViewMode } from "./code-changes/CodeChangeStateContext"
import { FileCreateDemo } from "./code-changes/FileCreateDemo"
import { FileEditDemo } from "./code-changes/FileEditDemo"
import { MultiFileDemo } from "./code-changes/MultiFileDemo"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

const DEMO_MAP: Record<string, React.ComponentType> = {
  "cc-file-create": FileCreateDemo,
  "cc-file-edit": FileEditDemo,
  "cc-multi-file": MultiFileDemo,
}

const SEGMENTS: { value: CodeChangeViewMode; label: string; icon: React.ElementType; descKey: string }[] = [
  { value: "pending", label: "Pending", icon: Clock, descKey: "codeChange.segment.pending.description" },
  { value: "accepted", label: "Accepted", icon: CheckCircle2, descKey: "codeChange.segment.accepted.description" },
  { value: "rejected", label: "Rejected", icon: XCircle, descKey: "codeChange.segment.rejected.description" },
]

function SegmentedControl() {
  const { mode, setMode } = useCodeChangeState()

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

export { CODE_CHANGE_CATEGORIES }

function CodeChangeDemoInner() {
  const { t } = useLocale()

  return (
    <StateCard
      stateName="file_creating | file_editing → diff_shown → diff_pending → diff_accepted | diff_rejected"
      description={t("codeChange.statecard")}
      collapsibleExtra={<CodeChangeOverview />}
    >
      <div className="space-y-10">
        <SegmentedControl />

        {CODE_CHANGE_CATEGORIES.map((cat) => {
          const Demo = DEMO_MAP[cat.id]
          if (!Demo) return null
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-20">
              <Demo />
            </section>
          )
        })}
      </div>
    </StateCard>
  )
}

export function CodeChangeDemo() {
  return (
    <CodeChangeStateProvider>
      <CodeChangeDemoInner />
    </CodeChangeStateProvider>
  )
}
