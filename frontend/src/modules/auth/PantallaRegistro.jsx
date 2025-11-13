import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { motion as Motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const esquemaRegistro = Yup.object({
  strNombre: Yup.string().required("El nombre es obligatorio"),
  strCorreo: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
  strContrasena: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
  strContrasenaConfirmacion: Yup.string()
    .oneOf([Yup.ref("strContrasena"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña")
});

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
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      <Motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-2xl rounded-3xl border border-contrast/10 bg-surface/95 p-8 text-contrast shadow-card backdrop-blur"
      >
        <div className="mb-6 space-y-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/15 p-3 text-primary">
            <PersonAddIcon />
          </span>
          <h2 className="font-display text-2xl font-semibold">Crear cuenta</h2>
          <p className="text-sm text-contrast/65">Construye el hogar digital que tus mascotas merecen con nuestra comunidad peluda.</p>
        </div>
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
          <Form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-contrast" htmlFor="strNombre">
                Nombre completo
              </label>
              <Field
                id="strNombre"
                name="strNombre"
                className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <ErrorMessage name="strNombre" component="span" className="text-xs font-medium text-rose-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-contrast" htmlFor="strCorreo">
                Correo electrónico
              </label>
              <Field
                id="strCorreo"
                name="strCorreo"
                type="email"
                className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <ErrorMessage name="strCorreo" component="span" className="text-xs font-medium text-rose-500" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-contrast" htmlFor="strContrasena">
                  Contraseña
                </label>
                <Field
                  id="strContrasena"
                  name="strContrasena"
                  type="password"
                  className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <ErrorMessage name="strContrasena" component="span" className="text-xs font-medium text-rose-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-contrast" htmlFor="strContrasenaConfirmacion">
                  Confirmar contraseña
                </label>
                <Field
                  id="strContrasenaConfirmacion"
                  name="strContrasenaConfirmacion"
                  type="password"
                  className="w-full rounded-2xl border border-contrast/15 bg-surface px-4 py-2 text-sm text-contrast shadow-inner focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <ErrorMessage name="strContrasenaConfirmacion" component="span" className="text-xs font-medium text-rose-500" />
              </div>
            </div>
            {status ? <span className="text-xs font-medium text-rose-500">{status}</span> : null}
            <Motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              Registrarme
            </Motion.button>
            <p className="text-center text-sm text-contrast/70">
              ¿Ya tienes cuenta? <Link className="font-semibold text-primary hover:underline" to="/login">Iniciar sesión</Link>
            </p>
          </Form>
        )}
      </Formik>
      </Motion.section>
    </div>
  );
};
