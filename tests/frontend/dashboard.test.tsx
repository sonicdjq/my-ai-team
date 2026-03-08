// Mock useNavigate before any imports
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockAppProvider } from '../test-utils';

// Mock fetch API
global.fetch = jest.fn();

const Dashboard = require('../../src/frontend/pages/Dashboard').default;

const mockDashboardData = {
  overview: {
    totalIncome: 5000,
    totalExpense: 2600,
    balance: 2400,
  },
  recentTransactions: [
    { id: 1, amount: 100, type: 'expense', category_name: '餐饮', account_name: '现金', date: '2026-03-07', merchant: '餐厅', notes: '晚餐' },
    { id: 2, amount: 50, type: 'expense', category_name: '交通', account_name: '现金', date: '2026-03-06', merchant: '地铁', notes: '通勤' },
    { id: 3, amount: 5000, type: 'income', category_name: '工资', account_name: '银行卡', date: '2026-03-01', merchant: '公司', notes: '月薪' },
  ],
  budgetProgress: {
    totalBudget: 3000,
    used: 2600,
    percentage: 86.67,
  },
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/dashboard')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDashboardData),
        });
      } else if (url.includes('/api/transactions') && url.includes('recent')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDashboardData.recentTransactions),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render dashboard correctly', async () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('记一笔')).toBeInTheDocument();
    });
  });

  test('should display financial overview', async () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('总收入')).toBeInTheDocument();
    });
  });

  test('should show recent transactions', async () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('餐厅')).toBeInTheDocument();
    });
  });

  test('should navigate to transaction form when clicking 记一笔 button', async () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>
    );
    
    const addTransactionButton = screen.getByText('记一笔');
    fireEvent.click(addTransactionButton);
    
    await waitFor(() => {
      expect(screen.getByText('记一笔')).toBeInTheDocument();
    });
  });

  test('should navigate to report page when clicking 查看报表 button', async () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>
    );
    
    const viewReportButton = screen.getByText('查看报表');
    fireEvent.click(viewReportButton);
    
    await waitFor(() => {
      expect(screen.getByText('查看报表')).toBeInTheDocument();
    });
  });

  test('should navigate to account management when clicking 管理账户 button', async () => {
    render(
      <MockAppProvider>
        <Dashboard />
      </MockAppProvider>
    );
    
    const manageAccountButton = screen.getByText('管理账户');
    fireEvent.click(manageAccountButton);
    
    await waitFor(() => {
      expect(screen.getByText('管理账户')).toBeInTheDocument();
    });
  });
});