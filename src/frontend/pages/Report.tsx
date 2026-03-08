import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Tabs, Tab } from '@mui/material';
import ExpenseReport from '../components/report/ExpenseReport';
import IncomeExpenseReport from '../components/report/IncomeExpenseReport';

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

interface Category {
  id: number;
  name: string;
  type: string;
}

const Report: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenseByCategory, setExpenseByCategory] = useState<{ category: string; amount: number }[]>([]);
  const [incomeByCategory, setIncomeByCategory] = useState<{ category: string; amount: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsResponse, categoriesResponse] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/categories')
      ]);

      if (transactionsResponse.ok && categoriesResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        const categoriesData = await categoriesResponse.json();
        setTransactions(transactionsData);
        setCategories(categoriesData);
        calculateReports(transactionsData, categoriesData);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  const calculateReports = (transactions: Transaction[], categories: Category[]) => {
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
    
    // 按分类计算支出
    const expenseMap = new Map<string, number>();
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const categoryName = categoryMap.get(t.category_id) || '未知分类';
        expenseMap.set(categoryName, (expenseMap.get(categoryName) || 0) + t.amount);
      });
    setExpenseByCategory(Array.from(expenseMap.entries()).map(([category, amount]) => ({ category, amount })));

    // 按分类计算收入
    const incomeMap = new Map<string, number>();
    transactions
      .filter(t => t.type === 'income')
      .forEach(t => {
        const categoryName = categoryMap.get(t.category_id) || '未知分类';
        incomeMap.set(categoryName, (incomeMap.get(categoryName) || 0) + t.amount);
      });
    setIncomeByCategory(Array.from(incomeMap.entries()).map(([category, amount]) => ({ category, amount })));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          报表分析
        </Typography>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange} 
            variant="fullWidth"
          >
            <Tab label="支出分析" />
            <Tab label="收入分析" />
            <Tab label="收支报表" />
          </Tabs>
        </Paper>

        {tabIndex === 0 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              支出分类统计
            </Typography>
            <Grid container spacing={2}>
              {expenseByCategory.length === 0 ? (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    暂无支出数据
                  </Typography>
                </Grid>
              ) : (
                expenseByCategory.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">{item.category}</Typography>
                      <Typography variant="h6" color="red">
                        ¥{item.amount.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        )}

        {tabIndex === 1 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              收入分类统计
            </Typography>
            <Grid container spacing={2}>
              {incomeByCategory.length === 0 ? (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    暂无收入数据
                  </Typography>
                </Grid>
              ) : (
                incomeByCategory.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">{item.category}</Typography>
                      <Typography variant="h6" color="green">
                        ¥{item.amount.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        )}
        {tabIndex === 2 && (
          <IncomeExpenseReport />
        )}
      </Box>
    </Container>
  );
};

export default Report;
