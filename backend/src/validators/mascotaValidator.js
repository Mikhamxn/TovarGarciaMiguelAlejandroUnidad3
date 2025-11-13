export const validarMascota = ({
  strNombre,
  intCatEspecie,
  intCatRaza,
  dtFechaNacimiento
}) => {
  if (!strNombre?.trim()) {
    const objError = new Error("El nombre de la mascota es obligatorio");
    objError.status = 400;
    throw objError;
  }

  if (!intCatEspecie) {
    const objError = new Error("La especie de la mascota es obligatoria");
    objError.status = 400;
    throw objError;
  }

  if (dtFechaNacimiento && Number.isNaN(Date.parse(dtFechaNacimiento))) {
    const objError = new Error("La fecha de nacimiento no es válida");
    objError.status = 400;
    throw objError;
  }
};
