import { validarMascota } from "../validators/mascotaValidator.js";
import { Mascota } from "../database/models/index.js";

const mapearMascota = (objMascota) => {
  const objDatos = objMascota.get({ plain: true });

  return {
    intMascota: objDatos.intMascota,
    strNombre: objDatos.strNombre,
    strGenero: objDatos.strGenero,
    dtFechaNacimiento: objDatos.dtFechaNacimiento ? new Date(objDatos.dtFechaNacimiento).toISOString() : null,
    strColor: objDatos.strColor,
    strNotas: objDatos.strNotas,
    intCatEspecie: objDatos.intCatEspecie,
    intCatRaza: objDatos.intCatRaza,
    blnActivo: Boolean(objDatos.blnActivo)
  };
};

export const mascotaService = {
  async listarPorUsuario(intUsuarioDueno) {
    const arrMascotas = await Mascota.findAll({
      where: {
        intUsuarioDueno,
        blnActivo: true
      },
      order: [["intMascota", "DESC"]]
    });

    return arrMascotas.map(mapearMascota);
  },

  async obtenerDetalle(intMascota, intUsuarioDueno) {
    const objMascota = await Mascota.findOne({
      where: {
        intMascota,
        intUsuarioDueno,
        blnActivo: true
      }
    });

    if (!objMascota) {
      const objError = new Error("Mascota no encontrada");
      objError.status = 404;
      throw objError;
    }

    return mapearMascota(objMascota);
  },

  async crear(intUsuarioDueno, objDatos) {
    validarMascota(objDatos);

    const objMascota = await Mascota.create({
      intUsuarioDueno,
      intCatEspecie: objDatos.intCatEspecie,
      intCatRaza: objDatos.intCatRaza ?? null,
      strNombre: objDatos.strNombre,
      strGenero: objDatos.strGenero ?? null,
      dtFechaNacimiento: objDatos.dtFechaNacimiento ?? null,
      strColor: objDatos.strColor ?? null,
      strNotas: objDatos.strNotas ?? null,
      blnActivo: true
    });

    return mapearMascota(objMascota);
  },

  async actualizar(intMascota, intUsuarioDueno, objDatos) {
    validarMascota(objDatos);

    const objMascota = await Mascota.findOne({
      where: {
        intMascota,
        intUsuarioDueno,
        blnActivo: true
      }
    });

    if (!objMascota) {
      const objError = new Error("Mascota no encontrada");
      objError.status = 404;
      throw objError;
    }

    objMascota.set({
      intCatEspecie: objDatos.intCatEspecie,
      intCatRaza: objDatos.intCatRaza ?? null,
      strNombre: objDatos.strNombre,
      strGenero: objDatos.strGenero ?? null,
      dtFechaNacimiento: objDatos.dtFechaNacimiento ?? null,
      strColor: objDatos.strColor ?? null,
      strNotas: objDatos.strNotas ?? null
    });

    await objMascota.save();

    return mapearMascota(objMascota);
  },

  async eliminar(intMascota, intUsuarioDueno) {
    const objMascota = await Mascota.findOne({
      where: {
        intMascota,
        intUsuarioDueno,
        blnActivo: true
      }
    });

    if (!objMascota) {
      const objError = new Error("Mascota no encontrada");
      objError.status = 404;
      throw objError;
    }

    objMascota.blnActivo = false;
    await objMascota.save();
  }
};
