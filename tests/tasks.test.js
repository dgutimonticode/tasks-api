const request = require('supertest');
const app = require('../src/app');
const taskRepository = require('../src/repositories/taskRepository');

// Limpiar el estado antes de cada test para aislamiento
beforeEach(() => {
  taskRepository._reset();
});

// ─────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────
describe('GET /health', () => {
  test('debe retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.version).toBe('2.0.0');
  });
});

// ─────────────────────────────────────────
// GET /api/tasks
// ─────────────────────────────────────────
describe('GET /api/tasks', () => {
  test('debe retornar un array vacío cuando no hay tareas', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('debe retornar todas las tareas existentes', async () => {
    await request(app).post('/api/tasks').send({ title: 'Tarea 1' });
    await request(app).post('/api/tasks').send({ title: 'Tarea 2' });

    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

// ─────────────────────────────────────────
// GET /api/tasks/:id
// ─────────────────────────────────────────
describe('GET /api/tasks/:id', () => {
  test('debe retornar una tarea existente por ID', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Mi tarea', description: 'Descripción' });

    const res = await request(app).get(`/api/tasks/${created.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Mi tarea');
    expect(res.body.description).toBe('Descripción');
  });

  test('debe retornar 404 si la tarea no existe', async () => {
    const res = await request(app).get('/api/tasks/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('debe retornar 400 si el ID no es válido', async () => {
    const res = await request(app).get('/api/tasks/abc');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

// ─────────────────────────────────────────
// POST /api/tasks
// ─────────────────────────────────────────
describe('POST /api/tasks', () => {
  test('debe crear una nueva tarea correctamente', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Nueva tarea', description: 'Detalle' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Nueva tarea');
    expect(res.body.completed).toBe(false);
    expect(res.body).toHaveProperty('createdAt');
  });

  test('debe retornar 400 si falta el campo title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Sin título' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('debe retornar 400 si el title está vacío', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' });

    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────
// PUT /api/tasks/:id
// ─────────────────────────────────────────
describe('PUT /api/tasks/:id', () => {
  test('debe actualizar una tarea existente', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Original' });

    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Actualizada', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Actualizada');
    expect(res.body.completed).toBe(true);
  });

  test('debe retornar 404 si la tarea no existe', async () => {
    const res = await request(app)
      .put('/api/tasks/999')
      .send({ title: 'No existe' });

    expect(res.statusCode).toBe(404);
  });

  test('debe retornar 400 si el ID no es válido', async () => {
    const res = await request(app)
      .put('/api/tasks/abc')
      .send({ title: 'Test' });

    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────
// DELETE /api/tasks/:id
// ─────────────────────────────────────────
describe('DELETE /api/tasks/:id', () => {
  test('debe eliminar una tarea existente', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Para eliminar' });

    const res = await request(app).delete(`/api/tasks/${created.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarea eliminada correctamente');

    // Verificar que realmente fue eliminada
    const check = await request(app).get(`/api/tasks/${created.body.id}`);
    expect(check.statusCode).toBe(404);
  });

  test('debe retornar 404 si la tarea no existe', async () => {
    const res = await request(app).delete('/api/tasks/999');
    expect(res.statusCode).toBe(404);
  });

  test('debe retornar 400 si el ID no es válido', async () => {
    const res = await request(app).delete('/api/tasks/abc');
    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────
// Ruta no encontrada
// ─────────────────────────────────────────
describe('Ruta no encontrada', () => {
  test('debe retornar 404 para rutas inexistentes', async () => {
    const res = await request(app).get('/ruta-inexistente');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
