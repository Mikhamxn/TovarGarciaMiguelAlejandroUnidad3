import { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { clienteHttp } from "../../api/clienteHttp";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { EncabezadoPagina } from "../../components/EncabezadoPagina";
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
  const hayVacunas = arrVacunas.length > 0;

  return (
    <div className="page-flow">
      <EncabezadoPagina
        etiqueta="Calendario preventivo"
        titulo="Vacunas al día"
        descripcion="Lleva el calendario de inmunizaciones al día y recibe recordatorios de refuerzos para cada mascota."
        acciones={
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
        }
        ilustracion={
          <div className="promo-stack">
            <span className="promo-stack__badge">
              <VaccinesIcon fontSize="large" />
            </span>
            <p className="promo-stack__caption">
              <span>Protección</span>
              <span>Recordatorios automáticos</span>
            </p>
          </div>
        }
      />

      <section className="surface-card section-card">
        <header className="section-card__header">
          <span className="eyebrow">Ficha clínica</span>
          <h3 className="section-card__title">Selecciona una mascota</h3>
          <p className="section-card__subtitle">Filtra el calendario para gestionar refuerzos y dosis pendientes.</p>
        </header>

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
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="info-panel"
            >
              <div className="info-panel__lead">
                <span className="info-panel__lead-icon">
                  <LocalHospitalIcon fontSize="small" />
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
      </section>

      {!hayVacunas ? (
        <EstadoVistaVacia strMensaje="No hay vacunas registradas" />
      ) : (
        <div className="card-grid card-grid--three">
          {arrVacunas.map((objVacuna) => (
            <Motion.article
              key={objVacuna.intVacuna ?? objVacuna.id ?? `${objVacuna.strNombreVacuna}-${objVacuna.dtFechaAplicacion}`}
              whileHover={{ y: -4 }}
              className="surface-card record-card"
            >
              <div className="record-card__header">
                <strong className="record-card__timestamp">{objVacuna.strNombreVacuna}</strong>
                <span className="badge-pill badge-pill--soft">Calendario</span>
              </div>
              <p className="record-card__text">
                Aplicada: {new Date(objVacuna.dtFechaAplicacion).toLocaleDateString()}
              </p>
              {objVacuna.dtFechaRefuerzo ? (
                <p className="record-card__text">
                  Refuerzo: {new Date(objVacuna.dtFechaRefuerzo).toLocaleDateString()}
                </p>
              ) : null}
              {objVacuna.strVeterinario ? (
                <p className="record-card__text">Veterinario: {objVacuna.strVeterinario}</p>
              ) : null}
              {objVacuna.strObservaciones ? (
                <p className="record-card__text">Notas: {objVacuna.strObservaciones}</p>
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
              <h3 className="mb-4 font-display text-xl font-semibold">
                Nueva vacuna para {objMascotaActual?.strNombre ?? ""}
              </h3>
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
