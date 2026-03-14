import { createContext, useContext, useState, type ReactNode } from "react"

export type ToolViewMode = "result" | "calling" | "error"

interface ToolStateContextValue {
  mode: ToolViewMode
  setMode: (mode: ToolViewMode) => void
}

const ToolStateContext = createContext<ToolStateContextValue>({
  mode: "result",
  setMode: () => {},
})

export function ToolStateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ToolViewMode>("result")
  return (
    <ToolStateContext.Provider value={{ mode, setMode }}>
      {children}
    </ToolStateContext.Provider>
  )
}

export function useToolState() {
  return useContext(ToolStateContext)
}
