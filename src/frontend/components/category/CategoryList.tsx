import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Container, Paper, Box, Alert, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppContext } from '../../contexts/AppContext';

const CategoryList: React.FC = () => {
  const { categories, deleteCategory, updateCategory } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('expense');

  const handleDelete = (id: number) => {
    try {
      deleteCategory(id);
    } catch (error) {
      setError('删除分类失败');
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditType(category.type);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingCategory) return;
    
    const updatedCategory = {
      ...editingCategory,
      name: editName,
      type: editType,
    };

    try {
      updateCategory(editingCategory.id, updatedCategory);
      setEditDialogOpen(false);
      setEditingCategory(null);
    } catch (error) {
      setError('更新分类失败');
    }
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
    setEditingCategory(null);
  };

  const expenseCategories = categories.filter(category => category.type === 'expense');
  const incomeCategories = categories.filter(category => category.type === 'income');

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          分类列表
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>支出分类</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {expenseCategories.map((category) => (
                <ListItem key={category.id}>
                  <ListItemText primary={category.name} />
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(category)}
                    >
                      编辑
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(category.id)}
                    >
                      删除
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>收入分类</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {incomeCategories.map((category) => (
                <ListItem key={category.id}>
                  <ListItemText primary={category.name} />
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(category)}
                    >
                      编辑
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(category.id)}
                    >
                      删除
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>编辑分类</DialogTitle>
        <DialogContent>
          <TextField
            label="分类名称"
            fullWidth
            margin="normal"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <TextField
            select
            label="分类类型"
            fullWidth
            margin="normal"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            required
          >
            <MenuItem value="expense">支出</MenuItem>
            <MenuItem value="income">收入</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>取消</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">保存</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryList;
