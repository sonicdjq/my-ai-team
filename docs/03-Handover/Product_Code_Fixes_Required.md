# 产品代码修改建议

**日期:** 2026-03-08
**问题类型:** TypeScript编译错误

---

## 问题1: CategoryList.tsx - updateCategory未定义

**文件:** `src/frontend/components/category/CategoryList.tsx`

**错误:**
```
Property 'updateCategory' does not exist on type 'AppContextType'.
```

**当前代码 (第6行):**
```typescript
const { categories, deleteCategory, updateCategory } = useAppContext();
```

**修改建议:**
从 `useAppContext()` 中移除 `updateCategory`，或确保 `AppContext` 提供了该函数。

---

## 问题2: CategoryList.tsx - ExpandMoreIcon未导入

**文件:** `src/frontend/components/category/CategoryList.tsx`

**错误:**
```
Cannot find name 'ExpandMoreIcon'.
```

**当前代码 (第66行和97行):**
```typescript
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
```

**修改建议:**
在文件顶部添加导入:
```typescript
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
```

---

## 问题3: TransactionList.tsx - updateTransaction未定义

**文件:** `src/frontend/components/transaction/TransactionList.tsx`

**错误:**
```
Property 'updateTransaction' does not exist on type 'AppContextType'.
```

**当前代码 (第6行):**
```typescript
const { transactions, categories, accounts, deleteTransaction, updateTransaction } = useAppContext();
```

**修改建议:**
从 `useAppContext()` 中移除 `updateTransaction`，或确保 `AppContext` 提供了该函数。

---

## 根本原因

这些问题是由于组件尝试使用编辑功能，但AppContext没有提供这些更新函数。这是Final_Verification_Report.md中提到的"编辑功能未实现"的问题。

**两种解决方案:**

1. **移除编辑功能使用** (快速修复):
   - 从组件中移除对 `updateTransaction` 和 `updateCategory` 的使用
   - 这意味着编辑功能按钮将不起作用

2. **实现编辑功能** (完整修复):
   - 在 `AppContext.tsx` 中添加 `updateTransaction` 和 `updateCategory` 函数
   - 在 `AppProvider` 中实现这些函数的具体逻辑

---

## 影响范围

| 组件 | 影响功能 |
|------|---------|
| TransactionList | 编辑交易 |
| CategoryList | 编辑分类 |

这些是Prototype阶段已知的"未实现功能"，属于预期范围内的技术债务。
