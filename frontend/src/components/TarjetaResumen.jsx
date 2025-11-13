import { motion } from "framer-motion";

const MotionArticle = motion.article;
const MotionIcon = motion.div;

export const TarjetaResumen = ({ icono, strTitulo, strValor, strDescripcion, emphasis = false }) => (
  <MotionArticle
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 220, damping: 20 }}
    className={`summary-card ${emphasis ? "summary-card--emphasis" : ""}`}
  >
    <MotionIcon whileHover={{ rotate: 3 }} className="summary-card__icon">
      {icono}
    </MotionIcon>
    <div>
      <span className="summary-card__eyebrow">{strTitulo}</span>
      <strong className="summary-card__value">{strValor}</strong>
      {strDescripcion ? <p className="summary-card__description">{strDescripcion}</p> : null}
    </div>
    <span className="summary-card__radiance" />
  </MotionArticle>
);
