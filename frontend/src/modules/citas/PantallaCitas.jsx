import { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { clienteHttp } from "../../api/clienteHttp";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { EncabezadoPagina } from "../../components/EncabezadoPagina";
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
  const cerrarModal = () => setBlnModal(false);

  return (
    <div className="page-flow">
      <EncabezadoPagina
        etiqueta="Agenda inteligente"
        titulo="Citas veterinarias"
        descripcion="Agenda visitas, lleva notas y confirma citas para que tus mascotas nunca pierdan su control médico."
        acciones={
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
        }
        ilustracion={
          <div className="promo-stack">
            <span className="promo-stack__badge">
              <EventAvailableIcon fontSize="large" />
            </span>
            <p className="promo-stack__caption">
              <span>Alertas</span>
              <span>Seguimiento 24/7</span>
            </p>
          </div>
        }
      />

      <section className="surface-card section-card">
        <header className="section-card__header">
          <span className="eyebrow">Planificación</span>
          <h3 className="section-card__title">Filtra la agenda por mascota</h3>
          <p className="section-card__subtitle">Visualiza pendientes, notas y confirmaciones con un solo vistazo.</p>
        </header>

        <div className="form-grid form-grid--split">
          <div className="form-field">
            <label className="form-field__label" htmlFor="filtro-citas-mascota">
              Mascota
            </label>
            <TextField
              id="filtro-citas-mascota"
              select
              fullWidth
              size="small"
              value={intMascotaSeleccionada ?? ""}
              onChange={(event) => {
                const strValor = event.target.value;
                setIntMascotaSeleccionada(strValor ? Number(strValor) : null);
              }}
              disabled={!hayMascotas}
              helperText={hayMascotas ? "" : "Registra una mascota para agendar citas"}
            >
              <MenuItem value="">Selecciona una mascota</MenuItem>
              {arrMascotas.map((objMascota) => (
                <MenuItem key={objMascota.intMascota} value={objMascota.intMascota}>
                  {objMascota.strNombre}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {objMascotaActual ? (
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="info-panel"
            >
              <div className="info-panel__lead">
                <span className="info-panel__lead-icon">
                  <ScheduleIcon fontSize="small" />
                </span>
                <p>{objMascotaActual.strNombre}</p>
              </div>
              {objMascotaActual.strEspecie ? (
                <p className="info-panel__subtitle">{objMascotaActual.strEspecie}</p>
              ) : null}
            </Motion.div>
          ) : (
            <div className="empty-hint">Selecciona una mascota para visualizar su agenda</div>
          )}
        </div>
      </section>

      {arrCitas.length === 0 ? (
        <EstadoVistaVacia strMensaje="No hay citas programadas" />
      ) : (
        <div className="card-grid card-grid--three">
          {arrCitas.map((objCita) => (
            <Motion.article key={objCita.intCita} whileHover={{ y: -4 }} className="surface-card record-card">
              <div className="record-card__header">
                <strong className="record-card__timestamp">
                  {new Date(objCita.dtFechaCita).toLocaleString()}
                </strong>
                <span className="badge-pill badge-pill--soft">Agenda</span>
              </div>
              {objCita.strMotivo ? (
                <p className="record-card__text">
                  <strong>Motivo:</strong> {objCita.strMotivo}
                </p>
              ) : null}
              {objCita.strVeterinario ? (
                <p className="record-card__text">
                  <strong>Veterinario:</strong> {objCita.strVeterinario}
                </p>
              ) : null}
              {objCita.strUbicacion ? (
                <p className="record-card__text">
                  <strong>Ubicación:</strong> {objCita.strUbicacion}
                </p>
              ) : null}
              {objCita.strNotas ? (
                <p className="record-card__text">
                  <strong>Notas:</strong> {objCita.strNotas}
                </p>
              ) : null}
              <span className="record-card__footer">{objCita.blnConfirmada ? "Confirmada" : "Pendiente"}</span>
            </Motion.article>
          ))}
        </div>
      )}

      <Dialog open={blnModal} onClose={cerrarModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography variant="h6" component="span" className="font-display">
            Nueva cita {objMascotaActual ? `para ${objMascotaActual.strNombre}` : ""}
          </Typography>
          <IconButton onClick={cerrarModal} aria-label="Cerrar" size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pb: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Planifica la atención registrando los detalles clave de la cita y confirma su estado.
          </Typography>
          <FormularioCita onSubmit={crearCita} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={cerrarModal} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
