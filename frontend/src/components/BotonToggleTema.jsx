import { useContext, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { TemaContexto } from "../contexts/temaContextoContext";

export const BotonToggleTema = () => {
  const { temaActual, temasDisponibles, cambiarTema } = useContext(TemaContexto);

  const objTema = useMemo(
    () => temasDisponibles.find((tema) => tema.id === temaActual) ?? temasDisponibles[0],
    [temaActual, temasDisponibles]
  );

  return (
    <Motion.button
      type="button"
      onClick={cambiarTema}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="theme-toggle"
      aria-label="Cambiar tema visual"
      title={`Cambiar tema (${objTema.nombre})`}
    >
      <span className="theme-toggle__icon" role="img" aria-hidden="true">
        {objTema.icono}
      </span>
      <span className="theme-toggle__label" aria-hidden="true">
        {objTema.nombre}
      </span>
    </Motion.button>
  );
};
