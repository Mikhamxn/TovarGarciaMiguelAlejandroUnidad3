import { motion as Motion } from "framer-motion";

export const EstadoVistaVacia = ({ strMensaje, accion }) => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-contrast/15 bg-surface/70 px-6 py-12 text-center text-sm text-contrast/60"
  >
    <p className="max-w-sm text-base text-contrast/70">{strMensaje}</p>
    {accion}
  </Motion.div>
);
