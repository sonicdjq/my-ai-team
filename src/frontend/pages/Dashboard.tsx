import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const accounts = [
    { id: 1, name: '现金', balance: 1000 },
    { id: 2, name: '银行卡', balance: 5000 },
  ];
  
  const transactions = [
    { id: 1, amount: 100, type: 'expense', category_id: 1, account_id: 1, date: '2026-03-07', merchant: '餐厅', notes: '晚餐' },
    { id: 2, amount: 50, type: 'expense', category_id: 2, account_id: 1, date: '2026-03-06', merchant: '地铁', notes: '通勤' },
    { id: 3, amount: 5000, type: 'income', category_id: 7, account_id: 2, date: '2026-03-01', merchant: '公司', notes: '月薪' },
  ];
  
  const totalBalance = accounts.reduce((total: number, account) => total + account.balance, 0);
  const totalIncome = transactions.filter((t: any) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t: any) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleAddTransaction = () => {
    navigate('/transaction');
  };
  
  const handleViewReport = () => {
    navigate('/report');
  };
  
  const handleManageAccount = () => {
    navigate('/account');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          财务概览
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  总余额
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  ¥{totalBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  总收入
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, color: 'green' }}>
                  ¥{totalIncome.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  总支出
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, color: 'red' }}>
                  ¥{totalExpense.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            最近交易
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            {recentTransactions.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                暂无交易记录
              </Typography>
            ) : (
              recentTransactions.map((transaction, index) => (
                <Box key={transaction.id} sx={{ py: 1, borderBottom: index < recentTransactions.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">
                      {transaction.merchant}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      style={{ color: transaction.type === 'income' ? 'green' : 'red' }}
                    >
                      {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {transaction.date}
                  </Typography>
                </Box>
              ))
            )}
          </Paper>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleAddTransaction}
          >
            记一笔
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={handleViewReport}
          >
            查看报表
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={handleManageAccount}
          >
            管理账户
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
