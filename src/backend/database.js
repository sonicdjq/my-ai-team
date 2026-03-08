const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 创建数据库连接
const dbPath = path.join(__dirname, 'finance.db');
const db = new sqlite3.Database(dbPath);

// 初始化数据库
function initDatabase() {
  // 创建categories表
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('创建categories表失败:', err);
    } else {
      // 插入默认分类数据
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('餐饮', 'expense')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('交通', 'expense')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('购物', 'expense')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('娱乐', 'expense')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('住房', 'expense')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('医疗', 'expense')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('工资', 'income')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('奖金', 'income')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('投资', 'income')`);
      db.run(`INSERT OR IGNORE INTO categories (name, type) VALUES ('礼金', 'income')`);
    }
  });

  // 创建accounts表
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      balance REAL DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error('创建accounts表失败:', err);
    } else {
      // 插入默认账户数据
      db.run(`INSERT OR IGNORE INTO accounts (name, balance) VALUES ('现金', 1000)`);
      db.run(`INSERT OR IGNORE INTO accounts (name, balance) VALUES ('银行卡', 5000)`);
    }
  });

  // 创建users表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);

  // 创建transactions表
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      category_id INTEGER,
      account_id INTEGER,
      from_account_id INTEGER,
      to_account_id INTEGER,
      date TEXT NOT NULL,
      merchant TEXT,
      notes TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (account_id) REFERENCES accounts(id),
      FOREIGN KEY (from_account_id) REFERENCES accounts(id),
      FOREIGN KEY (to_account_id) REFERENCES accounts(id)
    )
  `);
}

// 执行SQL查询
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// 执行SQL语句（插入、更新、删除）
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

module.exports = {
  initDatabase,
  query,
  run
};
