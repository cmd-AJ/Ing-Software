#!/bin/sh
# Genera las API keys de la app la primera vez y las guarda en el volumen compartido /keys.
# La API y el frontend las leen al arrancar, así que siempre coinciden.
set -eu

KEYS_FILE=/keys/app.env

if [ -s "$KEYS_FILE" ]; then
  echo "API keys ya existen en $KEYS_FILE"
  exit 0
fi

gen() { head -c 24 /dev/urandom | od -An -tx1 | tr -d ' \n'; }

printf 'API_KEY=%s\nADMIN_API_KEY=%s\n' "$(gen)" "$(gen)" > "$KEYS_FILE"
echo "API keys generadas en $KEYS_FILE"
