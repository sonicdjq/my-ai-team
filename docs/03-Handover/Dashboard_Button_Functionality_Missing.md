# Dashboard 按钮功能缺失 - 产品代码修改建议

**日期:** 2026-03-08
**问题类型:** 功能未实现
**优先级:** 高

---

## 问题描述

Dashboard 页面的三个主要功能按钮没有绑定点击事件，用户点击后没有任何反应。

### 受影响的功能

1. **记一笔** - 应该导航到交易添加页面
2. **查看报表** - 应该导航到报表查看页面
3. **管理账户** - 应该导航到账户管理页面

---

## 当前代码

**文件:** `src/frontend/pages/Dashboard.tsx` (第 102-112 行)

```typescript
<Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
  <Button variant="contained" color="primary" size="large">
    记一笔
  </Button>
  <Button variant="outlined" color="primary" size="large">
    查看报表
  </Button>
  <Button variant="outlined" color="primary" size="large">
    管理账户
  </Button>
</Box>
```

**问题:** 三个 Button 组件都没有 `onClick` 事件处理器。

---

## 修改建议

### 方案 1: 使用 React Router 导航（推荐）

如果项目使用了 React Router：

```typescript
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAddTransaction = () => {
    navigate('/transaction/add');
  };
  
  const handleViewReport = () => {
    navigate('/report');
  };
  
  const handleManageAccount = () => {
    navigate('/account');
  };
  
  return (
    <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        onClick={handleAddTransaction}
      >
        记一笔
      </Button>
      <Button 
        variant="outlined" 
        color="primary" 
        size="large"
        onClick={handleViewReport}
      >
        查看报表
      </Button>
      <Button 
        variant="outlined" 
        color="primary" 
        size="large"
        onClick={handleManageAccount}
      >
        管理账户
      </Button>
    </Box>
  );
};
```

### 方案 2: 使用自定义事件/回调

如果项目使用自定义导航系统：

```typescript
const Dashboard: React.FC = () => {
  const handleAddTransaction = () => {
    // 触发自定义事件或调用全局导航函数
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { path: '/transaction/add' } 
    }));
  };
  
  // 其他按钮类似...
};
```

---

## 预期行为

| 按钮 | 点击后行为 | 目标页面 |
|------|-----------|---------|
| 记一笔 | 导航到交易添加表单 | `/transaction/add` 或 `/transaction` |
| 查看报表 | 导航到报表页面 | `/report` |
| 管理账户 | 导航到账户管理页面 | `/account` 或 `/account/manage` |

---

## 测试用例

已添加以下测试用例（文件：`tests/frontend/dashboard.test.tsx`）：

1. `should navigate to transaction form when clicking 记一笔 button`
2. `should navigate to report page when clicking 查看报表 button`
3. `should navigate to account management when clicking 管理账户 button`

当前测试状态：**待实现**（测试用例已准备好，等待产品代码实现后启用）

---

## 相关文件

- **产品代码:** `src/frontend/pages/Dashboard.tsx`
- **测试代码:** `tests/frontend/dashboard.test.tsx`

---

## 验收标准

- [ ] 点击"记一笔"按钮后，页面导航到交易添加表单
- [ ] 点击"查看报表"按钮后，页面导航到报表查看页面
- [ ] 点击"管理账户"按钮后，页面导航到账户管理页面
- [ ] 所有测试用例通过

---

**备注:** 这是 Dashboard 页面的核心功能，应该优先实现。
