import { bienestarService } from "../services/bienestarService.js";

export const bienestarController = {
  obtenerDatoCurioso: async (req, res, next) => {
    try {
      const objDato = await bienestarService.obtenerDatoCurioso();
      res.json({ blnExito: true, objDato });
    } catch (objError) {
      next(objError);
    }
  }
};
