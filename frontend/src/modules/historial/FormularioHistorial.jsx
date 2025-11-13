import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";

const esquemaHistorial = Yup.object({
  dtFechaConsulta: Yup.date().required("La fecha es obligatoria"),
  strDiagnostico: Yup.string().required("El diagnóstico es obligatorio")
});

export const FormularioHistorial = ({ objInicial = {}, onSubmit }) => (
  <Formik
    initialValues={{
      dtFechaConsulta: objInicial.dtFechaConsulta?.substring(0, 16) ?? "",
      strDiagnostico: objInicial.strDiagnostico ?? "",
      strTratamiento: objInicial.strTratamiento ?? "",
      strNotas: objInicial.strNotas ?? "",
      strVeterinario: objInicial.strVeterinario ?? ""
    }}
    validationSchema={esquemaHistorial}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status }) => (
      <Form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="dtFechaConsulta">
            Fecha y hora
          </label>
          <Field
            id="dtFechaConsulta"
            name="dtFechaConsulta"
            type="datetime-local"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <ErrorMessage name="dtFechaConsulta" component="span" className="text-xs font-medium text-rose-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strDiagnostico">
            Diagnóstico
          </label>
          <Field
            id="strDiagnostico"
            name="strDiagnostico"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <ErrorMessage name="strDiagnostico" component="span" className="text-xs font-medium text-rose-500" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strTratamiento">
              Tratamiento
            </label>
            <Field
              as="textarea"
              id="strTratamiento"
              name="strTratamiento"
              rows="3"
              className="h-full w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strNotas">
              Notas
            </label>
            <Field
              as="textarea"
              id="strNotas"
              name="strNotas"
              rows="3"
              className="h-full w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strVeterinario">
            Veterinario
          </label>
          <Field
            id="strVeterinario"
            name="strVeterinario"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        {status ? <span className="text-xs font-medium text-rose-500">{status}</span> : null}
        <Motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          Guardar registro
        </Motion.button>
      </Form>
    )}
  </Formik>
);
