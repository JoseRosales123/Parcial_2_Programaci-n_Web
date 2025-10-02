// Middleware de error "catch-all".
// Si algo falla en controladores/servicios y llamamos next(err),
// este middleware captura la excepción y responde con 500.
export default function errorMiddleware(err, _req, res, _next) {
  // Loguear el error en el servidor para depuración
  console.error("[ERROR]", err);
  // Respuesta genérica para el cliente
  res.status(500).json({ error: "Error interno del servidor" });
}