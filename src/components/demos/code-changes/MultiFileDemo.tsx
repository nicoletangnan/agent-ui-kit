import { useState } from "react"
import { Files, FilePlus, FileEdit, CheckCircle2, XCircle, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCodeChangeState } from "./CodeChangeStateContext"
import { useLocale } from "@/i18n/locale-context"

interface FileChange {
  path: string
  type: "new" | "modified"
  additions: number
  deletions: number
  preview: string[]
}

const FILE_CHANGES: FileChange[] = [
  {
    path: "src/components/TodoList.tsx",
    type: "new",
    additions: 42,
    deletions: 0,
    preview: [
      '+ import { useState } from "react"',
      "+ import { TodoItem } from \"./TodoItem\"",
      "+ ",
      "+ export function TodoList() {",
      "+   const [todos, setTodos] = useState([])",
    ],
  },
  {
    path: "src/components/TodoItem.tsx",
    type: "new",
    additions: 16,
    deletions: 0,
    preview: [
      "+ export function TodoItem({ text, done, onToggle }) {",
      "+   return (",
      '+     <div className="flex items-center gap-2">',
      "+       <input type=\"checkbox\" checked={done} />",
    ],
  },
  {
    path: "src/App.tsx",
    type: "modified",
    additions: 5,
    deletions: 1,
    preview: [
      "- return <div>Hello World</div>",
      "+ return (",
      '+   <div className="p-4">',
      "+     <TodoList />",
      "+   </div>",
    ],
  },
  {
    path: "src/hooks/useTodos.ts",
    type: "new",
    additions: 28,
    deletions: 0,
    preview: [
      '+ import { useState, useCallback } from "react"',
      "+ ",
      "+ export function useTodos() {",
      "+   const [todos, setTodos] = useState([])",
    ],
  },
]

function FileChangeRow({ file }: { file: FileChange }) {
  const { mode } = useCodeChangeState()
  const { t } = useLocale()
  const [expanded, setExpanded] = useState(false)
  const FileIcon = file.type === "new" ? FilePlus : FileEdit

  return (
    <div className={cn(
      "border-b border-border/50 last:border-b-0 transition-colors",
      mode === "rejected" && "opacity-40",
    )}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <ChevronDown className={cn(
          "size-3.5 text-muted-foreground transition-transform duration-150 shrink-0",
          !expanded && "-rotate-90",
        )} />
        <FileIcon className={cn(
          "size-3.5 shrink-0",
          file.type === "new" ? "text-emerald-500" : "text-amber-500",
        )} />
        <span className="font-mono text-xs font-medium flex-1 text-left truncate">{file.path}</span>
        <span className="text-[10px] text-emerald-600 tabular-nums shrink-0">+{file.additions}</span>
        {file.deletions > 0 && (
          <span className="text-[10px] text-red-500 tabular-nums shrink-0">-{file.deletions}</span>
        )}
        <span className={cn(
          "text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0",
          file.type === "new"
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
            : "bg-amber-50 text-amber-600 border border-amber-200",
        )}>
          {file.type === "new" ? t("multiFile.badge.new") : t("multiFile.badge.modified")}
        </span>
      </button>

      {expanded && (
        <div className="mx-3 mb-2 rounded-md border border-border overflow-hidden">
          <div className="font-mono text-xs leading-5 overflow-x-auto">
            {file.preview.map((line, i) => {
              const isAdd = line.startsWith("+")
              const isRemove = line.startsWith("-")
              return (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-0.5",
                    isRemove && "bg-red-50 text-red-700",
                    isAdd && "bg-emerald-50 text-emerald-700",
                    !isAdd && !isRemove && "text-muted-foreground",
                  )}
                >
                  {line}
                </div>
              )
            })}
            <div className="px-3 py-0.5 text-muted-foreground/40 italic">
              ···
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function MultiFileDemo() {
  const { mode } = useCodeChangeState()
  const { t } = useLocale()
  const totalAdditions = FILE_CHANGES.reduce((s, f) => s + f.additions, 0)
  const totalDeletions = FILE_CHANGES.reduce((s, f) => s + f.deletions, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge className="text-xs font-normal gap-1.5 py-1">
          <Files className="size-3" />
          Multi-File
        </Badge>
        <span className="text-xs text-muted-foreground">{t("multiFile.title")}</span>
      </div>

      <div className={cn(
        "rounded-lg border overflow-hidden transition-colors duration-200",
        mode === "accepted" ? "border-emerald-200" :
        mode === "rejected" ? "border-red-200" :
        "border-border",
      )}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 text-sm">
            <Files className="size-3.5 text-muted-foreground" />
            <span className="font-medium">{FILE_CHANGES.length} files changed</span>
            <span className="text-[10px] text-emerald-600 tabular-nums">+{totalAdditions}</span>
            <span className="text-[10px] text-red-500 tabular-nums">-{totalDeletions}</span>
          </div>
          {mode === "accepted" && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="size-3" />
              {t("multiFile.allAccepted")}
            </span>
          )}
          {mode === "rejected" && (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
              <XCircle className="size-3" />
              {t("multiFile.allRejected")}
            </span>
          )}
        </div>

        <div>
          {FILE_CHANGES.map((file) => (
            <FileChangeRow key={file.path} file={file} />
          ))}
        </div>
      </div>
    </div>
  )
}
