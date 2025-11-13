import jwt from "jsonwebtoken";

export const validarAuth = (req, res, next) => {
  const strHeader = req.headers["authorization"] ?? "";
  const strToken = strHeader.startsWith("Bearer ") ? strHeader.substring(7) : null;

  if (!strToken) {
    return res.status(401).json({ blnExito: false, strMensaje: "Token no proporcionado" });
  }

  try {
    const objPayload = jwt.verify(strToken, process.env.JWT_SECRET);
    req.usuario = {
      sub: objPayload.sub,
      strCorreo: objPayload.strCorreo,
      strNombre: objPayload.strNombre,
      intRol: objPayload.intRol
    };
    next();
  } catch (objError) {
    return res.status(401).json({ blnExito: false, strMensaje: "Token inválido" });
  }
};
