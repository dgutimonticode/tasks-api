const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET    /api/tasks       → listar todas las tareas
router.get('/', taskController.getAll);

// GET    /api/tasks/:id   → obtener una tarea por ID
router.get('/:id', taskController.getById);

// POST   /api/tasks       → crear una nueva tarea
router.post('/', taskController.create);

// PUT    /api/tasks/:id   → actualizar una tarea existente
router.put('/:id', taskController.update);

// DELETE /api/tasks/:id   → eliminar una tarea
router.delete('/:id', taskController.delete);

module.exports = router;
