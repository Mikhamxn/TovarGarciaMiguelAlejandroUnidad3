import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const esquemaVacuna = Yup.object({
  strNombreVacuna: Yup.string().required("El nombre de la vacuna es obligatorio"),
  dtFechaAplicacion: Yup.date().required("La fecha de aplicación es obligatoria"),
  dtFechaRefuerzo: Yup.date().nullable()
});

const MotionButton = Motion(Button);

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
      <Form>
        <Stack spacing={3}>
          <Field name="strNombreVacuna">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Nombre de la vacuna"
                size="small"
                variant="outlined"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
              />
            )}
          </Field>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Field name="dtFechaAplicacion">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="Fecha de aplicación"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                />
              )}
            </Field>

            <Field name="dtFechaRefuerzo">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="Fecha de refuerzo"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                />
              )}
            </Field>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Field name="strVeterinario">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Veterinario"
                  size="small"
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                />
              )}
            </Field>

            <Field name="strObservaciones">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Observaciones"
                  size="small"
                  variant="outlined"
                  multiline
                  minRows={3}
                  maxRows={5}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                />
              )}
            </Field>
          </Stack>

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
            Guardar vacuna
          </MotionButton>
        </Stack>
      </Form>
    )}
  </Formik>
);
