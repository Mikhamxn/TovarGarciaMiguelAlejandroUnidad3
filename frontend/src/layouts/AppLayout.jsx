import { Outlet, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import PetsIcon from "@mui/icons-material/Pets";
import { BotonToggleTema } from "../components/BotonToggleTema";
import { BarraNavegacion } from "../components/BarraNavegacion";
import { useAuth } from "../hooks/useAuth";

const AnimacionVista = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

export const AppLayout = () => {
  const { objUsuario, cerrarSesion } = useAuth();
  const objLocation = useLocation();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__identity">
            <span className="app-header__logo">
              <PetsIcon fontSize="small" />
            </span>
            <div>
              <p className="app-header__brand-eyebrow">Mi Mascota</p>
              <h1 className="app-header__brand-title">Carnet veterinario digital</h1>
            </div>
          </div>
          <div className="app-header__actions">
            {objUsuario ? (
              <button type="button" onClick={cerrarSesion} className="btn-ghost">
                Cerrar sesión
              </button>
            ) : null}
            <BotonToggleTema />
          </div>
        </div>
        <div className="app-header__nav-wrapper">
          <BarraNavegacion />
        </div>
      </header>

      <main className="app-main">
        <div className="app-main__content">
          <AnimatePresence mode="wait">
            <Motion.div
              key={objLocation.pathname}
              {...AnimacionVista}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="content-stack"
            >
              <Outlet />
            </Motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          © {new Date().getFullYear()} Mi Mascota · Hecho con cariño para tus compañeros peludos
        </div>
      </footer>
    </div>
  );
};