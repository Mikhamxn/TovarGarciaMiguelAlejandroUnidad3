import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const esquemaCita = Yup.object({
  dtFechaCita: Yup.date().required("La fecha es obligatoria"),
  strMotivo: Yup.string().required("El motivo es obligatorio")
});

const MotionButton = Motion(Button);

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
    {({ isSubmitting, status, values }) => (
      <Form>
        <Stack spacing={3}>
          <Field name="dtFechaCita">
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

          <Field name="intCatTipoCita">
            {({ field, meta }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Tipo de cita"
                size="small"
                variant="outlined"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
              >
                <MenuItem value="">Selecciona un tipo</MenuItem>
                {arrTipos.map((objTipo) => (
                  <MenuItem key={objTipo.intCatTipoCita} value={objTipo.intCatTipoCita}>
                    {objTipo.strNombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Field name="strMotivo">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Motivo"
                  size="small"
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                />
              )}
            </Field>

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
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Field name="strUbicacion">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Ubicación"
                  size="small"
                  variant="outlined"
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

          <Field name="blnConfirmada">
            {({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Cita confirmada"
                sx={{ color: "text.secondary", m: 0 }}
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
            Guardar cita
          </MotionButton>
        </Stack>
      </Form>
    )}
  </Formik>
);
