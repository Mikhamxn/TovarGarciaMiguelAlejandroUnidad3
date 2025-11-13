import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { motion as Motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const esquemaLogin = Yup.object({
  strCorreo: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
  strContrasena: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria")
});

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
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      <Motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-3xl border border-contrast/10 bg-surface/95 p-8 text-contrast shadow-card backdrop-blur"
      >
        <div className="mb-6 space-y-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/15 p-3 text-primary">
            <LockOpenIcon />
          </span>
          <h2 className="font-display text-2xl font-semibold">Iniciar sesión</h2>
          <p className="text-sm text-contrast/65">Gestiona el cuidado de tus mascotas desde un panel cargado de ternura.</p>
        </div>
      <Formik initialValues={{ strCorreo: "", strContrasena: "" }} validationSchema={esquemaLogin} onSubmit={manejarEnvio}>
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-contrast" htmlFor="strCorreo">
                Correo electrónico
              </label>
              <Field
                id="strCorreo"
                name="strCorreo"
                type="email"
                autoComplete="email"
                className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <ErrorMessage name="strCorreo" component="span" className="text-xs font-medium text-rose-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-contrast" htmlFor="strContrasena">
                Contraseña
              </label>
              <Field
                id="strContrasena"
                name="strContrasena"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <ErrorMessage name="strContrasena" component="span" className="text-xs font-medium text-rose-500" />
            </div>
            {status ? <span className="text-xs font-medium text-rose-500">{status}</span> : null}
            <Motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              Entrar
            </Motion.button>
            <p className="text-center text-sm text-contrast/70">
              ¿Aún no tienes cuenta? <Link className="font-semibold text-primary hover:underline" to="/registro">Crear cuenta</Link>
            </p>
          </Form>
        )}
      </Formik>
      </Motion.section>
    </div>
  );
};
