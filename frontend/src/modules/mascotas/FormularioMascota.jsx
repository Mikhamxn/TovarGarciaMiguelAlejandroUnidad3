import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { motion as Motion } from "framer-motion";

const esquemaMascota = Yup.object({
  strNombre: Yup.string().required("El nombre es obligatorio"),
  intCatEspecie: Yup.number().required("La especie es obligatoria"),
  dtFechaNacimiento: Yup.date().nullable().max(new Date(), "La fecha no puede ser futura")
});

export const FormularioMascota = ({ objInicial = {}, onSubmit, arrEspecies = [], arrRazas = [] }) => {
  const arrEspeciesFallback = useMemo(
    () =>
      arrEspecies.length > 0
        ? arrEspecies
        : [
            { intCatEspecie: 1, strNombre: "Perro" },
            { intCatEspecie: 2, strNombre: "Gato" },
            { intCatEspecie: 3, strNombre: "Ave" },
            { intCatEspecie: 4, strNombre: "Roedor" }
          ],
    [arrEspecies]
  );

  const objRazasPorEspecie = useMemo(
    () => ({
      1: [
        { intCatRaza: 101, strNombre: "Golden Retriever" },
        { intCatRaza: 102, strNombre: "Labrador" },
        { intCatRaza: 103, strNombre: "Bulldog" },
        { intCatRaza: 104, strNombre: "Chihuahua" }
      ],
      2: [
        { intCatRaza: 201, strNombre: "Siames" },
        { intCatRaza: 202, strNombre: "Persa" },
        { intCatRaza: 203, strNombre: "Maine Coon" },
        { intCatRaza: 204, strNombre: "Bengala" }
      ],
      3: [
        { intCatRaza: 301, strNombre: "Canario" },
        { intCatRaza: 302, strNombre: "Perico" },
        { intCatRaza: 303, strNombre: "Cacatúa" }
      ],
      4: [
        { intCatRaza: 401, strNombre: "Hamster" },
        { intCatRaza: 402, strNombre: "Conejo" },
        { intCatRaza: 403, strNombre: "Cobaya" }
      ]
    }),
    []
  );

  return (
    <Formik
      initialValues={{
        strNombre: objInicial.strNombre ?? "",
        intCatEspecie: objInicial.intCatEspecie ?? "",
        intCatRaza: objInicial.intCatRaza ?? "",
        dtFechaNacimiento: objInicial.dtFechaNacimiento?.substring(0, 10) ?? "",
        strColor: objInicial.strColor ?? "",
        strNotas: objInicial.strNotas ?? ""
      }}
      validationSchema={esquemaMascota}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status, values, setFieldValue }) => {
        const arrRazasFiltradas = (
          arrRazas.length > 0
            ? arrRazas.filter((r) => String(r.intCatEspecie) === String(values.intCatEspecie))
            : objRazasPorEspecie[values.intCatEspecie] || []
        );

        if (
          values.intCatRaza &&
          arrRazasFiltradas.length > 0 &&
            !arrRazasFiltradas.some((r) => String(r.intCatRaza) === String(values.intCatRaza))
        ) {
          setFieldValue("intCatRaza", "");
        }

        return (
          <Form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strNombre">
            Nombre de la mascota
          </label>
          <Field
            id="strNombre"
            name="strNombre"
            placeholder="Firulais"
            className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <ErrorMessage name="strNombre" component="span" className="text-xs font-medium text-rose-500" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="intCatEspecie">
              Especie
            </label>
            <Field
              as="select"
              id="intCatEspecie"
              name="intCatEspecie"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Selecciona una especie</option>
              {arrEspeciesFallback.map((objEspecie) => (
                <option key={objEspecie.intCatEspecie} value={objEspecie.intCatEspecie}>
                  {objEspecie.strNombre}
                </option>
              ))}
            </Field>
            <ErrorMessage name="intCatEspecie" component="span" className="text-xs font-medium text-rose-500" />
            <p className="text-[11px] text-contrast/60">La especie seleccionada determina las razas disponibles.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="intCatRaza">
              Raza
            </label>
            <Field
              as="select"
              id="intCatRaza"
              name="intCatRaza"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              disabled={!values.intCatEspecie}
            >
              <option value="">Selecciona una raza</option>
              {arrRazasFiltradas.map((objRaza) => (
                <option key={objRaza.intCatRaza} value={objRaza.intCatRaza}>
                  {objRaza.strNombre}
                </option>
              ))}
            </Field>
            <p className="text-[11px] text-contrast/60">
              {values.intCatEspecie
                ? arrRazasFiltradas.length > 0
                  ? `Razas disponibles: ${arrRazasFiltradas.map((r) => r.strNombre).join(", ")}`
                  : "No hay razas para esta especie"
                : "Selecciona primero la especie"}
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="dtFechaNacimiento">
              Fecha de nacimiento
            </label>
            <Field
              id="dtFechaNacimiento"
              type="date"
              name="dtFechaNacimiento"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <ErrorMessage name="dtFechaNacimiento" component="span" className="text-xs font-medium text-rose-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-contrast" htmlFor="strColor">
              Color
            </label>
            <Field
              id="strColor"
              name="strColor"
              placeholder="Marrón"
              className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-contrast" htmlFor="strNotas">
            Notas adicionales
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
          Guardar
        </Motion.button>
      </Form>
        );
      }}
    </Formik>
  );
};
