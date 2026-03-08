import React from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import AccountForm from '../components/account/AccountForm';
import AccountList from '../components/account/AccountList';
import TransferForm from '../components/account/TransferForm';

const Account: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          账户管理
        </Typography>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange} 
            variant="fullWidth"
          >
            <Tab label="添加账户" />
            <Tab label="账户列表" />
            <Tab label="账户转账" />
          </Tabs>
        </Paper>

        {tabIndex === 0 && <AccountForm />}
        {tabIndex === 1 && <AccountList />}
        {tabIndex === 2 && <TransferForm />}
      </Box>
    </Container>
  );
};

export default Account;
