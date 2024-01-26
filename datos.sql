CREATE DATABASE IF NOT EXISTS harry_potter_db;
USE harry_potter_db;

CREATE TABLE IF NOT EXISTS personajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    casa VARCHAR(50),
    magia BOOLEAN NOT NULL
);

INSERT INTO personajes (nombre, casa, magia) VALUES
('Harry Potter', 'Gryffindor', 1),
('Hermione Granger', 'Gryffindor', 1),
('Ron Weasley', 'Gryffindor', 1);

-- Agrega más personajes según sea necesario
-- Crear la tabla de sagas
CREATE TABLE IF NOT EXISTS sagas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar datos de ejemplo en la tabla de sagas
INSERT INTO sagas (nombre) VALUES
('Saga 1'),
('Saga 2');

-- Agrega más sagas según sea necesario

-- Crear la tabla de relación entre personajes y sagas
CREATE TABLE IF NOT EXISTS personajes_sagas (
    personaje_id INT,
    saga_id INT,
    PRIMARY KEY (personaje_id, saga_id),
    FOREIGN KEY (personaje_id) REFERENCES personajes(id),
    FOREIGN KEY (saga_id) REFERENCES sagas(id)
);

-- Insertar datos de ejemplo en la tabla de relación
INSERT INTO personajes_sagas (personaje_id, saga_id) VALUES
(1, 1), -- Harry Potter en Saga 1
(2, 1), -- Hermione Granger en Saga 1
(3, 1); -- Ron Weasley en Saga 1
-- Agrega más relaciones según sea necesario
