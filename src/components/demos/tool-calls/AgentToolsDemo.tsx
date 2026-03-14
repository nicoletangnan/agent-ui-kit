import { GitBranch, MessageCircleQuestion, ArrowLeftRight } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"

export function AgentToolsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <GitBranch className="size-3" />
          Agent & User
        </Badge>
        <span className="text-xs text-muted-foreground">启动子 Agent、向用户提问、切换交互模式</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={GitBranch}
          label="Task"
          description='subagent: explore — "Review all demo components"'
          duration="12.4s"
          callingDuration="running..."
          result={
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-medium text-[10px]">explore</span>
                <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">model: fast</span>
                <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">readonly</span>
              </div>
              <div className="pl-2 border-l-2 border-violet-200 text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground mb-1">Analysis complete:</p>
                <p>Phase 4 (Tool Use): 3/5 states, 4/20 tools covered</p>
                <p>Phase 6 (Code Change): 3/7 states covered</p>
                <p>Phase 5 (Streaming): 3/7 states covered</p>
                <p className="mt-1">Recommendation: Prioritize Phase 4, 6, 5, 8</p>
              </div>
            </div>
          }
          errorRaw="Error: Subagent timed out after 120s"
        />

        <ToolCallBase
          icon={MessageCircleQuestion}
          label="AskQuestion"
          description="Asking user for preference..."
          duration="—"
          result={
            <div className="text-xs space-y-2.5">
              <p className="text-foreground font-medium">你希望使用哪种状态管理方案？</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-border">
                  <span className="size-3.5 rounded-full border-2 border-muted-foreground/30" />
                  <span className="text-muted-foreground">useState + useReducer</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-primary bg-primary/5">
                  <span className="size-3.5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                    <span className="size-1.5 rounded-full bg-white" />
                  </span>
                  <span className="text-foreground font-medium">Zustand</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-border">
                  <span className="size-3.5 rounded-full border-2 border-muted-foreground/30" />
                  <span className="text-muted-foreground">Redux Toolkit</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground/40">User selected: Zustand</p>
            </div>
          }
          errorRaw="Error: User dismissed the question"
        />

        <ToolCallBase
          icon={ArrowLeftRight}
          label="SwitchMode"
          description='target: "plan" — needs architectural discussion'
          duration="—"
          result={
            <div className="text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium text-[10px]">Agent</span>
                <span className="text-muted-foreground">→</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium text-[10px]">Plan</span>
              </div>
              <p className="text-muted-foreground">这个任务有多种实现方案，建议先讨论再动手。</p>
            </div>
          }
          errorRaw="Mode switch was rejected by the user."
        />
      </div>
    </div>
  )
}
