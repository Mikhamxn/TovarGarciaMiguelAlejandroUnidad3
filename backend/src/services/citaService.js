import { validarCita } from "../validators/citaValidator.js";
import { mascotaService } from "./mascotaService.js";
import { Cita } from "../database/models/index.js";

const mapearCita = (objCita) => {
  const objDatos = objCita.get({ plain: true });

  return {
    intCita: objDatos.intCita,
    intMascota: objDatos.intMascota,
    intCatTipoCita: objDatos.intCatTipoCita,
    dtFechaCita: objDatos.dtFechaCita ? new Date(objDatos.dtFechaCita).toISOString() : null,
    strMotivo: objDatos.strMotivo,
    strVeterinario: objDatos.strVeterinario,
    strUbicacion: objDatos.strUbicacion,
    strNotas: objDatos.strNotas,
    blnConfirmada: Boolean(objDatos.blnConfirmada),
    blnCancelada: Boolean(objDatos.blnCancelada)
  };
};

export const citaService = {
  async listarPorMascota(intMascota, intUsuario) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    const arrCitas = await Cita.findAll({
      where: {
        intMascota
      },
      order: [["dtFechaCita", "DESC"]]
    });

    return arrCitas.map(mapearCita);
  },

  async crear(intMascota, intUsuario, objDatos) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);
    validarCita(objDatos);

    const objCita = await Cita.create({
      intMascota,
      intCatTipoCita: objDatos.intCatTipoCita ?? null,
      dtFechaCita: objDatos.dtFechaCita,
      strMotivo: objDatos.strMotivo,
      strVeterinario: objDatos.strVeterinario ?? null,
      strUbicacion: objDatos.strUbicacion ?? null,
      strNotas: objDatos.strNotas ?? null,
      blnConfirmada: Boolean(objDatos.blnConfirmada ?? false),
      blnCancelada: Boolean(objDatos.blnCancelada ?? false)
    });

    return mapearCita(objCita);
  },

  async actualizar(intCita, intUsuario, objDatos) {
    validarCita(objDatos);

    const objCita = await Cita.findOne({ where: { intCita } });

    if (!objCita) {
      const objError = new Error("Cita no encontrada");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objCita.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objCita.set({
      intCatTipoCita: objDatos.intCatTipoCita ?? null,
      dtFechaCita: objDatos.dtFechaCita,
      strMotivo: objDatos.strMotivo,
      strVeterinario: objDatos.strVeterinario ?? null,
      strUbicacion: objDatos.strUbicacion ?? null,
      strNotas: objDatos.strNotas ?? null,
      blnConfirmada: Boolean(objDatos.blnConfirmada ?? false),
      blnCancelada: Boolean(objDatos.blnCancelada ?? false)
    });

    await objCita.save();

    return mapearCita(objCita);
  },

  async eliminar(intCita, intUsuario) {
    const objCita = await Cita.findOne({ where: { intCita } });

    if (!objCita) {
      const objError = new Error("Cita no encontrada");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objCita.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    await objCita.destroy();
  }
};
