import { Router } from "express";
import { vacunaController } from "../controllers/vacunaController.js";
import { validarAuth } from "../middlewares/authMiddleware.js";

const rutasVacunas = Router();

rutasVacunas.get("/api/mascotas/:intMascota/vacunas", validarAuth, vacunaController.listarPorMascota);
rutasVacunas.post("/api/mascotas/:intMascota/vacunas", validarAuth, vacunaController.crear);
rutasVacunas.put("/api/vacunas/:intVacuna", validarAuth, vacunaController.actualizar);
rutasVacunas.delete("/api/vacunas/:intVacuna", validarAuth, vacunaController.eliminar);

export default rutasVacunas;
