import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { StateCard } from "@/components/catalog/StateCard"
import { ToolOverview, CATEGORIES } from "./tool-calls/ToolOverview"
import { ToolStateProvider, useToolState, type ToolViewMode } from "./tool-calls/ToolStateContext"
import { FileToolsDemo } from "./tool-calls/FileToolsDemo"
import { SearchToolsDemo } from "./tool-calls/SearchToolsDemo"
import { TerminalToolsDemo } from "./tool-calls/TerminalToolsDemo"
import { BrowserToolsDemo } from "./tool-calls/BrowserToolsDemo"
import { AgentToolsDemo } from "./tool-calls/AgentToolsDemo"
import { VerifyToolsDemo } from "./tool-calls/VerifyToolsDemo"
import { WebToolsDemo } from "./tool-calls/WebToolsDemo"
import { cn } from "@/lib/utils"

const DEMO_MAP: Record<string, React.ComponentType> = {
  "tool-file": FileToolsDemo,
  "tool-search": SearchToolsDemo,
  "tool-terminal": TerminalToolsDemo,
  "tool-browser": BrowserToolsDemo,
  "tool-agent": AgentToolsDemo,
  "tool-verify": VerifyToolsDemo,
  "tool-web": WebToolsDemo,
}

const SEGMENTS: { value: ToolViewMode; label: string; icon: React.ElementType; description: string }[] = [
  { value: "result", label: "Result", icon: CheckCircle2, description: "点击卡片展开/收起结果" },
  { value: "calling", label: "Calling", icon: Loader2, description: "工具正在执行中" },
  { value: "error", label: "Error", icon: XCircle, description: "点击卡片展开/收起错误详情" },
]

function SegmentedControl() {
  const { mode, setMode } = useToolState()

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

function ToolCallDemoInner() {
  return (
    <StateCard
      stateName="tool_selected → tool_calling → tool_result | tool_error"
      description="7 categories · 5 states · 21 tools — 展开查看完整定义"
      collapsibleExtra={<ToolOverview />}
    >
      <div className="space-y-10">
        <SegmentedControl />

        {CATEGORIES.map((cat) => {
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

export function ToolCallDemo() {
  return (
    <ToolStateProvider>
      <ToolCallDemoInner />
    </ToolStateProvider>
  )
}
