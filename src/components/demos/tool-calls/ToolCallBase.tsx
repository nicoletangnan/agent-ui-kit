import { useState } from "react"
import { ChevronDown, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToolState } from "./ToolStateContext"

export type ToolStatus = "selected" | "calling" | "success" | "error" | "folded"

interface ToolCallBaseProps {
  icon: React.ElementType
  label: string
  description: string
  duration?: string
  result?: React.ReactNode
  resultRaw?: string
  errorRaw?: string
  error?: React.ReactNode
  callingDuration?: string
  className?: string
}

function StatusIndicator({ status }: { status: ToolStatus }) {
  switch (status) {
    case "selected":
      return <Clock className="size-3.5 text-muted-foreground/50" />
    case "calling":
      return <Loader2 className="size-3.5 text-muted-foreground animate-spin" />
    case "success":
      return <CheckCircle2 className="size-3.5 text-emerald-500" />
    case "error":
      return <XCircle className="size-3.5 text-destructive" />
    case "folded":
      return <CheckCircle2 className="size-3.5 text-emerald-500" />
  }
}

export function ToolCallBase({
  icon: Icon,
  label,
  description,
  duration,
  result,
  resultRaw,
  errorRaw,
  error,
  callingDuration,
  className,
}: ToolCallBaseProps) {
  const { mode } = useToolState()
  const [expanded, setExpanded] = useState(false)

  const status: ToolStatus =
    mode === "calling" ? "calling" :
    mode === "error" ? "error" :
    expanded ? "success" : "folded"

  const hasResult = result || resultRaw
  const hasError = error || errorRaw
  const isError = mode === "error"
  const isCalling = mode === "calling"

  const currentContent = isError ? (error || errorRaw) : (result || resultRaw)
  const canExpand = !isCalling && (isError ? hasError : hasResult)

  const currentDuration = isCalling
    ? (callingDuration || "running...")
    : isError
      ? duration
      : expanded
        ? duration
        : duration

  return (
    <div className={cn(
      "rounded-lg border overflow-hidden transition-colors duration-200",
      isError ? "border-destructive/30" : "border-border",
      className,
    )}>
      <button
        type="button"
        onClick={() => canExpand && setExpanded(!expanded)}
        className={cn(
          "group/tool w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
          canExpand && "hover:bg-muted/30 cursor-pointer",
          !canExpand && "cursor-default",
          isCalling && "opacity-75",
        )}
      >
        <span className="relative size-4 shrink-0">
          <Icon className={cn(
            "size-4 text-muted-foreground absolute inset-0 transition-opacity duration-150",
            canExpand ? "group-hover/tool:opacity-0" : "",
          )} />
          {canExpand && (
            <ChevronDown className={cn(
              "size-4 text-muted-foreground absolute inset-0 opacity-0 group-hover/tool:opacity-100 transition-all duration-150",
              expanded && "rotate-180",
            )} />
          )}
        </span>
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground truncate flex-1 text-left">{description}</span>
        {currentDuration && (
          <span className="text-[11px] text-muted-foreground/50 tabular-nums shrink-0">{currentDuration}</span>
        )}
        <StatusIndicator status={status} />
      </button>
      {expanded && currentContent && (
        <div className={cn(
          "border-t px-3 py-2.5",
          isError ? "border-destructive/20 bg-destructive/5" : "border-border/50 bg-muted/20",
        )}>
          {isError ? (
            error || <pre className="text-xs text-destructive font-mono whitespace-pre-wrap leading-relaxed">{errorRaw}</pre>
          ) : (
            result || <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed">{resultRaw}</pre>
          )}
        </div>
      )}
    </div>
  )
}
