import React from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import TransactionForm from '../components/transaction/TransactionForm';
import TransactionList from '../components/transaction/TransactionList';

const Transaction: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          交易管理
        </Typography>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange} 
            variant="fullWidth"
          >
            <Tab label="添加交易" />
            <Tab label="交易列表" />
          </Tabs>
        </Paper>

        {tabIndex === 0 && <TransactionForm />}
        {tabIndex === 1 && <TransactionList />}
      </Box>
    </Container>
  );
};

export default Transaction;
