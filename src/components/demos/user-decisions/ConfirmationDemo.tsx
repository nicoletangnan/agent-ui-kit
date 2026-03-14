import { ArrowLeftRight, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DecisionCardBase } from "./DecisionCardBase"
import { useDecisionState } from "./DecisionStateContext"
import { useLocale } from "@/i18n/locale-context"

export function ConfirmationDemo() {
  const { mode } = useDecisionState()
  const { t } = useLocale()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <ArrowLeftRight className="size-3" />
          Confirmation
        </Badge>
        <span className="text-xs text-muted-foreground">{t("confirm.subtitle")}</span>
      </div>

      <DecisionCardBase
        icon={ArrowLeftRight}
        title="Switch to Plan mode?"
        subtitle={t("confirm.cardSubtitle")}
        approvedContent={
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{t("confirm.approved.message")}</span>
          </div>
        }
        rejectedContent={
          <div className="flex items-center gap-2 text-sm text-red-600">
            <XCircle className="size-4 shrink-0" />
            <span>{t("confirm.rejected.message")}</span>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <Button size="sm" className="text-xs" disabled={mode !== "awaiting"}>Accept</Button>
          <Button size="sm" variant="outline" className="text-xs" disabled={mode !== "awaiting"}>Decline</Button>
        </div>
      </DecisionCardBase>
    </div>
  )
}
