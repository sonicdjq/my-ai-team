import React, { ReactNode } from 'react';
import { AppContext } from '../src/frontend/contexts/AppContext';

interface Category {
  id: number;
  name: string;
  type: string;
}

interface Account {
  id: number;
  name: string;
  balance: number;
}

interface Transaction {
  id: number;
  amount: number;
  type: string;
  category_id: number;
  account_id: number;
  date: string;
  merchant?: string;
  notes?: string;
}

interface AppContextType {
  categories: Category[];
  accounts: Account[];
  transactions: Transaction[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteCategory: (id: number) => void;
  deleteAccount: (id: number) => void;
  deleteTransaction: (id: number) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  updateCategory: (id: number, category: Partial<Category>) => void;
  updateAccount: (id: number, account: Partial<Account>) => void;
}

// 模拟上下文值
const mockContextValue: AppContextType = {
  categories: [
    { id: 1, name: '餐饮', type: 'expense' },
    { id: 2, name: '交通', type: 'expense' },
    { id: 3, name: '购物', type: 'expense' },
    { id: 4, name: '娱乐', type: 'expense' },
    { id: 5, name: '住房', type: 'expense' },
    { id: 6, name: '医疗', type: 'expense' },
    { id: 7, name: '工资', type: 'income' },
    { id: 8, name: '奖金', type: 'income' },
    { id: 9, name: '投资', type: 'income' },
    { id: 10, name: '礼金', type: 'income' },
  ],
  accounts: [
    { id: 1, name: '现金', balance: 1000 },
    { id: 2, name: '银行卡', balance: 5000 },
  ],
  transactions: [
    { id: 1, amount: 100, type: 'expense', category_id: 1, account_id: 1, date: '2026-03-07', merchant: '餐厅', notes: '晚餐' },
    { id: 2, amount: 50, type: 'expense', category_id: 2, account_id: 1, date: '2026-03-06', merchant: '地铁', notes: '通勤' },
    { id: 3, amount: 5000, type: 'income', category_id: 7, account_id: 2, date: '2026-03-01', merchant: '公司', notes: '月薪' },
  ],
  addCategory: () => {},
  addAccount: () => {},
  addTransaction: () => {},
  deleteCategory: () => {},
  deleteAccount: () => {},
  deleteTransaction: () => {},
  updateTransaction: (id: number, transaction: Partial<Transaction>) => {
    const updatedTransactions = mockContextValue.transactions.map(t => 
      t.id === id ? { ...t, ...transaction } : t
    );
    mockContextValue.transactions = updatedTransactions;
  },
  updateCategory: () => {},
  updateAccount: () => {},
};

// 模拟 AppProvider，使用真正的 AppContext
export const MockAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AppContext.Provider value={mockContextValue}>{children}</AppContext.Provider>;
};
