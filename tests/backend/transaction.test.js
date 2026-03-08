const request = require('supertest');
const { getApp } = require('./test-helper');

describe('Transaction API', () => {
  test('should get all transactions', async () => {
    const response = await request(getApp()).get('/api/transactions');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should create a new transaction', async () => {
    const newTransaction = {
      amount: 100,
      type: 'expense',
      category_id: 1,
      account_id: 1,
      date: '2026-03-07',
      merchant: '餐厅',
      notes: '晚餐'
    };

    const response = await request(getApp())
      .post('/api/transactions')
      .send(newTransaction);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.amount).toBe(newTransaction.amount);
    expect(response.body.type).toBe(newTransaction.type);
  });

  test('should update a transaction', async () => {
    const newTransaction = {
      amount: 100,
      type: 'expense',
      category_id: 1,
      account_id: 1,
      date: '2026-03-07',
      merchant: '餐厅',
      notes: '晚餐'
    };

    const createResponse = await request(getApp())
      .post('/api/transactions')
      .send(newTransaction);

    const transactionId = createResponse.body.id;

    const updatedTransaction = {
      amount: 150,
      type: 'expense',
      category_id: 1,
      account_id: 1,
      date: '2026-03-07',
      merchant: '餐厅',
      notes: '晚餐和饮料'
    };

    const updateResponse = await request(getApp())
      .put(`/api/transactions/${transactionId}`)
      .send(updatedTransaction);

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.amount).toBe(updatedTransaction.amount);
    expect(updateResponse.body.notes).toBe(updatedTransaction.notes);
  });

  test('should delete a transaction', async () => {
    const newTransaction = {
      amount: 100,
      type: 'expense',
      category_id: 1,
      account_id: 1,
      date: '2026-03-07',
      merchant: '餐厅',
      notes: '晚餐'
    };

    const createResponse = await request(getApp())
      .post('/api/transactions')
      .send(newTransaction);

    const transactionId = createResponse.body.id;

    const deleteResponse = await request(getApp())
      .delete(`/api/transactions/${transactionId}`);

    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(getApp())
      .get(`/api/transactions/${transactionId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test('should validate transaction data', async () => {
    const invalidTransaction = {
    };

    const response = await request(getApp())
      .post('/api/transactions')
      .send(invalidTransaction);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
