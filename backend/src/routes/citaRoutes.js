import { Router } from "express";
import { citaController } from "../controllers/citaController.js";
import { validarAuth } from "../middlewares/authMiddleware.js";

const rutasCitas = Router();

rutasCitas.get("/api/mascotas/:intMascota/citas", validarAuth, citaController.listarPorMascota);
rutasCitas.post("/api/mascotas/:intMascota/citas", validarAuth, citaController.crear);
rutasCitas.put("/api/citas/:intCita", validarAuth, citaController.actualizar);
rutasCitas.delete("/api/citas/:intCita", validarAuth, citaController.eliminar);

export default rutasCitas;
