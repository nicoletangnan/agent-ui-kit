import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Type, Code2, List, Pause, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Streaming sub-sections (for Sidebar navigation) ────────────────

export const STREAMING_SECTIONS = [
  { id: "stream-text", label: "Text" },
  { id: "stream-code-block", label: "Code Block" },
  { id: "stream-markdown", label: "Markdown" },
  { id: "stream-paused", label: "Paused / Resumed" },
] as const

// ─── Shared streaming cursor ────────────────────────────────────────

function StreamCursor({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 align-text-bottom animate-pulse" />
  )
}

// ─── Replay button ──────────────────────────────────────────────────

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end mt-2">
      <Button variant="ghost" size="sm" onClick={onClick} className="text-xs gap-1.5">
        <RotateCcw className="size-3" />
        Replay
      </Button>
    </div>
  )
}

// ─── Generic character-by-character streaming hook ───────────────────

function useCharStream(text: string, speed = 20, autoStart = true) {
  const [displayed, setDisplayed] = useState("")
  const [streaming, setStreaming] = useState(autoStart)
  const idx = useRef(0)

  useEffect(() => {
    if (!streaming) return
    idx.current = 0
    setDisplayed("")

    const interval = setInterval(() => {
      if (idx.current < text.length) {
        idx.current++
        setDisplayed(text.slice(0, idx.current))
      } else {
        setStreaming(false)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [streaming, text, speed])

  const restart = useCallback(() => setStreaming(true), [])

  return { displayed, streaming, restart }
}

// ─── Generic line-by-line streaming hook ─────────────────────────────

function useLineStream(lines: string[], lineDelay = 80, autoStart = true) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [streaming, setStreaming] = useState(autoStart)

  useEffect(() => {
    if (!streaming) return
    setVisibleCount(0)

    let current = 0
    const interval = setInterval(() => {
      current++
      if (current <= lines.length) {
        setVisibleCount(current)
      } else {
        setStreaming(false)
        clearInterval(interval)
      }
    }, lineDelay)

    return () => clearInterval(interval)
  }, [streaming, lines, lineDelay])

  const restart = useCallback(() => setStreaming(true), [])

  return { visibleCount, streaming, restart }
}

// =====================================================================
// Demo 1: stream_text — 纯文本流式输出
// =====================================================================

const PLAIN_TEXT = `好的，我来帮你创建一个 TodoList 页面。

我已经查看了项目结构，接下来会：

1. 创建 \`TodoList\` 组件
2. 添加状态管理逻辑
3. 更新路由配置`

function StreamTextDemo() {
  const { displayed, streaming, restart } = useCharStream(PLAIN_TEXT, 20)

  return (
    <div id="stream-text" className="scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Type className="size-3" />
          stream_text
        </Badge>
        <span className="text-xs text-muted-foreground">纯文本逐字输出，带闪烁光标</span>
      </div>
      <div className="rounded-lg border border-border p-4 min-h-[120px]">
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {displayed}
          <StreamCursor visible={streaming} />
        </div>
      </div>
      <ReplayButton onClick={restart} />
    </div>
  )
}

// =====================================================================
// Demo 2: stream_code_block — 代码块流式输出
// =====================================================================

const CODE_LINES = [
  'import { useState } from "react"',
  "",
  "export function Counter() {",
  "  const [count, setCount] = useState(0)",
  "",
  "  return (",
  '    <button onClick={() => setCount(count + 1)}>',
  "      Count: {count}",
  "    </button>",
  "  )",
  "}",
]

const KEYWORD_RE = /\b(import|from|export|function|const|let|return|if|interface|typeof|new)\b/g
const STRING_RE = /(["'`])(?:(?=(\\?))\2.)*?\1/g
const COMMENT_RE = /(\/\/.*$)/gm
const TYPE_RE = /\b(string|number|boolean|Todo|React|useState)\b/g
const JSX_TAG_RE = /(<\/?[A-Za-z][A-Za-z0-9.]*)/g

function highlightLine(line: string) {
  if (!line) return "\u00A0"

  type Span = { start: number; end: number; cls: string }
  const spans: Span[] = []

  const collect = (re: RegExp, cls: string) => {
    let m
    re.lastIndex = 0
    while ((m = re.exec(line)) !== null) {
      spans.push({ start: m.index, end: m.index + m[0].length, cls })
    }
  }

  collect(COMMENT_RE, "text-muted-foreground/50 italic")
  collect(STRING_RE, "text-emerald-600")
  collect(KEYWORD_RE, "text-violet-600 font-medium")
  collect(TYPE_RE, "text-amber-600")
  collect(JSX_TAG_RE, "text-blue-600")

  spans.sort((a, b) => a.start - b.start)

  const merged: Span[] = []
  for (const s of spans) {
    if (merged.length && s.start < merged[merged.length - 1].end) continue
    merged.push(s)
  }

  if (merged.length === 0) return line

  const parts: React.ReactNode[] = []
  let cursor = 0
  merged.forEach((s, i) => {
    if (cursor < s.start) parts.push(line.slice(cursor, s.start))
    parts.push(
      <span key={i} className={s.cls}>{line.slice(s.start, s.end)}</span>
    )
    cursor = s.end
  })
  if (cursor < line.length) parts.push(line.slice(cursor))

  return parts
}

function StreamCodeBlockDemo() {
  const { visibleCount, streaming, restart } = useLineStream(CODE_LINES, 60)

  return (
    <div id="stream-code-block" className="scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Code2 className="size-3" />
          stream_code_block
        </Badge>
        <span className="text-xs text-muted-foreground">代码块逐行输出，带语法高亮</span>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/30">
          <span className="text-[11px] text-muted-foreground font-mono">src/components/TodoList.tsx</span>
          <span className="text-[10px] text-muted-foreground/50">tsx</span>
        </div>
        <div className="p-3 font-mono text-xs leading-6 overflow-x-auto bg-muted/5 min-h-[200px]">
          {CODE_LINES.slice(0, visibleCount).map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-3 text-muted-foreground/30 select-none shrink-0 tabular-nums">
                {i + 1}
              </span>
              <span className="flex-1">{highlightLine(line)}</span>
            </div>
          ))}
          {streaming && (
            <div className="flex">
              <span className="w-8 text-right pr-3 text-muted-foreground/30 select-none shrink-0 tabular-nums">
                {visibleCount + 1}
              </span>
              <StreamCursor visible />
            </div>
          )}
        </div>
      </div>
      <ReplayButton onClick={restart} />
    </div>
  )
}

// =====================================================================
// Demo 3: stream_markdown — Markdown 结构化内容流式输出
// =====================================================================

type MdSegment =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list-item"; text: string }
  | { type: "table-row"; cells: string[]; isHeader?: boolean }
  | { type: "table-divider" }

const MD_SEGMENTS: MdSegment[] = [
  { type: "heading", level: 3, text: "分析结果" },
  { type: "paragraph", text: "项目使用 React + TypeScript + Tailwind CSS，已配置 Shadcn/UI 组件库。以下是建议的文件结构：" },
  { type: "table-row", cells: ["文件", "说明", "状态"], isHeader: true },
  { type: "table-divider" },
  { type: "table-row", cells: ["src/components/TodoList.tsx", "主组件", "待创建"] },
  { type: "table-row", cells: ["src/components/TodoItem.tsx", "列表项组件", "待创建"] },
  { type: "table-row", cells: ["src/hooks/useTodos.ts", "状态管理 Hook", "待创建"] },
  { type: "table-row", cells: ["src/App.tsx", "路由入口", "需修改"] },
  { type: "heading", level: 3, text: "执行计划" },
  { type: "list-item", text: "先创建 `useTodos` hook 处理增删改查" },
  { type: "list-item", text: "再创建 `TodoItem` 单项组件" },
  { type: "list-item", text: "最后组装 `TodoList` 并更新路由" },
]

function renderMdSegment(seg: MdSegment, idx: number) {
  switch (seg.type) {
    case "heading":
      return (
        <div key={idx} className={cn("font-semibold text-foreground", seg.level === 3 ? "text-sm" : "text-base", idx > 0 && "mt-3")}>
          {seg.text}
        </div>
      )
    case "paragraph":
      return (
        <p key={idx} className="text-sm text-muted-foreground leading-relaxed mt-1.5">
          {seg.text}
        </p>
      )
    case "list-item":
      return (
        <div key={idx} className="flex gap-2 text-sm text-muted-foreground mt-1">
          <span className="text-muted-foreground/50 shrink-0">•</span>
          <span>{renderInlineCode(seg.text)}</span>
        </div>
      )
    case "table-row":
      return (
        <tr key={idx} className={seg.isHeader ? "bg-muted/40" : "hover:bg-muted/20 transition-colors"}>
          {seg.cells.map((cell, ci) => {
            const Tag = seg.isHeader ? "th" : "td"
            return (
              <Tag
                key={ci}
                className={cn(
                  "px-2.5 py-1.5 text-left text-xs",
                  seg.isHeader ? "font-medium text-muted-foreground" : "text-foreground",
                  ci === 0 && !seg.isHeader && "font-mono text-[11px]",
                )}
              >
                {renderInlineCode(cell)}
              </Tag>
            )
          })}
        </tr>
      )
    case "table-divider":
      return null
    default:
      return null
  }
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="px-1 py-0.5 rounded bg-muted text-foreground text-[11px] font-mono">{part.slice(1, -1)}</code>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function StreamMarkdownDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [streaming, setStreaming] = useState(true)

  useEffect(() => {
    if (!streaming) return
    setVisibleCount(0)

    let current = 0
    const interval = setInterval(() => {
      current++
      if (current <= MD_SEGMENTS.length) {
        setVisibleCount(current)
      } else {
        setStreaming(false)
        clearInterval(interval)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [streaming])

  const restart = useCallback(() => setStreaming(true), [])

  const visibleSegments = MD_SEGMENTS.slice(0, visibleCount)
  const tableRows = visibleSegments.filter(s => s.type === "table-row" || s.type === "table-divider")
  const hasTable = tableRows.length > 0
  const preTableSegments = visibleSegments.slice(0, visibleSegments.findIndex(s => s.type === "table-row" || s.type === "table-divider"))
  const postTableIdx = visibleSegments.reduce((last, s, i) => (s.type === "table-row" || s.type === "table-divider") ? i : last, -1)
  const postTableSegments = postTableIdx >= 0 ? visibleSegments.slice(postTableIdx + 1) : []

  return (
    <div id="stream-markdown" className="scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <List className="size-3" />
          stream_markdown
        </Badge>
        <span className="text-xs text-muted-foreground">Markdown 结构化内容逐段输出（表格、列表等）</span>
      </div>
      <div className="rounded-lg border border-border p-4 min-h-[200px]">
        {preTableSegments.map((seg, i) => renderMdSegment(seg, i))}

        {hasTable && (
          <div className="rounded-md border border-border overflow-hidden mt-2 mb-2">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-border/50">
                {tableRows.map((seg, i) => renderMdSegment(seg, i + preTableSegments.length))}
              </tbody>
            </table>
          </div>
        )}

        {postTableSegments.map((seg, i) => renderMdSegment(seg, i + preTableSegments.length + tableRows.length))}

        <StreamCursor visible={streaming} />
      </div>
      <ReplayButton onClick={restart} />
    </div>
  )
}

// =====================================================================
// Demo 4: stream_paused / stream_resumed — 暂停与恢复
// =====================================================================

type StreamPhase =
  | { type: "text"; content: string }
  | { type: "pause"; tool: string; duration: number }

const PAUSE_DEMO_PHASES: StreamPhase[] = [
  { type: "text", content: "让我先看看项目结构" },
  { type: "pause", tool: "Glob — src/**/*.tsx", duration: 1500 },
  { type: "text", content: "。找到了 12 个组件文件。现在读取入口文件" },
  { type: "pause", tool: "Read — src/App.tsx", duration: 1200 },
  { type: "text", content: "。好的，我已经理解了项目结构，现在开始创建 TodoList 组件。" },
]

function StreamPausedDemo() {
  const [segments, setSegments] = useState<{ type: "text" | "pause"; content: string }[]>([])
  const [currentPhase, setCurrentPhase] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    if (currentPhase >= PAUSE_DEMO_PHASES.length) {
      setDone(true)
      return
    }

    const phase = PAUSE_DEMO_PHASES[currentPhase]

    if (phase.type === "text") {
      setPaused(false)
      if (charIdx === 0) {
        setSegments(prev => [...prev, { type: "text", content: "" }])
      }

      if (charIdx < phase.content.length) {
        const timer = setTimeout(() => {
          setSegments(prev => {
            const copy = [...prev]
            const last = copy[copy.length - 1]
            if (last?.type === "text") {
              copy[copy.length - 1] = { ...last, content: phase.content.slice(0, charIdx + 1) }
            }
            return copy
          })
          setCharIdx(charIdx + 1)
        }, 25)
        return () => clearTimeout(timer)
      } else {
        setCharIdx(0)
        setCurrentPhase(currentPhase + 1)
      }
    } else {
      setPaused(true)
      setSegments(prev => [...prev, { type: "pause", content: phase.tool }])
      const timer = setTimeout(() => {
        setPaused(false)
        setCharIdx(0)
        setCurrentPhase(currentPhase + 1)
      }, phase.duration)
      return () => clearTimeout(timer)
    }
  }, [currentPhase, charIdx, done])

  const restart = useCallback(() => {
    setSegments([])
    setCurrentPhase(0)
    setCharIdx(0)
    setPaused(false)
    setDone(false)
  }, [])

  const streaming = !done

  return (
    <div id="stream-paused" className="scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Pause className="size-3" />
          stream_paused → stream_resumed
        </Badge>
        <span className="text-xs text-muted-foreground">输出中途暂停等待工具结果，然后恢复</span>
      </div>
      <div className="rounded-lg border border-border p-4 min-h-[100px]">
        <div className="text-sm leading-relaxed">
          {segments.map((seg, i) => {
            if (seg.type === "text") {
              return <span key={i}>{seg.content}</span>
            }
            const isActive = paused && i === segments.length - 1
            return (
              <span
                key={i}
                className={cn(
                  "inline-flex items-center gap-1.5 mx-1 px-2 py-0.5 rounded-md text-xs font-mono align-middle transition-colors",
                  isActive
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-muted text-muted-foreground border border-border",
                )}
              >
                {isActive && <Loader2 className="size-3 animate-spin" />}
                {seg.content}
              </span>
            )
          })}
          <StreamCursor visible={streaming} />
        </div>
      </div>
      <ReplayButton onClick={restart} />
    </div>
  )
}

// =====================================================================
// Main export — 组合所有 demo
// =====================================================================

export function StreamingDemo() {
  return (
    <div className="space-y-10">
      <StreamTextDemo />
      <StreamCodeBlockDemo />
      <StreamMarkdownDemo />
      <StreamPausedDemo />
    </div>
  )
}
