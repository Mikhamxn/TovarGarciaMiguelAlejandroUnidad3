import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion as Motion } from "framer-motion";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const esquemaRegistro = Yup.object({
  strNombre: Yup.string().required("El nombre es obligatorio"),
  strCorreo: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
  strContrasena: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
  strContrasenaConfirmacion: Yup.string()
    .oneOf([Yup.ref("strContrasena"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña")
});

const MotionPaper = Motion(Paper);
const MotionButton = Motion(Button);

export const PantallaRegistro = () => {
  const { registrarUsuario } = useAuth();
  const navegar = useNavigate();

  const manejarEnvio = async (objValores, objAcciones) => {
    try {
      const { strNombre, strCorreo, strContrasena } = objValores;
      await registrarUsuario({ strNombre, strCorreo, strContrasena });
      navegar("/dashboard");
    } catch (objError) {
      objAcciones.setStatus(objError.response?.data?.strMensaje ?? "No fue posible registrar la cuenta");
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
            ? "radial-gradient(circle at 18% 20%, rgba(129,140,248,0.2), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.88) 100%)"
            : "radial-gradient(circle at 22% 18%, rgba(94,129,244,0.18), transparent 55%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)"
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 720,
          borderRadius: 5,
          padding: { xs: 4, sm: 5.5 },
          background: theme.palette.mode === "dark"
            ? `linear-gradient(155deg, ${alpha("#0f172a", 0.95)} 0%, ${alpha("#172a3b", 0.9)} 100%)`
            : `linear-gradient(155deg, ${alpha("#ffffff", 0.95)} 0%, ${alpha("#f1f5f9", 0.9)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 60px 95px -45px rgba(8, 15, 32, 0.85)"
              : "0 54px 92px -42px rgba(94, 129, 244, 0.25)"
        })}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid xs={12} md={5}>
            <Stack spacing={2.5} alignItems={{ xs: "center", md: "flex-start" }} textAlign={{ xs: "center", md: "left" }}>
              <Box
                sx={(theme) => ({
                  width: 68,
                  height: 68,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  boxShadow: theme.palette.mode === "dark" ? "0 20px 30px -24px rgba(15,23,42,0.9)" : "0 24px 36px -24px rgba(94,129,244,0.4)"
                })}
              >
                <PersonAddIcon fontSize="medium" />
              </Box>
              <Stack spacing={1.5}>
                <Typography variant="h4" fontFamily="var(--font-display)" fontWeight={600}>
                  Crear cuenta
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conecta a tu familia peluda con servicios veterinarios, seguimientos y recordatorios personalizados.
                </Typography>
              </Stack>
              <Divider flexItem sx={{ borderColor: alpha("#93c5fd", 0.2), my: 1 }}>
                <Chip label="Tu viaje comienza aquí" color="primary" variant="outlined" sx={{ borderRadius: 999 }} />
              </Divider>
              <Typography variant="body2" color="text.secondary">
                Disfruta de dashboards intuitivos, catálogos inteligentes de razas y alertas para mantener al día el calendario clínico.
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Formik
              initialValues={{
                strNombre: "",
                strCorreo: "",
                strContrasena: "",
                strContrasenaConfirmacion: ""
              }}
              validationSchema={esquemaRegistro}
              onSubmit={manejarEnvio}
            >
              {({ isSubmitting, status }) => (
                <Form>
                  <Stack spacing={3.5}>
                    <Field name="strNombre">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Nombre completo"
                          autoComplete="name"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error ? meta.error : " "}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutlineIcon fontSize="small" />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    </Field>

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

                    <Grid container spacing={2}>
                      <Grid xs={12} sm={6}>
                        <Field name="strContrasena">
                          {({ field, meta }) => (
                            <TextField
                              {...field}
                              type="password"
                              label="Contraseña"
                              autoComplete="new-password"
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
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Field name="strContrasenaConfirmacion">
                          {({ field, meta }) => (
                            <TextField
                              {...field}
                              type="password"
                              label="Confirmar contraseña"
                              autoComplete="new-password"
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
                      </Grid>
                    </Grid>

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
                      whileTap={{ scale: 0.97 }}
                      disableElevation
                      sx={{ py: 1.2, fontWeight: 600 }}
                      fullWidth
                    >
                      Registrarme
                    </MotionButton>

                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      ¿Ya tienes cuenta?{' '}
                      <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
                        Iniciar sesión
                      </Link>
                    </Typography>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MotionPaper>
    </Box>
  );
};
