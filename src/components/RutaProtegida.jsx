import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ children }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RutaProtegida;