module.exports = (req, res) => {
  const { nombre } = req.query;
  
  if (!nombre) {
    return res.status(400).json({
      error: "El parámetro 'nombre' es requerido"
    });
  }
  
  res.status(200).json({
    mensaje: `Hola, ${nombre}!`
  });
};