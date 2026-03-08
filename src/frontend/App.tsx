import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppRoutes from './routes';
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { label: '首页', path: '/' },
    { label: '交易', path: '/transaction' },
    { label: '分类', path: '/category' },
    { label: '账户', path: '/account' },
    { label: '报表', path: '/report' },
  ];

  return (
    <AppProvider>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: '#4CAF50' }}>
            <Toolbar>
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                家庭财务管家
              </Typography>
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {navItems.map((item) => (
                    <Button key={item.path} color="inherit" component={Link} to={item.path}>
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: 250 }}>
              <List>
                {navItems.map((item) => (
                  <ListItem button component={Link} to={item.path} onClick={() => setDrawerOpen(false)} key={item.path}>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Box component="main" sx={{ p: 3 }}>
            <AppRoutes />
          </Box>
        </Box>
      </Router>
    </AppProvider>
  );
};

export default App;
