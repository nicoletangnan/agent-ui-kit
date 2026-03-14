import { Clock, CheckCircle2, XCircle } from "lucide-react"
import { StateCard } from "@/components/catalog/StateCard"
import { DecisionOverview, DECISION_CATEGORIES } from "./user-decisions/DecisionOverview"
import { DecisionStateProvider, useDecisionState, type DecisionViewMode } from "./user-decisions/DecisionStateContext"
import { ChoiceDemo } from "./user-decisions/ChoiceDemo"
import { ConfirmationDemo } from "./user-decisions/ConfirmationDemo"
import { PermissionDemo } from "./user-decisions/PermissionDemo"
import { FileReviewDemo } from "./user-decisions/FileReviewDemo"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

const DEMO_MAP: Record<string, React.ComponentType> = {
  "ud-choice": ChoiceDemo,
  "ud-confirmation": ConfirmationDemo,
  "ud-permission": PermissionDemo,
  "ud-file-review": FileReviewDemo,
}

const SEGMENTS: { value: DecisionViewMode; label: string; icon: React.ElementType; descKey: string }[] = [
  { value: "awaiting", label: "Awaiting", icon: Clock, descKey: "userDecision.segment.awaiting.description" },
  { value: "approved", label: "Approved", icon: CheckCircle2, descKey: "userDecision.segment.approved.description" },
  { value: "rejected", label: "Rejected", icon: XCircle, descKey: "userDecision.segment.rejected.description" },
]

function SegmentedControl() {
  const { mode, setMode } = useDecisionState()

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

export { DECISION_CATEGORIES }

function UserDecisionDemoInner() {
  const { t } = useLocale()

  return (
    <StateCard
      stateName="awaiting_choice | awaiting_confirmation | awaiting_permission | awaiting_file_review → user_approved | user_rejected | user_edited"
      description={t("userDecision.statecard")}
      collapsibleExtra={<DecisionOverview />}
    >
      <div className="space-y-10">
        <SegmentedControl />

        {DECISION_CATEGORIES.map((cat) => {
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

export function UserDecisionDemo() {
  return (
    <DecisionStateProvider>
      <UserDecisionDemoInner />
    </DecisionStateProvider>
  )
}
