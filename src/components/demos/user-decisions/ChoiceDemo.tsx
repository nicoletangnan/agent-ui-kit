import { MessageCircleQuestion, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DecisionCardBase } from "./DecisionCardBase"
import { cn } from "@/lib/utils"

const OPTIONS = [
  { label: "useState + useReducer", desc: "轻量级，适合简单场景", selected: false },
  { label: "Zustand", desc: "简洁的全局状态管理", selected: true },
  { label: "Redux Toolkit", desc: "完整的状态管理生态", selected: false },
]

export function ChoiceDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <MessageCircleQuestion className="size-3" />
          Choice Card
        </Badge>
        <span className="text-xs text-muted-foreground">awaiting_choice — Agent 向用户提问，等待选择</span>
      </div>

      <DecisionCardBase
        icon={MessageCircleQuestion}
        title="你希望使用哪种状态管理方案？"
        approvedContent={
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>用户选择了 <strong>Zustand</strong>，Agent 将使用该方案继续执行</span>
          </div>
        }
        rejectedContent={
          <div className="text-sm text-muted-foreground">
            用户跳过了选择，Agent 将使用默认方案
          </div>
        }
      >
        <div className="space-y-2">
          {OPTIONS.map((opt) => (
            <div
              key={opt.label}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-md border transition-colors",
                opt.selected
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-primary/5",
              )}
            >
              <p className="text-sm font-medium">{opt.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
            </div>
          ))}
        </div>
      </DecisionCardBase>
    </div>
  )
}
