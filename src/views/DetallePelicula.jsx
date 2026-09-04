import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as peliculasService from "../services/peliculasService";

function DetallePelicula() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDetalle() {
      setCargando(true);
      setError("");
      try {
        const datos = await peliculasService.obtenerPorId(id);
        if (!datos) {
          setError("No se encontró la película solicitada.");
        } else {
          setPelicula(datos);
        }
      } catch (err) {
        setError("Ocurrió un error al obtener el detalle de la película.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();
  }, [id]);

  if (cargando) {
    return <p className="listado__estado">Cargando detalle...</p>;
  }

  if (error) {
    return (
      <div className="detalle">
        <p className="listado__error">{error}</p>
        <Link to="/">Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="detalle">
      <Link to="/" className="detalle__volver">
        ← Volver al listado
      </Link>

      <h1>
        {pelicula.titulo}{" "}
        {pelicula.favorita && <span className="detalle__favorita">★</span>}
      </h1>

      <ul className="detalle__lista">
        <li>
          <strong>Año de estreno:</strong> {pelicula.anio}
        </li>
        <li>
          <strong>Género:</strong> {pelicula.genero}
        </li>
        <li>
          <strong>Rating:</strong> {pelicula.rating}/10
        </li>
        <li>
          <strong>Favorita:</strong> {pelicula.favorita ? "Sí" : "No"}
        </li>
      </ul>
    </div>
  );
}

export default DetallePelicula;
