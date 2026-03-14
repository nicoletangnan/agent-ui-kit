import { Terminal } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/i18n/locale-context"

export function TerminalToolsDemo() {
  const { t } = useLocale()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Terminal className="size-3" />
          Terminal
        </Badge>
        <span className="text-xs text-muted-foreground">{t("terminalTools.subtitle")}</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={Terminal}
          label="Shell"
          description="npm run build"
          duration="8.7s"
          callingDuration="running..."
          result={
            <div className="font-mono text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground/50 mb-1.5">
                <span className="text-[10px]">$</span>
                <span>npm run build</span>
              </div>
              <pre className="text-muted-foreground leading-relaxed">{`vite v7.3.1 building for production...
✓ 42 modules transformed.
dist/index.html          0.46 kB │ gzip:  0.30 kB
dist/assets/index.css    5.12 kB │ gzip:  1.58 kB
dist/assets/index.js   148.23 kB │ gzip: 47.81 kB
✓ built in 2.34s`}</pre>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30 text-[11px] text-muted-foreground/40">
                <span>exit code: 0</span>
                <span>·</span>
                <span>8.7s</span>
              </div>
            </div>
          }
          error={
            <div className="font-mono text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground/50 mb-1.5">
                <span className="text-[10px]">$</span>
                <span>npm run build</span>
              </div>
              <pre className="text-destructive/80 leading-relaxed">{`error TS2307: Cannot find module '@/components/Todo'
error TS2345: Argument of type 'string' is not assignable

Found 2 errors.`}</pre>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30 text-[11px] text-destructive/50">
                <span>exit code: 1</span>
                <span>·</span>
                <span>3.1s</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
