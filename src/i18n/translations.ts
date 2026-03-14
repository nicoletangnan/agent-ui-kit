type TranslationMap = Record<string, { zh: string; en: string }>

export const TRANSLATIONS = {
  // ── Phase descriptions (used in PhaseSection) ────────────────────────────
  "phase.user_input.description": {
    zh: "用户在输入框中编写 prompt 并发送",
    en: "User writes a prompt in the input box and sends it",
  },
  "phase.context_assembly.description": {
    zh: "Cursor 自动收集当前工作区的上下文信息，附加到 prompt 中",
    en: "Cursor automatically collects workspace context and attaches it to the prompt",
  },
  "phase.thinking.description": {
    zh: "Agent 的 Chain-of-Thought 推理过程，在 UI 上显示为可折叠的 Thinking 区域",
    en: "Agent's Chain-of-Thought reasoning process, shown as a collapsible Thinking block in the UI",
  },
  "phase.task_planning.description": {
    zh: "Agent 将复杂任务分解为 TODO 列表，逐步执行",
    en: "Agent breaks complex tasks into a TODO list and executes step by step",
  },
  "phase.tool_use.description": {
    zh: "Agent 调用各种工具（读写文件、搜索、终端、浏览器等）来完成任务",
    en: "Agent calls various tools (file read/write, search, terminal, browser, etc.) to complete tasks",
  },
  "phase.streaming.description": {
    zh: "Agent 逐 token 生成文本回复",
    en: "Agent generates text responses token by token",
  },
  "phase.code_change.description": {
    zh: "Agent 创建或编辑文件，Cursor 展示 diff 视图供用户审核",
    en: "Agent creates or edits files; Cursor shows a diff view for review",
  },
  "phase.verification.description": {
    zh: "Agent 自检代码质量：lint 检查、构建验证、浏览器截图",
    en: "Agent self-checks code quality: lint, build verification, browser screenshots",
  },
  "phase.user_decision.description": {
    zh: "Agent 需要用户介入：确认、选择、审核代码变更",
    en: "Agent requires user input: confirm, choose, or review code changes",
  },
  "phase.completion.description": {
    zh: "本轮 Agent 回复结束，等待用户后续指令",
    en: "This Agent turn ends; awaiting the user's next instruction",
  },

  // ── App.tsx — StateCard descriptions ─────────────────────────────────────
  "app.phase0.statecard": {
    zh: "用户编写 prompt，附加文件引用，选择模型和模式，然后发送",
    en: "User composes a prompt, attaches file references, selects model and mode, then sends",
  },
  "app.phase1.statecard": {
    zh: "Cursor 自动收集工作区上下文：打开的文件、光标位置、lint 错误、终端输出、git 状态、规则等",
    en: "Cursor automatically collects workspace context: open files, cursor position, lint errors, terminal output, git status, rules, etc.",
  },
  "app.phase2.statecard": {
    zh: "Agent 的 Chain-of-Thought 推理，UI 显示为可折叠的 Thinking 区域",
    en: "Agent's Chain-of-Thought reasoning, displayed as a collapsible Thinking block in the UI",
  },
  "app.phase3.statecard": {
    zh: "Agent 将复杂任务分解为步骤，逐步执行并标记进度；简单任务则跳过规划",
    en: "Agent breaks complex tasks into steps and tracks progress; skips planning for simple tasks",
  },
  "app.phase5.statecard": {
    zh: "Agent 逐 token 生成文本、代码块、Markdown，中途可能暂停等待工具结果后恢复",
    en: "Agent streams text, code blocks, and Markdown token by token; may pause to await tool results then resume",
  },
  "app.phase7.statecard": {
    zh: "Agent 自检代码质量：lint、构建命令、浏览器截图，发现错误时自动修复",
    en: "Agent self-checks code quality: lint, build commands, browser screenshots; auto-fixes errors when found",
  },
  "app.phase9.statecard": {
    zh: "本轮回复结束，显示分隔线和后续建议，进入空闲等待",
    en: "This turn ends, showing a separator and follow-up suggestions, then entering idle state",
  },

  // ── UserInputDemo ──────────────────────────────────────────────────────────
  "userInput.mode.agent.description": { zh: "自主执行", en: "Autonomous" },
  "userInput.mode.ask.description": { zh: "只回答", en: "Answer only" },
  "userInput.mode.manual.description": { zh: "手动确认", en: "Manual confirm" },
  "userInput.prompt": {
    zh: "帮我用 React 写一个 TodoList 页面，要支持添加、删除、标记完成",
    en: "Build a React TodoList page with add, delete, and mark-complete features",
  },

  // ── ThinkingDemo ─────────────────────────────────────────────────────────
  "thinking.preview": {
    zh: "分析项目结构，确定需要创建的文件...",
    en: "Analyzing project structure, determining files to create...",
  },
  "thinking.cot.intro": {
    zh: "用户想要一个 TodoList 页面。让我先看看项目结构：",
    en: "The user wants a TodoList page. Let me check the project structure first:",
  },
  "thinking.cot.line1": { zh: "1. 项目使用 React + TypeScript + Tailwind", en: "1. The project uses React + TypeScript + Tailwind" },
  "thinking.cot.line2": { zh: "2. 已经有 shadcn/ui 组件库", en: "2. shadcn/ui component library is already set up" },
  "thinking.cot.line3": { zh: "3. 需要创建 TodoList 组件和相关状态管理", en: "3. Need to create a TodoList component and state management" },
  "thinking.cot.conclusion": {
    zh: "我应该先读取 App.tsx 了解当前路由结构，然后创建组件...",
    en: "I should read App.tsx first to understand the routing structure, then create the components...",
  },

  // ── TodoListDemo ──────────────────────────────────────────────────────────
  "todo.1": { zh: "读取项目结构和现有文件", en: "Read project structure and existing files" },
  "todo.2": { zh: "创建 TodoList 组件", en: "Create TodoList component" },
  "todo.3": { zh: "添加状态管理和交互逻辑", en: "Add state management and interaction logic" },
  "todo.4": { zh: "更新 App.tsx 路由", en: "Update App.tsx routing" },
  "todo.5": { zh: "验证页面渲染", en: "Verify page rendering" },
  "todo.noPlan": { zh: "简单任务，Agent 直接执行", en: "Simple task, Agent executes directly" },
  "todo.planning": { zh: "正在规划任务...", en: "Planning tasks..." },

  // ── ToolCallDemo ──────────────────────────────────────────────────────────
  "toolCall.statecard": {
    zh: "7 categories · 5 states · 19 tools — 展开查看完整定义",
    en: "7 categories · 5 states · 19 tools — click to expand",
  },
  "toolCall.result.expandHint": { zh: "点击卡片展开/收起结果", en: "Click to expand/collapse result" },
  "toolCall.calling.hint": { zh: "工具正在执行中", en: "Tool executing" },
  "toolCall.error.expandHint": { zh: "点击卡片展开/收起错误详情", en: "Click to expand/collapse error details" },
  "toolCall.segment.calling.description": { zh: "工具正在调用中", en: "Tool is being called" },
  "toolCall.segment.result.description": { zh: "工具调用成功并返回结果", en: "Tool call succeeded with results" },
  "toolCall.segment.error.description": { zh: "工具调用遇到错误", en: "Tool call encountered an error" },

  // ── ToolOverview ──────────────────────────────────────────────────────────
  "toolOverview.intro": {
    zh: "Agent 在执行任务时会调用以下工具。使用顶部的状态切换器查看 calling / result / error 三种不同状态。",
    en: "The Agent calls the following tools during task execution. Use the state switcher above to see the calling / result / error states.",
  },
  "toolOverview.category.file": { zh: "读写文件", en: "File read/write" },
  "toolOverview.category.search": { zh: "搜索代码库", en: "Search codebase" },
  "toolOverview.category.terminal": { zh: "执行命令", en: "Run commands" },
  "toolOverview.category.browser": { zh: "操控浏览器", en: "Control browser" },
  "toolOverview.category.subagent": { zh: "启动子 Agent", en: "Launch sub-agent" },
  "toolOverview.category.verify": { zh: "验证与管理", en: "Verify & manage" },
  "toolOverview.category.web": { zh: "网络与媒体", en: "Web & media" },
  "tool.Read.description": { zh: "读取文件内容", en: "Read file contents" },
  "tool.Write.description": { zh: "创建新文件", en: "Create a new file" },
  "tool.StrReplace.description": { zh: "替换文件中的文本", en: "Replace text in a file" },
  "tool.Delete.description": { zh: "删除文件", en: "Delete a file" },
  "tool.EditNotebook.description": { zh: "编辑 Jupyter notebook", en: "Edit a Jupyter notebook" },
  "tool.Grep.description": { zh: "正则搜索文件内容", en: "Regex search in file contents" },
  "tool.Glob.description": { zh: "按文件名模式匹配", en: "Match files by name pattern" },
  "tool.SemanticSearch.description": { zh: "语义搜索代码库", en: "Semantic search in the codebase" },
  "tool.Shell.description": { zh: "执行终端命令", en: "Execute terminal commands" },
  "tool.Navigate.description": { zh: "导航到 URL", en: "Navigate to a URL" },
  "tool.Snapshot.description": { zh: "获取页面结构", en: "Get page accessibility tree" },
  "tool.Screenshot.description": { zh: "截取页面截图", en: "Take a page screenshot" },
  "tool.Click.description": { zh: "点击页面元素", en: "Click a page element" },
  "tool.Type.description": { zh: "输入文本", en: "Type text" },
  "tool.Task.description": { zh: "启动子 Agent（explore / shell / browser-use）并行处理任务", en: "Launch sub-agents (explore / shell / browser-use) to handle tasks in parallel" },
  "tool.ReadLints.description": { zh: "读取 lint 错误", en: "Read lint errors" },
  "tool.TodoWrite.description": { zh: "创建和管理任务列表", en: "Create and manage task list" },
  "tool.WebSearch.description": { zh: "搜索互联网", en: "Search the internet" },
  "tool.WebFetch.description": { zh: "抓取网页内容", en: "Fetch web page content" },
  "tool.GenerateImage.description": { zh: "生成图片", en: "Generate an image" },
  "tool.AskQuestion.description": { zh: "向用户提问（单选/多选）", en: "Ask the user a question (single/multi-select)" },
  "tool.SwitchMode.description": { zh: "切换交互模式", en: "Switch interaction mode" },
  "toolOverview.state.tool_selected": { zh: "已选择要调用的工具", en: "Tool selected for calling" },
  "toolOverview.state.tool_calling": { zh: "工具正在执行中", en: "Tool is executing" },
  "toolOverview.state.tool_result": { zh: "工具成功返回结果", en: "Tool returned results successfully" },
  "toolOverview.state.tool_error": { zh: "工具执行出错", en: "Tool execution failed" },
  "toolOverview.state.tool_cancelled": { zh: "工具调用被取消", en: "Tool call was cancelled" },

  // ── File Tools ────────────────────────────────────────────────────────────
  "fileTools.subtitle": { zh: "读取、创建、编辑、删除文件", en: "Read, create, edit, and delete files" },

  // ── Search Tools ──────────────────────────────────────────────────────────
  "searchTools.subtitle": { zh: "在代码库中搜索内容、文件名或语义", en: "Search the codebase by content, filename, or semantics" },

  // ── Terminal Tools ────────────────────────────────────────────────────────
  "terminalTools.subtitle": { zh: "执行终端命令（安装依赖、构建、测试、git 等）", en: "Execute terminal commands (install, build, test, git, etc.)" },

  // ── Browser Tools ─────────────────────────────────────────────────────────
  "browserTools.subtitle": { zh: "打开网页、截图、点击、输入，验证 UI 效果", en: "Open pages, screenshot, click, and type to verify UI" },
  "browserTools.exploring": { zh: "开始探索", en: "Start Exploring" },

  // ── Verify Tools ──────────────────────────────────────────────────────────
  "verifyTools.subtitle": { zh: "检查代码质量、管理任务列表", en: "Check code quality and manage task lists" },

  // ── Web Tools ─────────────────────────────────────────────────────────────
  "webTools.subtitle": { zh: "搜索互联网、抓取网页、生成图片", en: "Search the web, fetch pages, and generate images" },

  // ── AgentToolsDemo ────────────────────────────────────────────────────────
  "agentTools.subtitle": {
    zh: "Task — 启动子 Agent 并行处理探索、命令、浏览器任务",
    en: "Task — launch sub-agents for explore, shell, and browser tasks in parallel",
  },
  "agentTools.explore.calling": { zh: "正在探索代码库...", en: "Exploring codebase..." },
  "agentTools.explore.summary": { zh: "完成代码库探索，找到 12 个相关文件", en: "Completed codebase exploration, found 12 relevant files" },
  "agentTools.browser.calling": { zh: "正在验证 UI...", en: "Verifying UI..." },
  "agentTools.browser.summary": { zh: "UI 验证完成，截图已保存", en: "UI verification complete, screenshot saved" },
  "agentTools.subop.grep": { zh: "在 src/ 中搜索 useAuth", en: "Search for useAuth in src/" },
  "agentTools.subop.glob": { zh: "查找 *.tsx 文件", en: "Find *.tsx files" },
  "agentTools.subop.read": { zh: "读取 App.tsx", en: "Read App.tsx" },
  "agentTools.subop.semantic": { zh: "搜索认证相关代码", en: "Search for authentication-related code" },
  "agentTools.subop.navigate": { zh: "打开 localhost:5173", en: "Open localhost:5173" },
  "agentTools.subop.snapshot": { zh: "获取页面结构", en: "Get page structure" },
  "agentTools.subop.screenshot": { zh: "截取页面截图", en: "Take page screenshot" },

  // ── StreamingDemo ─────────────────────────────────────────────────────────
  "streaming.statecard": {
    zh: "3 种流式类型 — 展开查看完整定义",
    en: "3 streaming types — click to expand",
  },
  "streaming.text.subtitle": { zh: "纯文本逐字输出，带闪烁光标", en: "Plain text streamed character by character, with blinking cursor" },
  "streaming.code.subtitle": { zh: "代码块逐行输出，带语法高亮", en: "Code block streamed line by line, with syntax highlighting" },
  "streaming.markdown.subtitle": { zh: "Markdown 逐步渲染，标题 / 列表 / 行内代码", en: "Markdown rendered progressively: headings, lists, inline code" },
  "streaming.pause.subtitle": { zh: "流式中途暂停等待工具结果，恢复后继续", en: "Stream paused mid-way to await tool results, then resumed" },
  "streaming.plain.content": {
    zh: `好的，我来帮你创建一个 TodoList 页面。\n\n我已经查看了项目结构，接下来会：\n\n1. 创建 \`TodoList\` 组件\n2. 添加状态管理逻辑\n3. 更新路由配置`,
    en: `Sure, I'll help you create a TodoList page.\n\nI've reviewed the project structure. Here's what I'll do:\n\n1. Create a \`TodoList\` component\n2. Add state management logic\n3. Update the routing config`,
  },
  "streaming.markdown.content": {
    zh: `## 实现计划\n\n我将创建以下文件：\n\n- \`src/components/TodoList.tsx\` — 主组件\n- \`src/hooks/useTodos.ts\` — 状态管理\n\n> 这个实现使用 \`localStorage\` 持久化数据。`,
    en: `## Implementation Plan\n\nI'll create the following files:\n\n- \`src/components/TodoList.tsx\` — main component\n- \`src/hooks/useTodos.ts\` — state management\n\n> This implementation uses \`localStorage\` to persist data.`,
  },
  "streaming.pause.before": {
    zh: "好的，我来读取 App.tsx 的内容。",
    en: "Sure, let me read the contents of App.tsx.",
  },
  "streaming.pause.waiting": { zh: "等待 Read 工具结果...", en: "Waiting for Read tool result..." },
  "streaming.pause.after": {
    zh: "我已经读取了文件内容，接下来我会创建 TodoList 组件并更新路由。",
    en: "I've read the file contents. Next I'll create the TodoList component and update the routing.",
  },
  "streaming.replay": { zh: "Replay", en: "Replay" },

  // ── StreamingDemo — markdown segments ─────────────────────────────────────
  "streaming.md.h1": { zh: "分析结果", en: "Analysis Results" },
  "streaming.md.intro": {
    zh: "项目使用 React + TypeScript + Tailwind CSS，已配置 Shadcn/UI 组件库。以下是建议的文件结构：",
    en: "The project uses React + TypeScript + Tailwind CSS with Shadcn/UI configured. Here's the suggested file structure:",
  },
  "streaming.md.col.file": { zh: "文件", en: "File" },
  "streaming.md.col.desc": { zh: "说明", en: "Description" },
  "streaming.md.col.status": { zh: "状态", en: "Status" },
  "streaming.md.row1.desc": { zh: "主组件", en: "Main component" },
  "streaming.md.row2.desc": { zh: "列表项组件", en: "List item component" },
  "streaming.md.row3.desc": { zh: "状态管理 Hook", en: "State management hook" },
  "streaming.md.row4.desc": { zh: "路由入口", en: "App entry / routing" },
  "streaming.md.status.create": { zh: "待创建", en: "to create" },
  "streaming.md.status.modify": { zh: "需修改", en: "to modify" },
  "streaming.md.h2": { zh: "执行计划", en: "Execution Plan" },
  "streaming.md.step1": { zh: "先创建 `useTodos` hook 处理增删改查", en: "Create `useTodos` hook to handle CRUD" },
  "streaming.md.step2": { zh: "再创建 `TodoItem` 单项组件", en: "Create `TodoItem` component" },
  "streaming.md.step3": { zh: "最后组装 `TodoList` 并更新路由", en: "Assemble `TodoList` and update routing" },

  // ── StreamingDemo — pause phases ──────────────────────────────────────────
  "streaming.pause.text1": { zh: "让我先看看项目结构", en: "Let me check the project structure" },
  "streaming.pause.text2": { zh: "。找到了 12 个组件文件。现在读取入口文件", en: ". Found 12 component files. Now reading the entry file" },
  "streaming.pause.text3": { zh: "。好的，我已经理解了项目结构，现在开始创建 TodoList 组件。", en: ". Got it — I now understand the project structure. Starting to create the TodoList component." },

  // ── StreamingDemo — section labels ────────────────────────────────────────
  "streaming.section.text": { zh: "stream_text", en: "stream_text" },
  "streaming.section.code": { zh: "stream_code_block", en: "stream_code_block" },
  "streaming.section.markdown": { zh: "stream_markdown", en: "stream_markdown" },
  "streaming.section.pause": { zh: "stream_paused → stream_resumed", en: "stream_paused → stream_resumed" },

  // ── CodeChangeDemo ────────────────────────────────────────────────────────
  "codeChange.statecard": {
    zh: "3 types · 7 states — 展开查看完整定义",
    en: "3 types · 7 states — click to expand",
  },
  "codeChange.segment.pending.description": { zh: "等待用户审核变更", en: "Awaiting user review" },
  "codeChange.segment.accepted.description": { zh: "用户已接受变更", en: "Changes accepted" },
  "codeChange.segment.rejected.description": { zh: "用户已拒绝变更", en: "Changes rejected" },

  // ── CodeChangeOverview ────────────────────────────────────────────────────
  "codeChangeOverview.intro": {
    zh: "Agent 创建或编辑文件时，Cursor 展示 Diff 视图供用户审核。使用顶部的状态切换器查看 pending / accepted / rejected 不同阶段。",
    en: "When the Agent creates or edits files, Cursor shows a Diff view for review. Use the state switcher above to see the pending / accepted / rejected stages.",
  },
  "codeChangeOverview.cat.create": { zh: "创建", en: "Create" },
  "codeChangeOverview.cat.create.scenario": { zh: "Write — 创建新文件", en: "Write — create new file" },
  "codeChangeOverview.cat.edit": { zh: "编辑", en: "Edit" },
  "codeChangeOverview.cat.edit.scenario": { zh: "StrReplace — 编辑现有文件 Diff 视图", en: "StrReplace — edit existing file with Diff view" },
  "codeChangeOverview.cat.multi": { zh: "批量", en: "Batch" },
  "codeChangeOverview.cat.multi.scenario": { zh: "批量变更 — 多文件同时修改", en: "Batch — modify multiple files at once" },
  "codeChangeOverview.state.file_creating": { zh: "正在创建新文件", en: "Creating a new file" },
  "codeChangeOverview.state.file_created": { zh: "新文件已创建", en: "New file created" },
  "codeChangeOverview.state.file_editing": { zh: "正在编辑现有文件", en: "Editing an existing file" },
  "codeChangeOverview.state.diff_shown": { zh: "Diff 视图已展示", en: "Diff view displayed" },
  "codeChangeOverview.state.diff_pending": { zh: "等待用户审核", en: "Awaiting user review" },
  "codeChangeOverview.state.diff_accepted": { zh: "用户接受了变更", en: "User accepted changes" },
  "codeChangeOverview.state.diff_rejected": { zh: "用户拒绝了变更", en: "User rejected changes" },

  // ── FileCreateDemo ────────────────────────────────────────────────────────
  "fileCreate.title": { zh: "file_creating → file_created — Agent 创建新文件", en: "file_creating → file_created — Agent creates a new file" },
  "fileCreate.badge": { zh: "新文件", en: "new file" },

  // ── FileEditDemo ──────────────────────────────────────────────────────────
  "fileEdit.title": { zh: "file_editing → diff_shown → diff_pending — 编辑现有文件", en: "file_editing → diff_shown → diff_pending — editing an existing file" },
  "fileEdit.badge": { zh: "已修改", en: "modified" },

  // ── MultiFileDemo ─────────────────────────────────────────────────────────
  "multiFile.title": { zh: "多文件批量变更 — 点击展开查看 Diff 预览", en: "Multi-file batch changes — click to expand diff preview" },
  "multiFile.badge.new": { zh: "new", en: "new" },
  "multiFile.badge.modified": { zh: "modified", en: "modified" },
  "multiFile.allAccepted": { zh: "All Accepted", en: "All Accepted" },
  "multiFile.allRejected": { zh: "All Rejected", en: "All Rejected" },

  // ── VerificationDemo ──────────────────────────────────────────────────────
  "verify.lint.selfCorrecting": { zh: "Self-correcting...", en: "Self-correcting..." },

  // ── UserDecisionDemo ──────────────────────────────────────────────────────
  "userDecision.statecard": {
    zh: "4 types · 7 states — 展开查看完整定义",
    en: "4 types · 7 states — click to expand",
  },
  "userDecision.segment.awaiting.description": { zh: "等待用户做出决策", en: "Awaiting user decision" },
  "userDecision.segment.approved.description": { zh: "用户已批准操作", en: "Operation approved" },
  "userDecision.segment.rejected.description": { zh: "用户已拒绝操作", en: "Operation rejected" },

  // ── DecisionOverview ──────────────────────────────────────────────────────
  "decisionOverview.intro": {
    zh: "Agent 在需要用户介入时展示以下交互类型。使用顶部的状态切换器查看 awaiting / approved / rejected 不同阶段。",
    en: "The Agent shows the following interaction types when user input is needed. Use the state switcher above to see awaiting / approved / rejected stages.",
  },
  "decisionOverview.cat.choice": { zh: "选择", en: "Choice" },
  "decisionOverview.cat.choice.scenario": { zh: "AskQuestion — 单选 / 多选", en: "AskQuestion — single / multi-select" },
  "decisionOverview.cat.confirmation": { zh: "确认", en: "Confirmation" },
  "decisionOverview.cat.confirmation.scenario": { zh: "Confirm — 危险操作前请求确认", en: "Confirm — request confirmation before risky operation" },
  "decisionOverview.cat.permission": { zh: "授权", en: "Permission" },
  "decisionOverview.cat.permission.scenario": { zh: "Permission — 文件 / 工具访问授权", en: "Permission — grant file / tool access" },
  "decisionOverview.cat.fileReview": { zh: "审核", en: "Review" },
  "decisionOverview.cat.fileReview.scenario": { zh: "FileReview — 代码变更审核", en: "FileReview — review code changes" },
  "decisionOverview.cat.choice.scenario2": { zh: "AskQuestion — 单选 / 多选方案", en: "AskQuestion — single / multi-select" },
  "decisionOverview.cat.confirmation.scenario2": { zh: "SwitchMode — 模式切换确认", en: "SwitchMode — confirm mode switch" },
  "decisionOverview.cat.permission.scenario2": { zh: "Shell — 危险命令授权", en: "Shell — authorize dangerous command" },
  "decisionOverview.cat.fileReview.scenario2": { zh: "StrReplace / Write — 代码变更审核", en: "StrReplace / Write — code change review" },
  "decisionOverview.state.awaiting_choice": { zh: "等待用户在多个选项中做出选择", en: "Awaiting user selection from options" },
  "decisionOverview.state.awaiting_confirmation": { zh: "等待用户确认操作（如模式切换）", en: "Awaiting user confirmation (e.g. mode switch)" },
  "decisionOverview.state.awaiting_file_review": { zh: "等待用户审核文件变更", en: "Awaiting user review of file changes" },
  "decisionOverview.state.awaiting_permission": { zh: "等待用户授权（如终端命令执行）", en: "Awaiting user permission (e.g. terminal command)" },
  "decisionOverview.state.user_approved": { zh: "用户批准了操作", en: "User approved the operation" },
  "decisionOverview.state.user_rejected": { zh: "用户拒绝了操作", en: "User rejected the operation" },
  "decisionOverview.state.user_edited": { zh: "用户手动编辑了 Agent 的输出", en: "User manually edited the Agent's output" },
  "decisionOverview.state.decision_approved": { zh: "用户已批准", en: "User approved" },
  "decisionOverview.state.decision_rejected": { zh: "用户已拒绝", en: "User rejected" },

  // ── ChoiceDemo ────────────────────────────────────────────────────────────
  "choice.subtitle": { zh: "awaiting_choice — Agent 向用户提问，等待选择", en: "awaiting_choice — Agent asks the user a question, awaiting choice" },
  "choice.question": { zh: "你希望使用哪种状态管理方案？", en: "Which state management solution would you like to use?" },
  "choice.option.useState.desc": { zh: "轻量级，适合简单场景", en: "Lightweight, suitable for simple use cases" },
  "choice.option.zustand.desc": { zh: "简洁的全局状态管理", en: "Clean global state management" },
  "choice.option.redux.desc": { zh: "完整的状态管理生态", en: "Full-featured state management ecosystem" },
  "choice.option.zustand": { zh: "轻量级，适合中小项目", en: "Lightweight, suitable for small to medium projects" },
  "choice.option.redux": { zh: "全局状态，适合大型应用", en: "Global state, suitable for large applications" },
  "choice.option.context": { zh: "原生方案，无额外依赖", en: "Native solution, no extra dependencies" },
  "choice.approved.message": {
    zh: '用户选择了 <strong>Zustand</strong>，Agent 将使用该方案继续执行',
    en: 'User selected <strong>Zustand</strong>; Agent will proceed with this choice',
  },
  "choice.rejected.message": { zh: "用户跳过了选择，Agent 将使用默认方案", en: "User skipped the choice; Agent will use the default solution" },
  "choice.title": { zh: "awaiting_choice — Agent 向用户提问，等待选择", en: "awaiting_choice — Agent asks the user a question, awaiting choice" },

  // ── ConfirmationDemo ──────────────────────────────────────────────────────
  "confirm.subtitle": { zh: "awaiting_confirmation — Agent 请求确认操作", en: "awaiting_confirmation — Agent requests operation confirmation" },
  "confirm.title": { zh: "awaiting_confirmation — 危险操作请求确认", en: "awaiting_confirmation — dangerous operation requires confirmation" },
  "confirm.cardSubtitle": { zh: "这个任务有多种实现方案，建议先讨论再动手。", en: "This task has multiple approaches. It's best to discuss before proceeding." },
  "confirm.message": { zh: "这将删除 node_modules/ 目录并重新安装依赖。此操作不可撤销。", en: "This will delete the node_modules/ directory and reinstall dependencies. This action cannot be undone." },
  "confirm.approved.message": { zh: "已切换到 Plan 模式", en: "Switched to Plan mode" },
  "confirm.rejected.message": { zh: "用户拒绝切换，继续在 Agent 模式下执行", en: "User declined; continuing in Agent mode" },

  // ── PermissionDemo ────────────────────────────────────────────────────────
  "permission.subtitle": { zh: "awaiting_permission — Agent 请求执行需要授权的操作", en: "awaiting_permission — Agent requests permission for a restricted operation" },
  "permission.title": { zh: "awaiting_permission — 请求文件系统访问授权", en: "awaiting_permission — requesting file system access permission" },
  "permission.cardSubtitle": { zh: "Agent 请求执行以下命令，需要你的授权。", en: "The Agent is requesting permission to run the following command." },
  "permission.message": { zh: "Agent 需要访问 ~/.ssh/ 目录以读取 SSH 配置文件。", en: "The Agent needs to access the ~/.ssh/ directory to read SSH config files." },
  "permission.approved.message": { zh: "已授权执行", en: "Permission granted" },
  "permission.rejected.message": { zh: "用户拒绝授权，命令未执行", en: "Permission denied; command not executed" },
  "permission.hint": { zh: "此命令将删除 node_modules 并重新安装依赖", en: "This will delete node_modules and reinstall dependencies" },

  // ── FileReviewDemo ─────────────────────────────────────────────────────────
  "fileReview.subtitle": { zh: "awaiting_file_review — 等待用户审核代码变更", en: "awaiting_file_review — awaiting user code review" },
  "fileReview.title": { zh: "diff_pending — 代码变更等待用户审核", en: "diff_pending — code changes awaiting user review" },
  "fileReview.cardSubtitle": { zh: "Agent 修改了此文件，等待审核", en: "The Agent modified this file; awaiting your review" },
  "fileReview.approved.message": { zh: "变更已接受，文件已保存", en: "Changes accepted; file saved" },
  "fileReview.rejected.message": { zh: "变更已拒绝，文件已回退", en: "Changes rejected; file reverted" },

  // ── CompletionDemo ────────────────────────────────────────────────────────
  "completion.idle.waiting": { zh: "等待用户输入新消息...", en: "Waiting for user input..." },
  "completion.followup.1": { zh: "添加删除功能", en: "Add delete feature" },
  "completion.followup.2": { zh: "添加本地存储", en: "Add local storage" },
  "completion.followup.3": { zh: "优化移动端适配", en: "Optimize mobile layout" },
} satisfies TranslationMap

export type TranslationKey = keyof typeof TRANSLATIONS
