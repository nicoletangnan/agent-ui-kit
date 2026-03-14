import { FileEdit, Check, X, Pencil, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DecisionCardBase } from "./DecisionCardBase"
import { useDecisionState } from "./DecisionStateContext"

const DIFF_LINES = [
  { type: "context" as const, num: 1, text: "function App() {" },
  { type: "context" as const, num: 2, text: "  const [todos, setTodos] = useState([])" },
  { type: "removed" as const, num: 3, text: "  return <div>Hello World</div>" },
  { type: "added" as const, num: 3, text: "  return (" },
  { type: "added" as const, num: 4, text: '    <div className="p-4">' },
  { type: "added" as const, num: 5, text: "      <TodoList items={todos} />" },
  { type: "added" as const, num: 6, text: "    </div>" },
  { type: "added" as const, num: 7, text: "  )" },
  { type: "context" as const, num: 8, text: "}" },
]

export function FileReviewDemo() {
  const { mode } = useDecisionState()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <FileEdit className="size-3" />
          File Review
        </Badge>
        <span className="text-xs text-muted-foreground">awaiting_file_review — 等待用户审核代码变更</span>
      </div>

      <DecisionCardBase
        icon={FileEdit}
        title="src/App.tsx"
        subtitle="Agent 修改了此文件，等待审核"
        approvedContent={
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>变更已接受，文件已保存</span>
          </div>
        }
        rejectedContent={
          <div className="flex items-center gap-2 text-sm text-red-600">
            <XCircle className="size-4 shrink-0" />
            <span>变更已拒绝，文件已回退</span>
          </div>
        }
      >
        <div className="space-y-2.5">
          <div className="rounded-md border border-border overflow-hidden">
            <div className="font-mono text-xs leading-6 overflow-x-auto">
              {DIFF_LINES.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "removed" ? "flex bg-red-50" :
                    line.type === "added" ? "flex bg-emerald-50" :
                    "flex"
                  }
                >
                  <span className={`w-8 text-right pr-2 select-none shrink-0 tabular-nums ${
                    line.type === "removed" ? "text-red-400/60" :
                    line.type === "added" ? "text-emerald-400/60" :
                    "text-muted-foreground/30"
                  }`}>
                    {line.num}
                  </span>
                  <span className={`px-2 flex-1 ${
                    line.type === "removed" ? "text-red-700" :
                    line.type === "added" ? "text-emerald-700" :
                    ""
                  }`}>
                    {line.type === "removed" ? "- " : line.type === "added" ? "+ " : "  "}
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-xs gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              disabled={mode !== "awaiting"}
            >
              <Check className="size-3" />
              Accept
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-xs gap-1 text-destructive hover:bg-destructive/10"
              disabled={mode !== "awaiting"}
            >
              <X className="size-3" />
              Reject
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              disabled={mode !== "awaiting"}
            >
              <Pencil className="size-3" />
              Edit
            </Button>
          </div>
        </div>
      </DecisionCardBase>
    </div>
  )
}
