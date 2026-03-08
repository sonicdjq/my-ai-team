import React, { useMemo } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppContext } from '../../contexts/AppContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseReport: React.FC = () => {
  const { transactions, categories } = useAppContext();

  const expenseData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryMap = new Map(categories.map(c => [c.id, c.name]));
    
    const expenseByCategory = new Map<number, number>();
    expenseTransactions.forEach(t => {
      expenseByCategory.set(t.category_id, (expenseByCategory.get(t.category_id) || 0) + t.amount);
    });

    const labels: string[] = [];
    const data: number[] = [];
    const colors: string[] = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
    ];

    expenseByCategory.forEach((amount, categoryId) => {
      labels.push(categoryMap.get(categoryId) || '未知分类');
      data.push(amount);
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 1,
        },
      ],
    };
  }, [transactions, categories]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percentage = totalExpense > 0 ? ((value / totalExpense) * 100).toFixed(1) : 0;
            return `${context.label}: ¥${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  const handleExport = () => {
    const csvContent = [
      ['分类', '金额', '占比'],
      ...expenseData.labels.map((label, index) => [
        label,
        expenseData.datasets[0].data[index].toFixed(2),
        totalExpense > 0 ? ((expenseData.datasets[0].data[index] / totalExpense) * 100).toFixed(1) + '%' : '0%'
      ]),
      ['总计', totalExpense.toFixed(2), '100%']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'expense_report.csv';
    link.click();
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          支出报表
        </Typography>
        {expenseData.labels.length > 0 ? (
          <>
            <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
              <Pie data={expenseData} options={options} />
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="h6">
                总支出: ¥{totalExpense.toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            暂无支出数据
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleExport}>
            导出报表
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ExpenseReport;
