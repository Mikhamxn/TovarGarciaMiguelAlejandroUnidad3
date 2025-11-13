import rutasAuth from "./authRoutes.js";
import rutasMascotas from "./mascotaRoutes.js";
import rutasVacunas from "./vacunaRoutes.js";
import rutasCitas from "./citaRoutes.js";
import rutasAlergias from "./alergiaRoutes.js";
import rutasHistorial from "./historialRoutes.js";

export const registrarRutas = (objApp) => {
  objApp.use(rutasAuth);
  objApp.use(rutasMascotas);
  objApp.use(rutasVacunas);
  objApp.use(rutasCitas);
  objApp.use(rutasAlergias);
  objApp.use(rutasHistorial);
};
