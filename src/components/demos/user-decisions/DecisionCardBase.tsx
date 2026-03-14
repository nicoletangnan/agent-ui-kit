import { CheckCircle2, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDecisionState } from "./DecisionStateContext"

type DecisionStatus = "awaiting" | "approved" | "rejected"

function StatusBadge({ status }: { status: DecisionStatus }) {
  switch (status) {
    case "awaiting":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="size-3" />
          Awaiting
        </span>
      )
    case "approved":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="size-3" />
          Approved
        </span>
      )
    case "rejected":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-700 border border-red-200">
          <XCircle className="size-3" />
          Rejected
        </span>
      )
  }
}

interface DecisionCardBaseProps {
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
  approvedContent?: React.ReactNode
  rejectedContent?: React.ReactNode
  className?: string
}

export function DecisionCardBase({
  icon: Icon,
  title,
  subtitle,
  children,
  approvedContent,
  rejectedContent,
  className,
}: DecisionCardBaseProps) {
  const { mode } = useDecisionState()

  return (
    <div className={cn(
      "rounded-lg border overflow-hidden transition-colors duration-200",
      mode === "approved" ? "border-emerald-200" :
      mode === "rejected" ? "border-red-200" :
      "border-border",
      className,
    )}>
      <div className="flex items-start gap-2.5 px-4 py-3 border-b border-border bg-muted/30">
        <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{title}</p>
            <StatusBadge status={mode} />
          </div>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {mode === "awaiting" && (
        <div className="p-3">
          {children}
        </div>
      )}

      {mode === "approved" && approvedContent && (
        <div className="p-3 bg-emerald-50/30">
          {approvedContent}
        </div>
      )}

      {mode === "rejected" && rejectedContent && (
        <div className="p-3 bg-red-50/30">
          {rejectedContent}
        </div>
      )}
    </div>
  )
}
