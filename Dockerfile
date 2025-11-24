FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend .

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=backend-builder /app/backend ./backend

RUN rm -rf ./backend/public && mkdir -p ./backend/public
COPY --from=frontend-builder /app/frontend/dist ./backend/public

EXPOSE 3000

CMD ["node", "backend/src/index.js"]
