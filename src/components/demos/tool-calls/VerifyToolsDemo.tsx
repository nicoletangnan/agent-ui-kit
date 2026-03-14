import { ShieldCheck, ListTodo } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"

export function VerifyToolsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <ShieldCheck className="size-3" />
          Verify & Manage
        </Badge>
        <span className="text-xs text-muted-foreground">检查代码质量、管理任务列表</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={ShieldCheck}
          label="ReadLints"
          description="src/App.tsx"
          duration="52ms"
          result={
            <div className="text-xs font-mono space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-medium shrink-0 mt-0.5">error</span>
                <div className="text-muted-foreground">
                  <p><span className="text-foreground">src/App.tsx(5,10)</span>: &apos;count&apos; is declared but its value is never read.</p>
                  <p className="text-muted-foreground/50">ts(6133)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-medium shrink-0 mt-0.5">warn</span>
                <div className="text-muted-foreground">
                  <p><span className="text-foreground">src/App.tsx(12,3)</span>: Unexpected console statement.</p>
                  <p className="text-muted-foreground/50">no-console</p>
                </div>
              </div>
              <p className="text-muted-foreground/50 pt-1.5 border-t border-border/30">1 error, 1 warning</p>
            </div>
          }
          errorRaw="Error: File not found: src/App.tsx"
        />

        <ToolCallBase
          icon={ListTodo}
          label="TodoWrite"
          description="Creating task plan (5 items)"
          duration="—"
          result={
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2 py-0.5">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground line-through">读取项目结构和现有文件</span>
              </div>
              <div className="flex items-center gap-2 py-0.5">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground line-through">创建 TodoList 组件</span>
              </div>
              <div className="flex items-center gap-2 py-0.5">
                <Loader2 className="size-3.5 text-amber-500 animate-spin shrink-0" />
                <span className="text-foreground font-medium">添加状态管理和交互逻辑</span>
              </div>
              <div className="flex items-center gap-2 py-0.5">
                <Circle className="size-3.5 text-muted-foreground/30 shrink-0" />
                <span className="text-muted-foreground">更新 App.tsx 路由</span>
              </div>
              <div className="flex items-center gap-2 py-0.5">
                <Circle className="size-3.5 text-muted-foreground/30 shrink-0" />
                <span className="text-muted-foreground">验证页面渲染</span>
              </div>
            </div>
          }
          errorRaw="Error: Invalid todo item — missing required field 'id'"
        />
      </div>
    </div>
  )
}
