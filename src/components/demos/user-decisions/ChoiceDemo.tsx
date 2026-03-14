import { MessageCircleQuestion, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DecisionCardBase } from "./DecisionCardBase"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/locale-context"

export function ChoiceDemo() {
  const { t } = useLocale()

  const OPTIONS = [
    { label: "useState + useReducer", desc: t("choice.option.useState.desc"), selected: false },
    { label: "Zustand", desc: t("choice.option.zustand.desc"), selected: true },
    { label: "Redux Toolkit", desc: t("choice.option.redux.desc"), selected: false },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <MessageCircleQuestion className="size-3" />
          Choice Card
        </Badge>
        <span className="text-xs text-muted-foreground">{t("choice.subtitle")}</span>
      </div>

      <DecisionCardBase
        icon={MessageCircleQuestion}
        title={t("choice.question")}
        approvedContent={
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: t("choice.approved.message") }} />
          </div>
        }
        rejectedContent={
          <div className="text-sm text-muted-foreground">
            {t("choice.rejected.message")}
          </div>
        }
      >
        <div className="space-y-2">
          {OPTIONS.map((opt) => (
            <div
              key={opt.label}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-md border transition-colors",
                opt.selected
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-primary/5",
              )}
            >
              <p className="text-sm font-medium">{opt.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
            </div>
          ))}
        </div>
      </DecisionCardBase>
    </div>
  )
}
