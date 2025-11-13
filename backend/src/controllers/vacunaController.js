import { vacunaService } from "../services/vacunaService.js";

export const vacunaController = {
  listarPorMascota: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const arrVacunas = await vacunaService.listarPorMascota(intMascota, intUsuario);
      res.json({ blnExito: true, arrVacunas });
    } catch (objError) {
      next(objError);
    }
  },
  crear: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const objVacuna = await vacunaService.crear(intMascota, intUsuario, req.body);
      res.status(201).json({ blnExito: true, objVacuna });
    } catch (objError) {
      next(objError);
    }
  },
  actualizar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intVacuna = Number(req.params.intVacuna);
      const objVacuna = await vacunaService.actualizar(intVacuna, intUsuario, req.body);
      res.json({ blnExito: true, objVacuna });
    } catch (objError) {
      next(objError);
    }
  },
  eliminar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intVacuna = Number(req.params.intVacuna);
      await vacunaService.eliminar(intVacuna, intUsuario);
      res.status(204).send();
    } catch (objError) {
      next(objError);
    }
  }
};
