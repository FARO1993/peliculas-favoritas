import { useEffect, useMemo, useState } from "react";
import * as peliculasService from "../services/peliculasService";
import PeliculaForm from "../components/PeliculaForm";
import PeliculaCard from "../components/PeliculaCard";
import Buscador from "../components/Buscador";

function ListadoPeliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [peliculaEditando, setPeliculaEditando] = useState(null);

  useEffect(() => {
    cargarPeliculas();
  }, []);

  async function cargarPeliculas() {
    setCargando(true);
    setError("");
    try {
      const datos = await peliculasService.obtenerTodos();
      setPeliculas(datos);
    } catch (err) {
      setError("No se pudieron cargar las películas. Intentá nuevamente.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  }

  // Filtrado optimizado con useMemo: solo se recalcula si cambian
  // la lista de películas o el término de búsqueda.
  const peliculasFiltradas = useMemo(() => {
    return peliculas.filter((p) =>
      p.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [peliculas, busqueda]);

  async function handleGuardar(datosFormulario) {
    setGuardando(true);
    setError("");
    try {
      if (peliculaEditando) {
        await peliculasService.actualizar(peliculaEditando.id, datosFormulario);
      } else {
        await peliculasService.crear(datosFormulario);
      }
      setPeliculaEditando(null);
      await cargarPeliculas();
    } catch (err) {
      setError("Ocurrió un error al guardar la película.");
      console.error(err);
    } finally {
      setGuardando(false);
    }
  }

  async function handleEliminar(pelicula) {
    const confirmado = window.confirm(
      `¿Seguro que querés eliminar "${pelicula.titulo}"?`
    );
    if (!confirmado) return;

    setError("");
    try {
      await peliculasService.eliminar(pelicula.id);
      setPeliculas((prev) => prev.filter((p) => p.id !== pelicula.id));
    } catch (err) {
      setError("Ocurrió un error al eliminar la película.");
      console.error(err);
    }
  }

  async function handleCambiarFavorita(pelicula) {
    setError("");
    try {
      await peliculasService.cambiarEstado(pelicula.id, pelicula.favorita);
      setPeliculas((prev) =>
        prev.map((p) =>
          p.id === pelicula.id ? { ...p, favorita: !p.favorita } : p
        )
      );
    } catch (err) {
      setError("Ocurrió un error al actualizar el estado de favorita.");
      console.error(err);
    }
  }

  return (
    <section className="listado">
      <PeliculaForm
        peliculaEditando={peliculaEditando}
        onGuardar={handleGuardar}
        onCancelar={() => setPeliculaEditando(null)}
        guardando={guardando}
      />

      <div className="listado__toolbar">
        <Buscador valor={busqueda} onChange={setBusqueda} />
      </div>

      {error && <p className="listado__error">{error}</p>}

      {cargando && <p className="listado__estado">Cargando películas...</p>}

      {!cargando && peliculasFiltradas.length === 0 && !error && (
        <p className="listado__estado">
          {busqueda
            ? `No se encontraron películas para "${busqueda}"`
            : "Todavía no agregaste ninguna película."}
        </p>
      )}

      {!cargando && peliculasFiltradas.length > 0 && (
        <ul className="listado__lista">
          {peliculasFiltradas.map((pelicula) => (
            <PeliculaCard
              key={pelicula.id}
              pelicula={pelicula}
              onEditar={setPeliculaEditando}
              onEliminar={handleEliminar}
              onCambiarFavorita={handleCambiarFavorita}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListadoPeliculas;
