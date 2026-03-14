/**
 * Agent Reasoning Loop — 完整状态定义
 *
 * 基于 Cursor Agent (Claude Opus) 的真实执行流程。
 * 当用户说"帮我生成一个页面"时，以下是 Agent 经历的每一个状态。
 */

// ============================================================
// Phase 0: 用户输入 (User Input)
// ============================================================

export type UserInputState =
  | "composing"        // 用户正在输入框打字
  | "attaching"        // 用户 @ 引用文件/文件夹/URL
  | "selecting_model"  // 用户选择模型 (Opus / Sonnet / GPT-4o...)
  | "selecting_mode"   // 用户选择模式 (Agent / Ask / Manual)
  | "submitted"        // 用户按下 Enter / Cmd+Enter 发送

// ============================================================
// Phase 1: 上下文组装 (Context Assembly)
// ============================================================
// Cursor 在用户发送消息后、Agent 开始思考前，自动收集上下文。
// 这一步对用户几乎不可见，但 UI 上会短暂显示 loading。

export type ContextAssemblyState =
  | "gathering_open_files"    // 收集当前打开的文件
  | "gathering_cursor_pos"    // 收集光标位置
  | "gathering_selection"     // 收集选中的代码
  | "gathering_recent_files"  // 收集最近浏览的文件
  | "gathering_lint_errors"   // 收集当前 lint 错误
  | "gathering_terminal"      // 收集终端输出
  | "gathering_git_status"    // 收集 git 状态
  | "gathering_rules"         // 加载 .cursor/rules、AGENTS.md
  | "gathering_skills"        // 加载 Agent Skills
  | "context_ready"           // 上下文组装完成

// ============================================================
// Phase 2: 思考 (Thinking / Reasoning)
// ============================================================
// Agent 收到完整 prompt 后的内部推理过程。
// Cursor UI 显示为 "Thinking..." 可折叠区域。

export type ThinkingState =
  | "thinking_started"        // 开始思考，显示 "Thinking..."
  | "thinking_streaming"      // 思考内容正在流式输出（折叠内）
  | "thinking_complete"       // 思考结束，准备行动

// ============================================================
// Phase 3: 任务规划 (Task Planning)
// ============================================================
// Agent 决定是否需要分解任务。
// 对于复杂任务，会生成 TODO 列表。

export type TaskPlanningState =
  | "no_plan_needed"          // 简单任务，直接执行
  | "creating_todos"          // 正在生成 TODO 列表
  | "todos_created"           // TODO 列表已生成
  | "todo_in_progress"        // 某个 TODO 项标记为进行中
  | "todo_completed"          // 某个 TODO 项标记为完成
  | "switching_mode"          // Agent 建议切换模式 (→ Plan / Debug)
  | "mode_switch_pending"     // 等待用户确认模式切换

// ============================================================
// Phase 4: 工具调用 (Tool Use)
// ============================================================
// 这是 Agentic Loop 的核心。Agent 选择并调用工具。
// 每种工具在 UI 上有不同的展示方式。

export type ToolType =
  // 文件操作
  | "Read"                // 读取文件
  | "Write"               // 创建/覆盖文件
  | "StrReplace"          // 精确字符串替换（编辑文件）
  | "Delete"              // 删除文件

  // 搜索
  | "Grep"                // 正则搜索代码内容
  | "Glob"                // 按文件名模式搜索
  | "SemanticSearch"      // 语义搜索（按含义找代码）

  // 终端
  | "Shell"               // 执行终端命令

  // 浏览器
  | "browser_navigate"    // 打开 URL
  | "browser_snapshot"    // 获取页面结构
  | "browser_screenshot"  // 截屏
  | "browser_click"       // 点击元素
  | "browser_type"        // 输入文字

  // 子任务
  | "Task"                // 启动子 Agent

  // 用户交互
  | "AskQuestion"         // 向用户提问（多选/单选）

  // Lint
  | "ReadLints"           // 读取 lint 错误

  // 其他
  | "TodoWrite"           // 更新任务列表
  | "EditNotebook"        // 编辑 Jupyter Notebook
  | "WebSearch"           // 搜索互联网
  | "WebFetch"            // 抓取网页内容
  | "GenerateImage"       // 生成图片
  | "SwitchMode"          // 切换交互模式

export type ToolCallState =
  | "tool_selected"       // Agent 决定调用某个工具
  | "tool_calling"        // 工具正在执行中（显示 spinner）
  | "tool_result"         // 工具返回了结果
  | "tool_error"          // 工具执行出错
  | "tool_result_folded"  // 结果已折叠（用户可展开查看）

// ============================================================
// Phase 5: 流式输出 (Streaming Response)
// ============================================================
// Agent 生成文本回复，逐 token 流式输出。

export type StreamingState =
  | "stream_started"      // 开始输出
  | "stream_text"         // 正在输出普通文本
  | "stream_code_block"   // 正在输出代码块
  | "stream_markdown"     // 正在输出 markdown（表格、列表等）
  | "stream_paused"       // 输出暂停（等待工具结果）
  | "stream_resumed"      // 输出恢复
  | "stream_complete"     // 输出完成

// ============================================================
// Phase 6: 代码变更 (Code Changes)
// ============================================================
// Agent 编辑代码时，Cursor 展示 diff 视图。

export type CodeChangeState =
  | "file_creating"       // 正在创建新文件
  | "file_created"        // 新文件已创建
  | "file_editing"        // 正在编辑现有文件
  | "diff_shown"          // Diff 视图已展示
  | "diff_accepted"       // 用户接受了变更
  | "diff_rejected"       // 用户拒绝了变更
  | "diff_pending"        // 等待用户审核

// ============================================================
// Phase 7: 验证 (Verification)
// ============================================================
// Agent 在完成代码变更后进行自检。

export type VerificationState =
  | "checking_lints"      // 正在检查 lint 错误
  | "lints_clean"         // 没有 lint 错误
  | "lints_found"         // 发现 lint 错误
  | "self_correcting"     // Agent 正在自动修复错误
  | "running_command"     // 运行命令验证（如 npm run build）
  | "command_success"     // 命令执行成功
  | "command_failed"      // 命令执行失败
  | "opening_browser"     // 打开浏览器验证 UI
  | "screenshot_taken"    // 截图完成，Agent 在分析

// ============================================================
// Phase 8: 用户交互节点 (User Decision Points)
// ============================================================
// Agent 执行过程中需要用户介入的时刻。

export type UserDecisionState =
  | "awaiting_confirmation"   // 等待用户确认（如模式切换）
  | "awaiting_choice"         // 等待用户选择（多选/单选卡片）
  | "awaiting_file_review"    // 等待用户审核文件变更
  | "awaiting_permission"     // 等待用户授权（如终端命令）
  | "user_approved"           // 用户批准
  | "user_rejected"           // 用户拒绝
  | "user_edited"             // 用户手动编辑了 Agent 的输出

// ============================================================
// Phase 9: 完成 (Completion)
// ============================================================

export type CompletionState =
  | "turn_complete"       // 本轮回复完成
  | "awaiting_followup"   // 等待用户后续消息
  | "conversation_idle"   // 对话空闲

// ============================================================
// 完整的 Agent 状态联合类型
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
// 真实场景示例：用户说"帮我用 React 写一个 TodoList 页面"
// ============================================================

export const EXAMPLE_FLOW: AgentState[] = [
  // 用户输入
  { phase: "user_input", state: "composing" },
  { phase: "user_input", state: "submitted" },

  // Cursor 自动收集上下文
  { phase: "context_assembly", state: "gathering_open_files" },
  { phase: "context_assembly", state: "gathering_rules" },
  { phase: "context_assembly", state: "gathering_skills" },
  { phase: "context_assembly", state: "context_ready" },

  // Agent 开始思考
  { phase: "thinking", state: "thinking_started" },
  { phase: "thinking", state: "thinking_streaming" },
  { phase: "thinking", state: "thinking_complete" },

  // 规划任务
  { phase: "task_planning", state: "creating_todos" },
  { phase: "task_planning", state: "todos_created" },
  { phase: "task_planning", state: "todo_in_progress" },

  // 先读取现有文件了解项目结构
  { phase: "tool_use", state: "tool_selected", tool: "Glob" },
  { phase: "tool_use", state: "tool_calling", tool: "Glob" },
  { phase: "tool_use", state: "tool_result", tool: "Glob" },
  { phase: "tool_use", state: "tool_result_folded", tool: "Glob" },

  // 读取关键文件
  { phase: "tool_use", state: "tool_selected", tool: "Read" },
  { phase: "tool_use", state: "tool_calling", tool: "Read" },
  { phase: "tool_use", state: "tool_result", tool: "Read" },

  // Agent 输出分析文字
  { phase: "streaming", state: "stream_started" },
  { phase: "streaming", state: "stream_text" },

  // 创建组件文件
  { phase: "tool_use", state: "tool_selected", tool: "Write" },
  { phase: "tool_use", state: "tool_calling", tool: "Write" },
  { phase: "tool_use", state: "tool_result", tool: "Write" },
  { phase: "code_change", state: "file_creating" },
  { phase: "code_change", state: "file_created" },

  // 编辑现有文件
  { phase: "tool_use", state: "tool_selected", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_calling", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_result", tool: "StrReplace" },
  { phase: "code_change", state: "file_editing" },
  { phase: "code_change", state: "diff_shown" },
  { phase: "code_change", state: "diff_pending" },

  // 检查 lint
  { phase: "tool_use", state: "tool_selected", tool: "ReadLints" },
  { phase: "tool_use", state: "tool_calling", tool: "ReadLints" },
  { phase: "tool_use", state: "tool_result", tool: "ReadLints" },
  { phase: "verification", state: "checking_lints" },
  { phase: "verification", state: "lints_found" },

  // 自动修复 lint 错误
  { phase: "verification", state: "self_correcting" },
  { phase: "tool_use", state: "tool_selected", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_calling", tool: "StrReplace" },
  { phase: "tool_use", state: "tool_result", tool: "StrReplace" },

  // 再次检查
  { phase: "verification", state: "checking_lints" },
  { phase: "verification", state: "lints_clean" },

  // 打开浏览器验证
  { phase: "tool_use", state: "tool_selected", tool: "browser_navigate" },
  { phase: "tool_use", state: "tool_calling", tool: "browser_navigate" },
  { phase: "tool_use", state: "tool_result", tool: "browser_navigate" },
  { phase: "verification", state: "opening_browser" },

  { phase: "tool_use", state: "tool_selected", tool: "browser_screenshot" },
  { phase: "tool_use", state: "tool_calling", tool: "browser_screenshot" },
  { phase: "tool_use", state: "tool_result", tool: "browser_screenshot" },
  { phase: "verification", state: "screenshot_taken" },

  // 更新 TODO
  { phase: "task_planning", state: "todo_completed" },

  // 最终回复
  { phase: "streaming", state: "stream_started" },
  { phase: "streaming", state: "stream_text" },
  { phase: "streaming", state: "stream_complete" },

  // 完成
  { phase: "completion", state: "turn_complete" },
  { phase: "completion", state: "awaiting_followup" },
]

// ============================================================
// Phase 元数据：用于 UI 展示
// ============================================================

export const PHASE_META = {
  user_input: {
    label: "User Input",
    labelCn: "用户输入",
    description: "用户在输入框中编写 prompt 并发送",
    color: "#6366f1", // indigo
  },
  context_assembly: {
    label: "Context Assembly",
    labelCn: "上下文组装",
    description: "Cursor 自动收集当前工作区的上下文信息，附加到 prompt 中",
    color: "#8b5cf6", // violet
  },
  thinking: {
    label: "Thinking",
    labelCn: "思考推理",
    description: "Agent 的 Chain-of-Thought 推理过程，在 UI 上显示为可折叠的 Thinking 区域",
    color: "#a855f7", // purple
  },
  task_planning: {
    label: "Task Planning",
    labelCn: "任务规划",
    description: "Agent 将复杂任务分解为 TODO 列表，逐步执行",
    color: "#d946ef", // fuchsia
  },
  tool_use: {
    label: "Tool Use",
    labelCn: "工具调用",
    description: "Agent 调用各种工具（读写文件、搜索、终端、浏览器等）来完成任务",
    color: "#f59e0b", // amber
  },
  streaming: {
    label: "Streaming",
    labelCn: "流式输出",
    description: "Agent 逐 token 生成文本回复",
    color: "#10b981", // emerald
  },
  code_change: {
    label: "Code Change",
    labelCn: "代码变更",
    description: "Agent 创建或编辑文件，Cursor 展示 diff 视图供用户审核",
    color: "#3b82f6", // blue
  },
  verification: {
    label: "Verification",
    labelCn: "验证检查",
    description: "Agent 自检代码质量：lint 检查、构建验证、浏览器截图",
    color: "#14b8a6", // teal
  },
  user_decision: {
    label: "User Decision",
    labelCn: "用户决策",
    description: "Agent 需要用户介入：确认、选择、审核代码变更",
    color: "#f97316", // orange
  },
  completion: {
    label: "Completion",
    labelCn: "完成",
    description: "本轮 Agent 回复结束，等待用户后续指令",
    color: "#22c55e", // green
  },
} as const

// ============================================================
// 工具元数据：用于 UI 展示
// ============================================================

export const TOOL_META: Record<ToolType, {
  label: string
  description: string
  category: "file" | "search" | "terminal" | "browser" | "agent" | "user" | "verify" | "other"
  icon: string // Lucide icon name
}> = {
  Read:            { label: "Read File",         description: "读取文件内容",           category: "file",     icon: "FileText" },
  Write:           { label: "Write File",        description: "创建或覆盖文件",         category: "file",     icon: "FilePlus" },
  StrReplace:      { label: "Edit File",         description: "精确替换文件中的字符串", category: "file",     icon: "FileEdit" },
  Delete:          { label: "Delete File",       description: "删除文件",               category: "file",     icon: "FileX" },
  Grep:            { label: "Grep Search",       description: "正则搜索代码内容",       category: "search",   icon: "Search" },
  Glob:            { label: "Glob Search",       description: "按文件名模式搜索",       category: "search",   icon: "FolderSearch" },
  SemanticSearch:  { label: "Semantic Search",   description: "按含义语义搜索代码",     category: "search",   icon: "Sparkles" },
  Shell:           { label: "Terminal",          description: "执行终端命令",           category: "terminal", icon: "Terminal" },
  browser_navigate:{ label: "Navigate",          description: "打开网页 URL",           category: "browser",  icon: "Globe" },
  browser_snapshot:{ label: "Snapshot",          description: "获取页面 DOM 结构",      category: "browser",  icon: "ScanLine" },
  browser_screenshot:{ label: "Screenshot",      description: "网页截图",               category: "browser",  icon: "Camera" },
  browser_click:   { label: "Click",             description: "点击页面元素",           category: "browser",  icon: "MousePointerClick" },
  browser_type:    { label: "Type",              description: "在页面输入文字",         category: "browser",  icon: "Keyboard" },
  Task:            { label: "Sub-Agent",         description: "启动子 Agent 处理子任务",category: "agent",    icon: "GitBranch" },
  AskQuestion:     { label: "Ask User",          description: "向用户提问",             category: "user",     icon: "MessageCircleQuestion" },
  ReadLints:       { label: "Check Lints",       description: "检查代码 lint 错误",     category: "verify",   icon: "ShieldCheck" },
  TodoWrite:       { label: "Update TODOs",      description: "更新任务列表",           category: "other",    icon: "ListTodo" },
  EditNotebook:    { label: "Edit Notebook",     description: "编辑 Jupyter Notebook",  category: "file",     icon: "BookOpen" },
  WebSearch:       { label: "Web Search",        description: "搜索互联网",             category: "other",    icon: "Globe" },
  WebFetch:        { label: "Fetch URL",         description: "抓取网页内容",           category: "other",    icon: "Download" },
  GenerateImage:   { label: "Generate Image",    description: "AI 生成图片",            category: "other",    icon: "Image" },
  SwitchMode:      { label: "Switch Mode",       description: "切换交互模式",           category: "other",    icon: "ArrowLeftRight" },
}

// ============================================================
// UI 组件清单：每个 Phase 需要的组件
// ============================================================

export const UI_COMPONENTS = {
  // Phase 0: User Input
  "InputComposer":       "用户输入框 — 支持多行、@ 引用、模型选择",
  "FileAttachment":      "文件/文件夹引用标签",
  "ModelSelector":        "模型选择下拉菜单",
  "ModeSelector":         "模式选择 (Agent / Ask / Manual)",
  "SubmitButton":         "发送按钮 + 快捷键提示",

  // Phase 1: Context Assembly
  "ContextIndicator":     "上下文收集指示器 — 短暂的 loading 状态",

  // Phase 2: Thinking
  "ThinkingBlock":        "可折叠的思考过程区域",
  "ThinkingIndicator":    "Thinking... 动画指示器",

  // Phase 3: Task Planning
  "TodoList":             "任务列表 — 支持 pending/in_progress/completed 状态",
  "TodoItem":             "单个任务项",
  "ModeSwitchCard":       "模式切换确认卡片",

  // Phase 4: Tool Use
  "ToolCallCard":         "工具调用卡片 — 显示工具名、参数、结果",
  "ToolCallHeader":       "工具调用头部 — 图标 + 名称 + 描述",
  "ToolCallSpinner":      "工具执行中的 loading 动画",
  "ToolCallResult":       "工具返回结果 — 可折叠",
  "ToolCallError":        "工具执行错误提示",
  "ParallelToolCalls":    "并行工具调用 — 多个工具同时执行",

  // Phase 5: Streaming
  "StreamingText":        "流式文本输出 — 逐字出现 + 光标闪烁",
  "StreamingCodeBlock":   "流式代码块 — 语法高亮 + 逐行出现",
  "StreamingCursor":      "打字光标动画",

  // Phase 6: Code Change
  "DiffView":             "代码 Diff 视图 — 红绿对比",
  "FileCreateCard":       "新文件创建卡片",
  "FileEditCard":         "文件编辑卡片",
  "DiffActions":          "Accept / Reject 按钮组",

  // Phase 7: Verification
  "LintResultCard":       "Lint 检查结果卡片",
  "SelfCorrectionBadge":  "自动修复标记",
  "BrowserPreview":       "浏览器预览截图",
  "CommandResultCard":    "命令执行结果卡片",

  // Phase 8: User Decision
  "ConfirmationDialog":   "确认对话框",
  "ChoiceCard":           "选择卡片 — 单选/多选",
  "PermissionPrompt":     "权限请求提示",

  // Phase 9: Completion
  "TurnEndIndicator":     "回复结束分隔线",
  "FollowUpSuggestions":  "后续建议提示",

  // 通用
  "AgentAvatar":          "Agent 头像",
  "UserAvatar":           "用户头像",
  "Timestamp":            "时间戳",
  "CopyButton":           "复制按钮",
  "CollapseToggle":       "折叠/展开切换",
} as const
