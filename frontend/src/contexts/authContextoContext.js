import { createContext } from "react";

export const AuthContexto = createContext({
  objUsuario: null,
  iniciarSesion: async () => {},
  registrarUsuario: async () => {},
  cerrarSesion: () => {}
});
