import { useState, createContext, useContext } from "react"
import { CheckCircle2, Circle, Loader2, ListTodo, Sparkles, Ban } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

type TodoViewMode = "creating" | "in_progress" | "completed" | "no_plan"

const TodoStateContext = createContext<{
  mode: TodoViewMode
  setMode: (m: TodoViewMode) => void
}>({ mode: "creating", setMode: () => {} })

const SEGMENTS: { value: TodoViewMode; label: string; icon: React.ElementType }[] = [
  { value: "creating", label: "Creating", icon: Sparkles },
  { value: "in_progress", label: "In Progress", icon: Loader2 },
  { value: "completed", label: "Completed", icon: CheckCircle2 },
  { value: "no_plan", label: "No Plan", icon: Ban },
]

function SegmentedControl() {
  const { mode, setMode } = useContext(TodoStateContext)

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

type TodoStatus = "pending" | "in_progress" | "completed"

interface Todo {
  id: string
  contentKey: string
  status: TodoStatus
}

const TODO_KEYS: Todo[] = [
  { id: "1", contentKey: "todo.1", status: "completed" },
  { id: "2", contentKey: "todo.2", status: "completed" },
  { id: "3", contentKey: "todo.3", status: "in_progress" },
  { id: "4", contentKey: "todo.4", status: "pending" },
  { id: "5", contentKey: "todo.5", status: "pending" },
]

function StatusIcon({ status }: { status: TodoStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="size-4 text-emerald-500" />
    case "in_progress":
      return <Loader2 className="size-4 text-amber-500 animate-spin" />
    case "pending":
      return <Circle className="size-4 text-muted-foreground/40" />
  }
}

function getTodosForMode(mode: TodoViewMode): (Todo & { status: TodoStatus })[] | null {
  if (mode === "no_plan") return null
  if (mode === "creating") {
    return TODO_KEYS.map((t) => ({ ...t, status: "pending" as const }))
  }
  if (mode === "completed") {
    return TODO_KEYS.map((t) => ({ ...t, status: "completed" as const }))
  }
  return TODO_KEYS
}

function TodoCard() {
  const { mode } = useContext(TodoStateContext)
  const { t } = useLocale()

  if (mode === "no_plan") {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted-foreground">
          <ListTodo className="size-4 shrink-0" />
          <span className="font-medium text-foreground">No plan needed</span>
          <span className="text-xs text-muted-foreground/60 flex-1 text-left">{t("todo.noPlan")}</span>
          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
        </div>
      </div>
    )
  }

  const todos = getTodosForMode(mode)!
  const completedCount = todos.filter((item) => item.status === "completed").length
  const isCreating = mode === "creating"

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-muted/30 flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Task Plan</span>
        <span className="text-xs text-muted-foreground/60">
          {completedCount}/{todos.length}
        </span>
        {isCreating && (
          <>
            <span className="flex-1" />
            <Loader2 className="size-3 text-muted-foreground animate-spin" />
          </>
        )}
      </div>
      <div className="divide-y divide-border/50">
        {todos.map((todo, i) => (
          <div
            key={todo.id}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 text-sm transition-opacity",
              todo.status === "completed" && "text-muted-foreground",
              isCreating && i >= 3 && "opacity-0",
            )}
          >
            {isCreating ? (
              <Circle className="size-4 text-muted-foreground/20" />
            ) : (
              <StatusIcon status={todo.status} />
            )}
            <span className={cn(
              todo.status === "completed" && "line-through",
              isCreating && i >= 3 && "invisible",
            )}>
              {t(todo.contentKey as Parameters<typeof t>[0])}
            </span>
          </div>
        ))}
        {isCreating && (
          <div className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground/60">
            <span className="inline-flex gap-0.5">
              <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
              <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
              <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
            </span>
            <span className="text-xs">{t("todo.planning")}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function TodoListDemo() {
  const [mode, setMode] = useState<TodoViewMode>("creating")

  return (
    <TodoStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <TodoCard />
      </div>
    </TodoStateContext.Provider>
  )
}
