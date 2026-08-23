#!/bin/sh
# ============================================================
#  docker-entrypoint.sh — Runtime config generator
#
#  Genera /usr/share/nginx/html/config.js en el arranque del
#  contenedor a partir de las variables de entorno del compose.
#
#  Esto permite usar la misma imagen Docker en distintos
#  entornos (dev, staging, prod) simplemente cambiando el .env
#  sin necesidad de rebuild.
#
#  Variables de entorno esperadas (con defaults para dev local):
#    KEYCLOAK_URL     → URL base de Keycloak
#    KEYCLOAK_REALM   → Nombre del realm
#    KEYCLOAK_CLIENT  → Client ID del frontend en Keycloak
#    API_BASE_URL     → URL base de la API del backend
# ============================================================

set -e

CONFIG_FILE="/usr/share/nginx/html/config.js"

echo "[entrypoint] Generando ${CONFIG_FILE}..."

cat > "${CONFIG_FILE}" <<EOF
window.RUNTIME_CONFIG = {
  KEYCLOAK_URL:    "${KEYCLOAK_URL:-http://localhost:8180}",
  KEYCLOAK_REALM:  "${KEYCLOAK_REALM:-iye}",
  KEYCLOAK_CLIENT: "${KEYCLOAK_CLIENT:-iye-frontend}",
  API_BASE_URL:    "${API_BASE_URL:-http://localhost:8080/api}"
};
EOF

echo "[entrypoint] config.js generado:"
cat "${CONFIG_FILE}"
echo ""
echo "[entrypoint] Iniciando Nginx..."

exec "$@"
