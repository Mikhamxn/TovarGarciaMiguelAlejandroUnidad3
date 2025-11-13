import { mascotaService } from "../services/mascotaService.js";

export const mascotaController = {
  listar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const arrMascotas = await mascotaService.listarPorUsuario(intUsuario);
      res.json({ blnExito: true, arrMascotas });
    } catch (objError) {
      next(objError);
    }
  },
  obtener: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const objMascota = await mascotaService.obtenerDetalle(intMascota, intUsuario);
      res.json({ blnExito: true, objMascota });
    } catch (objError) {
      next(objError);
    }
  },
  crear: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const objMascota = await mascotaService.crear(intUsuario, req.body);
      res.status(201).json({ blnExito: true, objMascota });
    } catch (objError) {
      next(objError);
    }
  },
  actualizar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const objMascota = await mascotaService.actualizar(intMascota, intUsuario, req.body);
      res.json({ blnExito: true, objMascota });
    } catch (objError) {
      next(objError);
    }
  },
  eliminar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      await mascotaService.eliminar(intMascota, intUsuario);
      res.status(204).send();
    } catch (objError) {
      next(objError);
    }
  }
};
