import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Layers, Zap, Wrench } from "lucide-react"
import { useLocale } from "@/i18n/locale-context"

const CATEGORIES = [
  { id: "tool-file", label: "File Operations", tools: "Read · Write · StrReplace · Delete · EditNotebook", toolCount: 5, what: "tools" },
  { id: "tool-search", label: "Search", tools: "Grep · Glob · SemanticSearch", toolCount: 3, what: "tools" },
  { id: "tool-terminal", label: "Terminal", tools: "Shell", toolCount: 1, what: "tools" },
  { id: "tool-browser", label: "Browser", tools: "Navigate · Snapshot · Screenshot · Click · Type", toolCount: 5, what: "tools" },
  { id: "tool-agent", label: "Subagent", tools: "Task (explore · shell · browser-use)", toolCount: 1, what: "tool" },
  { id: "tool-verify", label: "Verify & Manage", tools: "ReadLints · TodoWrite", toolCount: 2, what: "tools" },
  { id: "tool-web", label: "Web & Media", tools: "WebSearch · WebFetch · GenerateImage", toolCount: 3, what: "tools" },
] as const

const STATE_KEYS = [
  { name: "tool_selected", descKey: "toolOverview.state.tool_selected" },
  { name: "tool_calling", descKey: "toolOverview.state.tool_calling" },
  { name: "tool_result", descKey: "toolOverview.state.tool_result" },
  { name: "tool_error", descKey: "toolOverview.state.tool_error" },
  { name: "tool_result_folded", descKey: "toolOverview.state.tool_cancelled" },
] as const

const TOOL_KEYS = [
  { name: "Read", category: "File Operations", descKey: "tool.Read.description" },
  { name: "Write", category: "File Operations", descKey: "tool.Write.description" },
  { name: "StrReplace", category: "File Operations", descKey: "tool.StrReplace.description" },
  { name: "Delete", category: "File Operations", descKey: "tool.Delete.description" },
  { name: "EditNotebook", category: "File Operations", descKey: "tool.EditNotebook.description" },
  { name: "Grep", category: "Search", descKey: "tool.Grep.description" },
  { name: "Glob", category: "Search", descKey: "tool.Glob.description" },
  { name: "SemanticSearch", category: "Search", descKey: "tool.SemanticSearch.description" },
  { name: "Shell", category: "Terminal", descKey: "tool.Shell.description" },
  { name: "browser_navigate", category: "Browser", descKey: "tool.Navigate.description" },
  { name: "browser_snapshot", category: "Browser", descKey: "tool.Snapshot.description" },
  { name: "browser_screenshot", category: "Browser", descKey: "tool.Screenshot.description" },
  { name: "browser_click", category: "Browser", descKey: "tool.Click.description" },
  { name: "browser_type", category: "Browser", descKey: "tool.Type.description" },
  { name: "Task", category: "Subagent", descKey: "tool.Task.description" },
  { name: "ReadLints", category: "Verify & Manage", descKey: "tool.ReadLints.description" },
  { name: "TodoWrite", category: "Verify & Manage", descKey: "tool.TodoWrite.description" },
  { name: "WebSearch", category: "Web & Media", descKey: "tool.WebSearch.description" },
  { name: "WebFetch", category: "Web & Media", descKey: "tool.WebFetch.description" },
  { name: "GenerateImage", category: "Web & Media", descKey: "tool.GenerateImage.description" },
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
  const { t } = useLocale()
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
          {STATE_KEYS.map((s) => (
            <tr key={s.name} className="hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5"><code className="text-[11px] font-mono text-foreground">{s.name}</code></td>
              <td className="px-3 py-1.5 text-muted-foreground">{t(s.descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ToolsTable() {
  const { t } = useLocale()
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
          {TOOL_KEYS.map((tool) => (
            <tr key={tool.name} className="hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5"><code className="text-[11px] font-mono text-foreground">{tool.name}</code></td>
              <td className="px-3 py-1.5">
                <Badge variant="secondary" className="text-[10px] font-normal py-0 px-1.5">{tool.category}</Badge>
              </td>
              <td className="px-3 py-1.5 text-muted-foreground">{t(tool.descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ToolOverview() {
  const { t } = useLocale()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("toolOverview.intro")}
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
            19 Tools
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
