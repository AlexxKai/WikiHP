const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'tu-host',
  user: 'tu-usuario',
  password: 'tu-contraseña',
  database: 'tu-base-de-datos',
};

// Función para realizar consultas a la base de datos
async function ejecutarConsulta(sql, valores = []) {
  let connection;
  try {
    // Establecer conexión a la base de datos
    connection = await mysql.createConnection(dbConfig);

    // Ejecutar la consulta
    const [results] = await connection.execute(sql, valores);

    return results;
  } catch (error) {
    console.error('Error de consulta:', error);
    throw error;
  } finally {
    // Cerrar la conexión
    if (connection) {
      await connection.end();
    }
  }
}

// Ejemplo de consulta SELECT
async function obtenerPersonajes() {
  const sql = 'SELECT * FROM personajes';
  const results = await ejecutarConsulta(sql);
  return results;
}

// Ejemplo de consulta INSERT
async function agregarPersonaje(nombre, casa, magia) {
  const sql = 'INSERT INTO personajes (nombre, casa, magia) VALUES (?, ?, ?)';
  const values = [nombre, casa, magia];
  const results = await ejecutarConsulta(sql, values);
  return results.insertId;
}

// Ejemplo de consulta UPDATE
async function actualizarPersonaje(id, nuevoNombre) {
  const sql = 'UPDATE personajes SET nombre = ? WHERE id = ?';
  const values = [nuevoNombre, id];
  const results = await ejecutarConsulta(sql, values);
  return results.affectedRows;
}

// Ejemplo de consulta DELETE
async function eliminarPersonaje(id) {
  const sql = 'DELETE FROM personajes WHERE id = ?';
  const values = [id];
  const results = await ejecutarConsulta(sql, values);
  return results.affectedRows;
}

// Ejemplos de uso de las funciones
(async () => {
  try {
    // Obtener todos los personajes
    const todosLosPersonajes = await obtenerPersonajes();
    console.log('Todos los personajes:', todosLosPersonajes);

    // Agregar un nuevo personaje
    const nuevoPersonajeId = await agregarPersonaje('Nuevo Personaje', 'Gryffindor', 1);
    console.log('ID del nuevo personaje:', nuevoPersonajeId);

    // Actualizar el nombre de un personaje
    const personajeActualizado = await actualizarPersonaje(1, 'Harry Potter Actualizado');
    console.log('Personaje actualizado:', personajeActualizado);

    // Eliminar un personaje
    const personajeEliminado = await eliminarPersonaje(2);
    console.log('Personaje eliminado:', personajeEliminado);

  } catch (error) {
    console.error('Error:', error);
  }
})();
