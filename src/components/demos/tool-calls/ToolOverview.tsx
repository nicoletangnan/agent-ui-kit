import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Layers, Zap, Wrench } from "lucide-react"

const CATEGORIES = [
  { id: "tool-file", label: "File Operations", tools: "Read · Write · StrReplace · Delete · EditNotebook", toolCount: 5, what: "tools" },
  { id: "tool-search", label: "Search", tools: "Grep · Glob · SemanticSearch", toolCount: 3, what: "tools" },
  { id: "tool-terminal", label: "Terminal", tools: "Shell", toolCount: 1, what: "tools" },
  { id: "tool-browser", label: "Browser", tools: "Navigate · Snapshot · Screenshot · Click · Type", toolCount: 5, what: "tools" },
  { id: "tool-agent", label: "Agent & User", tools: "Task · AskQuestion · SwitchMode", toolCount: 3, what: "tools" },
  { id: "tool-verify", label: "Verify & Manage", tools: "ReadLints · TodoWrite", toolCount: 2, what: "tools" },
  { id: "tool-web", label: "Web & Media", tools: "WebSearch · WebFetch · GenerateImage", toolCount: 3, what: "tools" },
] as const

const STATES = [
  { name: "tool_selected", description: "Agent 决定调用某个工具，尚未执行" },
  { name: "tool_calling", description: "工具正在执行中" },
  { name: "tool_result", description: "工具成功返回结果" },
  { name: "tool_error", description: "工具执行出错" },
  { name: "tool_result_folded", description: "结果已折叠，可展开查看" },
] as const

const TOOLS = [
  { name: "Read", category: "File Operations", description: "读取文件内容" },
  { name: "Write", category: "File Operations", description: "创建或覆盖文件" },
  { name: "StrReplace", category: "File Operations", description: "精确替换文件中的字符串" },
  { name: "Delete", category: "File Operations", description: "删除文件" },
  { name: "EditNotebook", category: "File Operations", description: "编辑 Jupyter Notebook cell" },
  { name: "Grep", category: "Search", description: "正则搜索代码内容" },
  { name: "Glob", category: "Search", description: "按文件名模式搜索" },
  { name: "SemanticSearch", category: "Search", description: "按含义语义搜索代码" },
  { name: "Shell", category: "Terminal", description: "执行终端命令" },
  { name: "browser_navigate", category: "Browser", description: "打开网页 URL" },
  { name: "browser_snapshot", category: "Browser", description: "获取页面 DOM 结构" },
  { name: "browser_screenshot", category: "Browser", description: "网页截图" },
  { name: "browser_click", category: "Browser", description: "点击页面元素" },
  { name: "browser_type", category: "Browser", description: "在页面输入文字" },
  { name: "Task", category: "Agent & User", description: "启动子 Agent 处理子任务" },
  { name: "AskQuestion", category: "Agent & User", description: "向用户提问（单选/多选）" },
  { name: "SwitchMode", category: "Agent & User", description: "切换交互模式" },
  { name: "ReadLints", category: "Verify & Manage", description: "检查代码 lint 错误" },
  { name: "TodoWrite", category: "Verify & Manage", description: "更新任务列表" },
  { name: "WebSearch", category: "Web & Media", description: "搜索互联网" },
  { name: "WebFetch", category: "Web & Media", description: "抓取网页内容" },
  { name: "GenerateImage", category: "Web & Media", description: "AI 生成图片" },
] as const

export { CATEGORIES }

function CategoriesTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[140px]">Category</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5">Contains</th>
            <th className="text-right font-medium text-muted-foreground px-3 py-1.5 w-[60px]">Tools</th>
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
              <td className="px-3 py-1.5 text-muted-foreground font-mono text-[11px]">{cat.tools}</td>
              <td className="px-3 py-1.5 text-right text-muted-foreground tabular-nums">
                {cat.toolCount} {cat.what}
              </td>
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
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[180px]">State</th>
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

function ToolsTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[160px]">Tool</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[120px]">Category</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {TOOLS.map((t) => (
            <tr key={t.name} className="hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5"><code className="text-[11px] font-mono text-foreground">{t.name}</code></td>
              <td className="px-3 py-1.5">
                <Badge variant="secondary" className="text-[10px] font-normal py-0 px-1.5">{t.category}</Badge>
              </td>
              <td className="px-3 py-1.5 text-muted-foreground">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ToolOverview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Agent 通过调用工具来完成任务。每次调用都会经历 5 种状态之一，工具共 21 种，分为 7 个类别。点击类别名称可跳转到对应的交互 Demo，使用顶部的状态切换器查看不同状态。
      </p>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0} className="gap-1.5 text-xs">
            <Layers className="size-3.5" />
            7 Categories
          </TabsTrigger>
          <TabsTrigger value={1} className="gap-1.5 text-xs">
            <Zap className="size-3.5" />
            5 States
          </TabsTrigger>
          <TabsTrigger value={2} className="gap-1.5 text-xs">
            <Wrench className="size-3.5" />
            21 Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value={0}>
          <CategoriesTable />
        </TabsContent>

        <TabsContent value={1}>
          <StatesTable />
        </TabsContent>

        <TabsContent value={2}>
          <ToolsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
