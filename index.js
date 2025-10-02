import express from "express";
import librosRouter from "./src/routes/libros.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/libros", librosRouter);

// Middleware de manejo de errores (debe ir al final)
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});