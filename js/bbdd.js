const mysql = require('mysql');
const config = require('../');

// Configuración de la conexión
const pool = mysql.createPool(config.database);

// Ejemplo de consulta a la base de datos utilizando promesas
function consultarPersonajes() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM personajes', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Conectar a la base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión:', err.message);
  } else {
    console.log('Conexión a la base de datos exitosa');

    // Ejecutar consulta de ejemplo
    consultarPersonajes()
      .then((results) => {
        console.log('Personajes:', results);

        // Realizar más operaciones según sea necesario

        // Cerrar la conexión cuando hayas terminado
        connection.release();
      })
      .catch((err) => {
        console.error('Error en la consulta:', err.message);

        // Cerrar la conexión en caso de error
        connection.release();
      });
  }
});

// Manejar errores
pool.on('error', (err) => {
  console.error('Error de conexión:', err.message);
});
