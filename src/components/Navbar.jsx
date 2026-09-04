import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="navbar__marca">
        🎬 Mis Películas Favoritas
      </Link>

      <div className="navbar__auth">
        {usuario ? (
          <>
            <span className="navbar__usuario">Hola, {usuario}</span>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login" className="navbar__login">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
