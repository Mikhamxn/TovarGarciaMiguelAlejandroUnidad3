import { citaService } from "../services/citaService.js";

export const citaController = {
  listarPorMascota: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const arrCitas = await citaService.listarPorMascota(intMascota, intUsuario);
      res.json({ blnExito: true, arrCitas });
    } catch (objError) {
      next(objError);
    }
  },
  crear: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intMascota = Number(req.params.intMascota);
      const objCita = await citaService.crear(intMascota, intUsuario, req.body);
      res.status(201).json({ blnExito: true, objCita });
    } catch (objError) {
      next(objError);
    }
  },
  actualizar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intCita = Number(req.params.intCita);
      const objCita = await citaService.actualizar(intCita, intUsuario, req.body);
      res.json({ blnExito: true, objCita });
    } catch (objError) {
      next(objError);
    }
  },
  eliminar: async (req, res, next) => {
    try {
      const intUsuario = req.usuario.sub;
      const intCita = Number(req.params.intCita);
      await citaService.eliminar(intCita, intUsuario);
      res.status(204).send();
    } catch (objError) {
      next(objError);
    }
  }
};
