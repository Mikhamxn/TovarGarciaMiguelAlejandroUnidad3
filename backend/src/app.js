import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { registrarRutas } from "./routes/index.js";
import { manejarErrores } from "./middlewares/errorHandler.js";

const objApp = express();

const objLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_MINUTOS ?? 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_SOLICITUDES ?? 100),
  standardHeaders: true,
  legacyHeaders: false
});
objApp.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false, // <- apagamos la CSP interna
  })
);

// CSP propia, única y final
objApp.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "font-src 'self' https: data:",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "img-src 'self' data: https: https://images.dog.ceo",
      "object-src 'none'",
      "script-src 'self'",
      "script-src-attr 'none'",
      "style-src 'self' https: 'unsafe-inline'",
      "upgrade-insecure-requests",
    ].join("; ")
  );
  next();
});

objApp.use(cors({ origin: process.env.CORS_ORIGENES?.split(",") ?? "*" }));
objApp.use(objLimiter);
objApp.use(express.json());
objApp.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

registrarRutas(objApp);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const strDirPublico = path.resolve(__dirname, "../public");

objApp.use(express.static(strDirPublico));

objApp.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  return res.sendFile(path.join(strDirPublico, "index.html"));
});

objApp.use((req, res) => {
  res.status(404).json({ blnExito: false, strMensaje: "Recurso no encontrado" });
});

objApp.use(manejarErrores);

export default objApp;
