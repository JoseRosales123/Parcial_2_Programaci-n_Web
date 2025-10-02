// Controladores para la entidad Libro

import * as Service from "../services/libros.service.js";

// GET /api/libros (listar todos los libros)
export function listLibros(req, res, next) {
  try {
    const libros = Service.list();
    res.status(200).json({ ok: true, data: libros, message: "Lista obtenida correctamente" });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Error al leer datos" });
  }
}

// GET /api/libros/:id (obtener libro por ID)
export function getLibroById(req, res, next) {
  try {
    const { id } = req.params;
    if (!Service.isValidId(id)) {
      return res.status(400).json({ ok: false, error: "Id inválido" });
    }
    const libro = Service.getById(id);
    if (!libro) {
      return res.status(404).json({ ok: false, error: "Libro no existe" });
    }
    res.status(200).json({ ok: true, data: libro, message: "Libro encontrado" });
  } catch (err) {
    next(err);
  }
}

// POST /api/libros (crear libro)
export function createLibro(req, res, next) {
  try {
    const { title, author, year } = req.body;
    if (!title || !author) {
      return res.status(400).json({ ok: false, error: "Faltan campos obligatorios o datos inválidos" });
    }
    const libro = Service.create({ title, author, year });
    res.status(201).json({ ok: true, data: libro, message: "Libro creado exitosamente" });
  } catch (err) {
    res.status(400).json({ ok: false, error: "Faltan campos obligatorios o datos inválidos" });
  }
}

// DELETE /api/libros/:id (eliminar libro por ID)
export function deleteLibro(req, res, next) {
  try {
    const { id } = req.params;
    if (!Service.isValidId(id)) {
      return res.status(400).json({ ok: false, error: "Id inválido" });
    }
    const deleted = Service.remove(id);
    if (!deleted) {
      return res.status(404).json({ ok: false, error: "Libro no existe" });
    }
    res.status(200).json({ ok: true, message: "Libro eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}