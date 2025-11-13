import { validarAlergia } from "../validators/alergiaValidator.js";
import { mascotaService } from "./mascotaService.js";
import { Alergia } from "../database/models/index.js";

const mapearAlergia = (objAlergia) => {
  const objDatos = objAlergia.get({ plain: true });

  return {
    intAlergia: objDatos.intAlergia,
    intMascota: objDatos.intMascota,
    strNombre: objDatos.strNombre,
    strSintomas: objDatos.strSintomas,
    strTratamiento: objDatos.strTratamiento,
    strNotas: objDatos.strNotas,
    blnActivo: Boolean(objDatos.blnActivo)
  };
};

export const alergiaService = {
  async listarPorMascota(intMascota, intUsuario) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    const arrAlergias = await Alergia.findAll({
      where: {
        intMascota,
        blnActivo: true
      },
      order: [["intAlergia", "DESC"]]
    });

    return arrAlergias.map(mapearAlergia);
  },

  async crear(intMascota, intUsuario, objDatos) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);
    validarAlergia(objDatos);

    const objAlergia = await Alergia.create({
      intMascota,
      strNombre: objDatos.strNombre,
      strSintomas: objDatos.strSintomas ?? null,
      strTratamiento: objDatos.strTratamiento ?? null,
      strNotas: objDatos.strNotas ?? null,
      blnActivo: true
    });

    return mapearAlergia(objAlergia);
  },

  async actualizar(intAlergia, intUsuario, objDatos) {
    validarAlergia(objDatos);

    const objAlergia = await Alergia.findOne({
      where: {
        intAlergia,
        blnActivo: true
      }
    });

    if (!objAlergia) {
      const objError = new Error("Alergia no encontrada");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objAlergia.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objAlergia.set({
      strNombre: objDatos.strNombre,
      strSintomas: objDatos.strSintomas ?? null,
      strTratamiento: objDatos.strTratamiento ?? null,
      strNotas: objDatos.strNotas ?? null
    });

    await objAlergia.save();

    return mapearAlergia(objAlergia);
  },

  async eliminar(intAlergia, intUsuario) {
    const objAlergia = await Alergia.findOne({
      where: {
        intAlergia,
        blnActivo: true
      }
    });

    if (!objAlergia) {
      const objError = new Error("Alergia no encontrada");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objAlergia.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objAlergia.blnActivo = false;
    await objAlergia.save();
  }
};
