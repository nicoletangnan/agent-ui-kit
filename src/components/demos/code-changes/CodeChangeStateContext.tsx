import { createContext, useContext, useState, type ReactNode } from "react"

export type CodeChangeViewMode = "pending" | "accepted" | "rejected"

interface CodeChangeStateContextValue {
  mode: CodeChangeViewMode
  setMode: (mode: CodeChangeViewMode) => void
}

const CodeChangeStateContext = createContext<CodeChangeStateContextValue>({
  mode: "pending",
  setMode: () => {},
})

export function CodeChangeStateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CodeChangeViewMode>("pending")
  return (
    <CodeChangeStateContext.Provider value={{ mode, setMode }}>
      {children}
    </CodeChangeStateContext.Provider>
  )
}

export function useCodeChangeState() {
  return useContext(CodeChangeStateContext)
}
