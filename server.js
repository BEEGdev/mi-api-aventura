// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = process.env.PORT || 3000;

// Cargar Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
const holaV1 = require('./api/v1/hola');
const saludoV1 = require('./api/v1/saludo');
const usuariosV1 = require('./api/v1/usuarios');
const loginV1 = require('./api/v1/login');

app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API funcionando correctamente',
    documentacion: '/api-docs'
  });
});

app.use('/api/v1/hola', holaV1);
app.use('/api/v1/saludo', saludoV1);
app.use('/api/v1/usuarios', usuariosV1);
app.post('/api/v1/login', loginV1);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});