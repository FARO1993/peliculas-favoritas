import { useEffect, useRef, useState } from "react";
import { validarPelicula, esValido } from "../validators/peliculaValidator";

const FORMULARIO_VACIO = {
  titulo: "",
  anio: "",
  genero: "",
  rating: "",
  favorita: false,
};

function PeliculaForm({ peliculaEditando, onGuardar, onCancelar, guardando }) {
  const [datos, setDatos] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const inputTituloRef = useRef(null);

  // Cuando cambia la película a editar, precargamos el formulario.
  // Si es null, significa que estamos en modo "crear" y limpiamos los campos.
  useEffect(() => {
    if (peliculaEditando) {
      setDatos({
        titulo: peliculaEditando.titulo,
        anio: peliculaEditando.anio,
        genero: peliculaEditando.genero,
        rating: peliculaEditando.rating,
        favorita: peliculaEditando.favorita,
      });
    } else {
      setDatos(FORMULARIO_VACIO);
    }
    setErrores({});
  }, [peliculaEditando]);

  // useRef para poner el foco automáticamente en el campo título
  // cada vez que se abre el formulario (crear o editar).
  useEffect(() => {
    inputTituloRef.current?.focus();
  }, [peliculaEditando]);

  const handleChange = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresEncontrados = validarPelicula(datos);
    setErrores(erroresEncontrados);

    if (!esValido(erroresEncontrados)) {
      return;
    }

    await onGuardar(datos);
    setDatos(FORMULARIO_VACIO);
    setErrores({});
  };

  const handleCancelar = () => {
    setDatos(FORMULARIO_VACIO);
    setErrores({});
    onCancelar();
  };

  return (
    <form className="pelicula-form" onSubmit={handleSubmit}>
      <h2>{peliculaEditando ? "Editar película" : "Agregar película"}</h2>

      <div className="pelicula-form__campo">
        <label htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          ref={inputTituloRef}
          type="text"
          value={datos.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
          disabled={guardando}
        />
        {errores.titulo && <p className="pelicula-form__error">{errores.titulo}</p>}
      </div>

      <div className="pelicula-form__fila">
        <div className="pelicula-form__campo">
          <label htmlFor="anio">Año *</label>
          <input
            id="anio"
            type="number"
            value={datos.anio}
            onChange={(e) => handleChange("anio", e.target.value)}
            disabled={guardando}
          />
          {errores.anio && <p className="pelicula-form__error">{errores.anio}</p>}
        </div>

        <div className="pelicula-form__campo">
          <label htmlFor="rating">Rating (0-10) *</label>
          <input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={datos.rating}
            onChange={(e) => handleChange("rating", e.target.value)}
            disabled={guardando}
          />
          {errores.rating && <p className="pelicula-form__error">{errores.rating}</p>}
        </div>
      </div>

      <div className="pelicula-form__campo">
        <label htmlFor="genero">Género *</label>
        <input
          id="genero"
          type="text"
          value={datos.genero}
          onChange={(e) => handleChange("genero", e.target.value)}
          disabled={guardando}
        />
        {errores.genero && <p className="pelicula-form__error">{errores.genero}</p>}
      </div>

      <div className="pelicula-form__acciones">
        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : peliculaEditando ? "Guardar cambios" : "Agregar"}
        </button>
        {peliculaEditando && (
          <button type="button" onClick={handleCancelar} disabled={guardando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PeliculaForm;
