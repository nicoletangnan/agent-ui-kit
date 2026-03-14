import { Search, FolderSearch, Sparkles } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/i18n/locale-context"

export function SearchToolsDemo() {
  const { t } = useLocale()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Search className="size-3" />
          Search
        </Badge>
        <span className="text-xs text-muted-foreground">{t("searchTools.subtitle")}</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={Search}
          label="Grep"
          description='pattern: "useState" in src/'
          duration="45ms"
          result={
            <div className="text-xs font-mono space-y-2">
              <div>
                <p className="text-muted-foreground/60 mb-0.5">src/App.tsx</p>
                <p><span className="text-muted-foreground/40 mr-2">1:</span>import {'{ '}
                  <span className="bg-amber-100 text-amber-800 px-0.5 rounded">useState</span>
                  {' }'} from &apos;react&apos;</p>
              </div>
              <div>
                <p className="text-muted-foreground/60 mb-0.5">src/components/TodoList.tsx</p>
                <p><span className="text-muted-foreground/40 mr-2">3:</span>import {'{ '}
                  <span className="bg-amber-100 text-amber-800 px-0.5 rounded">useState</span>
                  , useCallback {'}'} from &apos;react&apos;</p>
              </div>
              <p className="text-muted-foreground/50 pt-1 border-t border-border/30">3 matches in 2 files</p>
            </div>
          }
          errorRaw="Error: Invalid regex pattern — unmatched parenthesis"
        />

        <ToolCallBase
          icon={FolderSearch}
          label="Glob"
          description="src/components/**/*.tsx"
          duration="22ms"
          resultRaw={`src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/badge.tsx
src/components/catalog/PhaseSection.tsx
src/components/catalog/Sidebar.tsx
...and 11 more files

16 files found`}
          errorRaw="Error: Directory not found: src/components/"
        />

        <ToolCallBase
          icon={Sparkles}
          label="SemanticSearch"
          description='"How does user authentication work?"'
          duration="340ms"
          result={
            <div className="text-xs space-y-2.5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted-foreground/60">src/auth/middleware.ts</span>
                  <span className="text-[10px] text-muted-foreground/40 px-1.5 py-0.5 rounded-full bg-muted">relevance: 0.92</span>
                </div>
                <p className="font-mono text-muted-foreground leading-relaxed pl-2 border-l-2 border-emerald-200">
                  export async function authMiddleware(req, res, next) {'{'}<br />
                  {'  '}const token = req.headers.authorization?.split(&apos; &apos;)[1]<br />
                  {'  '}if (!token) return res.status(401).json({'{ error: "Unauthorized" }'})<br />
                  {'  '}...
                </p>
              </div>
              <p className="text-muted-foreground/50 pt-1 border-t border-border/30">2 relevant chunks found</p>
            </div>
          }
          errorRaw="Error: Embedding service unavailable"
        />
      </div>
    </div>
  )
}
