export const validarRegistro = ({ strNombre, strCorreo, strContrasena }) => {
  if (!strNombre?.trim()) {
    const objError = new Error("El nombre es obligatorio");
    objError.status = 400;
    throw objError;
  }

  if (!strCorreo?.trim()) {
    const objError = new Error("El correo es obligatorio");
    objError.status = 400;
    throw objError;
  }

  if (!strContrasena || strContrasena.length < 8) {
    const objError = new Error("La contraseña debe tener al menos 8 caracteres");
    objError.status = 400;
    throw objError;
  }
};

export const validarLogin = ({ strCorreo, strContrasena }) => {
  if (!strCorreo?.trim() || !strContrasena) {
    const objError = new Error("Correo y contraseña son obligatorios");
    objError.status = 400;
    throw objError;
  }
};
