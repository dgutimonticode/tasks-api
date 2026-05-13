# Tasks API 📝

API REST para gestión de tareas con operaciones CRUD completas, construida con **Node.js** y **Express**.

## Endpoints

| Método | Ruta              | Descripción               |
|--------|-------------------|---------------------------|
| GET    | `/health`         | Verificar estado del API  |
| GET    | `/api/tasks`      | Listar todas las tareas   |
| GET    | `/api/tasks/:id`  | Obtener una tarea por ID  |
| POST   | `/api/tasks`      | Crear una nueva tarea     |
| PUT    | `/api/tasks/:id`  | Actualizar una tarea      |
| DELETE | `/api/tasks/:id`  | Eliminar una tarea        |

## Instalación

```bash
npm install
```

## Uso

```bash
# Iniciar servidor
npm start

# Ejecutar tests
npm test

# Tests con cobertura
npm run test:coverage

# Linting
npm run lint
```

## Ejemplo de uso

```bash
# Crear tarea
curl -X POST http://98.93.81.182/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudiar CI/CD", "description": "Completar laboratorio 5.1"}'

# Listar tareas
curl http://98.93.81.182/api/tasks
```

## Documentación del Laboratorio

Puedes encontrar el informe completo con capturas de pantalla y evidencias en el siguiente enlace:

- [Ver informe del laboratorio 5.1](./INFORME.md)

- [Ver informe del laboratorio 5.2](./INFORME_LAB52.md)

## Estado del CI
