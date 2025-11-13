import jwt from "jsonwebtoken";

const strSecreto = process.env.JWT_SECRET;
const strIssuer = process.env.JWT_ISSUER ?? "mi-mascota-api";
const strAudience = process.env.JWT_AUDIENCE ?? "mi-mascota-frontend";

export const crearToken = ({ intUsuario, strCorreo, strNombre, intRol }) => {
  const objPayload = {
    sub: intUsuario,
    strCorreo,
    strNombre,
    intRol
  };

  return jwt.sign(objPayload, strSecreto, {
    issuer: strIssuer,
    audience: strAudience,
    expiresIn: process.env.JWT_EXPIRES ?? "2h"
  });
};
