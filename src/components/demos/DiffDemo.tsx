import { Button } from "@/components/ui/button"
import { FileEdit, Check, X } from "lucide-react"

const REMOVED_LINES = [
  { num: 3, text: '  return <div>Hello World</div>' },
]

const ADDED_LINES = [
  { num: 3, text: '  return (' },
  { num: 4, text: '    <div className="p-4">' },
  { num: 5, text: '      <h1>Todo List</h1>' },
  { num: 6, text: '      <TodoInput onAdd={addTodo} />' },
  { num: 7, text: '      <TodoItems items={todos} />' },
  { num: 8, text: '    </div>' },
  { num: 9, text: '  )' },
]

const CONTEXT_BEFORE = [
  { num: 1, text: 'function App() {' },
  { num: 2, text: '  const [todos, setTodos] = useState([])' },
]

const CONTEXT_AFTER = [
  { num: 10, text: '}' },
]

export function DiffDemo() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 text-sm">
          <FileEdit className="size-3.5 text-muted-foreground" />
          <span className="font-medium">src/App.tsx</span>
          <span className="text-xs text-muted-foreground">modified</span>
        </div>
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
      </div>
      <div className="font-mono text-xs leading-6 overflow-x-auto">
        {CONTEXT_BEFORE.map(line => (
          <div key={`ctx-b-${line.num}`} className="flex">
            <span className="w-10 text-right pr-3 text-muted-foreground/50 select-none shrink-0">{line.num}</span>
            <span className="px-2 flex-1">{line.text}</span>
          </div>
        ))}
        {REMOVED_LINES.map(line => (
          <div key={`rem-${line.num}`} className="flex bg-red-50">
            <span className="w-10 text-right pr-3 text-red-400/60 select-none shrink-0">{line.num}</span>
            <span className="px-2 flex-1 text-red-700">- {line.text}</span>
          </div>
        ))}
        {ADDED_LINES.map(line => (
          <div key={`add-${line.num}`} className="flex bg-emerald-50">
            <span className="w-10 text-right pr-3 text-emerald-400/60 select-none shrink-0">{line.num}</span>
            <span className="px-2 flex-1 text-emerald-700">+ {line.text}</span>
          </div>
        ))}
        {CONTEXT_AFTER.map(line => (
          <div key={`ctx-a-${line.num}`} className="flex">
            <span className="w-10 text-right pr-3 text-muted-foreground/50 select-none shrink-0">{line.num}</span>
            <span className="px-2 flex-1">{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
