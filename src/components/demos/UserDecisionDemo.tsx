import { Clock, CheckCircle2, XCircle } from "lucide-react"
import { StateCard } from "@/components/catalog/StateCard"
import { DecisionOverview, DECISION_CATEGORIES } from "./user-decisions/DecisionOverview"
import { DecisionStateProvider, useDecisionState, type DecisionViewMode } from "./user-decisions/DecisionStateContext"
import { ChoiceDemo } from "./user-decisions/ChoiceDemo"
import { ConfirmationDemo } from "./user-decisions/ConfirmationDemo"
import { PermissionDemo } from "./user-decisions/PermissionDemo"
import { FileReviewDemo } from "./user-decisions/FileReviewDemo"
import { cn } from "@/lib/utils"

const DEMO_MAP: Record<string, React.ComponentType> = {
  "ud-choice": ChoiceDemo,
  "ud-confirmation": ConfirmationDemo,
  "ud-permission": PermissionDemo,
  "ud-file-review": FileReviewDemo,
}

const SEGMENTS: { value: DecisionViewMode; label: string; icon: React.ElementType; description: string }[] = [
  { value: "awaiting", label: "Awaiting", icon: Clock, description: "等待用户做出决策" },
  { value: "approved", label: "Approved", icon: CheckCircle2, description: "用户已批准操作" },
  { value: "rejected", label: "Rejected", icon: XCircle, description: "用户已拒绝操作" },
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
  return (
    <StateCard
      stateName="awaiting_choice | awaiting_confirmation | awaiting_permission | awaiting_file_review → user_approved | user_rejected | user_edited"
      description="4 types · 7 states — 展开查看完整定义"
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
