import { Bot } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/catalog/Sidebar"
import { PhaseSection } from "@/components/catalog/PhaseSection"
import { StateCard } from "@/components/catalog/StateCard"
import { PHASE_META } from "@/data/agent-flow"
import { LocaleProvider, useLocale } from "@/i18n/locale-context"

import { UserInputDemo } from "@/components/demos/UserInputDemo"
import { ContextDemo } from "@/components/demos/ContextDemo"
import { ThinkingDemo } from "@/components/demos/ThinkingDemo"
import { TodoListDemo } from "@/components/demos/TodoListDemo"
import { ToolCallDemo } from "@/components/demos/ToolCallDemo"
import { StreamingDemo } from "@/components/demos/StreamingDemo"
import { CodeChangeDemo } from "@/components/demos/CodeChangeDemo"
import { VerificationDemo } from "@/components/demos/VerificationDemo"
import { UserDecisionDemo } from "@/components/demos/UserDecisionDemo"
import { CompletionDemo } from "@/components/demos/CompletionDemo"

const phases = Object.entries(PHASE_META)

function LocaleToggle() {
  const { locale, setLocale } = useLocale()
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
      className="text-xs font-medium px-2.5 py-1 rounded-md border border-border hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  )
}

function AppContent() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-3">
          <Bot className="size-5 text-foreground" />
          <h1 className="text-sm font-semibold tracking-tight">Agent UI Demo</h1>
          <span className="flex-1" />
          <LocaleToggle />
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-12">
          {/* Phase 0: User Input */}
          <PhaseSection number={0} {...phases[0][1]}>
            <StateCard stateName="composing → attaching → selecting_model → selecting_mode → submitted" description={t("app.phase0.statecard")}>
              <UserInputDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 1: Context Assembly */}
          <PhaseSection number={1} {...phases[1][1]}>
            <StateCard stateName="gathering_open_files → ... → gathering_skills → context_ready" description={t("app.phase1.statecard")}>
              <ContextDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 2: Thinking */}
          <PhaseSection number={2} {...phases[2][1]}>
            <StateCard stateName="thinking_started → thinking_streaming → thinking_complete" description={t("app.phase2.statecard")}>
              <ThinkingDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 3: Task Planning */}
          <PhaseSection number={3} {...phases[3][1]}>
            <StateCard stateName="no_plan_needed | creating_todos → todos_created → todo_in_progress → todo_completed" description={t("app.phase3.statecard")}>
              <TodoListDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 4: Tool Use */}
          <PhaseSection number={4} {...phases[4][1]}>
            <ToolCallDemo />
          </PhaseSection>

          <Separator />

          {/* Phase 5: Streaming */}
          <PhaseSection number={5} {...phases[5][1]}>
            <StateCard stateName="stream_started → stream_text | stream_code_block | stream_markdown → stream_paused → stream_resumed → stream_complete" description={t("app.phase5.statecard")}>
              <StreamingDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 6: Code Change */}
          <PhaseSection number={6} {...phases[6][1]}>
            <CodeChangeDemo />
          </PhaseSection>

          <Separator />

          {/* Phase 7: Verification */}
          <PhaseSection number={7} {...phases[7][1]}>
            <StateCard stateName="checking_lints → lints_found | lints_clean → running_command → command_success | command_failed → screenshot_taken" description={t("app.phase7.statecard")}>
              <VerificationDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 8: User Decision */}
          <PhaseSection number={8} {...phases[8][1]}>
            <UserDecisionDemo />
          </PhaseSection>

          <Separator />

          {/* Phase 9: Completion */}
          <PhaseSection number={9} {...phases[9][1]}>
            <StateCard stateName="turn_complete → awaiting_followup → conversation_idle" description={t("app.phase9.statecard")}>
              <CompletionDemo />
            </StateCard>
          </PhaseSection>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  )
}

export default App
