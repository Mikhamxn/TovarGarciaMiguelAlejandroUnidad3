export const validarHistorial = ({ dtFechaConsulta, strDiagnostico }) => {
  if (!dtFechaConsulta || Number.isNaN(Date.parse(dtFechaConsulta))) {
    const objError = new Error("La fecha de la consulta es obligatoria y debe ser válida");
    objError.status = 400;
    throw objError;
  }

  if (!strDiagnostico?.trim()) {
    const objError = new Error("El diagnóstico es obligatorio");
    objError.status = 400;
    throw objError;
  }
};
