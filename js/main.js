// Operadores, tipos de datos y estructuras de control
let numero = 42;
let texto = "Hola, mundo!";
if (numero === 42) {
    console.log("El número es 42");
}

// Gestión de objetos predefinidos
let fechaActual = new Date();
console.log(fechaActual.getFullYear());

// Creación de objetos con herencia
class SerMagico {
    constructor(nombre) {
        this.nombre = nombre;
    }

    realizarMagia() {
        console.log(`${this.nombre} está realizando magia.`);
    }
}

class Mago extends SerMagico {
    constructor(nombre, casa) {
        super(nombre);
        this.casa = casa;
    }

    estudiarMagia() {
        console.log(`${this.nombre} de la casa ${this.casa} está estudiando magia.`);
    }
}

let harry = new Mago("Harry Potter", "Gryffindor");
harry.realizarMagia();
harry.estudiarMagia();

// Manipulación del DOM
document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector("header");
    header.style.backgroundColor = "#8281d8";
});

// Otras funcionalidades (formularios, almacenamiento, AJAX, etc.) aquí



//
document.addEventListener("DOMContentLoaded", function () {
    // Arreglo de objetos con información de personajes
    const personajes = [
        { nombre: "Harry Potter", casa: "Gryffindor", magia: true },
        { nombre: "Hermione Granger", casa: "Gryffindor", magia: true },
        { nombre: "Ron Weasley", casa: "Gryffindor", magia: true },
        // Agrega más personajes según sea necesario
    ];

    // Función para generar el HTML de cada personaje
    function crearHTMLPersonaje(personaje) {
        return `
            <div class="personaje">
                <h2>${personaje.nombre}</h2>
                <p>Casa: ${personaje.casa}</p>
                <p>Magia: ${personaje.magia ? "Sí" : "No"}</p>
            </div>
        `;
    }

    // Obtener el contenedor de personajes en el DOM
    const contenedorPersonajes = document.getElementById("personajes");

    // Generar y agregar HTML para cada personaje
    personajes.forEach(personaje => {
        const htmlPersonaje = crearHTMLPersonaje(personaje);
        contenedorPersonajes.innerHTML += htmlPersonaje;
    });
});
