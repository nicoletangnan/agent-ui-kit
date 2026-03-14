import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/i18n/locale-context"
import type { ReactNode } from "react"

interface PhaseSectionProps {
  number: number
  label: string
  labelCn: string
  description: string
  descriptionEn?: string
  color: string
  children: ReactNode
}

export function PhaseSection({ number, label, labelCn, description, descriptionEn, color, children }: PhaseSectionProps) {
  const { locale } = useLocale()
  const resolvedDescription = locale === "en" && descriptionEn ? descriptionEn : description

  return (
    <section id={label.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20">
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex items-center justify-center size-9 rounded-lg text-white text-sm font-semibold shrink-0 mt-0.5"
          style={{ backgroundColor: color }}
        >
          {number}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-semibold tracking-tight">{label}</h2>
            {locale === "zh" && (
              <Badge variant="secondary" className="font-normal text-xs">{labelCn}</Badge>
            )}
          </div>
          {resolvedDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed">{resolvedDescription}</p>
          )}
        </div>
      </div>
      <div className="pl-[52px] space-y-4">
        {children}
      </div>
    </section>
  )
}
