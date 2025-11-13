export const validarCita = ({ dtFechaCita, strMotivo }) => {
  if (!dtFechaCita || Number.isNaN(Date.parse(dtFechaCita))) {
    const objError = new Error("La fecha de la cita es obligatoria y debe ser válida");
    objError.status = 400;
    throw objError;
  }

  if (!strMotivo?.trim()) {
    const objError = new Error("El motivo de la cita es obligatorio");
    objError.status = 400;
    throw objError;
  }
};
