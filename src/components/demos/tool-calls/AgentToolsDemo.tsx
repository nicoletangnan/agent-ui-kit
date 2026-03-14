import { useState } from "react"
import { GitBranch, ChevronDown, FileText, Search, Terminal, Globe, CheckCircle2, Loader2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToolState } from "./ToolStateContext"
import { useLocale } from "@/i18n/locale-context"

type SubOp = {
  icon: React.ElementType
  label: string
  tools: string
  duration?: string
}

type SubagentBlock = {
  type: "explore" | "shell" | "browser"
  summary: string
  detail?: string
  subOps: SubOp[]
  duration: string
  callingLabel?: string
  errorMsg?: string
}

const SUBAGENT_BLOCKS: SubagentBlock[] = [
  {
    type: "explore",
    summary: "Explored 1 search, lints, 1 command",
    subOps: [
      { icon: Terminal, label: "Check terminal metadata", tools: "head, echo", duration: "0.8s" },
    ],
    duration: "2.1s",
    callingLabel: "Exploring...",
    errorMsg: "Error: Subagent timed out after 30s",
  },
  {
    type: "explore",
    summary: "Explored 1 file, 1 search",
    subOps: [
      { icon: FileText, label: "List browser MCP tools", tools: "ls, head", duration: "1.2s" },
      { icon: FileText, label: "List remaining browser tools", tools: "ls, tail", duration: "0.9s" },
    ],
    duration: "3.4s",
    callingLabel: "Exploring...",
    errorMsg: "Error: File not found — /src/missing.ts",
  },
  {
    type: "explore",
    summary: "Explored 4 files",
    duration: "5.2s",
    subOps: [],
    callingLabel: "Exploring...",
    errorMsg: "Error: Read permission denied",
  },
  {
    type: "browser",
    summary: "Navigated to http://localhost:5174/#user-decision",
    subOps: [
      { icon: Globe, label: "browser_navigate", tools: "http://localhost:5174/", duration: "1.8s" },
      { icon: Search, label: "browser_snapshot", tools: "accessibility tree", duration: "0.3s" },
    ],
    duration: "4.6s",
    callingLabel: "Navigating...",
    errorMsg: "Error: Page load timeout after 30s",
  },
]

const TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  explore: { bg: "bg-violet-100", text: "text-violet-700", label: "explore" },
  shell: { bg: "bg-amber-100", text: "text-amber-700", label: "shell" },
  browser: { bg: "bg-sky-100", text: "text-sky-700", label: "browser" },
}

function SubagentCard({ block }: { block: SubagentBlock }) {
  const { mode } = useToolState()
  const [expanded, setExpanded] = useState(false)
  const isCalling = mode === "calling"
  const isError = mode === "error"
  const style = TYPE_STYLES[block.type]
  const hasSubOps = block.subOps.length > 0
  const canExpand = !isCalling && hasSubOps

  return (
    <div className={cn(
      "rounded-lg border overflow-hidden transition-colors duration-200",
      isError ? "border-destructive/30" : "border-border",
    )}>
      <button
        type="button"
        onClick={() => canExpand && setExpanded(!expanded)}
        className={cn(
          "group/sub w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
          canExpand && "hover:bg-muted/30 cursor-pointer",
          !canExpand && "cursor-default",
          isCalling && "opacity-75",
        )}
      >
        {canExpand && (
          <ChevronDown className={cn(
            "size-3.5 text-muted-foreground/50 shrink-0 transition-transform duration-150",
            expanded && "rotate-180",
          )} />
        )}
        {!canExpand && !isCalling && (
          <span className="size-3.5 shrink-0" />
        )}
        {isCalling && (
          <Loader2 className="size-3.5 text-muted-foreground animate-spin shrink-0" />
        )}

        <span className={cn(
          "px-1.5 py-0.5 rounded font-medium text-[10px] shrink-0",
          style.bg, style.text,
        )}>
          {style.label}
        </span>

        <span className={cn(
          "text-xs flex-1 text-left truncate",
          isCalling ? "text-muted-foreground" : "text-muted-foreground",
        )}>
          {isCalling ? block.callingLabel : block.summary}
        </span>

        {!isCalling && (
          <span className="text-[11px] text-muted-foreground/50 tabular-nums shrink-0">{block.duration}</span>
        )}

        {!isCalling && !isError && (
          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
        )}
        {isError && (
          <XCircle className="size-3.5 text-destructive shrink-0" />
        )}
      </button>

      {expanded && !isError && (
        <div className="border-t border-border/50 bg-muted/10">
          {block.subOps.map((op, i) => {
            const OpIcon = op.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-muted-foreground ml-6 border-l-2 border-muted-foreground/10"
              >
                <OpIcon className="size-3 shrink-0" />
                <span className="font-medium text-foreground/80">{op.label}</span>
                <span className="text-muted-foreground/60 font-mono text-[11px]">{op.tools}</span>
                {op.duration && (
                  <span className="ml-auto text-[10px] text-muted-foreground/40 tabular-nums">{op.duration}</span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {expanded && isError && block.errorMsg && (
        <div className="border-t border-destructive/20 bg-destructive/5 px-3 py-2">
          <pre className="text-xs text-destructive font-mono whitespace-pre-wrap leading-relaxed">{block.errorMsg}</pre>
        </div>
      )}
    </div>
  )
}

function SubtitleText() {
  const { t } = useLocale()
  return <span className="text-xs text-muted-foreground">{t("agentTools.subtitle")}</span>
}

export function AgentToolsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <GitBranch className="size-3" />
          Subagent
        </Badge>
        <SubtitleText />
      </div>

      <div className="space-y-2">
        {SUBAGENT_BLOCKS.map((block, i) => (
          <SubagentCard key={i} block={block} />
        ))}
      </div>
    </div>
  )
}
