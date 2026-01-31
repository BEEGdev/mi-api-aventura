const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const { username, password } = req.body;
  
  // Credenciales de ejemplo (en producción, verifica contra base de datos)
  if (username === 'admin' && password === 'password123') {
    const token = jwt.sign(
      { username: username },
      process.env.JWT_SECRET || 'secreto-super-seguro',
      { expiresIn: '1h' }
    );
    
    return res.status(200).json({
      success: true,
      token: token
    });
  }
  
  res.status(401).json({
    success: false,
    error: 'Credenciales inválidas'
  });
};