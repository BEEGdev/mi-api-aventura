// api/v1/usuarios.js
const Usuario = require('../../models/Usuario');
const auth = require('../../middleware/auth');

module.exports = async (req, res) => {
  // Aplicar middleware manualmente para Vercel
  await new Promise((resolve, reject) => {
    auth(req, res, (err) => {
      if (err) reject(err);
      resolve();
    });
  }).catch(() => {
    return; // El middleware ya envió la respuesta de error
  });
  
  try {
    const usuarios = await Usuario.find();
    res.status(200).json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuarios'
    });
  }
};