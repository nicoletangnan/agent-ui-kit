import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Layers, Zap } from "lucide-react"

const CATEGORIES = [
  { id: "cc-file-create", label: "File Create", scenario: "Write — 创建新文件", what: "创建" },
  { id: "cc-file-edit", label: "File Edit", scenario: "StrReplace — 编辑现有文件 Diff 视图", what: "编辑" },
  { id: "cc-multi-file", label: "Multi-File", scenario: "批量变更 — 多文件同时修改", what: "批量" },
] as const

const STATES = [
  { name: "file_creating", description: "正在创建新文件" },
  { name: "file_created", description: "新文件已创建" },
  { name: "file_editing", description: "正在编辑现有文件" },
  { name: "diff_shown", description: "Diff 视图已展示" },
  { name: "diff_pending", description: "等待用户审核" },
  { name: "diff_accepted", description: "用户接受了变更" },
  { name: "diff_rejected", description: "用户拒绝了变更" },
] as const

export { CATEGORIES as CODE_CHANGE_CATEGORIES }

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
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[160px]">State</th>
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

export function CodeChangeOverview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Agent 创建或编辑文件时，Cursor 展示 Diff 视图供用户审核。使用顶部的状态切换器查看 pending / accepted / rejected 不同阶段。
      </p>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0} className="gap-1.5 text-xs">
            <Layers className="size-3.5" />
            3 Types
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
