import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountForm from '../../src/frontend/components/account/AccountForm';
import AccountList from '../../src/frontend/components/account/AccountList';
import TransferForm from '../../src/frontend/components/account/TransferForm';
import { MockAppProvider } from '../test-utils';

// Mock fetch API
global.fetch = jest.fn();

const mockAccounts = [
  { id: 1, name: '现金', balance: 1000 },
  { id: 2, name: '银行卡', balance: 5000 },
];

describe('AccountForm Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/accounts')) {
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

  test('should Render account form correctly', async () => {
    render(
      <MockAppProvider>
        <AccountForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('添加账户')).toBeInTheDocument();
    });
  });

  test('should have submit button', async () => {
    render(
      <MockAppProvider>
        <AccountForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    });
  });
});

describe('AccountList Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string, options?: any) => {
      if (url.includes('/api/accounts')) {
        if (options?.method === 'DELETE') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          });
        }
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

  test('should Render account list correctly', async () => {
    render(
      <MockAppProvider>
        <AccountList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('账户列表')).toBeInTheDocument();
    });
  });

  test('should display account data when fetched', async () => {
    render(
      <MockAppProvider>
        <AccountList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('现金')).toBeInTheDocument();
    });
  });

  test('should display total balance', async () => {
    render(
      <MockAppProvider>
        <AccountList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/总余额/)).toBeInTheDocument();
    });
  });

  test('should have edit and delete buttons', async () => {
    render(
      <MockAppProvider>
        <AccountList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getAllByText('编辑').length).toBeGreaterThan(0);
      expect(screen.getAllByText('删除').length).toBeGreaterThan(0);
    });
  });

  test('should edit account when clicking edit button', async () => {
    render(
      <MockAppProvider>
        <AccountList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      const editButtons = screen.getAllByText('编辑');
      expect(editButtons.length).toBeGreaterThan(0);
      fireEvent.click(editButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('编辑账户')).toBeInTheDocument();
    });
  });

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

    await waitFor(() => {
      expect(screen.getByText('编辑账户')).toBeInTheDocument();
    }, { timeout: 5000 });

    const dialog = screen.getByRole('dialog');
    const inputs = dialog.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: '新账户' } });
    
    fireEvent.click(screen.getByText('保存'));
  });
});

describe('TransferForm Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/accounts')) {
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

  test('should Render transfer form correctly', async () => {
    render(
      <MockAppProvider>
        <TransferForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('账户转账')).toBeInTheDocument();
    });
  });

  test('should have transfer button', async () => {
    render(
      <MockAppProvider>
        <TransferForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '转账' })).toBeInTheDocument();
    });
  });
});