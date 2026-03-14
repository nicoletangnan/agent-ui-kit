import { Globe, Download, Image } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"

export function WebToolsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Globe className="size-3" />
          Web & Media
        </Badge>
        <span className="text-xs text-muted-foreground">搜索互联网、抓取网页、生成图片</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={Globe}
          label="WebSearch"
          description='"shadcn/ui init vite react 2026 setup guide"'
          duration="1.8s"
          callingDuration="searching..."
          result={
            <div className="text-xs space-y-2.5">
              <div className="space-y-0.5">
                <a className="text-blue-600 hover:underline font-medium" href="#">Install shadcn/ui Vite</a>
                <p className="text-muted-foreground/60 font-mono text-[11px]">shadcn.io/ui/installation/vite</p>
                <p className="text-muted-foreground">Install Tailwind CSS v4, configure Vite plugin, run npx shadcn@latest init...</p>
              </div>
              <div className="space-y-0.5">
                <a className="text-blue-600 hover:underline font-medium" href="#">March 2026 - shadcn/cli v4</a>
                <p className="text-muted-foreground/60 font-mono text-[11px]">ui.shadcn.com/docs/changelog/2026-03-cli-v4</p>
                <p className="text-muted-foreground">New features: presets (--preset), inspection flags (--dry-run, --diff)...</p>
              </div>
              <p className="text-[11px] text-muted-foreground/40">3 results returned</p>
            </div>
          }
          errorRaw="Error: Search request timed out after 10s"
        />

        <ToolCallBase
          icon={Download}
          label="WebFetch"
          description="https://impeccable.style/"
          duration="2.3s"
          callingDuration="fetching..."
          result={
            <div className="text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Status: <span className="text-emerald-600 font-medium">200 OK</span></span>
                <span>·</span>
                <span>Content: text/html</span>
                <span>·</span>
                <span>12.4 KB</span>
              </div>
              <div className="font-mono text-muted-foreground leading-relaxed pl-2 border-l-2 border-border max-h-[100px] overflow-hidden relative">
                <p># Impeccable</p>
                <p>Design fluency for AI harnesses</p>
                <p></p>
                <p>Great design prompts require design vocabulary. Most people</p>
                <p>don&apos;t have it. You can&apos;t ask for &quot;more vertical rhythm&quot; if</p>
                <p>you&apos;ve never used those words...</p>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/20 to-transparent" />
              </div>
              <p className="text-[11px] text-muted-foreground/40">Content truncated (showing first 500 chars)</p>
            </div>
          }
          errorRaw="Error: 404 Not Found — The requested URL returned a non-200 status code."
        />

        <ToolCallBase
          icon={Image}
          label="GenerateImage"
          description='"App icon for a note-taking app, minimal flat vector"'
          duration="6.2s"
          callingDuration="generating..."
          result={
            <div className="space-y-2">
              <div className="rounded-md border border-border overflow-hidden bg-muted/30 w-32 h-32 flex items-center justify-center">
                <div className="space-y-1 text-center">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-amber-200 to-orange-300 mx-auto flex items-center justify-center">
                    <div className="size-6 border-2 border-white/80 rounded-md" />
                  </div>
                  <p className="text-[9px] text-muted-foreground/50">generated</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground/40">Saved to: app-icon.png (512x512)</p>
            </div>
          }
          errorRaw="Error: Image generation failed — content policy violation"
        />
      </div>
    </div>
  )
}
