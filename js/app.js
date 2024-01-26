// app.js
const express = require('express');
const mysql = require('mysql');
const config = require('./datos_bbdd');

const app = express();
const port = 3000;

const connection = mysql.createConnection(config.database);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Realiza una consulta a la base de datos
  connection.query('SELECT * FROM personajes', (err, results) => {
    if (err) {
      console.error('Error de consulta:', err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      // Renderiza la vista y pasa los resultados como datos
      res.render('index', { personajes: results });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
