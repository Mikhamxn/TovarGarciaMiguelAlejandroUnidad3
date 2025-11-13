import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { objUsuario } = useAuth();
  if (!objUsuario) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
