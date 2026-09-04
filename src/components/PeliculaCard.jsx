import { Link } from "react-router-dom";

function PeliculaCard({ pelicula, onEditar, onEliminar, onCambiarFavorita }) {
  return (
    <li className="pelicula-card">
      <div className="pelicula-card__info">
        <h3>
          {pelicula.titulo}{" "}
          <span className="pelicula-card__anio">({pelicula.anio})</span>
        </h3>
        <p className="pelicula-card__meta">
          {pelicula.genero} · ⭐ {pelicula.rating}/10
        </p>
      </div>

      <div className="pelicula-card__acciones">
        <button
          className={
            pelicula.favorita
              ? "pelicula-card__favorita pelicula-card__favorita--activa"
              : "pelicula-card__favorita"
          }
          onClick={() => onCambiarFavorita(pelicula)}
          title="Marcar/desmarcar como favorita"
        >
          {pelicula.favorita ? "★ Favorita" : "☆ Marcar favorita"}
        </button>

        <Link to={`/movies/${pelicula.id}`} className="pelicula-card__detalle">
          Ver detalle
        </Link>

        <button onClick={() => onEditar(pelicula)}>Editar</button>
        <button
          className="pelicula-card__eliminar"
          onClick={() => onEliminar(pelicula)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default PeliculaCard;
