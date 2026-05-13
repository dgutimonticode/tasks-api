# Informe - Laboratorio 5.1: Workflow de GitHub Actions para CI

## 1. Descripción del Proyecto

**Tasks API** es una API REST para gestión de tareas construida con Node.js y Express.
Expone operaciones CRUD completas sobre la entidad `Task` con validaciones de entrada y manejo de errores.

### Entidad: Task

| Campo       | Tipo    | Descripción                        |
|-------------|---------|------------------------------------|
| id          | number  | Identificador único (autogenerado) |
| title       | string  | Título de la tarea (obligatorio)   |
| description | string  | Descripción opcional               |
| completed   | boolean | Estado de completado               |
| createdAt   | string  | Fecha de creación (ISO 8601)       |

---

## 2. Pipeline de CI Configurado

El workflow `.github/workflows/ci.yml` ejecuta los siguientes pasos en **dos versiones de Node.js en paralelo (18 y 20)**:

| Paso | Descripción |
|------|-------------|
| ✅ Checkout | Clona el código del repositorio |
| ✅ Setup Node.js | Configura la versión de Node con caché de npm |
| ✅ Instalar dependencias | Ejecuta `npm ci` |
| ✅ Linting | Analiza el código con ESLint |
| ✅ Pruebas + Cobertura | Ejecuta todos los tests con `jest --coverage` |
| ✅ Artefacto | Sube el reporte de cobertura como artefacto descargable |

---

## 3. Evidencias

### 3.1 Historial de ejecuciones
![Historial](https://raw.githubusercontent.com/dgutimonticode/tasks-api/main/img/1.historial%20de%20ejecuciones.png)

### 3.2 Workflow exitoso con cobertura
![Workflow exitoso](https://raw.githubusercontent.com/dgutimonticode/tasks-api/main/img/2.1Ejec_pruebas_covert.png)

### 3.3 Workflow fallido
![Workflow fallido](https://raw.githubusercontent.com/dgutimonticode/tasks-api/main/img/3.fallo-intencional.png)

### 3.4 Protección de rama
![Branch protection 1](https://raw.githubusercontent.com/dgutimonticode/tasks-api/main/img/4.png)
![Branch protection 2](https://raw.githubusercontent.com/dgutimonticode/tasks-api/main/img/4.1.png)

### 3.5 Pull Request bloqueado
![PR bloqueado](https://raw.githubusercontent.com/dgutimonticode/tasks-api/main/img/5.png)

---

## 4. Conclusiones

CI (Integración Continua) aporta al proyecto los siguientes beneficios:

- **Detección temprana de errores:** cualquier cambio que rompa una prueba o viole las reglas de estilo es detectado automáticamente antes de fusionarse.
- **Confianza en el código:** la rama `main` siempre contiene código verificado y funcional.
- **Calidad consistente:** el linting garantiza un estilo de código uniforme sin depender de revisiones manuales.
- **Cobertura visible:** el reporte de cobertura permite identificar qué partes del código aún no están cubiertas por pruebas.
- **Proceso repetible:** el pipeline se ejecuta de forma idéntica en cada push, eliminando el factor humano del proceso de validación.
