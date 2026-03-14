import { ShieldAlert, Terminal, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DecisionCardBase } from "./DecisionCardBase"
import { useDecisionState } from "./DecisionStateContext"

export function PermissionDemo() {
  const { mode } = useDecisionState()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <ShieldAlert className="size-3" />
          Permission
        </Badge>
        <span className="text-xs text-muted-foreground">awaiting_permission — Agent 请求执行需要授权的操作</span>
      </div>

      <DecisionCardBase
        icon={ShieldAlert}
        title="Allow terminal command?"
        subtitle="Agent 请求执行以下命令，需要你的授权。"
        approvedContent={
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>已授权执行</span>
            </div>
            <div className="rounded-md bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
              <span className="text-emerald-600">✓</span> rm -rf node_modules && npm install
            </div>
          </div>
        }
        rejectedContent={
          <div className="flex items-center gap-2 text-sm text-red-600">
            <XCircle className="size-4 shrink-0" />
            <span>用户拒绝授权，命令未执行</span>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="rounded-md bg-muted px-3 py-2.5 font-mono text-xs text-foreground flex items-center gap-2">
            <Terminal className="size-3.5 text-muted-foreground shrink-0" />
            <span>rm -rf node_modules && npm install</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="text-xs gap-1.5" disabled={mode !== "awaiting"}>
              <ShieldAlert className="size-3" />
              Allow
            </Button>
            <Button size="sm" variant="outline" className="text-xs" disabled={mode !== "awaiting"}>Deny</Button>
            <span className="text-[11px] text-muted-foreground ml-1">此命令将删除 node_modules 并重新安装依赖</span>
          </div>
        </div>
      </DecisionCardBase>
    </div>
  )
}
