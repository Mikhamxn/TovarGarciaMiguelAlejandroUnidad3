import { authService } from "../services/authService.js";

export const authController = {
  registrar: async (req, res, next) => {
    try {
      const { strNombre, strCorreo, strContrasena } = req.body;
      const objRespuesta = await authService.registrar({ strNombre, strCorreo, strContrasena });
      res.status(201).json({ blnExito: true, objUsuario: objRespuesta });
    } catch (objError) {
      next(objError);
    }
  },
  login: async (req, res, next) => {
    try {
      const { strCorreo, strContrasena } = req.body;
      const objRespuesta = await authService.login({ strCorreo, strContrasena });
      res.json({ blnExito: true, objUsuario: objRespuesta });
    } catch (objError) {
      next(objError);
    }
  }
};
