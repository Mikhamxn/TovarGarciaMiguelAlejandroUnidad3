import PersonIcon from "@mui/icons-material/Person";
import { motion as Motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export const PerfilUsuario = () => {
  const { objUsuario } = useAuth();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="section-title">
        <PersonIcon className="text-primary" />
        <span>Perfil de usuario</span>
      </div>
      <Motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-contrast/10 bg-surface/90 p-6 text-contrast shadow-card backdrop-blur"
      >
        <div className="grid gap-4 text-sm text-contrast/75 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-contrast/50">Nombre</p>
            <p className="text-base font-medium text-contrast">{objUsuario?.strNombre ?? "--"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-contrast/50">Correo</p>
            <p className="text-base font-medium text-contrast">{objUsuario?.strCorreo ?? "--"}</p>
          </div>
        </div>
      </Motion.section>
    </div>
  );
};
