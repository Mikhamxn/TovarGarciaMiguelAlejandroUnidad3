import { historialService } from "../services/historialService.js";

export const historialController = {
  listarPorMascota: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const arrHistorial = await historialService.listarPorMascota(intMascota, intUsuario);
      res.json({ blnExito: true, arrHistorial });
    } catch (objError) {
      next(objError);
    }
  },
  crear: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const objHistorial = await historialService.crear(intMascota, intUsuario, req.body);
      res.status(201).json({ blnExito: true, objHistorial });
    } catch (objError) {
      next(objError);
    }
  },
  actualizar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intHistorial = Number(req.params.intHistorial);
      const objHistorial = await historialService.actualizar(intHistorial, intUsuario, req.body);
      res.json({ blnExito: true, objHistorial });
    } catch (objError) {
      next(objError);
    }
  },
  eliminar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intHistorial = Number(req.params.intHistorial);
      await historialService.eliminar(intHistorial, intUsuario);
      res.status(204).send();
    } catch (objError) {
      next(objError);
    }
  }
};
