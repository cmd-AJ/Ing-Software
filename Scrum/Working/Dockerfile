FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Las API keys se compilan como marcadores y se reemplazan al arrancar el contenedor
# (docker/40-inject-keys.sh), así el build no depende de las keys generadas.
ENV VITE_API_PROTOCOL=http \
    VITE_API_HOSTI=localhost:3001 \
    VITE_API_KEY=__VITE_API_KEY__ \
    VITE_ADMIN_API_KEY=__VITE_ADMIN_API_KEY__

COPY . .
RUN npx vite build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --chmod=755 docker/40-inject-keys.sh /docker-entrypoint.d/40-inject-keys.sh
COPY --from=build /app/dist /usr/share/nginx/dist
EXPOSE 80
