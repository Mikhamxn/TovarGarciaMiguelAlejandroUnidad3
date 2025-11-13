export const validarAlergia = ({ strNombre }) => {
  if (!strNombre?.trim()) {
    const objError = new Error("El nombre de la alergia es obligatorio");
    objError.status = 400;
    throw objError;
  }
};
