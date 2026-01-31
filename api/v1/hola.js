module.exports = (req, res) => {
  const mensaje = process.env.MENSAJE_BIENVENIDA || "Mensaje por defecto";
  res.status(200).json({
    mensaje: mensaje
  });
};