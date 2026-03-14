import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Layers, Zap } from "lucide-react"
import { useLocale } from "@/i18n/locale-context"

const CATEGORIES = [
  { id: "ud-choice", label: "Choice Card", scenarioKey: "decisionOverview.cat.choice.scenario2" },
  { id: "ud-confirmation", label: "Confirmation", scenarioKey: "decisionOverview.cat.confirmation.scenario2" },
  { id: "ud-permission", label: "Permission", scenarioKey: "decisionOverview.cat.permission.scenario2" },
  { id: "ud-file-review", label: "File Review", scenarioKey: "decisionOverview.cat.fileReview.scenario2" },
] as const

const STATE_KEYS = [
  { name: "awaiting_choice", descKey: "decisionOverview.state.awaiting_choice" },
  { name: "awaiting_confirmation", descKey: "decisionOverview.state.awaiting_confirmation" },
  { name: "awaiting_file_review", descKey: "decisionOverview.state.awaiting_file_review" },
  { name: "awaiting_permission", descKey: "decisionOverview.state.awaiting_permission" },
  { name: "user_approved", descKey: "decisionOverview.state.user_approved" },
  { name: "user_rejected", descKey: "decisionOverview.state.user_rejected" },
  { name: "user_edited", descKey: "decisionOverview.state.user_edited" },
] as const

export { CATEGORIES as DECISION_CATEGORIES }

function CategoriesTable() {
  const { t } = useLocale()
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[140px]">Type</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5">Scenario</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {CATEGORIES.map((cat) => (
            <tr key={cat.id} className="group hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5">
                <a
                  href={`#${cat.id}`}
                  className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary underline-offset-2"
                >
                  {cat.label}
                </a>
              </td>
              <td className="px-3 py-1.5 text-muted-foreground font-mono text-[11px]">{t(cat.scenarioKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatesTable() {
  const { t } = useLocale()
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[200px]">State</th>
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {STATE_KEYS.map((s) => (
            <tr key={s.name} className="hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5"><code className="text-[11px] font-mono text-foreground">{s.name}</code></td>
              <td className="px-3 py-1.5 text-muted-foreground">{t(s.descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DecisionOverview() {
  const { t } = useLocale()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("decisionOverview.intro")}
      </p>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0} className="gap-1.5 text-xs">
            <Layers className="size-3.5" />
            4 Types
          </TabsTrigger>
          <TabsTrigger value={1} className="gap-1.5 text-xs">
            <Zap className="size-3.5" />
            7 States
          </TabsTrigger>
        </TabsList>

        <TabsContent value={0}>
          <CategoriesTable />
        </TabsContent>

        <TabsContent value={1}>
          <StatesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
