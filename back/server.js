const express = require('express');
const cors = require('cors');
const app = express();

// Permitir solicitudes desde cualquier origen (para desarrollo local)
app.use(cors());

// O, si deseas permitir solo solicitudes de tu frontend específico:
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

// Resto de la configuración del servidor
app.get('/api/templates', (req, res) => {
    res.json({ message: 'Esta es la respuesta de la API' });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

app.use(cors({
  origin: 'http://localhost:5173'
}));
