import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";

const esquemaCita = Yup.object({
  dtFechaCita: Yup.date().required("La fecha es obligatoria"),
  strMotivo: Yup.string().required("El motivo es obligatorio")
});

export const FormularioCita = ({ objInicial = {}, onSubmit, arrTipos = [] }) => (
  <Formik
    initialValues={{
      dtFechaCita: objInicial.dtFechaCita?.substring(0, 16) ?? "",
      intCatTipoCita: objInicial.intCatTipoCita ?? "",
      strMotivo: objInicial.strMotivo ?? "",
      strNotas: objInicial.strNotas ?? "",
      strVeterinario: objInicial.strVeterinario ?? "",
      strUbicacion: objInicial.strUbicacion ?? "",
      blnConfirmada: objInicial.blnConfirmada ?? false
    }}
    validationSchema={esquemaCita}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status }) => (
      <Form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="dtFechaCita">
            Fecha y hora
          </label>
          <Field
            id="dtFechaCita"
            name="dtFechaCita"
            type="datetime-local"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <ErrorMessage name="dtFechaCita" component="span" className="text-xs font-medium text-rose-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="intCatTipoCita">
            Tipo de cita
          </label>
          <Field
            as="select"
            id="intCatTipoCita"
            name="intCatTipoCita"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="">Selecciona un tipo</option>
            {arrTipos.map((objTipo) => (
              <option key={objTipo.intCatTipoCita} value={objTipo.intCatTipoCita}>
                {objTipo.strNombre}
              </option>
            ))}
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strMotivo">
              Motivo
            </label>
            <Field
              id="strMotivo"
              name="strMotivo"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <ErrorMessage name="strMotivo" component="span" className="text-xs font-medium text-rose-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strVeterinario">
              Veterinario
            </label>
            <Field
              id="strVeterinario"
              name="strVeterinario"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strUbicacion">
              Ubicación
            </label>
            <Field
              id="strUbicacion"
              name="strUbicacion"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
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
              className="h-full w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-contrast/70">
          <Field type="checkbox" name="blnConfirmada" className="h-4 w-4 rounded border-contrast/30 bg-surface text-accent focus:ring-accent/40" />
          Cita confirmada
        </label>
        {status ? <span className="text-xs font-medium text-rose-500">{status}</span> : null}
        <Motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          Guardar cita
        </Motion.button>
      </Form>
    )}
  </Formik>
);
