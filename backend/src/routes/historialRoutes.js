import { Router } from "express";
import { historialController } from "../controllers/historialController.js";
import { validarAuth } from "../middlewares/authMiddleware.js";

const rutasHistorial = Router();

rutasHistorial.get("/api/mascotas/:intMascota/historial", validarAuth, historialController.listarPorMascota);
rutasHistorial.post("/api/mascotas/:intMascota/historial", validarAuth, historialController.crear);
rutasHistorial.put("/api/historial/:intHistorial", validarAuth, historialController.actualizar);
rutasHistorial.delete("/api/historial/:intHistorial", validarAuth, historialController.eliminar);

export default rutasHistorial;
