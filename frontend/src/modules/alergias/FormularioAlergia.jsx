import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";

const esquemaAlergia = Yup.object({
  strNombre: Yup.string().required("El nombre es obligatorio")
});

export const FormularioAlergia = ({ objInicial = {}, onSubmit }) => (
  <Formik
    initialValues={{
      strNombre: objInicial.strNombre ?? "",
      strSintomas: objInicial.strSintomas ?? "",
      strTratamiento: objInicial.strTratamiento ?? "",
      strNotas: objInicial.strNotas ?? ""
    }}
    validationSchema={esquemaAlergia}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status }) => (
      <Form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strNombre">
            Nombre de la alergia
          </label>
          <Field
            id="strNombre"
            name="strNombre"
            className="w-full rounded-xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <ErrorMessage
            name="strNombre"
            component="span"
            className="text-xs font-medium text-rose-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strSintomas">
            Síntomas
          </label>
          <Field
            id="strSintomas"
            name="strSintomas"
            className="w-full rounded-xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strTratamiento">
            Tratamiento
          </label>
          <Field
            id="strTratamiento"
            name="strTratamiento"
            className="w-full rounded-xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
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
          Guardar alergia
        </Motion.button>
      </Form>
    )}
  </Formik>
);
