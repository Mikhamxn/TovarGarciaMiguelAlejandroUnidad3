import { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
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
  const cerrarModal = () => setBlnModal(false);

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
            <TextField
              id="filtro-vacunas-mascota"
              select
              fullWidth
              size="small"
              value={intMascotaSeleccionada ?? ""}
              onChange={(event) => {
                const strValor = event.target.value;
                setIntMascotaSeleccionada(strValor ? Number(strValor) : null);
              }}
              disabled={!hayMascotas}
              helperText={hayMascotas ? "" : "Registra una mascota para gestionar vacunas"}
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

      <Dialog open={blnModal} onClose={cerrarModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography variant="h6" component="span" className="font-display">
            Nueva vacuna {objMascotaActual ? `para ${objMascotaActual.strNombre}` : ""}
          </Typography>
          <IconButton onClick={cerrarModal} aria-label="Cerrar" size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pb: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Registra la información de la dosis aplicada y añade detalles del profesional que la suministró.
          </Typography>
          <FormularioVacuna onSubmit={crearVacuna} />
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
