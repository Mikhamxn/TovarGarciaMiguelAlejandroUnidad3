import { NavLink } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HealingIcon from "@mui/icons-material/Healing";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const arrEnlaces = [
  { to: "/dashboard", etiqueta: "Inicio", icono: <SpaceDashboardOutlinedIcon fontSize="small" /> },
  { to: "/mascotas", etiqueta: "Mascotas", icono: <PetsIcon fontSize="small" /> },
  { to: "/vacunas", etiqueta: "Vacunas", icono: <VaccinesIcon fontSize="small" /> },
  { to: "/citas", etiqueta: "Citas", icono: <EventNoteIcon fontSize="small" /> },
  { to: "/alergias", etiqueta: "Alergias", icono: <HealingIcon fontSize="small" /> },
  { to: "/historial", etiqueta: "Historial", icono: <FactCheckIcon fontSize="small" /> },
  { to: "/perfil", etiqueta: "Perfil", icono: <PersonOutlineIcon fontSize="small" /> }
];

const obtenerClases = (blnActivo) => `main-nav__link${blnActivo ? " is-active" : ""}`;

export const BarraNavegacion = () => (
  <nav className="main-nav" aria-label="Secciones principales">
    {arrEnlaces.map((objEnlace) => (
      <NavLink key={objEnlace.to} to={objEnlace.to} end={objEnlace.to === "/dashboard"} className={({ isActive }) => obtenerClases(isActive)}>
        <span className="main-nav__icon">
          {objEnlace.icono}
        </span>
        <span className="main-nav__label">
          {objEnlace.etiqueta}
        </span>
      </NavLink>
    ))}
  </nav>
);
