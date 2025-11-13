import { Router } from "express";
import { alergiaController } from "../controllers/alergiaController.js";
import { validarAuth } from "../middlewares/authMiddleware.js";

const rutasAlergias = Router();

rutasAlergias.get("/api/mascotas/:intMascota/alergias", validarAuth, alergiaController.listarPorMascota);
rutasAlergias.post("/api/mascotas/:intMascota/alergias", validarAuth, alergiaController.crear);
rutasAlergias.put("/api/alergias/:intAlergia", validarAuth, alergiaController.actualizar);
rutasAlergias.delete("/api/alergias/:intAlergia", validarAuth, alergiaController.eliminar);

export default rutasAlergias;
