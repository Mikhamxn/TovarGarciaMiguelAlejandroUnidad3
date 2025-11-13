import { useCallback, useMemo, useState } from "react";
import { clienteHttp } from "../api/clienteHttp";
import { AuthContexto } from "./authContextoContext";

const obtenerUsuarioInicial = () => {
  try {
    const strUsuarioGuardado = localStorage.getItem("objUsuarioAutenticado");
    return strUsuarioGuardado ? JSON.parse(strUsuarioGuardado) : null;
  } catch {
    return null;
  }
};

export const AuthProveedor = ({ children }) => {
  const [objUsuario, setObjUsuario] = useState(obtenerUsuarioInicial);

  const iniciarSesion = useCallback(async ({ strCorreo, strContrasena }) => {
    const objRespuesta = await clienteHttp.post("/api/auth/login", {
      strCorreo,
      strContrasena
    });
    const objDatos = objRespuesta.data.objUsuario;
    localStorage.setItem("strTokenJwt", objDatos.strToken);
    localStorage.setItem("objUsuarioAutenticado", JSON.stringify(objDatos));
    setObjUsuario(objDatos);
    return objDatos;
  }, []);

  const registrarUsuario = useCallback(async ({ strNombre, strCorreo, strContrasena }) => {
    const objRespuesta = await clienteHttp.post("/api/auth/registrar", {
      strNombre,
      strCorreo,
      strContrasena
    });
    const objDatos = objRespuesta.data.objUsuario;
    localStorage.setItem("strTokenJwt", objDatos.strToken);
    localStorage.setItem("objUsuarioAutenticado", JSON.stringify(objDatos));
    setObjUsuario(objDatos);
    return objDatos;
  }, []);

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem("strTokenJwt");
    localStorage.removeItem("objUsuarioAutenticado");
    setObjUsuario(null);
  }, []);

  const objValores = useMemo(
    () => ({ objUsuario, iniciarSesion, registrarUsuario, cerrarSesion }),
    [objUsuario, iniciarSesion, registrarUsuario, cerrarSesion]
  );

  return <AuthContexto.Provider value={objValores}>{children}</AuthContexto.Provider>;
};
