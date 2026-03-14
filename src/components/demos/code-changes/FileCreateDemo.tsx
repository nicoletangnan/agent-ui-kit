import { FilePlus, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCodeChangeState } from "./CodeChangeStateContext"
import { useLocale } from "@/i18n/locale-context"

const NEW_FILE_LINES = [
  'import { useState } from "react"',
  "",
  "interface TodoItemProps {",
  "  text: string",
  "  done: boolean",
  "  onToggle: () => void",
  "}",
  "",
  "export function TodoItem({ text, done, onToggle }: TodoItemProps) {",
  "  return (",
  '    <div className="flex items-center gap-2 py-1">',
  '      <input type="checkbox" checked={done} onChange={onToggle} />',
  "      <span className={done ? \"line-through opacity-50\" : \"\"}>{text}</span>",
  "    </div>",
  "  )",
  "}",
]

export function FileCreateDemo() {
  const { mode } = useCodeChangeState()
  const { t } = useLocale()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge className="text-xs font-normal gap-1.5 py-1">
          <FilePlus className="size-3" />
          File Create
        </Badge>
        <span className="text-xs text-muted-foreground">{t("fileCreate.title")}</span>
      </div>

      <div className={cn(
        "rounded-lg border overflow-hidden transition-colors duration-200",
        mode === "accepted" ? "border-emerald-200" :
        mode === "rejected" ? "border-red-200" :
        "border-border",
      )}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 text-sm">
            <FilePlus className="size-3.5 text-emerald-500" />
            <span className="font-medium">src/components/TodoItem.tsx</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">{t("fileCreate.badge")}</span>
          </div>
          {mode === "pending" && (
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                <CheckCircle2 className="size-3" />
                Accept
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 text-destructive hover:bg-destructive/10">
                <XCircle className="size-3" />
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

        <div className={cn(
          "font-mono text-xs leading-6 overflow-x-auto",
          mode === "rejected" && "opacity-40",
        )}>
          {NEW_FILE_LINES.map((line, i) => (
            <div key={i} className="flex bg-emerald-50/60">
              <span className="w-10 text-right pr-3 text-emerald-400/50 select-none shrink-0 tabular-nums">{i + 1}</span>
              <span className="px-2 flex-1 text-emerald-800">+ {line || "\u00A0"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
