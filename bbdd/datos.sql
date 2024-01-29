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
('Ron Weasley', 'Gryffindor', 1),
('Albus Dumbledore', 'Gryffindor', 1),
('Severus Snape', 'Slytherin', 1),
('Luna Lovegood', 'Ravenclaw', 1),
('Nymphadora Tonks', 'Hufflepuff', 1),
('Sirius Black', 'Gryffindor', 1),
('Bellatrix Lestrange', 'Slytherin', 1),
('Remus Lupin', 'Gryffindor', 1),
('Minerva McGonagall', 'Gryffindor', 1),
('Draco Malfoy', 'Slytherin', 1),
('Ginny Weasley', 'Gryffindor', 1),
('Fred Weasley', 'Gryffindor', 1),
('George Weasley', 'Gryffindor', 1),
('Cedric Diggory', 'Hufflepuff', 1),
('Dolores Umbridge', 'Slytherin', 1),
('Rubeus Hagrid', 'Gryffindor', 1),
('Fleur Delacour', 'Beauxbatons', 1),
('Viktor Krum', 'Durmstrang', 1),
('Cedric Diggory', 'Hufflepuff', 1),
('Neville Longbottom', 'Gryffindor', 1),
('Dobby', 'Casa sin asignar', 1);

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
-- Personajes en la Saga 1
(1, 1), -- Harry Potter
(2, 1), -- Hermione Granger
(3, 1), -- Ron Weasley
(4, 1), -- Albus Dumbledore
(6, 1), -- Sirius Black
(7, 1), -- Bellatrix Lestrange
(8, 1), -- Remus Lupin
(9, 1), -- Minerva McGonagall
(10, 1), -- Draco Malfoy
-- Personajes en la Saga 2
(11, 2), -- Ginny Weasley
(12, 2), -- Fred Weasley
(13, 2), -- George Weasley
(14, 2), -- Cedric Diggory
(15, 2), -- Dolores Umbridge
(16, 2), -- Rubeus Hagrid
(17, 2), -- Fleur Delacour
(18, 2), -- Viktor Krum
(19, 2), -- Neville Longbottom
(20, 2); -- Dobby
