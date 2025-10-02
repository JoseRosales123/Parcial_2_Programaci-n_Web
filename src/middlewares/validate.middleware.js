// Middleware de validación con Joi.
// Recibe: un esquema Joi y la fuente ("body" por defecto o "query").
// Si la validación falla ³ 400 con detalles.
// Si pasa, reemplaza/mezcla los datos validados en req.* y continúa.
export const validate = (schema, source = "body") => (req, res, next) => {
 // Elegimos qué validar: body o query
 const data = source === "query" ? req.query : req.body;
 // Validamos con opciones útiles:
 // - abortEarly:false ³ junta TODOS los errores
 // - stripUnknown:true ³ elimina campos no definidos en el esquema
 const { error, value } = schema.validate(data, {
 abortEarly: false,
 stripUnknown: true,
 });
 if (error) {
 // Respuesta estándar de "Bad Request" con detalles legibles
 return res.status(400).json({
 ok: false,
 error: "Validación fallida",
 details: error.details.map((d) => d.message),
 });
 }
 // En su lugar, mezclamos los campos validados en el mismo objeto.
 if (source === "query") {
 Object.assign(req.query, value);
 } else {
 // Para body sí podemos reemplazar directamente
 req.body = value;
 }
 next();
};
 