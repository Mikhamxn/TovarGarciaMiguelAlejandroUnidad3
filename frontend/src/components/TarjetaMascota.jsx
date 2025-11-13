import { motion as Motion } from "framer-motion";
import PetsIcon from "@mui/icons-material/Pets";

export const TarjetaMascota = ({ objMascota, onSeleccionar }) => (
  <Motion.article
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 220, damping: 17 }}
    className="flex h-full flex-col gap-4 rounded-3xl border border-contrast/10 bg-surface/80 p-5 shadow-card backdrop-blur"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold text-contrast">{objMascota.strNombre}</h3>
        <p className="text-sm text-contrast/60">
          <PetsIcon className="mr-1 align-middle text-primary" fontSize="small" /> Edad estimada: {objMascota.intEdad ?? "No registrada"}
        </p>
      </div>
      <span className="badge-pill bg-primary/20 text-xs font-semibold uppercase tracking-wider text-primary">
        {objMascota.strEspecie}
      </span>
    </div>
    {objMascota.strRaza ? <p className="text-sm text-contrast/55">Raza: {objMascota.strRaza}</p> : null}
    {objMascota.strColor ? <p className="text-sm text-contrast/55">Color: {objMascota.strColor}</p> : null}
    <Motion.button
      type="button"
      onClick={() => onSeleccionar?.(objMascota)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="btn-primary mt-auto justify-center"
    >
      Ver detalle
    </Motion.button>
  </Motion.article>
);
