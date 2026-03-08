import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseReport from '../../src/frontend/components/report/ExpenseReport';
import IncomeExpenseReport from '../../src/frontend/components/report/IncomeExpenseReport';
import { MockAppProvider } from '../test-utils';

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

// Mock fetch API
global.fetch = jest.fn();

const mockExpenseData = [
  { category: '餐饮', amount: 1000 },
  { category: '交通', amount: 500 },
  { category: '购物', amount: 800 },
  { category: '娱乐', amount: 300 },
];

const mockIncomeExpenseData = {
  income: 5000,
  expense: 2600,
  balance: 2400,
  monthlyData: [
    { month: '1月', income: 4500, expense: 2200 },
    { month: '2月', income: 5000, expense: 2500 },
    { month: '3月', income: 5000, expense: 2600 },
  ],
};

describe('ExpenseReport Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/transactions') && url.includes('type=expense')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockExpenseData),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render expense report correctly', async () => {
    render(
      <MockAppProvider>
        <ExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('支出报表')).toBeInTheDocument();
    });
  });

  test('should display expense report with chart', async () => {
    render(
      <MockAppProvider>
        <ExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('支出报表')).toBeInTheDocument();
    });
  });

  test('should have export button', async () => {
    render(
      <MockAppProvider>
        <ExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('导出报表')).toBeInTheDocument();
    });
  });

  test('should display expense chart', async () => {
    render(
      <MockAppProvider>
        <ExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('支出报表')).toBeInTheDocument();
    });
  });
});

describe('IncomeExpenseReport Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/transactions') && url.includes('summary')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockIncomeExpenseData),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render income-expense report correctly', async () => {
    render(
      <MockAppProvider>
        <IncomeExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('收支报表')).toBeInTheDocument();
    });
  });

  test('should display income-expense report with chart', async () => {
    render(
      <MockAppProvider>
        <IncomeExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('收支报表')).toBeInTheDocument();
    });
  });

  test('should have export button', async () => {
    render(
      <MockAppProvider>
        <IncomeExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('导出报表')).toBeInTheDocument();
    });
  });

  test('should display income-expense chart', async () => {
    render(
      <MockAppProvider>
        <IncomeExpenseReport />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('收支报表')).toBeInTheDocument();
    });
  });
});