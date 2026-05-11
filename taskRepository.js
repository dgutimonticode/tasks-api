// Repositorio en memoria — simula una base de datos
let tasks = [];
let nextId = 1;

const taskRepository = {
  findAll() {
    return [...tasks];
  },

  findById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create(data) {
    const task = {
      id: nextId++,
      title: data.title,
      description: data.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  update(id, data) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
  },

  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  // Utilidad para tests: limpiar el estado
  _reset() {
    tasks = [];
    nextId = 1;
  },
};

module.exports = taskRepository;
