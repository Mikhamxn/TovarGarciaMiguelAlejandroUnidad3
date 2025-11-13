import { useEffect, useMemo, useState } from "react";
import { TemaContexto } from "./temaContextoContext";

const TEMAS_DISPONIBLES = [
  {
    id: "theme-aurora",
    nombre: "Amanecer Pastel",
    descripcion: "Colores suaves y acogedores para un comienzo sereno",
    icono: "🌅"
  },
  {
    id: "theme-ocean",
    nombre: "Brisa Marina",
    descripcion: "Tonos refrescantes inspirados en la playa y los paseos",
    icono: "🌊"
  },
  {
    id: "theme-meadow",
    nombre: "Pradera Viva",
    descripcion: "Verdes vibrantes pensados para mascotas aventureras",
    icono: "🌿"
  },
  {
    id: "theme-midnight",
    nombre: "Noche Estelar",
    descripcion: "Un modo nocturno elegante y de alto contraste",
    icono: "🌙"
  }
];

const CLAVE_STORAGE = "ui_tema_mimascota";

const aplicarTema = (strTema) => {
  const objRoot = document.documentElement;
  TEMAS_DISPONIBLES.forEach(({ id }) => objRoot.classList.remove(id));
  objRoot.classList.add(strTema);
  objRoot.dataset.theme = strTema;
};

const obtenerTemaInicial = () => {
  try {
    const strTemaGuardado = localStorage.getItem(CLAVE_STORAGE);
    if (strTemaGuardado && TEMAS_DISPONIBLES.some((tema) => tema.id === strTemaGuardado)) {
      return strTemaGuardado;
    }
  } catch {
    // ignorar
  }
  return TEMAS_DISPONIBLES[0].id;
};

export const TemaProveedor = ({ children }) => {
  const [strTemaActual, setStrTemaActual] = useState(obtenerTemaInicial);

  useEffect(() => {
    aplicarTema(strTemaActual);
    try {
      localStorage.setItem(CLAVE_STORAGE, strTemaActual);
    } catch {
      // ignorar
    }
  }, [strTemaActual]);

  const cambiarTema = () => {
    setStrTemaActual((strPrevio) => {
      const intIndice = TEMAS_DISPONIBLES.findIndex((tema) => tema.id === strPrevio);
      const intSiguiente = (intIndice + 1) % TEMAS_DISPONIBLES.length;
      return TEMAS_DISPONIBLES[intSiguiente].id;
    });
  };

  const establecerTema = (strTema) => {
    if (TEMAS_DISPONIBLES.some((tema) => tema.id === strTema)) {
      setStrTemaActual(strTema);
    }
  };

  const objValor = useMemo(
    () => ({
      temaActual: strTemaActual,
      temasDisponibles: TEMAS_DISPONIBLES,
      cambiarTema,
      establecerTema
    }),
    [strTemaActual]
  );

  return <TemaContexto.Provider value={objValor}>{children}</TemaContexto.Provider>;
};
