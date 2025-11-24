# Monorepo Mi Mascota

Este repositorio contiene el frontend (React + Vite) y el backend (Node.js + Express) listos para empaquetarse en un único contenedor Docker para despliegues simples de un MVP/proyecto escolar.

## 1. Estructura recomendada

```
.
├── backend/
│   ├── public/            # Se llena con el build de React (copiado por Docker o npm script)
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── routes/
│       └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── ...
│   └── vite.config.js
├── Dockerfile              # Multi-stage: build frontend + backend + runtime
├── .dockerignore
├── package.json            # Scripts generales opcionales
└── README.md
```

## 2. Backend `backend/src/index.js`

El backend expone APIs en `/api/*` y sirve el build del frontend desde `backend/public`, incluyendo el fallback para rutas SPA:

```javascript
import http from "http";
import app from "./app.js";
import { inicializarBaseDatos } from "./config/db.js";

const intPuerto = Number(process.env.PORT ?? 3000);

const iniciarServidor = async () => {
	try {
		await inicializarBaseDatos();

		const servidor = http.createServer(app);

		servidor.listen(intPuerto, () => {
			console.log(`Servidor escuchando en el puerto ${intPuerto}`);
		});
	} catch (objError) {
		console.error("No fue posible iniciar el servidor", objError);
		process.exit(1);
	}
};

iniciarServidor();
```

En `backend/src/app.js` se agregaron:
- `express.static` apuntando a `backend/public`.
- Wildcard `*` para servir `index.html` en rutas no `/api`.

## 3. Dockerfile multi-stage

> Archivo: `Dockerfile`

```dockerfile
# Stage 1: Build frontend with Vite
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

# Stage 2: Install backend dependencies
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend .

# Stage 3: Final runtime image
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy backend source and dependencies
COPY --from=backend-builder /app/backend ./backend

# Replace backend/public with compiled frontend
RUN rm -rf ./backend/public && mkdir -p ./backend/public
COPY --from=frontend-builder /app/frontend/dist ./backend/public

EXPOSE 3000

CMD ["node", "backend/src/index.js"]
```

## 4. `.dockerignore`

> Archivo: `.dockerignore`

```text
# Node dependencies
node_modules
frontend/node_modules
backend/node_modules

# Build outputs
frontend/dist
backend/public

# Git and IDE
.git
.gitignore
.vscode
.idea

# Environment files
.env
*.local

# Misc
Dockerfile
.dockerignore
npm-debug.log
```

## 5. Construcción y ejecución del contenedor

```powershell
# Construir la imagen (nombre sugerido: mi-mascota)
docker build -t mi-mascota .

# Ejecutar el contenedor, mapeando el puerto 3000
docker run --rm -p 3000:3000 --env-file .env mi-mascota
```

Notas:
- Asegúrate de que `.env` contenga las variables de conexión a la base de datos, JWT y demás configuraciones requeridas por Express.
- El comando `--env-file` es opcional; también puedes usar `-e` por variable.

## 6. Desarrollo local con Vite + proxy

`frontend/vite.config.js` ya incluye el proxy requerido:

```javascript
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true
			}
		}
	}
});
```

Flujo recomendado en desarrollo:
1. Inicia el backend en el puerto 3000 (`npm run dev` dentro de `backend/`).
2. Inicia Vite (`npm run dev` dentro de `frontend/`).
3. Las llamadas a `/api/*` se redirigirán automáticamente al backend.

## 7. Publish workflow sugerido

1. `npm install` en `frontend/` y `backend/` cuando cambien dependencias.
2. `docker build` + `docker run` para validar antes de entregar.
3. Opcional: crea un script en package.json raíz para automatizar el copiado local (`npm run build:web` → `npm --prefix frontend run build && npm run copy:dist`).

Con esto, el monorepo queda listo para empaquetar todo en un contenedor único expuesto en el puerto 3000, sirviendo APIs y contenido estático de la SPA.
