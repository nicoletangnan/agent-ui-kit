import { useEffect, useState, useRef } from "react"
import { ChevronRight } from "lucide-react"
import { PHASE_META } from "@/data/agent-flow"
import { CATEGORIES } from "@/components/demos/tool-calls/ToolOverview"
import { STREAMING_SECTIONS } from "@/components/demos/StreamingDemo"
import { DECISION_CATEGORIES } from "@/components/demos/UserDecisionDemo"
import { CODE_CHANGE_CATEGORIES } from "@/components/demos/CodeChangeDemo"

const phases = Object.entries(PHASE_META)

const PHASE_IDS = phases.map(([, meta]) =>
  meta.label.toLowerCase().replace(/\s+/g, "-")
)

type SubNav = {
  phaseId: string
  items: readonly { id: string; label: string }[]
}

const SUB_NAVS: SubNav[] = [
  { phaseId: "tool-use", items: CATEGORIES },
  { phaseId: "streaming", items: STREAMING_SECTIONS },
  { phaseId: "code-change", items: CODE_CHANGE_CATEGORIES },
  { phaseId: "user-decision", items: DECISION_CATEGORIES },
]

const ALL_SUB_IDS = SUB_NAVS.flatMap((s) => s.items.map((i) => i.id))
const ALL_IDS = [...PHASE_IDS, ...ALL_SUB_IDS]

export function Sidebar() {
  const [activeId, setActiveId] = useState<string>("")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const userToggled = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const elements = ALL_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const getSubNavForId = (id: string) =>
    SUB_NAVS.find((s) => s.items.some((i) => i.id === id))

  const isInSubNav = (phaseId: string) =>
    activeId === phaseId ||
    SUB_NAVS.find((s) => s.phaseId === phaseId)?.items.some((i) => i.id === activeId)

  const activePhase = (() => {
    if (PHASE_IDS.includes(activeId)) return activeId
    const parent = getSubNavForId(activeId)
    if (parent) return parent.phaseId
    return ""
  })()

  useEffect(() => {
    for (const sub of SUB_NAVS) {
      if (userToggled.current[sub.phaseId]) continue
      setOpenSections((prev) => ({
        ...prev,
        [sub.phaseId]: !!isInSubNav(sub.phaseId),
      }))
    }
  }, [activeId])

  const handleToggle = (phaseId: string) => {
    userToggled.current[phaseId] = true
    setOpenSections((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }))
    setTimeout(() => {
      userToggled.current[phaseId] = false
    }, 2000)
  }

  return (
    <nav className="w-56 shrink-0">
      <div className="sticky top-20 space-y-0.5">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
          Phases
        </p>
        {phases.map(([key, meta], i) => {
          const phaseId = meta.label.toLowerCase().replace(/\s+/g, "-")
          const isActive = activePhase === phaseId
          const subNav = SUB_NAVS.find((s) => s.phaseId === phaseId)
          const isOpen = !!openSections[phaseId]

          return (
            <div key={key}>
              <div
                className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "text-foreground bg-muted/60 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <a href={`#${phaseId}`} className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span
                    className="size-5 rounded flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                    style={{ backgroundColor: meta.color }}
                  >
                    {i}
                  </span>
                  <span className="truncate">{meta.label}</span>
                </a>
                {subNav && (
                  <button
                    type="button"
                    onClick={() => handleToggle(phaseId)}
                    className="p-0.5 rounded hover:bg-muted transition-colors shrink-0 cursor-pointer"
                  >
                    <ChevronRight
                      className="size-3.5 text-muted-foreground transition-transform duration-200"
                      style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                )}
              </div>

              {subNav && (
                <div
                  className="ml-[30px] border-l border-border pl-2.5 overflow-hidden transition-all duration-200"
                  style={{
                    maxHeight: isOpen ? `${subNav.items.length * 32}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? "2px" : "0px",
                    marginBottom: isOpen ? "4px" : "0px",
                  }}
                >
                  {subNav.items.map((item) => {
                    const isItemActive = activeId === item.id
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block px-2 py-1 rounded text-[12px] transition-colors ${
                          isItemActive
                            ? "text-foreground bg-muted/60 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        {item.label}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
