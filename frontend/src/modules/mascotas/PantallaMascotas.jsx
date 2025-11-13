import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { clienteHttp } from "../../api/clienteHttp";
import { TarjetaMascota } from "../../components/TarjetaMascota";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { FormularioMascota } from "./FormularioMascota";

export const PantallaMascotas = () => {
  const [arrMascotas, setArrMascotas] = useState([]);
  const [blnCargando, setBlnCargando] = useState(true);
  const [blnMostrarModal, setBlnMostrarModal] = useState(false);

  const obtenerMascotas = async () => {
    setBlnCargando(true);
    try {
      const objRespuesta = await clienteHttp.get("/api/mascotas");
      setArrMascotas(objRespuesta.data.arrMascotas);
    } finally {
      setBlnCargando(false);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const crearMascota = async (objValores, objAcciones) => {
    try {
      await clienteHttp.post("/api/mascotas", objValores);
      await obtenerMascotas();
      setBlnMostrarModal(false);
    } catch (objError) {
      objAcciones.setStatus(objError.response?.data?.strMensaje ?? "No fue posible crear la mascota");
    } finally {
      objAcciones.setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-contrast/10 bg-surface/80 px-6 py-6 shadow-card backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-contrast">Mis mascotas</h2>
          <p className="max-w-2xl text-sm text-contrast/70">
            Crea perfiles adorables, registra información clave y mantén el seguimiento de cada compañero peludo.
          </p>
        </div>
        <Motion.button
          type="button"
          onClick={() => setBlnMostrarModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="btn-primary inline-flex items-center gap-2 self-start md:self-auto"
        >
          <AddCircleIcon fontSize="small" /> Nueva mascota
        </Motion.button>
      </section>
      {blnCargando ? (
        <div className="glass-panel flex items-center justify-center rounded-3xl border border-contrast/10 p-8 text-sm text-contrast/60">
          Cargando información de tus mascotas...
        </div>
      ) : arrMascotas.length === 0 ? (
        <EstadoVistaVacia
          strMensaje="Aún no has registrado mascotas"
          accion={
            <Motion.button
              type="button"
              onClick={() => setBlnMostrarModal(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Registrar mascota
            </Motion.button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {arrMascotas.map((objMascota) => (
            <TarjetaMascota key={objMascota.intMascota} objMascota={objMascota} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {blnMostrarModal ? (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4 backdrop-blur"
          >
            <Motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="w-full max-w-xl rounded-3xl border border-contrast/10 bg-surface/95 p-6 text-contrast shadow-lg"
            >
              <h3 className="mb-4 font-display text-xl font-semibold text-contrast">Nueva mascota</h3>
              <FormularioMascota onSubmit={crearMascota} arrEspecies={[]} arrRazas={[]} />
              <Motion.button
                type="button"
                onClick={() => setBlnMostrarModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 w-full rounded-xl border border-contrast/20 px-4 py-2 text-sm font-medium text-contrast/70 transition hover:border-primary/40 hover:text-primary"
              >
                Cancelar
              </Motion.button>
            </Motion.div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
