import { useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, alpha, createTheme } from "@mui/material/styles";
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

const MAPA_TEMA_MUI = {
  "theme-aurora": {
    mode: "light",
    primary: "#5e81f4",
    secondary: "#8ca1fc",
    surface: "#f8fafc",
    elevated: "#ffffff",
    contrast: "#0f172a",
    muted: "#e2e8f0"
  },
  "theme-ocean": {
    mode: "light",
    primary: "#4f8ef5",
    secondary: "#86c2ff",
    surface: "#f1f8ff",
    elevated: "#ffffff",
    contrast: "#0e253f",
    muted: "#d2e7ff"
  },
  "theme-meadow": {
    mode: "light",
    primary: "#31c48d",
    secondary: "#86efac",
    surface: "#f4fdf7",
    elevated: "#ffffff",
    contrast: "#173627",
    muted: "#d2fce7"
  },
  "theme-midnight": {
    mode: "dark",
    primary: "#818cf8",
    secondary: "#a5b4fc",
    surface: "#0f172a",
    elevated: "#101a2b",
    contrast: "#e2e8f0",
    muted: "#1f2937"
  }
};

const construirTemaMui = (strTema) => {
  const cfg = MAPA_TEMA_MUI[strTema] ?? MAPA_TEMA_MUI["theme-aurora"];
  const colorSecondaryText = cfg.mode === "dark" ? alpha(cfg.contrast, 0.72) : alpha(cfg.contrast, 0.68);
  const borderSoft = alpha(cfg.contrast, cfg.mode === "dark" ? 0.22 : 0.1);
  const dialogBackground = cfg.mode === "dark"
    ? `linear-gradient(155deg, ${alpha("#0f172a", 0.96)} 0%, ${alpha("#1e293b", 0.92)} 100%)`
    : `linear-gradient(155deg, ${alpha("#ffffff", 0.98)} 0%, ${alpha(cfg.muted, 0.65)} 100%)`;
  const inputBackground = cfg.mode === "dark" ? alpha("#0f172a", 0.7) : alpha("#ffffff", 0.95);

  return createTheme({
    palette: {
      mode: cfg.mode,
      primary: { main: cfg.primary },
      secondary: { main: cfg.secondary },
      background: {
        default: cfg.surface,
        paper: cfg.elevated
      },
      text: {
        primary: cfg.contrast,
        secondary: colorSecondaryText
      }
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
      button: { textTransform: "none", fontWeight: 600 }
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            border: `1px solid ${borderSoft}`,
            backgroundImage: dialogBackground,
            backdropFilter: "blur(18px)",
            boxShadow:
              cfg.mode === "dark"
                ? "0 42px 90px -46px rgba(8, 15, 32, 0.85)"
                : "0 42px 90px -48px rgba(15, 23, 42, 0.25)",
            color: cfg.contrast
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: "24px 28px 16px"
          }
        }
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "0 28px 24px"
          }
        }
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "0 28px 28px"
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
          variant: "outlined",
          fullWidth: true
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 14,
              backgroundColor: inputBackground,
              transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
              "& fieldset": {
                borderColor: borderSoft
              },
              "&:hover fieldset": {
                borderColor: alpha(cfg.primary, cfg.mode === "dark" ? 0.85 : 0.7)
              },
              "&.Mui-focused fieldset": {
                borderColor: cfg.primary,
                borderWidth: 1
              },
              "&.Mui-focused": {
                boxShadow: `0 0 0 3px ${alpha(cfg.primary, 0.2)}`
              },
              "& .MuiOutlinedInput-input": {
                color: cfg.contrast
              }
            },
            "& .MuiInputLabel-root": {
              color: colorSecondaryText
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: cfg.primary
            },
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              color: cfg.mode === "dark" ? alpha(cfg.contrast, 0.65) : alpha(cfg.contrast, 0.58)
            }
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 18,
            border: `1px solid ${borderSoft}`,
            backgroundColor: cfg.mode === "dark" ? alpha("#0f172a", 0.97) : "#ffffff",
            color: cfg.contrast,
            boxShadow:
              cfg.mode === "dark"
                ? "0 32px 68px -36px rgba(8, 15, 32, 0.8)"
                : "0 28px 62px -36px rgba(15, 23, 42, 0.2)"
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: cfg.mode === "dark" ? alpha("#e2e8f0", 0.9) : alpha(cfg.contrast, 0.7)
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: alpha(cfg.primary, cfg.mode === "dark" ? 0.6 : 0.5),
            '&.Mui-checked': {
              color: cfg.primary
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999
          }
        }
      }
    }
  });
};

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

  const muiTheme = useMemo(() => construirTemaMui(strTemaActual), [strTemaActual]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline enableColorScheme />
      <TemaContexto.Provider value={objValor}>{children}</TemaContexto.Provider>
    </ThemeProvider>
  );
};
