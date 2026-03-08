import React from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import CategoryForm from '../components/category/CategoryForm';
import CategoryList from '../components/category/CategoryList';

const Category: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          分类管理
        </Typography>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange} 
            variant="fullWidth"
          >
            <Tab label="添加分类" />
            <Tab label="分类列表" />
          </Tabs>
        </Paper>

        {tabIndex === 0 && <CategoryForm />}
        {tabIndex === 1 && <CategoryList />}
      </Box>
    </Container>
  );
};

export default Category;
