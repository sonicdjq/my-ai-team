# 🚀 AI 团队操作手册 (SOP v5.0)

本手册定义了如何通过 8 个阶段驱动这支半自动 AI 团队。请在不同的 Session 中切换角色，并使用对应的 Prompt 来推进项目。

---

## 🏗️ 阶段 1: 需求挖掘 (PO)
**目标：** 将原始创意转化为结构化的需求文档。
- **Session 角色:** Product Owner (PO)
- **指令:** > "@PO.md 我想开发 [项目名称/创意]。核心功能包括：[功能点列表]。请分析需求，参考 `.ai-team/memory/` 中的历史模式，并在 `docs/01-PRD/PRD.md` 中输出需求文档。"
- **准出条件:** 用户评审并批准 PRD。

---

## 🎨 阶段 2: 交互与视觉设计 (UX)
**目标：** 定义用户路径和界面规范。
- **Session 角色:** UX/UI Designer
- **指令:** > "@UX.md @PRD.md 基于已批准的需求，设计用户流程（User Flow）和 UI 规范。如果使用 [Streamlit/PySide/Web]，请明确组件布局和交互细节。输出到 `docs/01-PRD/UI_UX_SPEC.md`。"
- **准出条件:** 用户评审并批准 UI/UX 规范。

---

## 📐 阶段 3: 系统架构 (Architect)
**目标：** 制定技术方案和开发路线图。
- **Session 角色:** Architect
- **指令:** > "@Architect.md @PRD.md @UI_UX_SPEC.md 需求和设计已就绪。请设计模块化架构并制定详细的开发计划。输出到 `docs/02-Arch/ARCHITECTURE.md` 和 `docs/03-Handover/Implementation_Plan.md`。"
- **准出条件:** 用户评审并批准架构设计。

---

## 🧪 阶段 4: 测试用例生成 (Tester)
**目标：** 编写 TDD 失败测试用例。
- **Session 角色:** Tester
- **指令:** > "@Tester.md @PRD.md @ARCHITECTURE.md @UI_UX_SPEC.md 根据设计方案，在 `tests/` 文件夹中编写自动化测试脚本。确保覆盖核心逻辑和 UI 交互，目标覆盖率 90%。通知我测试用例何时准备好。"
- **准出条件:** `tests/` 文件夹中生成了针对当前需求的失败测试脚本。

---

## 🔍 阶段 5: 测试审计 (Architect Review)
**目标：** 在编码前确保测试用例的严谨性。
- **Session 角色:** Architect
- **指令:** > "@Architect.md @tests/ @PRD.md 评审 Tester 编写的测试用例。它们是否完整覆盖了架构设计和业务需求？请在 `docs/03-Handover/Review_Comments.md` 中记录意见或给予 'PASS'。"
- **准出条件:** 获得 Architect 的 "PASS"；若未通过则由 Tester 修复。

---

## 💻 阶段 6: 功能实现 (Developer)
**目标：** 使用 TDD 模式完成代码编写。
- **Session 角色:** Developer
- **指令:** > "@Developer.md @tests/ @PRD.md @ARCHITECTURE.md @UI_UX_SPEC.md 开始在 `src/` 中编写代码。严格遵循 TDD：实现逻辑以通过现有测试，并确保符合 Clean Code 原则和架构规范。"
- **准出条件:** `src/` 代码完成，且通过 `tests/` 中的所有测试。

---

## 🛠️ 阶段 7: 代码审计 (Architect Review)
**目标：** 确保代码质量和架构一致性。
- **Session 角色:** Architect
- **指令:** > "@Architect.md @src/ @tests/ 进行最终代码评审。检查 SOLID 原则、命名规范和架构一致性。在 `docs/03-Handover/Review_Comments.md` 中记录评审意见。"
- **准出条件:** 获得 Architect 的 "PASS"；若未通过则由 Developer 重构。

---

## ✅ 阶段 8: 最终验收 (Verification)
**目标：** 基于 PRD 和 UI 规范进行端到端闭环验证。
- **Session 角色:** Verification
- **指令:** > "@Verification.md @PRD.md @UI_UX_SPEC.md @src/ 进行最终的“黑盒”验收测试。验证最终产品是否满足 PRD 中的所有要求和 UI 规范。生成 `docs/03-Handover/Final_Verification_Report.md`。"
- **准出条件:** 最终报告状态为 "PASS" 且用户最终签字确认。

---

## 💡 关键操作贴士
1. **角色引用:** 开启任何新 Session 时，第一句话必须带上 `@Role.md` 以激活角色的 System Prompt。
2. **上下文引用:** 审计或开发时，务必使用 `@` 引用相关文件夹（如 `@src`, `@tests`, `@docs`），否则 AI 无法感知文件内容。
3. **经验固化:** 如果解决了一个棘手的 Bug，记得命令 Developer：“将此问题的解决方案总结到 `.ai-team/memory/lessons_learned.md` 中。”
4. **状态同步:** 每次关闭 Session 前，务必确认 AI 已更新 `docs/STATUS.md`。

---
**团队已就绪，开始你的项目吧！🚀**