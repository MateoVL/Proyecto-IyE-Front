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

# Script que genera config.js en runtime a partir de env vars del compose.
# Permite desplegar la misma imagen en distintos entornos sin rebuild.
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
