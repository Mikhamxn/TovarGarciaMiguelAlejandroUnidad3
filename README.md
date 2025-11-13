# SH3 · Gestor Ágil de Incidencias

Aplicación web full-stack construida con **React + Vite** en el frontend y **Express** en el backend. El sistema permite gestionar incidencias de un equipo de TI, proteger los recursos mediante autenticación basada en JWT y consumir noticias tecnológicas desde un servicio externo.

## Características principales

- Autenticación con tokens JWT, cifrado de contraseñas (bcrypt) y cabeceras seguras (Helmet).
- API REST propia para administrar incidencias (crear, listar, cambiar estado) protegida por middleware de autorización.
- Integración con un servicio WEB de terceros (Hacker News API) para mostrar noticias relevantes en español.
- Frontend en español con panel ágil, formularios validados y rutas protegidas.
- Pruebas automatizadas con Jest/Supertest (backend) y Vitest + Testing Library (frontend).
- Documentación de arquitectura, metodología ágil, decisiones de diseño y estrategia de pruebas en `docs/`.

## Estructura del repositorio

```
SH3/
├── backend/              # API Express y lógica de negocio
├── frontend/vite-project # Aplicación React con Vite
├── docs/                 # Documentación del caso de estudio
└── README.md             # Este archivo
```

## Puesta en marcha

1. **Instalación inicial**
   ```powershell
   cd SH3
   npm install                # instala scripts compartidos (concurrently)
   npm run install:all        # instala dependencias de backend y frontend
   ```

2. **Configura el backend**
   ```powershell
   cd backend
   copy .env.example .env  # Ajusta secretos y URLs
   ```

3. **Arranque en desarrollo**
   ```powershell
   cd ..
   npm start  # levanta Express y Vite en paralelo
   ```

4. Abre `http://localhost:5173` y autentícate con `admin@sh3.com` / `admin123`.

## Scripts útiles

- `backend`: `npm run test` ejecuta Jest con cobertura.
- `frontend/vite-project`: `npm run test` lanza Vitest en modo unitario.

## Próximos pasos sugeridos

- Persistencia en base de datos (PostgreSQL/MongoDB) con repositorios reales.
- Despliegue continuo mediante pipelines (GitHub Actions o Azure DevOps).
- Internacionalización (i18n) para soportar otros idiomas.
