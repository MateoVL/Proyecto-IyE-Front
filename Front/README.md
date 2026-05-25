# 🚀 CrónicoTrack - Frontend Production Build

Este directorio contiene la configuración óptima para construir y desplegar el frontend de la plataforma en producción utilizando Docker de manera ligera y ultra-rápida.

---

## 🛠️ Requisitos previos

- Tener [Docker](https://docs.docker.com/get-docker/) instalado y en ejecución en tu sistema.

---

## 🐳 Despliegue con Docker

La aplicación está configurada para compilarse y servirse utilizando **Nginx** expuesto en el puerto **`5173`** (manteniendo coherencia con el puerto de desarrollo).

### 1. Construir la imagen de Docker

Desde la raíz del directorio `/Front`, ejecuta el siguiente comando (usamos `--load` para forzar a que guarde la imagen en tu registro de Docker local al usar constructores personalizados):

```bash
docker build -t cronicotrak-frontend .
```

### 2. Correr el contenedor de producción

Para correr el contenedor mapeando el puerto **`5173`** de tu máquina local al puerto **`5173`** interno del contenedor de Nginx:

```bash
docker run -d -p 5173:5173 --name cronicotrak-front-app cronicotrak-frontend
```

La aplicación web ahora estará disponible y lista en producción en **[http://localhost:5173](http://localhost:5173)**.

---

## ⚙️ Detalles Técnicos de Optimización

1. **Construcción Multi-etapa (Multi-stage Build):**
   - **Fase de Compilación:** Usa una imagen base `node:20-alpine` ligera y gestiona el empaquetado con `pnpm` con uso óptimo de caché de capas Docker.
   - **Fase de Ejecución:** Todo el entorno Node y la pesada carpeta `node_modules` son descartados del contenedor final. Solo se mueven los archivos estáticos listos a una imagen limpia de `nginx:1.25-alpine`.
   - **Tamaño de Imagen:** La imagen final del contenedor pesa alrededor de **~28 MB**.

2. **Configuración Nginx (`nginx.conf`):**
   - **Soporte SPA:** Redirección automática de cualquier ruta no física a `index.html` para que `react-router-dom` maneje la navegación del cliente sin errores 404.
   - **Políticas de Caché Eficiente:** Caché estricto de assets y recursos por 1 mes, asegurando que `index.html` nunca sea cacheado para evitar que los usuarios queden atascados con versiones viejas después de un nuevo despliegue.


# Dashboard para director médico

  This is a code bundle for Dashboard para director médico. The original project is available at https://www.figma.com/design/nJcV0uaJ7V3HxTX9kt4nKy/Dashboard-para-director-m%C3%A9dico.

  ## Installing pnpm

  Run `npm install -g pnpm` 

  ## Running the code

  Run `pnpm i` to install the dependencies.

  Run `pnpm add react-router-dom` to install the dependencies.

  Run `pnpm add -D @types/react @types/react-dom` to install the dependencies.

  Run `pnpm add -D typescript` to install the dependencies.

  Run `pnpm dev` to start the development server.
  