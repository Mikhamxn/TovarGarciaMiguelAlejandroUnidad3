import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { clienteHttp } from "../../api/clienteHttp";
import { TarjetaMascota } from "../../components/TarjetaMascota";
import { EstadoVistaVacia } from "../../components/EstadoVistaVacia";
import { EncabezadoPagina } from "../../components/EncabezadoPagina";
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

  const cerrarModal = () => setBlnMostrarModal(false);

  return (
    <div className="page-flow">
      <EncabezadoPagina
        etiqueta="Expediente familiar"
        titulo="Mis mascotas"
        descripcion="Crea perfiles adorables, registra información clave y mantén el seguimiento de cada compañero peludo."
        acciones={
          <Motion.button
            type="button"
            onClick={() => setBlnMostrarModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <AddCircleIcon fontSize="small" /> Nueva mascota
          </Motion.button>
        }
        ilustracion={
          <div className="promo-stack">
            <span className="promo-stack__badge">
              <PetsIcon fontSize="large" />
            </span>
            <p className="promo-stack__caption">
              <span>Historias únicas</span>
              <span>Seguimiento integral</span>
            </p>
          </div>
        }
      />

      <section className="surface-card section-card">
        <header className="section-card__header">
          <span className="eyebrow">Perfiles activos</span>
          <h3 className="section-card__title">Resumen de tus acompañantes</h3>
          <p className="section-card__subtitle">Consulta fichas, especies y notas especiales en un tablero curado.</p>
        </header>

        {blnCargando ? (
          <div className="empty-state">
            <FavoriteIcon fontSize="large" />
            <p>Cargando información de tus mascotas…</p>
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
          <div className="card-grid card-grid--three">
            {arrMascotas.map((objMascota) => (
              <TarjetaMascota key={objMascota.intMascota} objMascota={objMascota} />
            ))}
          </div>
        )}
      </section>

      <Dialog open={blnMostrarModal} onClose={cerrarModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography variant="h6" component="span" className="font-display">
            Nueva mascota
          </Typography>
          <IconButton onClick={cerrarModal} aria-label="Cerrar" size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pb: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Completa los datos básicos para crear el expediente de tu compañero peludo.
          </Typography>
          <FormularioMascota onSubmit={crearMascota} arrEspecies={[]} arrRazas={[]} />
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
