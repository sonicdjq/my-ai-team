const express = require('express');
const cors = require('cors');
const { initDatabase, query, run } = require('./database');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 初始化数据库
initDatabase();

// 账户相关API
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await query('SELECT * FROM accounts');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: '获取账户失败' });
  }
});

app.get('/api/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accounts = await query('SELECT * FROM accounts WHERE id = ?', [id]);
    if (accounts.length === 0) {
      res.status(404).json({ error: '账户不存在' });
    } else {
      res.json(accounts[0]);
    }
  } catch (error) {
    res.status(500).json({ error: '获取账户失败' });
  }
});

app.post('/api/accounts', async (req, res) => {
  try {
    const { name, balance } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: '账户名称不能为空' });
    }
    
    const result = await run('INSERT INTO accounts (name, balance) VALUES (?, ?)', [name, balance || 0]);
    const newAccount = await query('SELECT * FROM accounts WHERE id = ?', [result.id]);
    res.status(201).json(newAccount[0]);
  } catch (error) {
    res.status(500).json({ error: '创建账户失败' });
  }
});

app.put('/api/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, balance } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: '账户名称不能为空' });
    }
    
    const result = await run('UPDATE accounts SET name = ?, balance = ? WHERE id = ?', [name, balance || 0, id]);
    if (result.changes === 0) {
      res.status(404).json({ error: '账户不存在' });
    } else {
      const updatedAccount = await query('SELECT * FROM accounts WHERE id = ?', [id]);
      res.json(updatedAccount[0]);
    }
  } catch (error) {
    res.status(500).json({ error: '更新账户失败' });
  }
});

app.delete('/api/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await run('DELETE FROM accounts WHERE id = ?', [id]);
    if (result.changes === 0) {
      res.status(404).json({ error: '账户不存在' });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error: '删除账户失败' });
  }
});

// 分类相关API
app.get('/api/categories', async (req, res) => {
  try {
    const { type } = req.query;
    let sql = 'SELECT * FROM categories';
    let params = [];
    
    if (type) {
      sql += ' WHERE type = ?';
      params.push(type);
    }
    
    const categories = await query(sql, params);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: '获取分类失败' });
  }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await query('SELECT * FROM categories WHERE id = ?', [id]);
    if (categories.length === 0) {
      res.status(404).json({ error: '分类不存在' });
    } else {
      res.json(categories[0]);
    }
  } catch (error) {
    res.status(500).json({ error: '获取分类失败' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, type } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ error: '分类名称和类型不能为空' });
    }
    
    const result = await run('INSERT INTO categories (name, type) VALUES (?, ?)', [name, type]);
    const newCategory = await query('SELECT * FROM categories WHERE id = ?', [result.id]);
    res.status(201).json(newCategory[0]);
  } catch (error) {
    res.status(500).json({ error: '创建分类失败' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ error: '分类名称和类型不能为空' });
    }
    
    const result = await run('UPDATE categories SET name = ?, type = ? WHERE id = ?', [name, type, id]);
    if (result.changes === 0) {
      res.status(404).json({ error: '分类不存在' });
    } else {
      const updatedCategory = await query('SELECT * FROM categories WHERE id = ?', [id]);
      res.json(updatedCategory[0]);
    }
  } catch (error) {
    res.status(500).json({ error: '更新分类失败' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await run('DELETE FROM categories WHERE id = ?', [id]);
    if (result.changes === 0) {
      res.status(404).json({ error: '分类不存在' });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error: '删除分类失败' });
  }
});

// 交易相关API
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await query('SELECT * FROM transactions');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: '获取交易失败' });
  }
});

app.get('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await query('SELECT * FROM transactions WHERE id = ?', [id]);
    if (transactions.length === 0) {
      res.status(404).json({ error: '交易不存在' });
    } else {
      res.json(transactions[0]);
    }
  } catch (error) {
    res.status(500).json({ error: '获取交易失败' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { amount, type, category_id, account_id, from_account_id, to_account_id, date, merchant, notes } = req.body;
    
    if (!amount || !type || !date) {
      return res.status(400).json({ error: '金额、类型和日期不能为空' });
    }
    
    const result = await run(
      'INSERT INTO transactions (amount, type, category_id, account_id, from_account_id, to_account_id, date, merchant, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [amount, type, category_id, account_id, from_account_id, to_account_id, date, merchant, notes]
    );
    
    const newTransaction = await query('SELECT * FROM transactions WHERE id = ?', [result.id]);
    res.status(201).json(newTransaction[0]);
  } catch (error) {
    res.status(500).json({ error: '创建交易失败' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category_id, account_id, from_account_id, to_account_id, date, merchant, notes } = req.body;
    
    if (!amount || !type || !date) {
      return res.status(400).json({ error: '金额、类型和日期不能为空' });
    }
    
    const result = await run(
      'UPDATE transactions SET amount = ?, type = ?, category_id = ?, account_id = ?, from_account_id = ?, to_account_id = ?, date = ?, merchant = ?, notes = ? WHERE id = ?',
      [amount, type, category_id, account_id, from_account_id, to_account_id, date, merchant, notes, id]
    );
    
    if (result.changes === 0) {
      res.status(404).json({ error: '交易不存在' });
    } else {
      const updatedTransaction = await query('SELECT * FROM transactions WHERE id = ?', [id]);
      res.json(updatedTransaction[0]);
    }
  } catch (error) {
    res.status(500).json({ error: '更新交易失败' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await run('DELETE FROM transactions WHERE id = ?', [id]);
    if (result.changes === 0) {
      res.status(404).json({ error: '交易不存在' });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error: '删除交易失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
