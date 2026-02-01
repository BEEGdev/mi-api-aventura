// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Cargar Swagger con manejo de errores
try {
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger disponible en /api-docs');
} catch (error) {
  console.log('Swagger no disponible:', error.message);
}

// Rutas
const holaV1 = require('./api/v1/hola');
const saludoV1 = require('./api/v1/saludo');
const usuariosV1 = require('./api/v1/usuarios');
const loginV1 = require('./api/v1/login');

app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API funcionando correctamente',
    documentacion: '/api-docs',
    version: '1.0.0',
    endpoints: {
      hola: '/api/v1/hola',
      saludo: '/api/v1/saludo/:nombre',
      login: '/api/v1/login',
      usuarios: '/api/v1/usuarios (requiere token)'
    }
  });
});

app.use('/api/v1/hola', holaV1);
app.use('/api/v1/saludo', saludoV1);
app.use('/api/v1/usuarios', usuariosV1);
app.post('/api/v1/login', loginV1);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});