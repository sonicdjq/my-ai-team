# 测试问题修复建议 - 第二轮

**日期:** 2026-03-08
**问题类型:** 测试环境配置问题

---

## 概述

经过产品代码实现后，所有功能已正确实现。测试失败的原因如下：

1. **图表测试** - jsdom不支持canvas.getContext
2. **编辑功能测试** - Dialog打开后找不到label

---

## 问题1: 图表测试失败 (report.test.tsx)

### 错误信息
```
Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)
```

### 原因
jsdom不支持canvas的getContext方法，这是测试环境问题。

### 解决方案

**方案1: 安装jest-canvas-mock**

在tests目录下安装：
```bash
cd tests
npm install jest-canvas-mock
```

然后在jest配置中添加：
```javascript
// jest.config.js
setupFilesAfterEnv: ['<rootDir>/jest.setup.js']

// jest.setup.js
import 'jest-canvas-mock';
```

**方案2: Mock Chart.js组件**

在测试文件中直接mock Chart.js组件：
```typescript
// 在import之前添加
jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="pie-chart">Pie Chart</div>,
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
}));

jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
}));
```

---

## 问题2: 编辑功能测试失败

### 错误信息
```
Unable to find a label with the text of: 账户名称
Unable to find a label with the text of: 分类名称
```

### 原因
Dialog打开后，由于动画或渲染时序问题，TextField的label可能还没有正确绑定到input元素。

### 解决方案

**方案1: 增加等待时间**

在点击编辑按钮后添加更多等待：
```typescript
test('should update account after editing', async () => {
  render(
    <MockAppProvider>
      <AccountList />
    </MockAppProvider>
  );
  
  // 点击编辑按钮
  await waitFor(() => {
    const editButtons = screen.getAllByText('编辑');
    fireEvent.click(editButtons[0]);
  });

  // 等待Dialog完全打开，增加超时时间
  await waitFor(() => {
    expect(screen.getByText('编辑账户')).toBeInTheDocument();
  }, { timeout: 5000 });

  // 使用getByPlaceholderText而不是getByLabelText
  const nameInput = await screen.findByPlaceholderText('');
  // 或者直接通过TextField的父元素查找
  const dialogContent = screen.getByRole('dialog');
  const inputs = dialogContent.querySelectorAll('input');
  
  fireEvent.change(inputs[0], { target: { value: '新账户' } });
  fireEvent.click(screen.getByText('保存'));
});
```

**方案2: 使用screen.findBy**

将`screen.getByLabelText`改为`screen.findBy`：
```typescript
// 替换
const nameInput = screen.getByLabelText('账户名称');

// 改为
const nameInput = await screen.findByLabelText('账户名称');
```

**方案3: 检查TextField是否正确渲染**

确保TextField有正确的htmlFor属性：
```typescript
<TextField
  label="账户名称"
  id="account-name"  // 添加id
  fullWidth
  margin="normal"
  value={editName}
  onChange={(e) => setEditName(e.target.value)}
  required
/>
```

然后在测试中使用：
```typescript
const nameInput = screen.getByLabelText('账户名称');
// 或通过id
const nameInput = screen.getByDisplayValue('');
```

---

## 具体测试修改示例

### 修改1: report.test.tsx

```typescript
// 在文件顶部添加mock
jest.mock('react-chartjs-2', () => ({
  Pie: ({ data, options }: any) => <div data-testid="pie-chart">Pie Chart</div>,
  Bar: ({ data, options }: any) => <div data-testid="bar-chart">Bar Chart</div>,
}));

jest.mock('chart.js', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    update: jest.fn(),
  })),
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
}));
```

### 修改2: account.test.tsx

```typescript
test('should update account after editing', async () => {
  render(
    <MockAppProvider>
      <AccountList />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    const editButtons = screen.getAllByText('编辑');
    fireEvent.click(editButtons[0]);
  });

  // 增加等待时间
  await waitFor(() => {
    expect(screen.getByText('编辑账户')).toBeInTheDocument();
  });

  // 使用findBy代替getBy
  const nameInput = await screen.findByLabelText('账户名称');
  fireEvent.change(nameInput, { target: { value: '新账户' } });
  
  const saveButton = screen.getByText('保存');
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });
});
```

### 修改3: category.test.tsx

```typescript
test('should update category after editing', async () => {
  render(
    <MockAppProvider>
      <CategoryList />
    </MockAppProvider>
  );
  
  await waitFor(() => {
    const editButtons = screen.getAllByText('编辑');
    fireEvent.click(editButtons[0]);
  });

  // 增加等待时间
  await waitFor(() => {
    expect(screen.getByText('编辑分类')).toBeInTheDocument();
  });

  // 使用findBy代替getBy
  const nameInput = await screen.findByLabelText('分类名称');
  fireEvent.change(nameInput, { target: { value: '新分类' } });
  
  const saveButton = screen.getByText('保存');
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });
});
```

---

## 总结

| 测试问题 | 解决方案 | 难度 |
|---------|---------|------|
| canvas不支持 | 安装jest-canvas-mock或mock组件 | 中等 |
| Dialog label找不到 | 增加等待时间或使用findBy | 简单 |

这些修改完成 后，所有测试应该能够通过。

---

**备注:** Tester可以根据实际情况选择最合适的解决方案。
