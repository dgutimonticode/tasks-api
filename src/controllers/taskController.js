const taskRepository = require('../repositories/taskRepository');

const taskController = {
  getAll(req, res) {
    const tasks = taskRepository.findAll();
    res.status(200).json(tasks);
  },

  getById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID debe ser un número válido' });
    }
    const task = taskRepository.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  },

  create(req, res) {
    const { title, description } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El campo title es obligatorio' });
    }
    const task = taskRepository.create({ title: title.trim(), description });
    res.status(201).json(task);
  },

  update(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID debe ser un número válido' });
    }
    const { title, description, completed } = req.body;
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ error: 'El campo title no puede estar vacío' });
    }
    const updated = taskRepository.update(id, { title, description, completed });
    if (!updated) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(updated);
  },

  delete(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID debe ser un número válido' });
    }
    const deleted = taskRepository.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  },
};

module.exports = taskController;
