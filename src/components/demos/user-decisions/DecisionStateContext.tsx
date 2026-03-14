import { createContext, useContext, useState, type ReactNode } from "react"

export type DecisionViewMode = "awaiting" | "approved" | "rejected"

interface DecisionStateContextValue {
  mode: DecisionViewMode
  setMode: (mode: DecisionViewMode) => void
}

const DecisionStateContext = createContext<DecisionStateContextValue>({
  mode: "awaiting",
  setMode: () => {},
})

export function DecisionStateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DecisionViewMode>("awaiting")
  return (
    <DecisionStateContext.Provider value={{ mode, setMode }}>
      {children}
    </DecisionStateContext.Provider>
  )
}

export function useDecisionState() {
  return useContext(DecisionStateContext)
}
