import { Bot } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/catalog/Sidebar"
import { PhaseSection } from "@/components/catalog/PhaseSection"
import { StateCard } from "@/components/catalog/StateCard"
import { PHASE_META } from "@/data/agent-flow"

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

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-3">
          <Bot className="size-5 text-foreground" />
          <h1 className="text-sm font-semibold tracking-tight">Agent UI Kit</h1>
          <span className="text-xs text-muted-foreground">Agentic Reasoning Loop — State Catalog</span>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-12">
          {/* Phase 0: User Input */}
          <PhaseSection number={0} {...phases[0][1]}>
            <StateCard stateName="composing → attaching → selecting_model → selecting_mode → submitted" description="用户编写 prompt，附加文件引用，选择模型和模式，然后发送">
              <UserInputDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 1: Context Assembly */}
          <PhaseSection number={1} {...phases[1][1]}>
            <StateCard stateName="gathering_open_files → ... → gathering_skills → context_ready" description="Cursor 自动收集工作区上下文：打开的文件、光标位置、lint 错误、终端输出、git 状态、规则等">
              <ContextDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 2: Thinking */}
          <PhaseSection number={2} {...phases[2][1]}>
            <StateCard stateName="thinking_started → thinking_streaming → thinking_complete" description="Agent 的 Chain-of-Thought 推理，UI 显示为可折叠的 Thinking 区域">
              <ThinkingDemo />
            </StateCard>
          </PhaseSection>

          <Separator />

          {/* Phase 3: Task Planning */}
          <PhaseSection number={3} {...phases[3][1]}>
            <StateCard stateName="no_plan_needed | creating_todos → todos_created → todo_in_progress → todo_completed" description="Agent 将复杂任务分解为步骤，逐步执行并标记进度；简单任务则跳过规划">
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
            <StateCard stateName="stream_started → stream_text | stream_code_block | stream_markdown → stream_paused → stream_resumed → stream_complete" description="Agent 逐 token 生成文本、代码块、Markdown，中途可能暂停等待工具结果后恢复">
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
            <StateCard stateName="checking_lints → lints_found | lints_clean → running_command → command_success | command_failed → screenshot_taken" description="Agent 自检代码质量：lint、构建命令、浏览器截图，发现错误时自动修复">
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
            <StateCard stateName="turn_complete → awaiting_followup → conversation_idle" description="本轮回复结束，显示分隔线和后续建议，进入空闲等待">
              <CompletionDemo />
            </StateCard>
          </PhaseSection>
        </main>
      </div>
    </div>
  )
}

export default App
