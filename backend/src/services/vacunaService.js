import { validarVacuna } from "../validators/vacunaValidator.js";
import { mascotaService } from "./mascotaService.js";
import { Vacuna } from "../database/models/index.js";

const mapearVacuna = (objVacuna) => {
  const objDatos = objVacuna.get({ plain: true });

  return {
    intVacuna: objDatos.intVacuna,
    intMascota: objDatos.intMascota,
    strNombreVacuna: objDatos.strNombreVacuna,
    dtFechaAplicacion: objDatos.dtFechaAplicacion ? new Date(objDatos.dtFechaAplicacion).toISOString() : null,
    dtFechaRefuerzo: objDatos.dtFechaRefuerzo ? new Date(objDatos.dtFechaRefuerzo).toISOString() : null,
    strVeterinario: objDatos.strVeterinario,
    strObservaciones: objDatos.strObservaciones,
    intCatTipoVacuna: objDatos.intCatTipoVacuna,
    blnActivo: Boolean(objDatos.blnActivo)
  };
};

export const vacunaService = {
  async listarPorMascota(intMascota, intUsuario) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    const arrVacunas = await Vacuna.findAll({
      where: {
        intMascota,
        blnActivo: true
      },
      order: [["dtFechaAplicacion", "DESC"]]
    });

    return arrVacunas.map(mapearVacuna);
  },

  async crear(intMascota, intUsuario, objDatos) {
    await mascotaService.obtenerDetalle(intMascota, intUsuario);
    validarVacuna(objDatos);

    const objVacuna = await Vacuna.create({
      intMascota,
      intCatTipoVacuna: objDatos.intCatTipoVacuna ?? null,
      strNombreVacuna: objDatos.strNombreVacuna,
      dtFechaAplicacion: objDatos.dtFechaAplicacion,
      dtFechaRefuerzo: objDatos.dtFechaRefuerzo ?? null,
      strVeterinario: objDatos.strVeterinario ?? null,
      strObservaciones: objDatos.strObservaciones ?? null,
      blnActivo: true
    });

    return mapearVacuna(objVacuna);
  },

  async actualizar(intVacuna, intUsuario, objDatos) {
    validarVacuna(objDatos);

    const objVacuna = await Vacuna.findOne({
      where: {
        intVacuna,
        blnActivo: true
      }
    });

    if (!objVacuna) {
      const objError = new Error("Vacuna no encontrada");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objVacuna.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objVacuna.set({
      intCatTipoVacuna: objDatos.intCatTipoVacuna ?? null,
      strNombreVacuna: objDatos.strNombreVacuna,
      dtFechaAplicacion: objDatos.dtFechaAplicacion,
      dtFechaRefuerzo: objDatos.dtFechaRefuerzo ?? null,
      strVeterinario: objDatos.strVeterinario ?? null,
      strObservaciones: objDatos.strObservaciones ?? null
    });

    await objVacuna.save();

    return mapearVacuna(objVacuna);
  },

  async eliminar(intVacuna, intUsuario) {
    const objVacuna = await Vacuna.findOne({
      where: {
        intVacuna,
        blnActivo: true
      }
    });

    if (!objVacuna) {
      const objError = new Error("Vacuna no encontrada");
      objError.status = 404;
      throw objError;
    }

    const intMascota = objVacuna.intMascota;
    await mascotaService.obtenerDetalle(intMascota, intUsuario);

    objVacuna.blnActivo = false;
    await objVacuna.save();
  }
};
