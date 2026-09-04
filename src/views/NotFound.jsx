import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/">Volver al listado</Link>
    </div>
  );
}

export default NotFound;
