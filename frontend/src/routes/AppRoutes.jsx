import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PantallaLogin } from "../modules/auth/PantallaLogin";
import { PantallaRegistro } from "../modules/auth/PantallaRegistro";
import { PantallaDashboard } from "../modules/dashboard/PantallaDashboard";
import { PantallaMascotas } from "../modules/mascotas/PantallaMascotas";
import { PantallaVacunas } from "../modules/vacunas/PantallaVacunas";
import { PantallaCitas } from "../modules/citas/PantallaCitas";
import { PantallaAlergias } from "../modules/alergias/PantallaAlergias";
import { PantallaHistorial } from "../modules/historial/PantallaHistorial";
import { PerfilUsuario } from "../pages/PerfilUsuario";

const objRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <PantallaDashboard /> },
          { path: "/mascotas", element: <PantallaMascotas /> },
          { path: "/vacunas", element: <PantallaVacunas /> },
          { path: "/citas", element: <PantallaCitas /> },
          { path: "/alergias", element: <PantallaAlergias /> },
          { path: "/historial", element: <PantallaHistorial /> },
          { path: "/perfil", element: <PerfilUsuario /> }
        ]
      }
    ]
  },
  { path: "/login", element: <PantallaLogin /> },
  { path: "/registro", element: <PantallaRegistro /> }
]);

export const AppRoutes = () => <RouterProvider router={objRouter} />;
