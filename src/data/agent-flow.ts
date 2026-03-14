/**
 * Agent Reasoning Loop — Full State Definitions
 *
 * Based on the actual execution flow of Cursor Agent (Claude Opus).
 * When the user says "build me a page", these are every state the Agent goes through.
 */

// ============================================================
// Phase 0: User Input
// ============================================================

export type UserInputState =
  | "composing"        // user is typing in the input box
  | "attaching"        // user is @-referencing files / folders / URLs
  | "selecting_model"  // user selects model (Opus / Sonnet / GPT-4o...)
  | "selecting_mode"   // user selects mode (Agent / Ask / Manual)
  | "submitted"        // user presses Enter / Cmd+Enter to send

// ============================================================
// Phase 1: Context Assembly
// ============================================================
// After the user sends a message but before the Agent starts thinking,
// Cursor automatically collects context. Nearly invisible to users but
// the UI briefly shows a loading state.

export type ContextAssemblyState =
  | "gathering_open_files"    // collect currently open files
  | "gathering_cursor_pos"    // collect cursor position
  | "gathering_selection"     // collect selected code
  | "gathering_recent_files"  // collect recently viewed files
  | "gathering_lint_errors"   // collect current lint errors
  | "gathering_terminal"      // collect terminal output
  | "gathering_git_status"    // collect git status
  | "gathering_rules"         // load .cursor/rules and AGENTS.md
  | "gathering_skills"        // load Agent Skills
  | "context_ready"           // context assembly complete

// ============================================================
// Phase 2: Thinking / Reasoning
// ============================================================
// The Agent's internal reasoning process after receiving the full prompt.
// Shown in the Cursor UI as a collapsible "Thinking..." block.

export type ThinkingState =
  | "thinking_started"        // thinking begins, shows "Thinking..."
  | "thinking_streaming"      // thinking content is streaming (inside collapsed block)
  | "thinking_complete"       // thinking done, ready to act

// ============================================================
// Phase 3: Task Planning
// ============================================================
// The Agent decides whether to decompose the task.
// For complex tasks it generates a TODO list.

export type TaskPlanningState =
  | "no_plan_needed"          // simple task, execute directly
  | "creating_todos"          // generating TODO list
  | "todos_created"           // TODO list generated
  | "todo_in_progress"        // a TODO item marked as in-progress
  | "todo_completed"          // a TODO item marked as completed
  | "switching_mode"          // Agent suggests switching mode (→ Plan / Debug)
  | "mode_switch_pending"     // waiting for user to confirm mode switch

// ============================================================
// Phase 4: Tool Use
// ============================================================
// The core of the Agentic Loop. The Agent selects and calls tools.
// Each tool type has a distinct UI representation.

export type ToolType =
  // File operations
  | "Read"                // read file contents
  | "Write"               // create / overwrite a file
  | "StrReplace"          // precise string replacement (edit file)
  | "Delete"              // delete a file

  // Search
  | "Grep"                // regex search in file contents
  | "Glob"                // search by filename pattern
  | "SemanticSearch"      // semantic search (find code by meaning)

  // Terminal
  | "Shell"               // execute terminal commands

  // Browser
  | "browser_navigate"    // open a URL
  | "browser_snapshot"    // get page accessibility tree
  | "browser_screenshot"  // take a screenshot
  | "browser_click"       // click a page element
  | "browser_type"        // type text on the page

  // Sub-agent
  | "Task"                // launch a sub-agent

  // User interaction
  | "AskQuestion"         // ask the user a question (multi/single-select)

  // Lint
  | "ReadLints"           // read lint errors

  // Other
  | "TodoWrite"           // update task list
  | "EditNotebook"        // edit a Jupyter Notebook
  | "WebSearch"           // search the internet
  | "WebFetch"            // fetch web page content
  | "GenerateImage"       // generate an image
  | "SwitchMode"          // switch interaction mode

export type ToolCallState =
  | "tool_selected"       // Agent decided to call a tool
  | "tool_calling"        // tool is executing (shows spinner)
  | "tool_result"         // tool returned a result
  | "tool_error"          // tool execution failed
  | "tool_result_folded"  // result is collapsed (user can expand)

// ============================================================
// Phase 5: Streaming Response
// ============================================================
// The Agent generates a text reply, streaming token by token.

export type StreamingState =
  | "stream_started"      // output begins
  | "stream_text"         // outputting plain text
  | "stream_code_block"   // outputting a code block
  | "stream_markdown"     // outputting markdown (tables, lists, etc.)
  | "stream_paused"       // output paused (waiting for tool result)
  | "stream_resumed"      // output resumed
  | "stream_complete"     // output finished

// ============================================================
// Phase 6: Code Changes
// ============================================================
// When the Agent edits code, Cursor shows a diff view.

export type CodeChangeState =
  | "file_creating"       // creating a new file
  | "file_created"        // new file created
  | "file_editing"        // editing an existing file
  | "diff_shown"          // diff view is displayed
  | "diff_accepted"       // user accepted the changes
  | "diff_rejected"       // user rejected the changes
  | "diff_pending"        // awaiting user review

// ============================================================
// Phase 7: Verification
// ============================================================
// The Agent self-checks after completing code changes.

export type VerificationState =
  | "checking_lints"      // checking for lint errors
  | "lints_clean"         // no lint errors found
  | "lints_found"         // lint errors found
  | "self_correcting"     // Agent is auto-fixing errors
  | "running_command"     // running a command to verify (e.g. npm run build)
  | "command_success"     // command succeeded
  | "command_failed"      // command failed
  | "opening_browser"     // opening browser to verify UI
  | "screenshot_taken"    // screenshot taken, Agent is analyzing

// ============================================================
// Phase 8: User Decision Points
// ============================================================
// Moments during Agent execution that require user intervention.

export type UserDecisionState =
  | "awaiting_confirmation"   // waiting for user confirmation (e.g. mode switch)
  | "awaiting_choice"         // waiting for user selection (multi/single-select card)
  | "awaiting_file_review"    // waiting for user to review file changes
  | "awaiting_permission"     // waiting for user to grant permission (e.g. terminal command)
  | "user_approved"           // user approved
  | "user_rejected"           // user rejected
  | "user_edited"             // user manually edited the Agent's output

// ============================================================
// Phase 9: Completion
// ============================================================

export type CompletionState =
  | "turn_complete"       // this turn's reply is complete
  | "awaiting_followup"   // waiting for user's next message
  | "conversation_idle"   // conversation is idle

// ============================================================
// Full Agent State Union Type
// ============================================================

export type AgentState =
  | { phase: "user_input"; state: UserInputState }
  | { phase: "context_assembly"; state: ContextAssemblyState }
  | { phase: "thinking"; state: ThinkingState }
  | { phase: "task_planning"; state: TaskPlanningState }
  | { phase: "tool_use"; state: ToolCallState; tool: ToolType }
  | { phase: "streaming"; state: StreamingState }
  | { phase: "code_change"; state: CodeChangeState }
  | { phase: "verification"; state: VerificationState }
  | { phase: "user_decision"; state: UserDecisionState }
  | { phase: "completion"; state: CompletionState }

// ============================================================
// Real-world example: user says "Build me a React TodoList page"
// ============================================================

export const EXAMPLE_FLOW: AgentState[] = [
  // user input
  { phase: "user_input", state: "composing" },
  { phase: "user_input", state: "submitted" },

  // Cursor auto-collects context
  { phase: "context_assembly", state: "gathering_open_files" },
  { phase: "context_assembly", state: "gathering_rules" },
  { phase: "context_assembly", state: "gathering_skills" },
  { phase: "context_assembly", state: "context_ready" },

  // Agent starts thinking
  { phase: "thinking", state: "thinking_started" },
  { phase: "thinking", state: "thinking_streaming" },
  { phase: "thinking", state: "thinking_complete" },

  // Plan tasks
  { phase: "task_planning", state: "creating_todos" },
  { phase: "task_planning", state: "todos_created" },
  { phase: "task_planning", state: "todo_in_progress" },

  // Read existing files to understand project structure
  { phase: "tool_use", state: "tool_selected", tool: "Glob" },
  { phase: "tool_use", state: "tool_calling", tool: "Glob" },
  { phase: "tool_use", state: "tool_result", tool: "Glob" },
  { phase: "tool_use", state: "tool_result_folded", tool: "Glob" },

  // Read key files
  { phase: "tool_use", state: "tool_selected", tool: "Read" },
  { phase: "tool_use", state: "tool_calling", tool: "Read" },
  { phase: "tool_use", state: "tool_result", tool: "Read" },

  // Agent streams analysis text
  { phase: "streaming", state: "stream_started" },
  { phase: "streaming", state: "stream_text" },

  // Create component file
  { phase: "tool_use", state: "tool_selected", tool: "Write" },
  { phase: "tool_use", state: "tool_calling", tool: "Write" },
  { phase: "tool_use", state: "tool_result", tool: "Write" },
  { phase: "code_change", state: "file_creating" },
  { phase: "code_change", state: "file_created" },

  // Edit existing file
  { phase: "tool_use", state: "tool_selected", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_calling", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_result", tool: "StrReplace" },
  { phase: "code_change", state: "file_editing" },
  { phase: "code_change", state: "diff_shown" },
  { phase: "code_change", state: "diff_pending" },

  // Check lints
  { phase: "tool_use", state: "tool_selected", tool: "ReadLints" },
  { phase: "tool_use", state: "tool_calling", tool: "ReadLints" },
  { phase: "tool_use", state: "tool_result", tool: "ReadLints" },
  { phase: "verification", state: "checking_lints" },
  { phase: "verification", state: "lints_found" },

  // Auto-fix lint errors
  { phase: "verification", state: "self_correcting" },
  { phase: "tool_use", state: "tool_selected", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_calling", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_result", tool: "StrReplace" },

  // Re-check
  { phase: "verification", state: "checking_lints" },
  { phase: "verification", state: "lints_clean" },

  // Open browser to verify
  { phase: "tool_use", state: "tool_selected", tool: "browser_navigate" },
  { phase: "tool_use", state: "tool_calling", tool: "browser_navigate" },
  { phase: "tool_use", state: "tool_result", tool: "browser_navigate" },
  { phase: "verification", state: "opening_browser" },

  { phase: "tool_use", state: "tool_selected", tool: "browser_screenshot" },
  { phase: "tool_use", state: "tool_calling", tool: "browser_screenshot" },
  { phase: "tool_use", state: "tool_result", tool: "browser_screenshot" },
  { phase: "verification", state: "screenshot_taken" },

  // Update TODO
  { phase: "task_planning", state: "todo_completed" },

  // Final reply
  { phase: "streaming", state: "stream_started" },
  { phase: "streaming", state: "stream_text" },
  { phase: "streaming", state: "stream_complete" },

  // Completion
  { phase: "completion", state: "turn_complete" },
  { phase: "completion", state: "awaiting_followup" },
]

// ============================================================
// Phase metadata: used for UI rendering
// ============================================================

export const PHASE_META = {
  user_input: {
    label: "User Input",
    labelCn: "用户输入",
    description: "用户在输入框中编写 prompt 并发送",
    descriptionEn: "User writes a prompt in the input box and sends it",
    color: "#6366f1", // indigo
  },
  context_assembly: {
    label: "Context Assembly",
    labelCn: "上下文组装",
    description: "Cursor 自动收集当前工作区的上下文信息，附加到 prompt 中",
    descriptionEn: "Cursor automatically collects workspace context and attaches it to the prompt",
    color: "#8b5cf6", // violet
  },
  thinking: {
    label: "Thinking",
    labelCn: "思考推理",
    description: "Agent 的 Chain-of-Thought 推理过程，在 UI 上显示为可折叠的 Thinking 区域",
    descriptionEn: "Agent's Chain-of-Thought reasoning process, shown as a collapsible Thinking block in the UI",
    color: "#a855f7", // purple
  },
  task_planning: {
    label: "Task Planning",
    labelCn: "任务规划",
    description: "Agent 将复杂任务分解为 TODO 列表，逐步执行",
    descriptionEn: "Agent breaks complex tasks into a TODO list and executes step by step",
    color: "#d946ef", // fuchsia
  },
  tool_use: {
    label: "Tool Use",
    labelCn: "工具调用",
    description: "Agent 调用各种工具（读写文件、搜索、终端、浏览器等）来完成任务",
    descriptionEn: "Agent calls various tools (file read/write, search, terminal, browser, etc.) to complete tasks",
    color: "#f59e0b", // amber
  },
  streaming: {
    label: "Streaming",
    labelCn: "流式输出",
    description: "Agent 逐 token 生成文本回复",
    descriptionEn: "Agent generates text responses token by token",
    color: "#10b981", // emerald
  },
  code_change: {
    label: "Code Change",
    labelCn: "代码变更",
    description: "Agent 创建或编辑文件，Cursor 展示 diff 视图供用户审核",
    descriptionEn: "Agent creates or edits files; Cursor shows a diff view for review",
    color: "#3b82f6", // blue
  },
  verification: {
    label: "Verification",
    labelCn: "验证检查",
    description: "Agent 自检代码质量：lint 检查、构建验证、浏览器截图",
    descriptionEn: "Agent self-checks code quality: lint, build verification, browser screenshots",
    color: "#14b8a6", // teal
  },
  user_decision: {
    label: "User Decision",
    labelCn: "用户决策",
    description: "Agent 需要用户介入：确认、选择、审核代码变更",
    descriptionEn: "Agent requires user input: confirm, choose, or review code changes",
    color: "#f97316", // orange
  },
  completion: {
    label: "Completion",
    labelCn: "完成",
    description: "本轮 Agent 回复结束，等待用户后续指令",
    descriptionEn: "This Agent turn ends; awaiting the user's next instruction",
    color: "#22c55e", // green
  },
} as const

// ============================================================
// Tool metadata: used for UI rendering
// ============================================================

export const TOOL_META: Record<ToolType, {
  label: string
  description: string
  category: "file" | "search" | "terminal" | "browser" | "agent" | "user" | "verify" | "other"
  icon: string // Lucide icon name
}> = {
  Read:              { label: "Read File",       description: "Read file contents",                    category: "file",     icon: "FileText" },
  Write:             { label: "Write File",      description: "Create or overwrite a file",            category: "file",     icon: "FilePlus" },
  StrReplace:        { label: "Edit File",       description: "Precise string replacement in a file",  category: "file",     icon: "FileEdit" },
  Delete:            { label: "Delete File",     description: "Delete a file",                         category: "file",     icon: "FileX" },
  Grep:              { label: "Grep Search",     description: "Regex search in file contents",         category: "search",   icon: "Search" },
  Glob:              { label: "Glob Search",     description: "Search by filename pattern",            category: "search",   icon: "FolderSearch" },
  SemanticSearch:    { label: "Semantic Search", description: "Semantic search in the codebase",       category: "search",   icon: "Sparkles" },
  Shell:             { label: "Terminal",        description: "Execute terminal commands",             category: "terminal", icon: "Terminal" },
  browser_navigate:  { label: "Navigate",        description: "Open a URL in the browser",             category: "browser",  icon: "Globe" },
  browser_snapshot:  { label: "Snapshot",        description: "Get page accessibility tree",           category: "browser",  icon: "ScanLine" },
  browser_screenshot:{ label: "Screenshot",      description: "Take a webpage screenshot",             category: "browser",  icon: "Camera" },
  browser_click:     { label: "Click",           description: "Click a page element",                  category: "browser",  icon: "MousePointerClick" },
  browser_type:      { label: "Type",            description: "Type text on the page",                 category: "browser",  icon: "Keyboard" },
  Task:              { label: "Sub-Agent",       description: "Launch a sub-agent to handle subtasks", category: "agent",    icon: "GitBranch" },
  AskQuestion:       { label: "Ask User",        description: "Ask the user a question",               category: "user",     icon: "MessageCircleQuestion" },
  ReadLints:         { label: "Check Lints",     description: "Read code lint errors",                 category: "verify",   icon: "ShieldCheck" },
  TodoWrite:         { label: "Update TODOs",    description: "Update the task list",                  category: "other",    icon: "ListTodo" },
  EditNotebook:      { label: "Edit Notebook",   description: "Edit a Jupyter Notebook",               category: "file",     icon: "BookOpen" },
  WebSearch:         { label: "Web Search",      description: "Search the internet",                   category: "other",    icon: "Globe" },
  WebFetch:          { label: "Fetch URL",       description: "Fetch web page content",                category: "other",    icon: "Download" },
  GenerateImage:     { label: "Generate Image",  description: "Generate an AI image",                  category: "other",    icon: "Image" },
  SwitchMode:        { label: "Switch Mode",     description: "Switch interaction mode",               category: "other",    icon: "ArrowLeftRight" },
}

// ============================================================
// UI Component Catalog: components needed for each phase
// ============================================================

export const UI_COMPONENTS = {
  // Phase 0: User Input
  "InputComposer":        "Input box — multi-line, @-references, model selection",
  "FileAttachment":       "File / folder reference badge",
  "ModelSelector":        "Model selector dropdown",
  "ModeSelector":         "Mode selector (Agent / Ask / Manual)",
  "SubmitButton":         "Send button + keyboard shortcut hint",

  // Phase 1: Context Assembly
  "ContextIndicator":     "Context collection indicator — brief loading state",

  // Phase 2: Thinking
  "ThinkingBlock":        "Collapsible thinking process block",
  "ThinkingIndicator":    "Thinking... animated indicator",

  // Phase 3: Task Planning
  "TodoList":             "Task list — supports pending / in_progress / completed states",
  "TodoItem":             "Single task item",
  "ModeSwitchCard":       "Mode switch confirmation card",

  // Phase 4: Tool Use
  "ToolCallCard":         "Tool call card — shows tool name, arguments, result",
  "ToolCallHeader":       "Tool call header — icon + name + description",
  "ToolCallSpinner":      "Loading animation while tool executes",
  "ToolCallResult":       "Tool result — collapsible",
  "ToolCallError":        "Tool execution error message",
  "ParallelToolCalls":    "Parallel tool calls — multiple tools executing simultaneously",

  // Phase 5: Streaming
  "StreamingText":        "Streaming text output — appears character by character + blinking cursor",
  "StreamingCodeBlock":   "Streaming code block — syntax highlighted + line by line",
  "StreamingCursor":      "Typing cursor animation",

  // Phase 6: Code Change
  "DiffView":             "Code diff view — red/green comparison",
  "FileCreateCard":       "New file creation card",
  "FileEditCard":         "File edit card",
  "DiffActions":          "Accept / Reject button group",

  // Phase 7: Verification
  "LintResultCard":       "Lint check result card",
  "SelfCorrectionBadge":  "Auto-fix badge",
  "BrowserPreview":       "Browser preview screenshot",
  "CommandResultCard":    "Command execution result card",

  // Phase 8: User Decision
  "ConfirmationDialog":   "Confirmation dialog",
  "ChoiceCard":           "Choice card — single / multi-select",
  "PermissionPrompt":     "Permission request prompt",

  // Phase 9: Completion
  "TurnEndIndicator":     "Turn end separator",
  "FollowUpSuggestions":  "Follow-up suggestion chips",

  // General
  "AgentAvatar":          "Agent avatar",
  "UserAvatar":           "User avatar",
  "Timestamp":            "Timestamp",
  "CopyButton":           "Copy button",
  "CollapseToggle":       "Collapse / expand toggle",
} as const
