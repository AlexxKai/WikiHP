// app.js
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const config = require('./config');

const app = express();
const port = 3000;

// Desactivar CSP (solo para desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:;");
    next();
  });
}

// Configurar el directorio de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Configurar el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'css')));

const connection = mysql.createConnection(config.database);

app.get('/', (req, res) => {
  // Realiza una consulta a la base de datos
  connection.query('SELECT * FROM personajes', (err, results) => {
    if (err) {
      console.error('Error de consulta:', err.message);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Renderiza la vista y pasa los resultados como datos
    res.render('index', { personajes: results });
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
