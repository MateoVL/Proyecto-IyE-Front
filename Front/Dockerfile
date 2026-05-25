# --- Stage 1: Build Stage ---
FROM node:22-alpine AS builder

# Habilitar corepack para usar pnpm de forma nativa y eficiente
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de definición de dependencias para aprovechar la caché de capas de Docker
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Instalar dependencias utilizando pnpm de forma óptima
RUN pnpm install --frozen-lockfile

# Copiar el resto del código del frontend
COPY . .

# Compilar la aplicación para producción (genera la carpeta dist/)
RUN pnpm build

# --- Stage 2: Production Stage ---
FROM nginx:1.25-alpine

# Copiar configuración personalizada de Nginx para SPA (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos compilados desde la etapa anterior al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 5173
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
