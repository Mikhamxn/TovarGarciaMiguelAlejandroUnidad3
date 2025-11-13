export const validarVacuna = ({ strNombreVacuna, dtFechaAplicacion }) => {
  if (!strNombreVacuna?.trim()) {
    const objError = new Error("El nombre de la vacuna es obligatorio");
    objError.status = 400;
    throw objError;
  }

  if (!dtFechaAplicacion || Number.isNaN(Date.parse(dtFechaAplicacion))) {
    const objError = new Error("La fecha de aplicación es obligatoria y debe ser válida");
    objError.status = 400;
    throw objError;
  }
};
