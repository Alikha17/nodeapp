const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /api/items creates an item', async () => {
    const res = await request(app).post('/api/items').send({ name: 'book' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ name: 'book' });
  });

  test('POST /api/items without name returns 400', async () => {
    const res = await request(app).post('/api/items').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/items lists items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('DELETE /api/items/:id removes an item', async () => {
    const created = await request(app).post('/api/items').send({ name: 'pen' });
    const res = await request(app).delete(`/api/items/${created.body.id}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE unknown id returns 404', async () => {
    const res = await request(app).delete('/api/items/9999');
    expect(res.statusCode).toBe(404);
  });
});
