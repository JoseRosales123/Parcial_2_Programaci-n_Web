import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import fs from "fs";
import path from "path";

// Ruta absoluta al archivo JSON de datos
const dataPath = path.resolve("src/data/libros_1000.json");

// Cargar libros desde el archivo JSON al iniciar
let libros = [];
try {
  const raw = fs.readFileSync(dataPath, "utf-8");
  libros = JSON.parse(raw);
} catch (err) {
  console.error("No se pudo cargar el archivo de datos:", err);
  libros = [];
}

// Listar todos los libros
export function list() {
  return libros;
}

// Obtener libro por ID
export function getById(id) {
  return libros.find(libro => libro.id === id);
}

// Validar formato de UUID
export function isValidId(id) {
  return uuidValidate(id);
}

// Crear un nuevo libro
export function create({ title, author, year }) {
  const libro = {
    id: uuidv4(),
    title,
    author,
    year: year || null
  };
  libros.push(libro);
  return libro;
}

// Eliminar libro por ID
export function remove(id) {
  const index = libros.findIndex(libro => libro.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}