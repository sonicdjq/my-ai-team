# 测试用例修改建议

**日期:** 2026-03-08
**问题类型:** 测试用例与产品代码不匹配

---

## 概述

已完成产品代码的图表可视化功能实现（使用Chart.js），但测试用例是基于旧的静态UI编写的，需要更新测试用例以匹配新的图表UI。

---

## 需要修改的测试用例

### 1. report.test.tsx - ExpenseReport组件

| 测试用例 | 当前断言 | 问题 | 建议修改 |
|---------|---------|------|---------|
| should display expense report placeholder | 期望文本: `支出报表功能` | 旧静态UI已替换为图表 | 修改为: `expect(screen.getByText('支出报表')).toBeInTheDocument()` |
| should display expense chart | 期望文本: `支出图表` | 旧静态UI已替换为图表 | 修改为: `expect(screen.getByRole('img')).toBeInTheDocument()` 或检查canvas元素 |

### 2. report.test.tsx - IncomeExpenseReport组件

| 测试用例 | 当前断言 | 问题 | 建议修改 |
|---------|---------|------|---------|
| should display income-expense report placeholder | 期望文本: `收支报表功能` | 旧静态UI已替换为图表 | 修改为: `expect(screen.getByText('收支报表')).toBeInTheDocument()` |
| should display income-expense chart | 期望文本: `收支图表` | 旧静态UI已替换为图表 | 修改为: `expect(screen.getByRole('img')).toBeInTheDocument()` 或检查canvas元素 |

---

## 具体修改建议

### 修改1: ExpenseReport组件测试

**文件:** `tests/frontend/report.test.tsx`

```typescript
// 当前代码（第58-67行）
test('should display expense report placeholder', async () => {
  render(
    <MockAppProvider>
      <ExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('支出报表功能')).toBeInTheDocument();
  });
});

// 修改为
test('should display expense report with chart', async () => {
  render(
    <MockAppProvider>
      <ExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('支出报表')).toBeInTheDocument();
    expect(screen.getByText('总支出:')).toBeInTheDocument();
  });
});
```

```typescript
// 当前代码（第82-91行）
test('should display expense chart', async () => {
  render(
    <MockAppProvider>
      <ExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('支出图表')).toBeInTheDocument();
  });
});

// 修改为
test('should display expense chart', async () => {
  render(
    <MockAppProvider>
      <ExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    // 检查图表是否渲染（canvas元素）
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
```

### 修改2: IncomeExpenseReport组件测试

**文件:** `tests/frontend/report.test.tsx`

```typescript
// 当前代码（第129-138行）
test('should display income-expense report placeholder', async () => {
  render(
    <MockAppProvider>
      <IncomeExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('收支报表功能')).toBeInTheDocument();
  });
});

// 修改为
test('should display income-expense report with chart', async () => {
  render(
    <MockAppProvider>
      <IncomeExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('收支报表')).toBeInTheDocument();
    expect(screen.getByText('总收入')).toBeInTheDocument();
    expect(screen.getByText('总支出')).toBeInTheDocument();
  });
});
```

```typescript
// 当前代码（第153-162行）
test('should display income-expense chart', async () => {
  render(
    <MockAppProvider>
      <IncomeExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('收支图表')).toBeInTheDocument();
  });
});

// 修改为
test('should display income-expense chart', async () => {
  render(
    <MockAppProvider>
      <IncomeExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    // 检查图表是否渲染（canvas元素）
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
```

---

## 图表测试的最佳实践

### 检查Chart.js图表是否渲染

```typescript
// 方法1: 检查canvas元素
test('should render chart', async () => {
  render(
    <MockAppProvider>
      <ExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});

// 方法2: 使用getByRole检查img
test('should render chart', async () => {
  render(
    <MockAppProvider>
      <ExpenseReport />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    // Chart.js渲染的canvas具有role="img"
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
```

---

## 总结

| 测试套件 | 需要修改的测试数量 | 原因 |
|---------|-----------------|------|
| report.test.tsx | 4个 | 图表UI替换了静态文本 |

这些修改完成后，所有测试用例应该能够通过，产品代码的图表可视化功能也得到了验证。

---

**备注:** 由于我无法直接修改测试文件（根据Developer.md规则），请Tester根据以上建议更新测试用例。
