import { validarHistorial } from "../validators/historialValidator.js";
import { mascotaService } from "./mascotaService.js";
import { HistorialMedico } from "../database/models/index.js";

const mapearHistorial = (objHistorial) => {
  const objDatos = objHistorial.get({ plain: true });

  return {
    intHistorial: objDatos.intHistorial,
    intMascota: objDatos.intMascota,
    dtFechaConsulta: objDatos.dtFechaConsulta ? new Date(objDatos.dtFechaConsulta).toISOString() : null,
    strDiagnostico: objDatos.strDiagnostico,
    strTratamiento: objDatos.strTratamiento,
    strNotas: objDatos.strNotas,
    strVeterinario: objDatos.strVeterinario,
    blnActivo: Boolean(objDatos.blnActivo)
  };
};

export const historialService = {
  async listarPorMascota(intMascota, intUsuario) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    const arrHistorial = await HistorialMedico.findAll({
      where: {
        intMascota,
        blnActivo: true
      },
      order: [["dtFechaConsulta", "DESC"]]
    });

    return arrHistorial.map(mapearHistorial);
  },

  async crear(intMascota, intUsuario, objDatos) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);
    validarHistorial(objDatos);

    const objHistorial = await HistorialMedico.create({
      intMascota,
      dtFechaConsulta: objDatos.dtFechaConsulta,
      strDiagnostico: objDatos.strDiagnostico,
      strTratamiento: objDatos.strTratamiento ?? null,
      strNotas: objDatos.strNotas ?? null,
      strVeterinario: objDatos.strVeterinario ?? null,
      blnActivo: true
    });

    return mapearHistorial(objHistorial);
  },

  async actualizar(intHistorial, intUsuario, objDatos) {
    validarHistorial(objDatos);

    const objHistorial = await HistorialMedico.findOne({
      where: {
        intHistorial,
        blnActivo: true
      }
    });

    if (!objHistorial) {
      const objError = new Error("Registro de historial no encontrado");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objHistorial.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objHistorial.set({
      dtFechaConsulta: objDatos.dtFechaConsulta,
      strDiagnostico: objDatos.strDiagnostico,
      strTratamiento: objDatos.strTratamiento ?? null,
      strNotas: objDatos.strNotas ?? null,
      strVeterinario: objDatos.strVeterinario ?? null
    });

    await objHistorial.save();

    return mapearHistorial(objHistorial);
  },

  async eliminar(intHistorial, intUsuario) {
    const objHistorial = await HistorialMedico.findOne({
      where: {
        intHistorial,
        blnActivo: true
      }
    });

    if (!objHistorial) {
      const objError = new Error("Registro de historial no encontrado");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objHistorial.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objHistorial.blnActivo = false;
    await objHistorial.save();
  }
};
