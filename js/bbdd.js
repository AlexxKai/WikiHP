// app.js
const mysql = require('mysql');
const config = require('./config');

// Configuración de la conexión
const connection = mysql.createConnection(config.database);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.message);
  } else {
    console.log('Conexión a la base de datos exitosa');
    // Aquí puedes realizar operaciones adicionales que requieran la conexión
  }
});

// Cerrar la conexión cuando hayas terminado
// connection.end();

// Manejar errores
connection.on('error', (err) => {
  console.error('Error de conexión:', err.message);
});

// Ejemplo de consulta a la base de datos
connection.query('SELECT * FROM personajes', (err, results) => {
  if (err) throw err;
  console.log('Personajes:', results);
});

// Puedes agregar más consultas y operaciones según sea necesario
