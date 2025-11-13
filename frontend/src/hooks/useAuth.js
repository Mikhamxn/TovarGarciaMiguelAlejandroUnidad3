import { useContext } from "react";
import { AuthContexto } from "../contexts/authContextoContext";

export const useAuth = () => useContext(AuthContexto);
