import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { registrarRutas } from "./routes/index.js";
import { manejarErrores } from "./middlewares/errorHandler.js";

const objApp = express();

const objLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_MINUTOS ?? 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_SOLICITUDES ?? 100),
  standardHeaders: true,
  legacyHeaders: false
});

objApp.use(helmet());
objApp.use(cors({ origin: process.env.CORS_ORIGENES?.split(",") ?? "*" }));
objApp.use(objLimiter);
objApp.use(express.json());
objApp.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

registrarRutas(objApp);

objApp.use((req, res) => {
  res.status(404).json({ blnExito: false, strMensaje: "Recurso no encontrado" });
});

objApp.use(manejarErrores);

export default objApp;
