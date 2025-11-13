import { motion as Motion } from "framer-motion";

export const EncabezadoPagina = ({ etiqueta, titulo, descripcion, acciones, ilustracion }) => (
  <Motion.section
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="page-header"
  >
    <div className="page-header__layout">
      <div className="page-header__info">
        {etiqueta ? <span className="page-header__tag">{etiqueta}</span> : null}
        <div>
          <h2 className="page-header__title">{titulo}</h2>
          {descripcion ? <p className="page-header__description">{descripcion}</p> : null}
        </div>
        {acciones ? <div className="page-header__actions">{acciones}</div> : null}
      </div>
      {ilustracion ? (
        <Motion.div whileHover={{ scale: 1.03 }} className="page-header__illustration">
          {ilustracion}
          <span className="page-header__halo" />
        </Motion.div>
      ) : null}
    </div>
  </Motion.section>
);
