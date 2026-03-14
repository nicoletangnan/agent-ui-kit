import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Layers, Zap } from "lucide-react"
import { useLocale } from "@/i18n/locale-context"

const CATEGORIES = [
  { id: "cc-file-create", label: "File Create", scenarioKey: "codeChangeOverview.cat.create.scenario" },
  { id: "cc-file-edit", label: "File Edit", scenarioKey: "codeChangeOverview.cat.edit.scenario" },
  { id: "cc-multi-file", label: "Multi-File", scenarioKey: "codeChangeOverview.cat.multi.scenario" },
] as const

const STATE_KEYS = [
  { name: "file_creating", descKey: "codeChangeOverview.state.file_creating" },
  { name: "file_created", descKey: "codeChangeOverview.state.file_created" },
  { name: "file_editing", descKey: "codeChangeOverview.state.file_editing" },
  { name: "diff_shown", descKey: "codeChangeOverview.state.diff_shown" },
  { name: "diff_pending", descKey: "codeChangeOverview.state.diff_pending" },
  { name: "diff_accepted", descKey: "codeChangeOverview.state.diff_accepted" },
  { name: "diff_rejected", descKey: "codeChangeOverview.state.diff_rejected" },
] as const

export { CATEGORIES as CODE_CHANGE_CATEGORIES }

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
            <th className="text-left font-medium text-muted-foreground px-3 py-1.5 w-[160px]">State</th>
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

export function CodeChangeOverview() {
  const { t } = useLocale()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("codeChangeOverview.intro")}
      </p>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0} className="gap-1.5 text-xs">
            <Layers className="size-3.5" />
            3 Types
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
