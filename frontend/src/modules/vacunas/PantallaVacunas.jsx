import { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { clienteHttp } from "../../api/clienteHttp";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { FormularioVacuna } from "./FormularioVacuna";

export const PantallaVacunas = () => {
  const [arrMascotas, setArrMascotas] = useState([]);
  const [intMascotaSeleccionada, setIntMascotaSeleccionada] = useState(null);
  const [arrVacunas, setArrVacunas] = useState([]);
  const [blnModal, setBlnModal] = useState(false);

  const cargarMascotas = async () => {
    const objRespuesta = await clienteHttp.get("/api/mascotas");
    setArrMascotas(objRespuesta.data.arrMascotas);
    if (objRespuesta.data.arrMascotas.length > 0) {
      setIntMascotaSeleccionada(objRespuesta.data.arrMascotas[0].intMascota);
    }
  };

  const cargarVacunas = async (intMascota) => {
    if (!intMascota) return;
    const objRespuesta = await clienteHttp.get(`/api/mascotas/${intMascota}/vacunas`);
    setArrVacunas(objRespuesta.data.arrVacunas);
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  useEffect(() => {
    cargarVacunas(intMascotaSeleccionada);
  }, [intMascotaSeleccionada]);

  const crearVacuna = async (objValores, objAcciones) => {
    try {
      await clienteHttp.post(`/api/mascotas/${intMascotaSeleccionada}/vacunas`, objValores);
      await cargarVacunas(intMascotaSeleccionada);
      setBlnModal(false);
    } catch (objError) {
      objAcciones.setStatus(objError.response?.data?.strMensaje ?? "No fue posible registrar la vacuna");
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
            <span className="badge-pill bg-secondary/20 text-secondary">
              <VaccinesIcon fontSize="small" />
            </span>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-contrast">Vacunas</h2>
              <p className="text-sm text-contrast/70">
                Lleva el calendario de inmunizaciones al día y recibe recordatorios de refuerzos para cada mascota.
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
            Registrar vacuna
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
              className="rounded-xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              disabled={!hayMascotas}
            >
              <option value="">Selecciona una mascota</option>
              {arrMascotas.map((objMascota) => (
                <option key={objMascota.intMascota} value={objMascota.intMascota}>
                  {objMascota.strNombre}
                </option>
              <div className="page-flow">
            </select>
                      <div className="surface-card section-card">
                        <header className="section-card__header">
                          <span className="eyebrow">Ficha clínica</span>
                          <h3 className="section-card__title">Selecciona una mascota</h3>
                          <p className="section-card__subtitle">
                            Filtra el calendario para gestionar refuerzos y dosis pendientes.
                          </p>
                        </header>
          {objMascotaActual ? (
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary"
            >
              <p className="font-medium">{objMascotaActual.strNombre}</p>
              {objMascotaActual.strEspecie ? <p className="text-secondary/80">{objMascotaActual.strEspecie}</p> : null}
            </Motion.div>
          ) : null}
        </div>
                          <Motion.button
                            type="button"
                            onClick={() => setBlnModal(true)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={!intMascotaSeleccionada}
                            className="btn-primary"
                          >
                            Registrar vacuna
                          </Motion.button>
                        </div>
                        <div className="form-grid form-grid--split">
                          <div className="form-field">
                            <label className="form-field__label" htmlFor="filtro-vacunas-mascota">
                              Mascota
                            </label>
                            <select
                              id="filtro-vacunas-mascota"
                              value={intMascotaSeleccionada ?? ""}
                              onChange={(event) => {
                                const strValor = event.target.value;
                                setIntMascotaSeleccionada(strValor ? Number(strValor) : null);
                              }}
                              disabled={!hayMascotas}
                            >
                              <option value="">Selecciona una mascota</option>
                              {arrMascotas.map((objMascota) => (
                                <option key={objMascota.intMascota} value={objMascota.intMascota}>
                                  {objMascota.strNombre}
                                </option>
                              ))}
                            </select>
                          </div>
                          {objMascotaActual ? (
                            <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="info-panel">
                              <div className="info-panel__lead">
                                <span className="info-panel__lead-icon">
                                  <VaccinesIcon fontSize="small" />
                                </span>
                                <p>{objMascotaActual.strNombre}</p>
                              </div>
                              {objMascotaActual.strEspecie ? (
                                <p className="info-panel__subtitle">{objMascotaActual.strEspecie}</p>
                              ) : null}
                            </Motion.div>
                          ) : (
                            <div className="empty-hint">Selecciona una mascota para consultar su calendario</div>
                          )}
                        </div>
                      </div>
              className="flex h-full flex-col gap-2 rounded-3xl border border-contrast/10 bg-surface/80 p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <strong className="font-display text-lg text-contrast">{objVacuna.strNombreVacuna}</strong>
                <span className="badge-pill bg-secondary/15 text-xs uppercase tracking-wide text-secondary">Calendario</span>
              </div>
              <span className="text-sm text-contrast/70">
                Aplicada: {new Date(objVacuna.dtFechaAplicacion).toLocaleDateString()}
              </span>
              {objVacuna.dtFechaRefuerzo ? (
                <span className="text-sm text-contrast/70">
                  Refuerzo: {new Date(objVacuna.dtFechaRefuerzo).toLocaleDateString()}
                </span>
              ) : null}
              {objVacuna.strVeterinario ? (
                <span className="text-sm text-contrast/70">Veterinario: {objVacuna.strVeterinario}</span>
              ) : null}
              {objVacuna.strObservaciones ? (
                <span className="text-sm text-contrast/60">Notas: {objVacuna.strObservaciones}</span>
              ) : null}
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
              <h3 className="mb-4 font-display text-xl font-semibold">Nueva vacuna para {objMascotaActual?.strNombre ?? ""}</h3>
              <FormularioVacuna onSubmit={crearVacuna} />
              <Motion.button
                type="button"
                onClick={() => setBlnModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 w-full rounded-xl border border-contrast/20 px-4 py-2 text-sm font-medium text-contrast/70 transition hover:border-secondary/40 hover:text-secondary"
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
