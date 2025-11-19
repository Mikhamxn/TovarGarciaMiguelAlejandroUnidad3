import { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import PetsIcon from "@mui/icons-material/Pets";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { TarjetaResumen } from "../../components/TarjetaResumen";
import { EncabezadoPagina } from "../../components/EncabezadoPagina";
import { clienteHttp } from "../../api/clienteHttp";

const datosResumen = [
  {
    icono: <PetsIcon fontSize="large" />,
    titulo: "Mascotas activas",
    valor: "3",
    descripcion: "Amigos registrados y listos para consentirse"
  },
  {
    icono: <EventAvailableIcon fontSize="large" />,
    titulo: "Próxima cita",
    valor: "20 Nov",
    descripcion: "Mantén tu agenda veterinaria bajo control"
  },
  {
    icono: <VaccinesIcon fontSize="large" />,
    titulo: "Vacunas pendientes",
    valor: "1",
    descripcion: "Revisa los refuerzos que están por vencer"
  }
];

export const PantallaDashboard = () => {
  const tarjetas = useMemo(() => datosResumen, []);
  const [objInspiracion, setObjInspiracion] = useState(null);
  const [blnCargandoInspiracion, setBlnCargandoInspiracion] = useState(false);
  const [strErrorInspiracion, setStrErrorInspiracion] = useState("");

  const obtenerInspiracion = async () => {
    try {
      setBlnCargandoInspiracion(true);
      setStrErrorInspiracion("");
      const objRespuesta = await clienteHttp.get("/api/bienestar/dato-curioso");
      setObjInspiracion(objRespuesta.data.objDato);
    } catch (objError) {
      setStrErrorInspiracion(
        objError.response?.data?.strMensaje ?? "No fue posible cargar la inspiración canina."
      );
    } finally {
      setBlnCargandoInspiracion(false);
    }
  };

  useEffect(() => {
    obtenerInspiracion();
  }, []);

  return (
    <div className="page-flow">
      <EncabezadoPagina
        etiqueta="Panel clínico"
        titulo="Tu centro de salud veterinaria a un clic"
        descripcion="Supervisa vacunación, citas y seguimientos médicos con indicadores actualizados y accesos directos a tus módulos clínicos."
        acciones={
          <>
            <button type="button" className="btn-primary">
              Programar cita
            </button>
            <button type="button" className="btn-ghost">
              Registrar mascota
            </button>
          </>
        }
        ilustracion={
          <div className="promo-stack">
            <Motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="promo-stack__badge"
            >
              <FavoriteBorderIcon fontSize="large" />
            </Motion.span>
            <div className="promo-stack__caption">
              <span>Salud preventiva activa</span>
              <span>Actualizado hace 2 horas</span>
            </div>
          </div>
        }
      />

      <Motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="kpi-grid"
      >
        {tarjetas.map((tarjeta) => (
          <TarjetaResumen
            key={tarjeta.titulo}
            icono={tarjeta.icono}
            strTitulo={tarjeta.titulo}
            strValor={tarjeta.valor}
            strDescripcion={tarjeta.descripcion}
          />
        ))}
        <TarjetaResumen
          icono={<TimelineIcon fontSize="large" />}
          strTitulo="Seguimiento"
          strValor="12"
          strDescripcion="Controles clínicos programados para esta semana"
        />
        <TarjetaResumen
          icono={<InsightsIcon fontSize="large" />}
          strTitulo="Alertas activas"
          strValor="2"
          strDescripcion="Registros con seguimiento priorizado por síntomas"
          emphasis
        />
      </Motion.section>

      <div className="split-layout">
        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="surface-card surface-card--accent section-card"
        >
          <header className="section-card__header">
            <span className="eyebrow">Resumen de agenda</span>
            <h3 className="section-card__title">Próximas atenciones</h3>
            <p className="section-card__subtitle">
              Repasa los compromisos clínicos preparados para hoy y los siguientes días.
            </p>
          </header>
          <span className="section-divider" aria-hidden="true" />
          <ul className="pill-list">
            {["Vacunación anual · 20 Nov", "Control dermatológico · 24 Nov", "Sesión nutricional · 27 Nov"].map(
              (texto) => (
                <li key={texto} className="pill-list__item">
                  <span>{texto}</span>
                  <span>Preparar expediente</span>
                </li>
              )
            )}
          </ul>
        </Motion.section>

        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="surface-card section-card"
        >
          <header className="section-card__header">
            <span className="eyebrow">Indicadores clínicos</span>
            <h3 className="section-card__title">Estado de seguimiento</h3>
          </header>
          <div className="progress-list">
            {["Vacunas al día", "Control de alergias", "Historial actualizado"].map((label, index) => (
              <div key={label} className="progress-list__item">
                <div className="progress-list__label">
                  <span>{label}</span>
                  <span className="progress-list__value">
                    {index === 0 ? "96%" : index === 1 ? "82%" : "88%"}
                  </span>
                </div>
                <div className="progress-list__bar">
                  <div
                    className="progress-list__fill"
                    style={{ width: index === 0 ? "96%" : index === 1 ? "82%" : "88%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Motion.section>
      </div>

      <Motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="surface-card section-card"
      >
        <header className="section-card__header">
          <span className="eyebrow">Inspiración externa</span>
          <h3 className="section-card__title">Cierra tu jornada con motivación</h3>
          <p className="section-card__subtitle">
            Consumimos la API pública de Dog CEO y mostramos una foto aleatoria para recordarte la meta: perros sanos y felices.
          </p>
        </header>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-contrast/10 bg-surface/80 p-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <TipsAndUpdatesIcon fontSize="medium" />
              </span>
              <div className="space-y-2 text-sm">
                {blnCargandoInspiracion ? (
                  <p className="text-contrast/70">Buscando una nueva fotografía...</p>
                ) : strErrorInspiracion ? (
                  <p className="text-red-400">{strErrorInspiracion}</p>
                ) : objInspiracion ? (
                  <>
                    <p className="text-base font-medium text-contrast">
                      {objInspiracion.strRaza ? `Raza destacada: ${objInspiracion.strRaza}` : "Inspírate con esta mirada"}
                    </p>
                    <div className="text-xs text-contrast/60">
                      <span>Fuente: {objInspiracion.strFuente}</span>
                      {objInspiracion.dtActualizado ? (
                        <span className="ml-2">
                          Actualizado: {" "}
                          {new Date(objInspiracion.dtActualizado).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <p className="text-contrast/70">Obtén tu primera inspiración visual.</p>
                )}
              </div>
            </div>
            {objInspiracion?.strImagen ? (
              <img
                src={objInspiracion.strImagen}
                alt={`Perro aleatorio ${objInspiracion.strRaza ?? "sin raza identificada"}`}
                loading="lazy"
                className="h-32 w-full rounded-2xl object-contain shadow-inner lg:h-28 lg:w-52"
              />
            ) : null}
          </div>
          <Motion.button
            type="button"
            onClick={obtenerInspiracion}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={blnCargandoInspiracion}
            className="btn-primary min-w-[180px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {blnCargandoInspiracion ? "Actualizando..." : "Nueva inspiración"}
          </Motion.button>
        </div>
      </Motion.section>
    </div>
  );
};
