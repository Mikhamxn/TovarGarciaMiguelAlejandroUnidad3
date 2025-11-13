import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";

const esquemaVacuna = Yup.object({
  strNombreVacuna: Yup.string().required("El nombre de la vacuna es obligatorio"),
  dtFechaAplicacion: Yup.date().required("La fecha de aplicación es obligatoria"),
  dtFechaRefuerzo: Yup.date().nullable()
});

export const FormularioVacuna = ({ objInicial = {}, onSubmit }) => (
  <Formik
    initialValues={{
      strNombreVacuna: objInicial.strNombreVacuna ?? "",
      dtFechaAplicacion: objInicial.dtFechaAplicacion?.substring(0, 10) ?? "",
      dtFechaRefuerzo: objInicial.dtFechaRefuerzo?.substring(0, 10) ?? "",
      strVeterinario: objInicial.strVeterinario ?? "",
      strObservaciones: objInicial.strObservaciones ?? ""
    }}
    validationSchema={esquemaVacuna}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status }) => (
      <Form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strNombreVacuna">
            Nombre de la vacuna
          </label>
          <Field
            id="strNombreVacuna"
            name="strNombreVacuna"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          />
          <ErrorMessage name="strNombreVacuna" component="span" className="text-xs font-medium text-rose-500" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="dtFechaAplicacion">
              Fecha de aplicación
            </label>
            <Field
              id="dtFechaAplicacion"
              name="dtFechaAplicacion"
              type="date"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
            <ErrorMessage name="dtFechaAplicacion" component="span" className="text-xs font-medium text-rose-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="dtFechaRefuerzo">
              Fecha de refuerzo
            </label>
            <Field
              id="dtFechaRefuerzo"
              name="dtFechaRefuerzo"
              type="date"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
            <ErrorMessage name="dtFechaRefuerzo" component="span" className="text-xs font-medium text-rose-500" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strVeterinario">
              Veterinario
            </label>
            <Field
              id="strVeterinario"
              name="strVeterinario"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strObservaciones">
              Observaciones
            </label>
            <Field
              as="textarea"
              id="strObservaciones"
              name="strObservaciones"
              rows="3"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>
        </div>
        {status ? <span className="text-xs font-medium text-rose-500">{status}</span> : null}
        <Motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          Guardar vacuna
        </Motion.button>
      </Form>
    )}
  </Formik>
);
