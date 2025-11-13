export const manejarErrores = (objError, _req, res, _next) => {
  const intCodigo = objError.status ?? objError.statusCode ?? 500;
  const strMensaje = objError.message ?? "Error interno";
  const objDetalle = process.env.NODE_ENV === "development" ? objError.stack : undefined;

  res.status(intCodigo).json({
    blnExito: false,
    strMensaje,
    objDetalle
  });
};
