import { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { clienteHttp } from "../../api/clienteHttp";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { FormularioCita } from "./FormularioCita";

export const PantallaCitas = () => {
  const [arrMascotas, setArrMascotas] = useState([]);
  const [intMascotaSeleccionada, setIntMascotaSeleccionada] = useState(null);
  const [arrCitas, setArrCitas] = useState([]);
  const [blnModal, setBlnModal] = useState(false);

  const cargarMascotas = async () => {
    const objRespuesta = await clienteHttp.get("/api/mascotas");
    setArrMascotas(objRespuesta.data.arrMascotas);
    if (objRespuesta.data.arrMascotas.length > 0) {
      setIntMascotaSeleccionada(objRespuesta.data.arrMascotas[0].intMascota);
    }
  };

  const cargarCitas = async (intMascota) => {
    if (!intMascota) return;
    const objRespuesta = await clienteHttp.get(`/api/mascotas/${intMascota}/citas`);
    setArrCitas(objRespuesta.data.arrCitas);
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  useEffect(() => {
    cargarCitas(intMascotaSeleccionada);
  }, [intMascotaSeleccionada]);

  const crearCita = async (objValores, objAcciones) => {
    try {
      await clienteHttp.post(`/api/mascotas/${intMascotaSeleccionada}/citas`, objValores);
      await cargarCitas(intMascotaSeleccionada);
      setBlnModal(false);
    } catch (objError) {
      objAcciones.setStatus(objError.response?.data?.strMensaje ?? "No fue posible registrar la cita");
    } finally {
      objAcciones.setSubmitting(false);
    }
  };

  const objMascotaActual = arrMascotas.find((objMascota) => objMascota.intMascota === intMascotaSeleccionada) ?? null;
  const hayMascotas = useMemo(() => arrMascotas.length > 0, [arrMascotas.length]);

  return (
    <div className="space-y-6">
      <section className="glass-panel border border-contrast/10 px-6 py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <span className="badge-pill bg-accent/20 text-accent">
              <EventAvailableIcon fontSize="small" />
            </span>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-contrast">Citas veterinarias</h2>
              <p className="text-sm text-contrast/70">
                Agenda visitas, lleva notas y confirma citas para que tus mascotas nunca pierdan su control médico.
              </p>
            </div>
          </div>
          <Motion.button
            type="button"
            onClick={() => setBlnModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!intMascotaSeleccionada}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            Registrar cita
          </Motion.button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-contrast/70">
            Mascota
            <select
              value={intMascotaSeleccionada ?? ""}
              onChange={(event) => {
                const strValor = event.target.value;
                setIntMascotaSeleccionada(strValor ? Number(strValor) : null);
              }}
              className="rounded-xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
              disabled={!hayMascotas}
            >
              <option value="">Selecciona una mascota</option>
              {arrMascotas.map((objMascota) => (
                <option key={objMascota.intMascota} value={objMascota.intMascota}>
                  {objMascota.strNombre}
                </option>
              ))}
            </select>
          </label>
          {objMascotaActual ? (
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
            >
              <p className="font-medium">{objMascotaActual.strNombre}</p>
              {objMascotaActual.strEspecie ? <p className="text-accent/80">{objMascotaActual.strEspecie}</p> : null}
            </Motion.div>
          ) : null}
        </div>
      </section>

      {arrCitas.length === 0 ? (
        <EstadoVistaVacia strMensaje="No hay citas programadas" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {arrCitas.map((objCita) => (
            <Motion.article
              key={objCita.intCita}
              whileHover={{ y: -4 }}
              className="flex h-full flex-col gap-2 rounded-3xl border border-contrast/10 bg-surface/80 p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <strong className="font-display text-lg text-contrast">
                  {new Date(objCita.dtFechaCita).toLocaleString()}
                </strong>
                <span className="badge-pill bg-accent/15 text-xs uppercase tracking-wide text-accent">Agenda</span>
              </div>
              <span className="text-sm text-contrast/70">Motivo: {objCita.strMotivo}</span>
              {objCita.strVeterinario ? (
                <span className="text-sm text-contrast/70">Veterinario: {objCita.strVeterinario}</span>
              ) : null}
              {objCita.strUbicacion ? (
                <span className="text-sm text-contrast/70">Ubicación: {objCita.strUbicacion}</span>
              ) : null}
              {objCita.strNotas ? <span className="text-sm text-contrast/60">Notas: {objCita.strNotas}</span> : null}
              <span className="text-xs font-semibold uppercase tracking-wide text-contrast/40">
                {objCita.blnConfirmada ? "Confirmada" : "Pendiente"}
              </span>
            </Motion.article>
          ))}
        </div>
      )}

      <AnimatePresence>
        {blnModal ? (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4 backdrop-blur"
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl border border-contrast/10 bg-surface/95 p-6 text-contrast shadow-lg"
            >
              <h3 className="mb-4 font-display text-xl font-semibold">Nueva cita para {objMascotaActual?.strNombre ?? ""}</h3>
              <FormularioCita onSubmit={crearCita} />
              <Motion.button
                type="button"
                onClick={() => setBlnModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 w-full rounded-xl border border-contrast/20 px-4 py-2 text-sm font-medium text-contrast/70 transition hover:border-accent/40 hover:text-accent"
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
