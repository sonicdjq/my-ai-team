# Team Memory: Lessons & Patterns

## 2026-03-08 - 第一轮：前端测试修复

### 前端测试修复
- 创建 Context 时必须确保正确导出，否则会导致测试文件无法导入使用
- 测试环境需要 Mock Provider，应该使用真正的 Context 而不是创建新的 Context
- Material-UI 版本升级时需要检查 API 变化，如 Grid 组件的 item 属性和 Button 组件的 edge 属性在新版本中已被移除
- 移动代码后需要同步更新所有引用路径
- 组件应该假设 Context 总是可用，由 Provider 保证，避免在组件中添加测试相关代码

### Jest 测试配置
- 后端测试使用动态端口 (端口 0) 避免端口冲突
- 前端测试配置 moduleNameMapper 指向正确的 node_modules 路径解决 React 版本冲突
- 添加 forceExit: true 确保 Jest 测试后正常退出
- setupFiles 用于添加全局 polyfill（如 TextEncoder/TextDecoder）

### TDD 测试原则
- 测试用例应先于产品代码编写
- 测试失败时应判断是产品代码问题还是测试用例问题
- 产品代码问题应生成修改建议文档给 Developer
- 测试断言应基于组件实际渲染的文本，而非假设

### 测试文件结构
- test-utils.tsx: 集中管理 Mock Provider
- test-helper.js: 集中管理后端测试服务器
- 前端测试使用 MockAppProvider 包装组件
- 后端测试使用 test-helper 管理服务器生命周期

## 2026-03-08 - 第二轮：Prototype 功能补全

### Dashboard 按钮功能实现
- 使用 useNavigate hook 实现页面导航
- 按钮点击事件应该绑定到独立的处理函数上
- 导航路径应与路由配置一致（/transaction, /report, /account）

### 编辑功能实现模式
- 使用 Dialog 组件实现编辑弹窗
- 状态管理：editingItem, editDialogOpen, 各字段的独立 state
- 实现 handleEdit（打开弹窗）、handleSaveEdit（保存）、handleCloseEdit（关闭）三个函数
- 使用 updateXxx 函数更新 Context 中的数据
- Dialog 中的 TextField 需要正确的 label 属性以便测试定位

### 报表图表实现
- 安装 chart.js 和 react-chartjs-2
- 使用 useMemo 优化图表数据计算
- Pie 组件用于支出分析（按分类饼图）
- Bar 组件用于收支对比（柱状图）
- 实现 CSV 导出功能：将数据转换为 CSV 格式，创建 Blob 和下载链接

### Canvas 测试问题
- jsdom 不支持 canvas.getContext 方法
- 解决方案 1：安装 jest-canvas-mock 并配置
- 解决方案 2：在测试中 mock Chart.js 组件
- 这是测试环境问题，不影响产品代码正确性

### Vite 配置问题
- index.html 中的 script 路径应使用相对路径（./main.tsx）
- 添加 base: './' 配置到 vite.config.ts
- 避免使用绝对路径（/src/main.tsx）导致加载失败

### Context 状态更新最佳实践
- 使用函数式状态更新（prevXxx）确保使用最新状态
- deleteTransaction 等函数中恢复账户余额时必须使用 prevAccounts
- 避免使用旧状态导致数据不一致

### 测试调试技巧
- Dialog 打开后的元素定位需要增加等待时间或使用 findBy
- 使用 dialog.querySelectorAll('input') 获取表单元素
- 增加 timeout 选项：waitFor(..., { timeout: 5000 })

## 完整工作流程总结

### 1. 问题识别
- 阅读 Final_Verification_Report.md 了解未实现功能
- 阅读 Test_Supplement_Report.md 了解测试失败原因
- 区分产品代码问题和测试环境问题

### 2. 产品代码实现
- Dashboard 按钮：添加 onClick 事件和 useNavigate
- 编辑功能：Dialog + 状态管理 + update 函数
- 图表可视化：Chart.js + useMemo 优化
- 导出功能：CSV 格式 + Blob 下载

### 3. 测试问题处理
- 产品代码问题：直接修复
- 测试环境问题：输出修改建议文档给 Tester
- 保持 tests/目录不变（Developer 规则）

### 4. 验证流程
- 前端测试：npm run test:frontend
- 后端测试：npm run test:backend
- 手动验证：启动服务检查功能

### 5. 文档输出
- 产品代码修改建议：Product_Code_Fixes_Required.md
- 测试修改建议：Test_Case_Modification_Suggestions.md
- 测试修复建议：Test_Fix_Suggestions_Round2.md
- Lesson Learned：更新到 team memory

## 通用经验教训

### 1. 前端开发最佳实践
- **组件设计**：功能单一，职责清晰，避免过度耦合
- **状态管理**：使用 Context API 管理全局状态，函数式更新确保数据一致性
- **路由导航**：使用 useNavigate hook 实现页面跳转，保持路径配置一致
- **表单处理**：使用受控组件，添加适当的验证和错误提示
- **性能优化**：使用 useMemo 缓存计算结果，useCallback 缓存函数

### 2. 测试策略
- **分层测试**：从 UI 渲染到功能完整性的递进测试
- **Mock 策略**：合理使用 Mock 避免外部依赖，保持测试稳定
- **测试环境**：处理环境差异（如 Canvas 支持），提供多种解决方案
- **测试调试**：掌握等待策略、元素定位和错误分析技巧

### 3. 项目管理
- **文档驱动**：基于 PRD 和架构文档进行开发
- **问题跟踪**：区分产品代码问题和测试环境问题，分类处理
- **版本管理**：注意依赖版本兼容性，记录版本升级的 API 变化
- **工作流程**：建立标准化的开发-测试-验证-文档流程

### 4. 技术选型
- **库选择**：选择成熟、维护活跃的库（如 Chart.js）
- **构建工具**：理解 Vite 配置，避免路径和构建问题
- **测试框架**：掌握 Jest + React Testing Library 的使用技巧
- **UI 库**：了解 Material-UI 的版本变化和最佳实践

### 5. 团队协作
- **角色分工**：明确 Developer 和 Tester 的职责边界
- **沟通机制**：通过标准化文档传递信息和建议
- **知识共享**：定期更新团队经验教训，避免重复踩坑
- **持续改进**：定期回顾和优化开发流程和工具链
