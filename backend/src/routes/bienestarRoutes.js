import { Router } from "express";
import { bienestarController } from "../controllers/bienestarController.js";
import { validarAuth } from "../middlewares/authMiddleware.js";

const rutasBienestar = Router();

rutasBienestar.get("/api/bienestar/dato-curioso", validarAuth, bienestarController.obtenerDatoCurioso);

export default rutasBienestar;
