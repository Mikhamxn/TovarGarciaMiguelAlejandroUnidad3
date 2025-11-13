import { createContext } from "react";

export const TemaContexto = createContext({
  temaActual: "theme-aurora",
  temasDisponibles: [],
  cambiarTema: () => {},
  establecerTema: () => {}
});
