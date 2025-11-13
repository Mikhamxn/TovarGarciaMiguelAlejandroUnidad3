import { generarHash, compararHash } from "../utils/password.js";
import { crearToken } from "../utils/jwt.js";
import { validarRegistro, validarLogin } from "../validators/authValidator.js";
import { Usuario } from "../database/models/index.js";

const mapearUsuario = (objUsuario) => objUsuario.get({ plain: true });

export const authService = {
  async registrar({ strNombre, strCorreo, strContrasena }) {
    validarRegistro({ strNombre, strCorreo, strContrasena });

    const objExiste = await Usuario.findOne({ where: { strCorreo } });

    if (objExiste) {
      const objError = new Error("El correo ya está registrado");
      objError.status = 409;
      throw objError;
    }

    const strHash = await generarHash(strContrasena);
    const intRol = Number(process.env.SQL_ROL_DUENO ?? 1);

    const objUsuarioPersistido = await Usuario.create({
      intCatRol: intRol,
      strNombre,
      strCorreo,
      strContrasenaHash: strHash,
      blnActivo: true
    });

    const objDatos = mapearUsuario(objUsuarioPersistido);

    const strToken = crearToken({
      intUsuario: objDatos.intUsuario,
      strCorreo: objDatos.strCorreo,
      strNombre: objDatos.strNombre,
      intRol: objDatos.intCatRol
    });

    return {
      intUsuario: objDatos.intUsuario,
      strNombre: objDatos.strNombre,
      strCorreo: objDatos.strCorreo,
      strToken
    };
  },

  async login({ strCorreo, strContrasena }) {
    validarLogin({ strCorreo, strContrasena });

    const objUsuario = await Usuario.findOne({
      where: {
        strCorreo,
        blnActivo: true
      }
    });

    if (!objUsuario) {
      const objError = new Error("Credenciales inválidas");
      objError.status = 401;
      throw objError;
    }

    const blnCoincide = await compararHash(strContrasena, objUsuario.strContrasenaHash);

    if (!blnCoincide) {
      const objError = new Error("Credenciales inválidas");
      objError.status = 401;
      throw objError;
    }

    const objDatos = mapearUsuario(objUsuario);

    const strToken = crearToken({
      intUsuario: objDatos.intUsuario,
      strCorreo: objDatos.strCorreo,
      strNombre: objDatos.strNombre,
      intRol: objDatos.intCatRol
    });

    return {
      intUsuario: objDatos.intUsuario,
      strNombre: objDatos.strNombre,
      strCorreo: objDatos.strCorreo,
      strToken
    };
  }
};
