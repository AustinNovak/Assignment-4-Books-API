const request = require('supertest');
const app = require('../server');

describe('Books API', () => {
  test('GET /api/books returns all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/books/:id returns a specific book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('POST /api/books creates a new book', async () => {
    const newBook = {
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      copiesAvailable: 4
    };
    const res = await request(app).post('/api/books').send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Dune');
  });

  test('PUT /api/books/:id updates an existing book', async () => {
    const res = await request(app).put('/api/books/1').send({ copiesAvailable: 9 });
    expect(res.statusCode).toBe(200);
    expect(res.body.copiesAvailable).toBe(9);
  });

  test('DELETE /api/books/:id removes a book', async () => {
    const res = await request(app).delete('/api/books/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(2);
  });

  test('GET /api/books/:id returns 404 if not found', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.statusCode).toBe(404);
  });
});
