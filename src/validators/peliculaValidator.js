const ANIO_MINIMO = 1888; // año de la primera película registrada en la historia
const ANIO_MAXIMO = new Date().getFullYear() + 1;

/**
 * Valida los datos de una película antes de enviarlos a Firestore.
 * Devuelve un objeto con los errores encontrados por campo.
 * Un objeto vacío significa que los datos son válidos.
 */
export function validarPelicula(datos) {
  const errores = {};

  if (!datos.titulo || !datos.titulo.trim()) {
    errores.titulo = "El título es obligatorio";
  }

  if (!datos.anio) {
    errores.anio = "El año es obligatorio";
  } else if (
    isNaN(Number(datos.anio)) ||
    Number(datos.anio) < ANIO_MINIMO ||
    Number(datos.anio) > ANIO_MAXIMO
  ) {
    errores.anio = `El año debe estar entre ${ANIO_MINIMO} y ${ANIO_MAXIMO}`;
  }

  if (!datos.genero || !datos.genero.trim()) {
    errores.genero = "El género es obligatorio";
  }

  if (datos.rating === "" || datos.rating === undefined || datos.rating === null) {
    errores.rating = "El rating es obligatorio";
  } else if (isNaN(Number(datos.rating)) || Number(datos.rating) < 0 || Number(datos.rating) > 10) {
    errores.rating = "El rating debe ser un número entre 0 y 10";
  }

  return errores;
}

export function esValido(errores) {
  return Object.keys(errores).length === 0;
}
