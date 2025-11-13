import { Router } from "express";
import { mascotaController } from "../controllers/mascotaController.js";
import { validarAuth } from "../middlewares/authMiddleware.js";

const rutasMascotas = Router();

rutasMascotas.get("/api/mascotas", validarAuth, mascotaController.listar);
rutasMascotas.get("/api/mascotas/:intMascota", validarAuth, mascotaController.obtener);
rutasMascotas.post("/api/mascotas", validarAuth, mascotaController.crear);
rutasMascotas.put("/api/mascotas/:intMascota", validarAuth, mascotaController.actualizar);
rutasMascotas.delete("/api/mascotas/:intMascota", validarAuth, mascotaController.eliminar);

export default rutasMascotas;
