import { Router } from "express";
import * as Controller from "../controllers/libros.controller.js";

const router = Router();

router.get("/", Controller.listLibros);
router.get("/:id", Controller.getLibroById);
router.post("/", Controller.createLibro);
router.delete("/:id", Controller.deleteLibro);

export default router;