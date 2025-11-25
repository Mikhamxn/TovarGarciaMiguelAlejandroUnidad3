import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const esquemaMascota = Yup.object({
  strNombre: Yup.string().required("El nombre es obligatorio"),
  intCatEspecie: Yup.number().required("La especie es obligatoria"),
  dtFechaNacimiento: Yup.date().nullable().max(new Date(), "La fecha no puede ser futura")
});

const MotionButton = Motion(Button);

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
      {({ isSubmitting, status, values }) => {
        const arrRazasFiltradas = (
          arrRazas.length > 0
            ? arrRazas.filter((r) => String(r.intCatEspecie) === String(values.intCatEspecie))
            : objRazasPorEspecie[values.intCatEspecie] || []
        );

        return (
          <Form>
            <Stack spacing={3}>
              <Field name="strNombre">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nombre de la mascota"
                    placeholder="Firulais"
                    size="small"
                    variant="outlined"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error ? meta.error : " "}
                  />
                )}
              </Field>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Field name="intCatEspecie">
                  {({ field, meta }) => {
                    const helperTexto = meta.touched && meta.error
                      ? meta.error
                      : "La especie seleccionada determina las razas disponibles.";
                    return (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Especie"
                        size="small"
                        variant="outlined"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={helperTexto}
                      >
                        <MenuItem value="">Selecciona una especie</MenuItem>
                        {arrEspeciesFallback.map((objEspecie) => (
                          <MenuItem key={objEspecie.intCatEspecie} value={objEspecie.intCatEspecie}>
                            {objEspecie.strNombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }}
                </Field>

                <Field name="intCatRaza">
                  {({ field, meta }) => {
                    const helperTexto = meta.touched && meta.error
                      ? meta.error
                      : values.intCatEspecie
                        ? arrRazasFiltradas.length > 0
                          ? `Razas disponibles: ${arrRazasFiltradas.map((r) => r.strNombre).join(", ")}`
                          : "No hay razas para esta especie"
                        : "Selecciona primero la especie";
                    return (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Raza"
                        size="small"
                        variant="outlined"
                        disabled={!values.intCatEspecie}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={helperTexto}
                      >
                        <MenuItem value="">Selecciona una raza</MenuItem>
                        {arrRazasFiltradas.map((objRaza) => (
                          <MenuItem key={objRaza.intCatRaza} value={objRaza.intCatRaza}>
                            {objRaza.strNombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }}
                </Field>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Field name="dtFechaNacimiento">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      type="date"
                      fullWidth
                      label="Fecha de nacimiento"
                      size="small"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : " "}
                    />
                  )}
                </Field>

                <Field name="strColor">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Color"
                      placeholder="Marrón"
                      size="small"
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : " "}
                    />
                  )}
                </Field>
              </Stack>

              <Field name="strNotas">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Notas adicionales"
                    multiline
                    minRows={3}
                    maxRows={5}
                    size="small"
                    variant="outlined"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error ? meta.error : " "}
                  />
                )}
              </Field>

              {status ? <Alert severity="error" variant="outlined" sx={{ borderRadius: 3 }}>{status}</Alert> : null}

              <MotionButton
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disableElevation
                fullWidth
                sx={{ borderRadius: 999, py: 1.25, textTransform: "none" }}
              >
                Guardar
              </MotionButton>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
