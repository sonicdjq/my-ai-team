const request = require('supertest');
const { getApp } = require('./test-helper');

describe('Category API', () => {
  test('should get all categories', async () => {
    const response = await request(getApp()).get('/api/categories');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should create a new category', async () => {
    const newCategory = {
      name: '购物',
      type: 'expense'
    };

    const response = await request(getApp())
      .post('/api/categories')
      .send(newCategory);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newCategory.name);
    expect(response.body.type).toBe(newCategory.type);
  });

  test('should update a category', async () => {
    const newCategory = {
      name: '购物',
      type: 'expense'
    };

    const createResponse = await request(getApp())
      .post('/api/categories')
      .send(newCategory);

    const categoryId = createResponse.body.id;

    const updatedCategory = {
      name: '网上购物',
      type: 'expense'
    };

    const updateResponse = await request(getApp())
      .put(`/api/categories/${categoryId}`)
      .send(updatedCategory);

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.name).toBe(updatedCategory.name);
  });

  test('should delete a category', async () => {
    const newCategory = {
      name: '临时分类',
      type: 'expense'
    };

    const createResponse = await request(getApp())
      .post('/api/categories')
      .send(newCategory);

    const categoryId = createResponse.body.id;

    const deleteResponse = await request(getApp())
      .delete(`/api/categories/${categoryId}`);

    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(getApp())
      .get(`/api/categories/${categoryId}`);

    expect(getResponse.statusCode).toBe(404);
  });

  test('should validate category data', async () => {
    const invalidCategory = {
    };

    const response = await request(getApp())
      .post('/api/categories')
      .send(invalidCategory);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('should get expense categories', async () => {
    const response = await request(getApp()).get('/api/categories?type=expense');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(category => {
      expect(category.type).toBe('expense');
    });
  });

  test('should get income categories', async () => {
    const response = await request(getApp()).get('/api/categories?type=income');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(category => {
      expect(category.type).toBe('income');
    });
  });
});
