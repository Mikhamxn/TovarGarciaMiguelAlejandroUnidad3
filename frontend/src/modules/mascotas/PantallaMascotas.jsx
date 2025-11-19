import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
