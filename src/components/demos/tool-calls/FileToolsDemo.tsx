import { FileText, FilePlus, FileEdit, FileX, BookOpen } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"

export function FileToolsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <FileText className="size-3" />
          File Operations
        </Badge>
        <span className="text-xs text-muted-foreground">读取、创建、编辑、删除文件</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={FileText}
          label="Read"
          description="src/App.tsx"
          duration="12ms"
          resultRaw={`     1|import { Button } from '@/components/ui/button'
     2|import { Bot } from 'lucide-react'
     3|
     4|function App() {
     5|  return (
     6|    <div className="min-h-screen bg-background">
     7|      <h1>Agent UI Kit</h1>
     8|    </div>
     9|  )
    10|}
    11|
    12|export default App`}
          errorRaw="Error: File not found: src/App.tsx"
        />

        <ToolCallBase
          icon={FilePlus}
          label="Write"
          description="src/components/TodoList.tsx"
          duration="5ms"
          resultRaw="Created file: src/components/TodoList.tsx (42 lines)"
          errorRaw="Error: EACCES: permission denied, open 'src/components/TodoList.tsx'"
        />

        <ToolCallBase
          icon={FileEdit}
          label="StrReplace"
          description="src/App.tsx"
          duration="4ms"
          result={
            <div className="font-mono text-xs leading-6">
              <div className="flex bg-red-50 rounded-sm px-2 py-0.5">
                <span className="text-red-400/60 w-6 text-right mr-2 select-none shrink-0">-</span>
                <span className="text-red-700">{'  return <div>Hello World</div>'}</span>
              </div>
              <div className="flex bg-emerald-50 rounded-sm px-2 py-0.5">
                <span className="text-emerald-400/60 w-6 text-right mr-2 select-none shrink-0">+</span>
                <span className="text-emerald-700">{'  return <TodoList items={todos} />'}</span>
              </div>
            </div>
          }
          errorRaw="Error: old_string is not unique in the file. Found 3 matches. Provide more context to make it unique."
        />

        <ToolCallBase
          icon={FileX}
          label="Delete"
          description="src/components/OldComponent.tsx"
          duration="2ms"
          resultRaw="Deleted: src/components/OldComponent.tsx"
          errorRaw="Error: File not found: src/components/OldComponent.tsx"
        />

        <ToolCallBase
          icon={BookOpen}
          label="EditNotebook"
          description="notebooks/analysis.ipynb — cell 3"
          duration="15ms"
          result={
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Cell 3</span>
                <span>python</span>
              </div>
              <pre className="text-xs font-mono text-muted-foreground leading-relaxed">{`df = pd.read_csv("data.csv")
df.head(10)`}</pre>
            </div>
          }
          errorRaw="Error: Cell index 3 out of range (notebook has 2 cells)"
        />
      </div>
    </div>
  )
}
