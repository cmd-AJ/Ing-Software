# Ing-Software × SonarQube

Fork de [cmd-AJ/Ing-Software](https://github.com/cmd-AJ/Ing-Software) (ContratoGT) para el ejercicio de análisis estático con SonarQube. Todo corre local en Docker.

## Levantar

Requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
git clone https://github.com/josuemj/Ing-SoftwarXSonarQube.git
cd Ing-SoftwarXSonarQube
docker compose up -d --build
```

La primera vez tarda ~5-10 minutos. Las API keys y el token de SonarQube se generan solos.

Apagar: `docker compose down` (agregar `-v` para borrar los datos)

## Correr el scanner de SonarQube

El análisis no corre con `docker compose up`; se lanza aparte cuando el stack ya está arriba.

### Manual

1. Entrar a http://localhost:9000 con `admin` / `SonarLocal123!`.
2. Generar un token: *My Account → Security → Generate Tokens*, tipo **Global Analysis Token**. Copiarlo (`sqp_...`).
3. Desde la raíz del repo, correr el scanner con ese token:

   ```powershell
   # PowerShell
   docker run --rm `
     -e SONAR_HOST_URL="http://host.docker.internal:9000" `
     -e SONAR_TOKEN="sqp_tu_token" `
     -v "${PWD}:/usr/src" `
     sonarsource/sonar-scanner-cli
   ```

   ```bash
   # Linux / macOS / Git Bash
   docker run --rm \
     -e SONAR_HOST_URL="http://host.docker.internal:9000" \
     -e SONAR_TOKEN="sqp_tu_token" \
     -v "$(pwd):/usr/src" \
     sonarsource/sonar-scanner-cli
   ```

   Alternativa sin Docker (requiere Node y Java 17+), más rápida en Windows:

   ```bash
   npx @sonar/scan -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqp_tu_token
   ```

4. Esperar a que muestre `ANALYSIS SUCCESSFUL`.
5. Ver los resultados en http://localhost:9000/dashboard?id=Ing-Software-ContratoGT.

### Rápido (token automático)

El stack ya genera un token al arrancar; este comando lo usa directamente:

```bash
docker compose run --rm scanner
```

Para volver a analizar después de cambiar código, repetir el paso 3 (o este comando).

Lo que se analiza está definido en [`sonar-project.properties`](sonar-project.properties): `Scrum/Working/src` (frontend y backend), sin `node_modules`, `dist` ni tests.

> Si tienes `node_modules` instalado en `Scrum/Working`, el análisis puede tardar ~7 minutos (el scanner lo lee a través del volumen montado).

## Recursos

| Servicio | URL | Credenciales |
|---|---|---|
| App | http://localhost:8100 | ver abajo |
| SonarQube | http://localhost:9000 | `admin` / `SonarLocal123!` |
| Resultados del análisis | http://localhost:9000/dashboard?id=Ing-Software-ContratoGT | |
| API | http://localhost:3001/api | header `api-key`: `docker compose exec api cat /keys/app.env` |
| Neo4j | http://localhost:7474 | `neo4j` / `contratogt_local` |
| PostgreSQL | `localhost:5433` | `contratogt` / `contratogt_local` (BD `contratogt`) |

## Usuarios de prueba

| DPI | Contraseña | Rol |
|---|---|---|
| `1000000000101` | `demo1234` | Empleador |
| `1000000000102` | `demo1234` | Empleado (Plomero) |
| `1000000000103` | `demo1234` | Empleado (Electricista) |
| `9000000000001` | `admin1234` | Moderador |
