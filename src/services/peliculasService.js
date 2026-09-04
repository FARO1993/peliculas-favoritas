import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const NOMBRE_COLECCION = "peliculas";
const coleccionPeliculas = collection(db, NOMBRE_COLECCION);

/**
 * Obtiene todas las películas almacenadas en Firestore.
 */
export async function obtenerTodos() {
  const snapshot = await getDocs(coleccionPeliculas);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Obtiene una película puntual por su id.
 */
export async function obtenerPorId(id) {
  const referencia = doc(db, NOMBRE_COLECCION, id);
  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
}

/**
 * Crea una nueva película en Firestore.
 */
export async function crear(pelicula) {
  const nuevoDoc = await addDoc(coleccionPeliculas, {
    titulo: pelicula.titulo,
    anio: Number(pelicula.anio),
    genero: pelicula.genero,
    rating: Number(pelicula.rating),
    favorita: Boolean(pelicula.favorita),
  });
  return nuevoDoc.id;
}

/**
 * Actualiza los datos de una película existente.
 */
export async function actualizar(id, pelicula) {
  const referencia = doc(db, NOMBRE_COLECCION, id);
  await updateDoc(referencia, {
    titulo: pelicula.titulo,
    anio: Number(pelicula.anio),
    genero: pelicula.genero,
    rating: Number(pelicula.rating),
  });
}

/**
 * Elimina una película de Firestore.
 */
export async function eliminar(id) {
  const referencia = doc(db, NOMBRE_COLECCION, id);
  await deleteDoc(referencia);
}

/**
 * Cambia el estado booleano de favorita de una película.
 */
export async function cambiarEstado(id, favoritaActual) {
  const referencia = doc(db, NOMBRE_COLECCION, id);
  await updateDoc(referencia, { favorita: !favoritaActual });
}
