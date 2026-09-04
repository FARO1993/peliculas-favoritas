import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("Ingresá un nombre para continuar");
      inputRef.current?.focus();
      return;
    }

    iniciarSesion(nombre.trim());
    navigate("/");
  };

  return (
    <div className="login">
      <h1>Iniciar sesión</h1>
      <p>Ingresá tu nombre para identificarte en la aplicación.</p>

      <form onSubmit={handleSubmit} className="login__form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {error && <p className="pelicula-form__error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
