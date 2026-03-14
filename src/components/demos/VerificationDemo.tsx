import { useState, createContext, useContext } from "react"
import { ShieldCheck, ShieldAlert, RefreshCw, Camera, Terminal, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type VerifyViewMode = "checking" | "found" | "clean"

const VerifyStateContext = createContext<{
  mode: VerifyViewMode
  setMode: (m: VerifyViewMode) => void
}>({ mode: "checking", setMode: () => {} })

const SEGMENTS: { value: VerifyViewMode; label: string; icon: React.ElementType }[] = [
  { value: "checking", label: "Checking", icon: Loader2 },
  { value: "found", label: "Found Issues", icon: ShieldAlert },
  { value: "clean", label: "All Clean", icon: CheckCircle2 },
]

function SegmentedControl() {
  const { mode, setMode } = useContext(VerifyStateContext)

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-muted/30 p-0.5">
      {SEGMENTS.map((seg) => {
        const Icon = seg.icon
        const isActive = mode === seg.value
        return (
          <button
            key={seg.value}
            type="button"
            onClick={() => setMode(seg.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            {seg.label}
          </button>
        )
      })}
    </div>
  )
}

function VerifyCard() {
  const { mode } = useContext(VerifyStateContext)

  if (mode === "checking") {
    return (
      <div className="space-y-2">
        {/* Lint checking */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border text-sm opacity-75">
          <ShieldCheck className="size-4 text-muted-foreground shrink-0" />
          <span className="font-medium">Lint Check</span>
          <span className="flex-1" />
          <Loader2 className="size-3.5 text-muted-foreground animate-spin" />
        </div>

        {/* Build command running */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border text-sm opacity-75">
          <Terminal className="size-4 text-muted-foreground shrink-0" />
          <span className="font-medium">npm run build</span>
          <span className="flex-1" />
          <Loader2 className="size-3.5 text-muted-foreground animate-spin" />
        </div>

        {/* Browser check pending */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border text-sm opacity-50">
          <Camera className="size-4 text-muted-foreground shrink-0" />
          <span className="font-medium">Browser Preview</span>
          <span className="text-xs text-muted-foreground ml-auto">waiting...</span>
        </div>
      </div>
    )
  }

  if (mode === "found") {
    return (
      <div className="space-y-2">
        {/* Lint errors found */}
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-2 text-sm">
            <ShieldAlert className="size-4 text-amber-500 shrink-0" />
            <span className="font-medium">Lint Check</span>
            <span className="text-xs text-amber-600 ml-auto">2 errors found</span>
          </div>
          <div className="border-t border-amber-200/60 px-3 py-2 text-xs font-mono text-amber-700 space-y-1">
            <p>src/TodoList.tsx(5,10): &apos;count&apos; is declared but never read.</p>
            <p>src/TodoList.tsx(12,3): Missing return type on function.</p>
          </div>
          <div className="border-t border-amber-200/60 px-3 py-2 flex items-center gap-2 text-xs text-amber-700">
            <RefreshCw className="size-3 animate-spin" />
            <span>Self-correcting...</span>
          </div>
        </div>

        {/* Build failed */}
        <div className="rounded-lg border border-destructive/30 overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-2 text-sm">
            <Terminal className="size-4 text-destructive shrink-0" />
            <span className="font-medium">npm run build</span>
            <span className="text-xs text-destructive ml-auto">exit code 1</span>
          </div>
          <div className="border-t border-destructive/20 bg-destructive/5 px-3 py-2 text-xs font-mono text-destructive/80 space-y-1">
            <p>ERROR in src/TodoList.tsx:5:10</p>
            <p>TS6133: &apos;count&apos; is declared but its value is never read.</p>
          </div>
        </div>

        {/* Browser screenshot */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-2 border-b border-border bg-muted/30 text-sm">
            <Camera className="size-4 text-muted-foreground shrink-0" />
            <span className="font-medium">Browser Preview</span>
            <span className="text-xs text-muted-foreground ml-auto">localhost:5173</span>
          </div>
          <div className="bg-muted/20 p-4 flex items-center justify-center min-h-[80px]">
            <div className="text-center space-y-2">
              <div className="w-48 h-6 bg-muted/60 rounded mx-auto" />
              <div className="w-32 h-4 bg-muted/40 rounded mx-auto" />
              <div className="flex gap-2 justify-center mt-2">
                <div className="w-20 h-8 bg-muted/50 rounded" />
                <div className="w-20 h-8 bg-muted/50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Lint clean */}
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border text-sm">
        <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
        <span className="font-medium">Lint Check</span>
        <span className="text-xs text-emerald-600 ml-auto">No errors found</span>
      </div>

      {/* Build success */}
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border text-sm">
        <Terminal className="size-4 text-emerald-500 shrink-0" />
        <span className="font-medium">npm run build</span>
        <span className="text-xs text-emerald-600 ml-auto">exit code 0 · 3.2s</span>
      </div>

      {/* Browser OK */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 py-2 border-b border-border bg-muted/30 text-sm">
          <Camera className="size-4 text-emerald-500 shrink-0" />
          <span className="font-medium">Browser Preview</span>
          <span className="text-xs text-emerald-600 ml-auto">UI looks correct</span>
        </div>
        <div className="bg-muted/20 p-4 flex items-center justify-center min-h-[80px]">
          <div className="text-center space-y-2">
            <div className="w-48 h-6 bg-muted/60 rounded mx-auto" />
            <div className="w-32 h-4 bg-muted/40 rounded mx-auto" />
            <div className="flex gap-2 justify-center mt-2">
              <div className="w-20 h-8 bg-emerald-100 rounded" />
              <div className="w-20 h-8 bg-emerald-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VerificationDemo() {
  const [mode, setMode] = useState<VerifyViewMode>("checking")

  return (
    <VerifyStateContext.Provider value={{ mode, setMode }}>
      <div className="space-y-4">
        <SegmentedControl />
        <VerifyCard />
      </div>
    </VerifyStateContext.Provider>
  )
}
