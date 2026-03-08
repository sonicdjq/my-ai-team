import React, { useMemo } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAppContext } from '../../contexts/AppContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeExpenseReport: React.FC = () => {
  const { transactions } = useAppContext();

  const incomeExpenseData = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      labels: ['收入', '支出', '结余'],
      datasets: [
        {
          label: '金额 (¥)',
          data: [totalIncome, totalExpense, totalIncome - totalExpense],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `金额: ¥${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => '¥' + value,
        },
      },
    },
  };

  const handleExport = () => {
    const csvContent = [
      ['类型', '金额'],
      ['收入', totalIncome.toFixed(2)],
      ['支出', totalExpense.toFixed(2)],
      ['结余', (totalIncome - totalExpense).toFixed(2)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'income_expense_report.csv';
    link.click();
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          收支报表
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar data={incomeExpenseData} options={options} />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <Box>
            <Typography variant="body1" color="text.secondary">
              总收入
            </Typography>
            <Typography variant="h6" color="green">
              ¥{totalIncome.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              总支出
            </Typography>
            <Typography variant="h6" color="red">
              ¥{totalExpense.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              结余
            </Typography>
            <Typography variant="h6" color={totalIncome - totalExpense >= 0 ? 'green' : 'red'}>
              ¥{(totalIncome - totalExpense).toFixed(2)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleExport}>
            导出报表
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default IncomeExpenseReport;
