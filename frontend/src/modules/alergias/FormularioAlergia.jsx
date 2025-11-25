import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion as Motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const esquemaAlergia = Yup.object({
  strNombre: Yup.string().required("El nombre es obligatorio")
});

const MotionButton = Motion(Button);

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
      <Form>
        <Stack spacing={3}>
          <Field name="strNombre">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Nombre de la alergia"
                size="small"
                variant="outlined"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
              />
            )}
          </Field>

          <Field name="strSintomas">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Síntomas"
                size="small"
                variant="outlined"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
              />
            )}
          </Field>

          <Field name="strTratamiento">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Tratamiento"
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
            Guardar alergia
          </MotionButton>
        </Stack>
      </Form>
    )}
  </Formik>
);
