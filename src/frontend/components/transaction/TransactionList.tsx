import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Container, Paper, Box, Alert, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { useAppContext } from '../../contexts/AppContext';

const TransactionList: React.FC = () => {
  const { transactions, categories, accounts, deleteTransaction, updateTransaction } = useAppContext();
  
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editType, setEditType] = useState('expense');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editAccountId, setEditAccountId] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editMerchant, setEditMerchant] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const handleDelete = (id: number) => {
    try {
      deleteTransaction(id);
    } catch (error) {
      setError('删除交易失败');
    }
  };

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setEditAmount(transaction.amount.toString());
    setEditType(transaction.type);
    setEditCategoryId(transaction.category_id.toString());
    setEditAccountId(transaction.account_id.toString());
    setEditDate(transaction.date);
    setEditMerchant(transaction.merchant || '');
    setEditNotes(transaction.notes || '');
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingTransaction) return;
    
    const updatedTransaction = {
      ...editingTransaction,
      amount: Number(editAmount),
      type: editType,
      category_id: Number(editCategoryId),
      account_id: Number(editAccountId),
      date: editDate,
      merchant: editMerchant,
      notes: editNotes,
    };

    try {
      updateTransaction(editingTransaction.id, updatedTransaction);
      setEditDialogOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      setError('更新交易失败');
    }
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
    setEditingTransaction(null);
  };

  const getCategoryName = (id: number) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : '未知分类';
  };

  const getAccountName = (id: number) => {
    const account = accounts.find(a => a.id === id);
    return account ? account.name : '未知账户';
  };

  const getMerchantOrCategory = (transaction: any) => {
    return transaction.merchant || getCategoryName(transaction.category_id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          交易列表
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <List>
          {transactions.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无交易记录
            </Typography>
          ) : (
            transactions.map((transaction, index) => (
              <div key={transaction.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <span>{getMerchantOrCategory(transaction)}</span>
                        <span style={{ color: transaction.type === 'income' ? 'green' : 'red' }}>
                          {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toFixed(2)}
                        </span>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <span>{getCategoryName(transaction.category_id)} · {getAccountName(transaction.account_id)}</span>
                        <br />
                        <span>{formatDate(transaction.date)}</span>
                        {transaction.notes && <span> · {transaction.notes}</span>}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(transaction)}
                    >
                      编辑
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      删除
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            ))
          )}
        </List>
      </Paper>

      <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>编辑交易</DialogTitle>
        <DialogContent>
          <TextField
            label="金额"
            fullWidth
            margin="normal"
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            required
          />
          <TextField
            select
            label="交易类型"
            fullWidth
            margin="normal"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
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
            value={editCategoryId}
            onChange={(e) => setEditCategoryId(e.target.value)}
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
            value={editAccountId}
            onChange={(e) => setEditAccountId(e.target.value)}
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
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            required
          />
          <TextField
            label="商户"
            fullWidth
            margin="normal"
            value={editMerchant}
            onChange={(e) => setEditMerchant(e.target.value)}
          />
          <TextField
            label="备注"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>取消</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">保存</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransactionList;
