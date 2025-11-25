import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const esquemaHistorial = Yup.object({
  dtFechaConsulta: Yup.date().required("La fecha es obligatoria"),
  strDiagnostico: Yup.string().required("El diagnóstico es obligatorio")
});

const MotionButton = Motion(Button);

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
      <Form>
        <Stack spacing={3}>
          <Field name="dtFechaConsulta">
            {({ field, meta }) => (
              <TextField
                {...field}
                type="datetime-local"
                fullWidth
                label="Fecha y hora"
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
              />
            )}
          </Field>

          <Field name="strDiagnostico">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Diagnóstico"
                size="small"
                variant="outlined"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
              />
            )}
          </Field>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Field name="strTratamiento">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Tratamiento"
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

            <Field name="strNotas">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Notas"
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
            Guardar registro
          </MotionButton>
        </Stack>
      </Form>
    )}
  </Formik>
);
