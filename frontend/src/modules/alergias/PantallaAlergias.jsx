import { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import PetsIcon from "@mui/icons-material/Pets";
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
  const cerrarModal = () => setBlnModal(false);

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
            <TextField
              id="filtro-alergias-mascota"
              select
              fullWidth
              size="small"
              value={intMascotaSeleccionada ?? ""}
              onChange={(event) => {
                const strValor = event.target.value;
                setIntMascotaSeleccionada(strValor ? Number(strValor) : null);
              }}
              disabled={!hayMascotas}
              helperText={hayMascotas ? "" : "Registra una mascota para comenzar"}
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

      <Dialog open={blnModal} onClose={cerrarModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography variant="h6" component="span" className="font-display">
            Nueva alergia {objMascotaActual ? `para ${objMascotaActual.strNombre}` : ""}
          </Typography>
          <IconButton onClick={cerrarModal} aria-label="Cerrar" size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pb: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Completa el formulario para registrar el episodio alérgico.
          </Typography>
          <FormularioAlergia onSubmit={crearAlergia} />
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
