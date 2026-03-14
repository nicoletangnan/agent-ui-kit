import { ShieldAlert, Terminal, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DecisionCardBase } from "./DecisionCardBase"
import { useDecisionState } from "./DecisionStateContext"
import { useLocale } from "@/i18n/locale-context"

export function PermissionDemo() {
  const { mode } = useDecisionState()
  const { t } = useLocale()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <ShieldAlert className="size-3" />
          Permission
        </Badge>
        <span className="text-xs text-muted-foreground">{t("permission.subtitle")}</span>
      </div>

      <DecisionCardBase
        icon={ShieldAlert}
        title="Allow terminal command?"
        subtitle={t("permission.cardSubtitle")}
        approvedContent={
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{t("permission.approved.message")}</span>
            </div>
            <div className="rounded-md bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
              <span className="text-emerald-600">✓</span> rm -rf node_modules && npm install
            </div>
          </div>
        }
        rejectedContent={
          <div className="flex items-center gap-2 text-sm text-red-600">
            <XCircle className="size-4 shrink-0" />
            <span>{t("permission.rejected.message")}</span>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="rounded-md bg-muted px-3 py-2.5 font-mono text-xs text-foreground flex items-center gap-2">
            <Terminal className="size-3.5 text-muted-foreground shrink-0" />
            <span>rm -rf node_modules && npm install</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="text-xs gap-1.5" disabled={mode !== "awaiting"}>
              <ShieldAlert className="size-3" />
              Allow
            </Button>
            <Button size="sm" variant="outline" className="text-xs" disabled={mode !== "awaiting"}>Deny</Button>
            <span className="text-[11px] text-muted-foreground ml-1">{t("permission.hint")}</span>
          </div>
        </div>
      </DecisionCardBase>
    </div>
  )
}
