import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, MenuItem, Alert } from '@mui/material';
import { useAppContext } from '../../contexts/AppContext';

const TransactionForm: React.FC = () => {
  const { accounts, categories, addTransaction } = useAppContext();
  
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [merchant, setMerchant] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ amount?: string; type?: string; categoryId?: string; accountId?: string; date?: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  
  useEffect(() => {
    setCategoryId('');
  }, [type]);

  const validate = () => {
    const newErrors: { amount?: string; type?: string; categoryId?: string; accountId?: string; date?: string } = {};
    if (!amount) {
      newErrors.amount = '金额不能为空';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = '请输入有效的金额';
    }
    if (!type) {
      newErrors.type = '交易类型不能为空';
    }
    if (!categoryId) {
      newErrors.categoryId = '分类不能为空';
    }
    if (!accountId) {
      newErrors.accountId = '账户不能为空';
    }
    if (!date) {
      newErrors.date = '日期不能为空';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const transactionData = {
        amount: Number(amount),
        type,
        category_id: Number(categoryId),
        account_id: Number(accountId),
        date,
        merchant,
        notes,
      };

      try {
        addTransaction(transactionData);
        setSuccess('交易创建成功');
        setAmount('');
        setType('expense');
        setCategoryId('');
        setAccountId('');
        setDate(new Date().toISOString().split('T')[0]);
        setMerchant('');
        setNotes('');
      } catch (error) {
        console.error('创建交易失败:', error);
        setSuccess('交易创建失败');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          添加交易
        </Typography>
        {success && (
          <Alert severity={success === '交易创建成功' ? 'success' : 'error'} sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="金额"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount}
            required
          />
          <TextField
            select
            label="交易类型"
            fullWidth
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
            error={!!errors.type}
            helperText={errors.type}
            required
          >
            <MenuItem value="expense">支出</MenuItem>
            <MenuItem value="income">收入</MenuItem>
          </TextField>
          <TextField
            select
            label="分类"
            fullWidth
            margin="normal"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            error={!!errors.categoryId}
            helperText={errors.categoryId}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id.toString()}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="账户"
            fullWidth
            margin="normal"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            error={!!errors.accountId}
            helperText={errors.accountId}
            required
          >
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.id.toString()}>
                {account.name} (¥{account.balance.toFixed(2)})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="日期"
            fullWidth
            margin="normal"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="商户"
            fullWidth
            margin="normal"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
          />
          <TextField
            label="备注"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              保存
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TransactionForm;
