import { alergiaService } from "../services/alergiaService.js";

export const alergiaController = {
  listarPorMascota: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const arrAlergias = await alergiaService.listarPorMascota(intMascota, intUsuario);
      res.json({ blnExito: true, arrAlergias });
    } catch (objError) {
      next(objError);
    }
  },
  crear: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const objAlergia = await alergiaService.crear(intMascota, intUsuario, req.body);
      res.status(201).json({ blnExito: true, objAlergia });
    } catch (objError) {
      next(objError);
    }
  },
  actualizar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intAlergia = Number(req.params.intAlergia);
      const objAlergia = await alergiaService.actualizar(intAlergia, intUsuario, req.body);
      res.json({ blnExito: true, objAlergia });
    } catch (objError) {
      next(objError);
    }
  },
  eliminar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intAlergia = Number(req.params.intAlergia);
      await alergiaService.eliminar(intAlergia, intUsuario);
      res.status(204).send();
    } catch (objError) {
      next(objError);
    }
  }
};
