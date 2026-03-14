import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface StateCardProps {
  stateName: string
  description: string
  collapsibleExtra?: ReactNode
  children?: ReactNode
}

export function StateCard({ stateName, description, collapsibleExtra, children }: StateCardProps) {
  const [extraOpen, setExtraOpen] = useState(false)

  return (
    <Card className="overflow-hidden py-0 gap-0">
      {collapsibleExtra ? (
        <button
          type="button"
          onClick={() => setExtraOpen(!extraOpen)}
          className="w-full text-left cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <div className={`px-4 py-3 bg-muted/30 ${extraOpen || children ? "border-b border-border" : ""}`}>
            <div className="flex items-center gap-2">
              <ChevronRight
                className="size-3.5 text-muted-foreground transition-transform duration-200 shrink-0"
                style={{ transform: extraOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              />
              <code className="text-[13px] font-medium text-foreground">{stateName}</code>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 ml-[22px]">{description}</p>
          </div>
        </button>
      ) : (
        <div className={`px-4 py-3 bg-muted/30 ${children ? "border-b border-border" : ""}`}>
          <code className="text-[13px] font-medium text-foreground">{stateName}</code>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      )}

      {collapsibleExtra && extraOpen && (
        <div className={`p-4 bg-muted/10 ${children ? "border-b border-border" : ""}`}>
          {collapsibleExtra}
        </div>
      )}

      {children && (
        <div className="p-4">
          {children}
        </div>
      )}
    </Card>
  )
}
