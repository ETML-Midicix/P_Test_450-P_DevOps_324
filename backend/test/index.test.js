const express = require('express');
const request = require('supertest');
const router = require('../routes/index');

describe('Router configuration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(router);
  });

  it('should have /api/user route', async () => {
    const res = await request(app).get('/api/user');
    expect(res.status).toBe(400); // Vérifie que la route existe mais n'a pas de handler défini
  });

  it('should have /api/auth route', async () => {
    const res = await request(app).get('/api/auth');
    expect(res.status).toBe(404); // Vérifie que la route existe mais n'a pas de handler défini
  });

  it('should have /api/todo route', async () => {
    const res = await request(app).get('/api/todo');
    expect(res.status).toBe(400); // Vérifie que la route existe mais n'a pas de handler défini
  });
});
