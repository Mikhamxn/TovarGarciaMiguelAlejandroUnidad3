import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion as Motion } from "framer-motion";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const esquemaLogin = Yup.object({
  strCorreo: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
  strContrasena: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria")
});

const MotionPaper = Motion(Paper);
const MotionButton = Motion(Button);

export const PantallaLogin = () => {
  const { iniciarSesion } = useAuth();
  const navegar = useNavigate();

  const manejarEnvio = async (objValores, objAcciones) => {
    try {
      await iniciarSesion(objValores);
      navegar("/dashboard");
    } catch (objError) {
      objAcciones.setStatus(objError.response?.data?.strMensaje ?? "No fue posible iniciar sesión");
    } finally {
      objAcciones.setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 10 },
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at 20% 20%, rgba(129,140,248,0.22), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.88) 100%)"
            : "radial-gradient(circle at 25% 20%, rgba(94,129,244,0.16), transparent 55%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)"
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 460,
          borderRadius: 5,
          padding: { xs: 4, sm: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: theme.palette.mode === "dark"
            ? `linear-gradient(155deg, ${alpha("#0f172a", 0.95)} 0%, ${alpha("#1e2a3c", 0.9)} 100%)`
            : `linear-gradient(155deg, ${alpha("#ffffff", 0.95)} 0%, ${alpha("#f1f5f9", 0.9)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 55px 90px -45px rgba(8, 15, 32, 0.85)"
              : "0 48px 85px -40px rgba(94, 129, 244, 0.25)"
        })}
      >
        <Stack spacing={2.5} alignItems="center" textAlign="center">
          <Box
            sx={(theme) => ({
              width: 64,
              height: 64,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              boxShadow: theme.palette.mode === "dark" ? "0 18px 28px -20px rgba(15,23,42,0.9)" : "0 22px 32px -24px rgba(94,129,244,0.45)"
            })}
          >
            <LockOpenIcon fontSize="medium" />
          </Box>
          <Stack spacing={1.2}>
            <Typography variant="h4" fontFamily="var(--font-display)" fontWeight={600}>
              Iniciar sesión
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gestiona el cuidado de tus mascotas y mantén su expediente al día en un solo lugar.
            </Typography>
          </Stack>
        </Stack>

        <Formik initialValues={{ strCorreo: "", strContrasena: "" }} validationSchema={esquemaLogin} onSubmit={manejarEnvio}>
          {({ isSubmitting, status }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="strCorreo">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      type="email"
                      label="Correo electrónico"
                      autoComplete="email"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : " "}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                </Field>

                <Field name="strContrasena">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Contraseña"
                      autoComplete="current-password"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : " "}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                </Field>

                {status ? (
                  <Alert severity="error" variant="outlined" sx={{ borderRadius: 3 }}>
                    {status}
                  </Alert>
                ) : null}

                <MotionButton
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disableElevation
                  sx={{ py: 1.2, fontWeight: 600 }}
                  fullWidth
                >
                  Entrar
                </MotionButton>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  ¿Aún no tienes cuenta?{' '}
                  <Link component={RouterLink} to="/registro" underline="hover" fontWeight={600}>
                    Crear cuenta
                  </Link>
                </Typography>
              </Stack>
            </Form>
          )}
        </Formik>
      </MotionPaper>
    </Box>
  );
};
