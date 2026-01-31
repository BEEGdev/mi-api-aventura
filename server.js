const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const holaV1 = require('./api/v1/hola');

app.use('/api/v1/hola', holaV1);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});