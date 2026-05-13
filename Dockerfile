# ── Etapa 1: Builder ──────────────────────────────
# Usamos alpine porque es la versión más ligera de Node
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos solo package.json primero
# Si el código cambia pero las dependencias no,
# Docker usa caché y no reinstala todo
COPY package*.json ./
RUN npm ci --only=production

# Ahora copiamos el código fuente
COPY src/ ./src/

# ── Etapa 2: Runtime ──────────────────────────────
# Nueva imagen limpia, sin rastros del builder
FROM node:20-alpine
WORKDIR /app

# Copiamos SOLO lo necesario desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

# Documentamos que la app usa el puerto 3000
EXPOSE 3000

# Comando para arrancar la aplicación
CMD ["node", "src/server.js"]
