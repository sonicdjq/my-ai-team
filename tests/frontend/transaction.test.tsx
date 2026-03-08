import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionForm from '../../src/frontend/components/transaction/TransactionForm';
import TransactionList from '../../src/frontend/components/transaction/TransactionList';
import { MockAppProvider } from '../test-utils';

// Mock fetch API
global.fetch = jest.fn();

const mockCategories = [
  { id: 1, name: '餐饮', type: 'expense' },
  { id: 2, name: '工资', type: 'income' },
];

const mockAccounts = [
  { id: 1, name: '现金', balance: 1000 },
  { id: 2, name: '银行卡', balance: 5000 },
];

const mockTransactions = [
  { id: 1, amount: 100, type: 'expense', category_id: 1, category_name: '餐饮', account_id: 1, account_name: '现金', date: '2026-03-07', merchant: '餐厅', notes: '晚餐' },
  { id: 2, amount: 50, type: 'expense', category_id: 2, account_id: 1, account_name: '现金', date: '2026-03-06', merchant: '地铁', notes: '通勤' },
  { id: 3, amount: 5000, type: 'income', category_id: 7, account_id: 2, account_name: '银行卡', date: '2026-03-01', merchant: '公司', notes: '月薪' },
];

describe('TransactionForm Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/categories')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        });
      } else if (url.includes('/api/accounts')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAccounts),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render transaction form correctly', async () => {
    render(
      <MockAppProvider>
        <TransactionForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('添加交易')).toBeInTheDocument();
    });
  });

  test('should have save button', async () => {
    render(
      <MockAppProvider>
        <TransactionForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    });
  });
});

describe('TransactionList Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string, options?: any) => {
      if (url.includes('/api/transactions')) {
        if (options?.method === 'DELETE') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTransactions),
        });
      } else if (url.includes('/api/categories')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        });
      } else if (url.includes('/api/accounts')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAccounts),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render transaction list correctly', async () => {
    render(
      <MockAppProvider>
        <TransactionList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('交易列表')).toBeInTheDocument();
    });
  });

  test('should display transactions when fetched', async () => {
    render(
      <MockAppProvider>
        <TransactionList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('餐厅')).toBeInTheDocument();
    });
  });

  test('should have edit and delete buttons', async () => {
    render(
      <MockAppProvider>
        <TransactionList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getAllByText('编辑').length).toBeGreaterThan(0);
      expect(screen.getAllByText('删除').length).toBeGreaterThan(0);
    });
  });

  test('should edit transaction when clicking edit button', async () => {
    render(
      <MockAppProvider>
        <TransactionList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      const editButtons = screen.getAllByText('编辑');
      expect(editButtons.length).toBeGreaterThan(0);
      fireEvent.click(editButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('编辑交易')).toBeInTheDocument();
    });
  });

  test('should update transaction after editing', async () => {
    render(
      <MockAppProvider>
        <TransactionList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      const editButtons = screen.getAllByText('编辑');
      fireEvent.click(editButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('编辑交易')).toBeInTheDocument();
    }, { timeout: 5000 });

    const dialog = screen.getByRole('dialog');
    const inputs = dialog.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: '200' } });
    
    fireEvent.click(screen.getByText('保存'));
  });
});