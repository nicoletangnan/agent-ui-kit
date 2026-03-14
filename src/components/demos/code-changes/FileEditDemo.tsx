import { FileEdit, CheckCircle2, XCircle, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCodeChangeState } from "./CodeChangeStateContext"

type DiffLine = {
  type: "context" | "removed" | "added"
  num: number
  text: string
}

const DIFF_LINES: DiffLine[] = [
  { type: "context", num: 1, text: "function App() {" },
  { type: "context", num: 2, text: "  const [todos, setTodos] = useState([])" },
  { type: "removed", num: 3, text: "  return <div>Hello World</div>" },
  { type: "added", num: 3, text: "  return (" },
  { type: "added", num: 4, text: '    <div className="p-4">' },
  { type: "added", num: 5, text: "      <h1>Todo List</h1>" },
  { type: "added", num: 6, text: "      <TodoInput onAdd={addTodo} />" },
  { type: "added", num: 7, text: "      <TodoItems items={todos} />" },
  { type: "added", num: 8, text: "    </div>" },
  { type: "added", num: 9, text: "  )" },
  { type: "context", num: 10, text: "}" },
]

function DiffView({ lines, dimmed }: { lines: DiffLine[]; dimmed?: boolean }) {
  return (
    <div className={cn("font-mono text-xs leading-6 overflow-x-auto", dimmed && "opacity-40")}>
      {lines.map((line, i) => (
        <div
          key={i}
          className={cn(
            "flex",
            line.type === "removed" && "bg-red-50",
            line.type === "added" && "bg-emerald-50",
          )}
        >
          <span className={cn(
            "w-10 text-right pr-3 select-none shrink-0 tabular-nums",
            line.type === "removed" ? "text-red-400/60" :
            line.type === "added" ? "text-emerald-400/60" :
            "text-muted-foreground/30",
          )}>
            {line.num}
          </span>
          <span className={cn(
            "px-2 flex-1",
            line.type === "removed" && "text-red-700",
            line.type === "added" && "text-emerald-700",
          )}>
            {line.type === "removed" ? "- " : line.type === "added" ? "+ " : "  "}
            {line.text}
          </span>
        </div>
      ))}
    </div>
  )
}

export function FileEditDemo() {
  const { mode } = useCodeChangeState()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge className="text-xs font-normal gap-1.5 py-1">
          <FileEdit className="size-3" />
          File Edit
        </Badge>
        <span className="text-xs text-muted-foreground">file_editing → diff_shown → diff_pending — 编辑现有文件</span>
      </div>

      <div className={cn(
        "rounded-lg border overflow-hidden transition-colors duration-200",
        mode === "accepted" ? "border-emerald-200" :
        mode === "rejected" ? "border-red-200" :
        "border-border",
      )}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 text-sm">
            <FileEdit className="size-3.5 text-muted-foreground" />
            <span className="font-medium">src/App.tsx</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">modified</span>
          </div>
          {mode === "pending" && (
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                <Check className="size-3" />
                Accept
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10">
                <X className="size-3" />
                Reject
              </Button>
            </div>
          )}
          {mode === "accepted" && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="size-3" />
              Accepted
            </span>
          )}
          {mode === "rejected" && (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
              <XCircle className="size-3" />
              Rejected
            </span>
          )}
        </div>

        <DiffView lines={DIFF_LINES} dimmed={mode === "rejected"} />
      </div>
    </div>
  )
}
