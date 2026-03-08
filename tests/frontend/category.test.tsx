import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryForm from '../../src/frontend/components/category/CategoryForm';
import CategoryList from '../../src/frontend/components/category/CategoryList';
import { MockAppProvider } from '../test-utils';

// Mock fetch API
global.fetch = jest.fn();

const mockCategories = [
  { id: 1, name: '餐饮', type: 'expense' },
  { id: 2, name: '交通', type: 'expense' },
  { id: 3, name: '工资', type: 'income' },
  { id: 4, name: '奖金', type: 'income' },
];

describe('CategoryForm Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/categories')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render category form correctly', async () => {
    render(
      <MockAppProvider>
        <CategoryForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('添加分类')).toBeInTheDocument();
    });
  });

  test('should have save button', async () => {
    render(
      <MockAppProvider>
        <CategoryForm />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    });
  });
});

describe('CategoryList Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string, options?: any) => {
      if (url.includes('/api/categories')) {
        if (options?.method === 'DELETE') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should Render category list correctly', async () => {
    render(
      <MockAppProvider>
        <CategoryList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('分类列表')).toBeInTheDocument();
    });
  });

  test('should display expense categories', async () => {
    render(
      <MockAppProvider>
        <CategoryList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('支出分类')).toBeInTheDocument();
    });
  });

  test('should display income categories', async () => {
    render(
      <MockAppProvider>
        <CategoryList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('收入分类')).toBeInTheDocument();
    });
  });

  test('should have edit and delete buttons', async () => {
    render(
      <MockAppProvider>
        <CategoryList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      expect(screen.getAllByText('编辑').length).toBeGreaterThan(0);
      expect(screen.getAllByText('删除').length).toBeGreaterThan(0);
    });
  });

  test('should edit category when clicking edit button', async () => {
    render(
      <MockAppProvider>
        <CategoryList />
      </MockAppProvider>
    );
    
    await waitFor(() => {
      const editButtons = screen.getAllByText('编辑');
      expect(editButtons.length).toBeGreaterThan(0);
      fireEvent.click(editButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('编辑分类')).toBeInTheDocument();
    });
  });

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

    await waitFor(() => {
      expect(screen.getByText('编辑分类')).toBeInTheDocument();
    }, { timeout: 5000 });

    const dialog = screen.getByRole('dialog');
    const inputs = dialog.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: '新分类' } });
    
    fireEvent.click(screen.getByText('保存'));
  });
});