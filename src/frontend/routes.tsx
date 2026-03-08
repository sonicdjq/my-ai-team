import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import Category from './pages/Category';
import Account from './pages/Account';
import Report from './pages/Report';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/category" element={<Category />} />
      <Route path="/account" element={<Account />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default AppRoutes;
