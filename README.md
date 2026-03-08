# 家庭财务管家 App

一款简洁实用的家庭财务管理 Web 应用，帮助您轻松记录收支、管理账户、分析财务状况。

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-green)
![Status](https://img.shields.io/badge/Status-PASS-green)

## 功能特性

### 核心功能
- 📊 **仪表盘** - 实时查看财务概览、总余额、收入支出统计
- 💳 **交易管理** - 记录收入/支出，支持添加、编辑、删除交易
- 🏷️ **分类管理** - 预设分类（餐饮、交通、购物、工资等），支持自定义分类
- 💰 **账户管理** - 管理多个账户，支持账户间转账
- 📈 **报表分析** - 可视化图表展示支出分布、收支对比
- 📥 **数据导出** - 支持导出报表为 CSV 格式

### 技术栈
- **前端**: React 18 + TypeScript
- **UI 框架**: Material-UI (MUI)
- **图表**: Chart.js + react-chartjs-2
- **后端**: Express.js
- **数据库**: SQLite
- **路由**: React Router v6

## 项目结构

```
src/
├── backend/                 # Express 后端服务
│   ├── server.js           # API 服务入口
│   ├── database.js         # SQLite 数据库配置
│   └── finance.db          # 数据库文件
│
├── frontend/               # React 前端应用
│   ├── components/         # UI 组件
│   │   ├── account/        # 账户相关组件
│   │   ├── category/       # 分类相关组件
│   │   ├── report/         # 报表相关组件
│   │   └── transaction/    # 交易相关组件
│   ├── contexts/           # React Context 状态管理
│   ├── pages/              # 页面组件
│   └── ...
│
└── tests/                  # 测试文件
```

## 快速开始

### 环境要求
- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装步骤

1. **克隆项目**
   ```bash
   cd my-ai-team
   ```

2. **安装后端依赖**
   ```bash
   cd src/backend
   npm install
   ```

3. **安装前端依赖**
   ```bash
   cd src/frontend
   npm install
   ```

### 启动应用

1. **启动后端服务** (终端 1)
   ```bash
   cd src/backend
   node server.js
   ```
   服务将在 http://localhost:3001 运行

2. **启动前端服务** (终端 2)
   ```bash
   cd src/frontend
   npm run dev
   ```
   应用将在 http://localhost:5173 运行

3. **打开浏览器访问**
   ```
   http://localhost:5173
   ```

## 使用指南

### 1. 添加账户
进入「账户管理」页面，点击「添加账户」，填写账户名称和初始余额。

### 2. 记录交易
进入「交易管理」页面，点击「添加交易」，选择类型（收入/支出）、输入金额、选择分类和账户。

### 3. 查看报表
进入「报表分析」页面，可查看：
- 支出分析（饼图）
- 收入分析
- 收支对比（柱状图）

### 4. 导出数据
在报表页面点击「导出报表」按钮，可将数据导出为 CSV 文件。

## API 接口

| 端点 | 方法 | 功能 |
|------|------|------|
| `/api/accounts` | GET | 获取账户列表 |
| `/api/accounts` | POST | 创建账户 |
| `/api/categories` | GET | 获取分类列表 |
| `/api/categories` | POST | 创建分类 |
| `/api/transactions` | GET | 获取交易列表 |
| `/api/transactions` | POST | 创建交易 |
| `/api/transactions/:id` | PUT | 更新交易 |
| `/api/transactions/:id` | DELETE | 删除交易 |

## 开发说明

### 运行测试
```bash
# 后端测试
cd tests/backend
npm test

# 前端测试
cd tests/frontend
npm test
```

### 构建生产版本
```bash
cd src/frontend
npm run build
```

## 后续规划

- [ ] 预算管理功能
- [ ] 多账本支持
- [ ] 用户认证系统
- [ ] 数据导入/导出
- [ ] 移动端适配优化

## 文档

- [产品需求文档](./docs/01-PRD/PRD.md)
- [UI/UX 设计规范](./docs/01-PRD/UI_UX_SPEC.md)
- [架构设计文档](./docs/02-Arch/PROTOTYPE_ARCHITECTURE.md)
- [最终验证报告](./docs/03-Handover/Final_Verification_Report.md)

## 许可证

MIT License
