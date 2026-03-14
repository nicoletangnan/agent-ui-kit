import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Layers, Zap } from "lucide-react"

const CATEGORIES = [
  { id: "ud-choice", label: "Choice Card", scenario: "AskQuestion — 单选 / 多选方案", what: "选择" },
  { id: "ud-confirmation", label: "Confirmation", scenario: "SwitchMode — 模式切换确认", what: "确认" },
  { id: "ud-permission", label: "Permission", scenario: "Shell — 危险命令授权", what: "授权" },
  { id: "ud-file-review", label: "File Review", scenario: "StrReplace / Write — 代码变更审核", what: "审核" },
] as const

const STATES = [
  { name: "awaiting_choice", description: "等待用户在多个选项中做出选择" },
  { name: "awaiting_confirmation", description: "等待用户确认操作（如模式切换）" },
  { name: "awaiting_file_review", description: "等待用户审核文件变更" },
  { name: "awaiting_permission", description: "等待用户授权（如终端命令执行）" },
  { name: "user_approved", description: "用户批准了操作" },
  { name: "user_rejected", description: "用户拒绝了操作" },
  { name: "user_edited", description: "用户手动编辑了 Agent 的输出" },
] as const

export { CATEGORIES as DECISION_CATEGORIES }

function CategoriesTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[140px]">Type</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5">Scenario</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {CATEGORIES.map((cat) => (
            <tr key={cat.id} className="group hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5">
                <a
                  href={`#${cat.id}`}
                  className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary underline-offset-2"
                >
                  {cat.label}
                </a>
              </td>
              <td className="px-3 py-1.5 text-muted-foreground font-mono text-[11px]">{cat.scenario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatesTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[200px]">State</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {STATES.map((s) => (
            <tr key={s.name} className="hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5"><code className="text-[11px] font-mono text-foreground">{s.name}</code></td>
              <td className="px-3 py-1.5 text-muted-foreground">{s.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DecisionOverview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Agent 执行过程中需要用户介入的时刻。每种决策场景都有 awaiting → approved / rejected 的状态流转，使用顶部的状态切换器查看不同阶段。
      </p>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0} className="gap-1.5 text-xs">
            <Layers className="size-3.5" />
            4 Types
          </TabsTrigger>
          <TabsTrigger value={1} className="gap-1.5 text-xs">
            <Zap className="size-3.5" />
            7 States
          </TabsTrigger>
        </TabsList>

        <TabsContent value={0}>
          <CategoriesTable />
        </TabsContent>

        <TabsContent value={1}>
          <StatesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
