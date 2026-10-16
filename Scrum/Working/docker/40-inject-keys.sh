#!/bin/sh
# Lo ejecuta nginx al arrancar (/docker-entrypoint.d): copia el build limpio y
# reemplaza los marcadores de las API keys por las generadas en /keys/app.env.
set -eu

. /keys/app.env

rm -rf /usr/share/nginx/html/*
cp -r /usr/share/nginx/dist/. /usr/share/nginx/html/
find /usr/share/nginx/html -name '*.js' -exec \
  sed -i "s/__VITE_API_KEY__/$API_KEY/g; s/__VITE_ADMIN_API_KEY__/$ADMIN_API_KEY/g" {} +

echo "API keys inyectadas en el frontend."
