import { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import PetsIcon from "@mui/icons-material/Pets";
import { clienteHttp } from "../../api/clienteHttp";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { FormularioAlergia } from "./FormularioAlergia";
import { EncabezadoPagina } from "../../components/EncabezadoPagina";

export const PantallaAlergias = () => {
  const [arrMascotas, setArrMascotas] = useState([]);
  const [intMascotaSeleccionada, setIntMascotaSeleccionada] = useState(null);
  const [arrAlergias, setArrAlergias] = useState([]);
  const [blnModal, setBlnModal] = useState(false);

  const cargarMascotas = async () => {
    const objRespuesta = await clienteHttp.get("/api/mascotas");
    setArrMascotas(objRespuesta.data.arrMascotas);
    if (objRespuesta.data.arrMascotas.length > 0) {
      setIntMascotaSeleccionada(objRespuesta.data.arrMascotas[0].intMascota);
    }
  };

  const cargarAlergias = async (intMascota) => {
    if (!intMascota) return;
    const objRespuesta = await clienteHttp.get(`/api/mascotas/${intMascota}/alergias`);
    setArrAlergias(objRespuesta.data.arrAlergias);
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  useEffect(() => {
    cargarAlergias(intMascotaSeleccionada);
  }, [intMascotaSeleccionada]);

  const crearAlergia = async (objValores, objAcciones) => {
    try {
      await clienteHttp.post(`/api/mascotas/${intMascotaSeleccionada}/alergias`, objValores);
      await cargarAlergias(intMascotaSeleccionada);
      setBlnModal(false);
    } catch (objError) {
      objAcciones.setStatus(objError.response?.data?.strMensaje ?? "No fue posible registrar la alergia");
    } finally {
      objAcciones.setSubmitting(false);
    }
  };

  const objMascotaActual = arrMascotas.find((objMascota) => objMascota.intMascota === intMascotaSeleccionada) ?? null;
  const hayMascotas = useMemo(() => arrMascotas.length > 0, [arrMascotas.length]);

  return (
    <div className="page-flow">
      <EncabezadoPagina
        etiqueta="Gestión clínica"
        titulo="Alergias bajo control"
        descripcion="Registra detonantes, tratamientos y observaciones para anticiparte a cualquier respuesta alérgica."
        acciones={
          <Motion.button
            type="button"
            onClick={() => setBlnModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!intMascotaSeleccionada}
            className="btn-primary"
          >
            Registrar alergia
          </Motion.button>
        }
        ilustracion={
          <div className="icon-stack">
            <span className="icon-stack__badge">
              <CoronavirusIcon fontSize="large" />
            </span>
            <p className="icon-stack__caption">Seguimiento personalizado</p>
          </div>
        }
      />

      <section className="surface-card section-card">
        <header className="section-card__header">
          <span className="eyebrow">Ficha clínica</span>
          <h3 className="section-card__title">Selecciona una mascota</h3>
          <p className="section-card__subtitle">Elige un paciente para ver su resumen y registrar alergias activas.</p>
        </header>
        <div className="form-grid form-grid--split">
          <div className="form-field">
            <label className="form-field__label" htmlFor="filtro-alergias-mascota">
              Mascota
            </label>
            <select
              id="filtro-alergias-mascota"
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
                  <PetsIcon fontSize="small" />
                </span>
                <p>{objMascotaActual.strNombre}</p>
              </div>
              {objMascotaActual.strEspecie ? <p className="info-panel__subtitle">{objMascotaActual.strEspecie}</p> : null}
            </Motion.div>
          ) : (
            <div className="empty-hint">Selecciona un paciente para ver su resumen</div>
          )}
        </div>
      </section>

      {arrAlergias.length === 0 ? (
        <EstadoVistaVacia strMensaje="No hay alergias registradas" />
      ) : (
        <div className="card-grid card-grid--three">
          {arrAlergias.map((objAlergia) => (
            <Motion.article
              key={objAlergia.intAlergia}
              whileHover={{ y: -4 }}
              className="surface-card record-card"
            >
              <div className="record-card__header">
                <strong className="record-card__timestamp">{objAlergia.strNombre}</strong>
                <span className="badge-pill badge-pill--soft">Control</span>
              </div>
              {objAlergia.strSintomas ? (
                <p className="record-card__text">
                  <strong>Síntomas:</strong> {objAlergia.strSintomas}
                </p>
              ) : null}
              {objAlergia.strTratamiento ? (
                <p className="record-card__text">
                  <strong>Tratamiento:</strong> {objAlergia.strTratamiento}
                </p>
              ) : null}
              {objAlergia.strNotas ? (
                <p className="record-card__text">
                  <strong>Notas:</strong> {objAlergia.strNotas}
                </p>
              ) : null}
            </Motion.article>
          ))}
        </div>
      )}

      <AnimatePresence>
        {blnModal ? (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <Motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-dialog">
              <h3 className="modal-dialog__title">Nueva alergia para {objMascotaActual?.strNombre ?? ""}</h3>
              <p className="section-card__subtitle">Completa el formulario para registrar el episodio alérgico.</p>
              <FormularioAlergia onSubmit={crearAlergia} />
              <div className="modal-dialog__actions">
                <Motion.button
                  type="button"
                  onClick={() => setBlnModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="modal-dialog__close"
                >
                  Cancelar
                </Motion.button>
              </div>
            </Motion.div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
