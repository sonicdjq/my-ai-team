import React, { createContext, useContext, useState, ReactNode } from 'react';

// 检测是否在测试环境中
const isTestEnvironment = typeof window === 'undefined' || process.env.NODE_ENV === 'test' || (window.navigator && window.navigator.userAgent && (window.navigator.userAgent.includes('node.js') || window.navigator.userAgent.includes('jsdom')));

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

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultCategories: Category[] = [
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
];

const defaultAccounts: Account[] = [
  { id: 1, name: '现金', balance: 1000 },
  { id: 2, name: '银行卡', balance: 5000 },
];

const defaultTransactions: Transaction[] = [];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 直接使用React的useState钩子，让React处理状态管理
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    };
    setCategories([...categories, newCategory]);
  };

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...account,
      id: accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1,
    };
    setAccounts([...accounts, newAccount]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
    };
    setTransactions([...transactions, newTransaction]);
    
    // 更新账户余额
    if (transaction.type === 'income') {
      setAccounts(accounts.map(account => 
        account.id === transaction.account_id 
          ? { ...account, balance: account.balance + transaction.amount }
          : account
      ));
    } else if (transaction.type === 'expense') {
      setAccounts(accounts.map(account => 
        account.id === transaction.account_id 
          ? { ...account, balance: account.balance - transaction.amount }
          : account
      ));
    }
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const deleteTransaction = (id: number) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    if (transactionToDelete) {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
      
      // 恢复账户余额
      if (transactionToDelete.type === 'income') {
        setAccounts(prevAccounts => prevAccounts.map(account => 
          account.id === transactionToDelete.account_id 
            ? { ...account, balance: account.balance - transactionToDelete.amount }
            : account
        ));
      } else if (transactionToDelete.type === 'expense') {
        setAccounts(prevAccounts => prevAccounts.map(account => 
          account.id === transactionToDelete.account_id 
            ? { ...account, balance: account.balance + transactionToDelete.amount }
            : account
        ));
      }
    }
  };

  const updateTransaction = (id: number, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prevTransactions => 
      prevTransactions.map(t => t.id === id ? { ...t, ...updatedTransaction } : t)
    );
  };

  const updateCategory = (id: number, updatedCategory: Partial<Category>) => {
    setCategories(prevCategories => 
      prevCategories.map(c => c.id === id ? { ...c, ...updatedCategory } : c)
    );
  };

  const updateAccount = (id: number, updatedAccount: Partial<Account>) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(a => a.id === id ? { ...a, ...updatedAccount } : a)
    );
  };

  return (
    <AppContext.Provider value={{
      categories,
      accounts,
      transactions,
      addCategory,
      addAccount,
      addTransaction,
      deleteCategory,
      deleteAccount,
      deleteTransaction,
      updateTransaction,
      updateCategory,
      updateAccount,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext };
