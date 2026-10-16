#!/bin/sh
# Prepara SonarQube para el scanner:
#   1. Espera a que el servidor esté UP.
#   2. Si admin aún tiene la contraseña por defecto, la cambia a SONAR_ADMIN_PASSWORD.
#   3. Genera un token de análisis global y lo guarda en /keys/sonar_token.
# Si ya hay un token válido guardado, no hace nada.
set -eu

SONAR=http://sonarqube:9000
ADMIN_PASSWORD="${SONAR_ADMIN_PASSWORD:-SonarLocal123!}"
TOKEN_FILE=/keys/sonar_token

is_valid() { curl -s -u "$1" "$SONAR/api/authentication/validate" | grep -q '"valid":true'; }

echo "Esperando a que SonarQube esté listo..."
until curl -s "$SONAR/api/system/status" | grep -q '"status":"UP"'; do sleep 5; done
echo "SonarQube listo."

if [ -s "$TOKEN_FILE" ] && is_valid "$(cat "$TOKEN_FILE"):"; then
  echo "Token de análisis existente y válido."
  exit 0
fi

if is_valid "admin:admin"; then
  curl -s -f -u admin:admin -X POST "$SONAR/api/users/change_password" \
    --data-urlencode login=admin \
    --data-urlencode previousPassword=admin \
    --data-urlencode "password=$ADMIN_PASSWORD" >/dev/null
  echo "Contraseña de admin cambiada (ver SONAR_ADMIN_PASSWORD en el README)."
fi

if ! is_valid "admin:$ADMIN_PASSWORD"; then
  echo "ERROR: no se pudo autenticar como admin." >&2
  echo "Si cambiaste la contraseña manualmente, define SONAR_ADMIN_PASSWORD en .env." >&2
  exit 1
fi

response=$(curl -s -u "admin:$ADMIN_PASSWORD" -X POST "$SONAR/api/user_tokens/generate" \
  --data-urlencode "name=scanner-$(date +%s)" \
  --data-urlencode type=GLOBAL_ANALYSIS_TOKEN)
token=$(echo "$response" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$token" ]; then
  echo "ERROR: no se pudo generar el token: $response" >&2
  exit 1
fi

printf '%s' "$token" > "$TOKEN_FILE"
echo "Token de análisis generado."
