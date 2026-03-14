import { Globe, ScanLine, Camera, MousePointerClick, Keyboard } from "lucide-react"
import { ToolCallBase } from "./ToolCallBase"
import { Badge } from "@/components/ui/badge"

export function BrowserToolsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="soft" className="text-xs font-normal gap-1.5 py-1">
          <Globe className="size-3" />
          Browser
        </Badge>
        <span className="text-xs text-muted-foreground">打开网页、截图、点击、输入，验证 UI 效果</span>
      </div>

      <div className="space-y-2">
        <ToolCallBase
          icon={Globe}
          label="Navigate"
          description="http://localhost:5173/"
          duration="1.2s"
          callingDuration="loading..."
          result={
            <div className="text-xs space-y-1.5">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>Page Title: <span className="text-foreground font-medium">agent-ui-kit</span></span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>URL: <span className="font-mono">http://localhost:5173/</span></span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>Total refs: <span className="text-foreground">72</span></span>
                <span>Interactive: <span className="text-foreground">27</span></span>
              </div>
            </div>
          }
          errorRaw="Error: net::ERR_CONNECTION_REFUSED at http://localhost:5173/"
        />

        <ToolCallBase
          icon={ScanLine}
          label="Snapshot"
          description="Page accessibility tree"
          duration="180ms"
          result={
            <div className="font-mono text-xs text-muted-foreground leading-relaxed">
              <pre>{`- role: document
  name: agent-ui-kit
  children:
    - role: heading
      name: Agent UI Kit
      level: 1
    - role: button
      name: 开始探索
      ref: e0
    - role: navigation
      children:
        - role: link
          name: User Input
          ref: e1
        ...12 more elements`}</pre>
            </div>
          }
          errorRaw="Error: No browser tab is open. Call browser_navigate first."
        />

        <ToolCallBase
          icon={Camera}
          label="Screenshot"
          description="Full page capture"
          duration="650ms"
          result={
            <div className="space-y-2">
              <div className="rounded-md border border-border overflow-hidden bg-muted/30">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/50 bg-muted/50">
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-red-400/60" />
                    <span className="size-2 rounded-full bg-amber-400/60" />
                    <span className="size-2 rounded-full bg-emerald-400/60" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/50 font-mono ml-1">localhost:5173</span>
                </div>
                <div className="p-6 flex items-center justify-center min-h-[80px]">
                  <div className="text-center space-y-1.5">
                    <div className="w-32 h-5 bg-muted/80 rounded mx-auto" />
                    <div className="w-48 h-3 bg-muted/50 rounded mx-auto" />
                    <div className="w-20 h-7 bg-foreground/10 rounded mx-auto mt-2" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground/50">Saved to: /tmp/screenshots/page-2026-03-14.png</p>
            </div>
          }
          errorRaw="Error: No browser tab is open. Call browser_navigate first."
        />

        <ToolCallBase
          icon={MousePointerClick}
          label="Click"
          description='ref: e0 — button "开始探索"'
          duration="120ms"
          result={
            <div className="text-xs text-muted-foreground">
              <span>Clicked element </span>
              <code className="px-1 py-0.5 rounded bg-muted text-foreground text-[11px]">e0</code>
              <span> — button &quot;开始探索&quot;</span>
            </div>
          }
          errorRaw='Error: Element ref "e0" not found. Take a new snapshot to get updated refs.'
        />

        <ToolCallBase
          icon={Keyboard}
          label="Type"
          description='ref: e5 — input "search"'
          duration="85ms"
          result={
            <div className="text-xs text-muted-foreground">
              <span>Typed </span>
              <code className="px-1 py-0.5 rounded bg-muted text-foreground text-[11px]">&quot;hello world&quot;</code>
              <span> into element </span>
              <code className="px-1 py-0.5 rounded bg-muted text-foreground text-[11px]">e5</code>
            </div>
          }
          errorRaw='Error: Element ref "e5" is not an input element.'
        />
      </div>
    </div>
  )
}
