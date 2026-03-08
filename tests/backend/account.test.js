const request = require('supertest');
const { getApp } = require('./test-helper');

describe('Account API', () => {
  test('should get all accounts', async () => {
    const response = await request(getApp()).get('/api/accounts');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should create a new account', async () => {
    const newAccount = {
      name: '支付宝',
      balance: 2000
    };

    const response = await request(getApp())
      .post('/api/accounts')
      .send(newAccount);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newAccount.name);
    expect(response.body.balance).toBe(newAccount.balance);
  });

  test('should update an account', async () => {
    const newAccount = {
      name: '支付宝',
      balance: 2000
    };

    const createResponse = await request(getApp())
      .post('/api/accounts')
      .send(newAccount);

    const accountId = createResponse.body.id;

    const updatedAccount = {
      name: '支付宝账户',
      balance: 3000
    };

    const updateResponse = await request(getApp())
      .put(`/api/accounts/${accountId}`)
      .send(updatedAccount);

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.name).toBe(updatedAccount.name);
    expect(updateResponse.body.balance).toBe(updatedAccount.balance);
  });

  test('should delete an account', async () => {
    const newAccount = {
      name: '临时账户',
      balance: 1000
    };

    const createResponse = await request(getApp())
      .post('/api/accounts')
      .send(newAccount);

    const accountId = createResponse.body.id;

    const deleteResponse = await request(getApp())
      .delete(`/api/accounts/${accountId}`);

    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(getApp())
      .get(`/api/accounts/${accountId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test('should validate account data', async () => {
    const invalidAccount = {
    };

    const response = await request(getApp())
      .post('/api/accounts')
      .send(invalidAccount);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('should get account by id', async () => {
    const newAccount = {
      name: '测试账户',
      balance: 5000
    };

    const createResponse = await request(getApp())
      .post('/api/accounts')
      .send(newAccount);

    const accountId = createResponse.body.id;

    const getResponse = await request(getApp())
      .get(`/api/accounts/${accountId}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.id).toBe(accountId);
    expect(getResponse.body.name).toBe(newAccount.name);
  });
});
