import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Container, Paper, Box, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useAppContext } from '../../contexts/AppContext';

const AccountList: React.FC = () => {
  const { accounts, deleteAccount, updateAccount } = useAppContext();
  
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editBalance, setEditBalance] = useState('');

  const handleDelete = (id: number) => {
    try {
      deleteAccount(id);
    } catch (error) {
      setError('删除账户失败');
    }
  };

  const handleEdit = (account: any) => {
    setEditingAccount(account);
    setEditName(account.name);
    setEditBalance(account.balance.toString());
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingAccount) return;
    
    const updatedAccount = {
      ...editingAccount,
      name: editName,
      balance: Number(editBalance),
    };

    try {
      updateAccount(editingAccount.id, updatedAccount);
      setEditDialogOpen(false);
      setEditingAccount(null);
    } catch (error) {
      setError('更新账户失败');
    }
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
    setEditingAccount(null);
  };

  const getTotalBalance = () => {
    return accounts.reduce((total: number, account) => total + account.balance, 0);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          账户列表
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            总余额: ¥{getTotalBalance().toFixed(2)}
          </Typography>
        </Box>
        <List>
          {accounts.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              暂无账户
            </Typography>
          ) : (
            accounts.map((account) => (
              <ListItem key={account.id}>
                <ListItemText
                  primary={account.name}
                  secondary={`余额: ¥${account.balance.toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(account)}
                  >
                    编辑
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(account.id)}
                  >
                    删除
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>编辑账户</DialogTitle>
        <DialogContent>
          <TextField
            label="账户名称"
            fullWidth
            margin="normal"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <TextField
            label="余额"
            fullWidth
            margin="normal"
            type="number"
            value={editBalance}
            onChange={(e) => setEditBalance(e.target.value)}
            required
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

export default AccountList;
