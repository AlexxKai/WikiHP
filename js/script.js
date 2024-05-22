function actualizarFechaHora() {
  const fechaHora = new Date();
  const opciones = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  const fechaHoraFormateada = fechaHora.toLocaleDateString('es-ES', opciones);

  document.getElementById('time').textContent = fechaHoraFormateada;
}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();



// Clase Actor
class Actor {
  constructor(id, personaje, apodo, estudianteDeHogwarts, casaDeHogwarts, interpretado_por, hijos, imagen) {
    this.id = id;
    this.personaje = personaje;
    this.apodo = apodo;
    this.estudianteDeHogwarts = estudianteDeHogwarts;
    this.casaDeHogwarts = casaDeHogwarts;
    this.interpretado_por = interpretado_por;
    this.hijos = hijos;
    this.imagen = imagen;
  }
}

const url = 'https://harry-potter-api.onrender.com/personajes/';
const randomCardContainer = document.getElementById('randomCard');
const personajesSeleccionados = []; // Array para almacenar los personajes seleccionados

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(personaje => {
      const { id, personaje: nombrePersonaje, apodo, estudianteDeHogwarts, casaDeHogwarts, interpretado_por, hijos, imagen } = personaje;

      const actor = new Actor(id, nombrePersonaje, apodo, estudianteDeHogwarts, casaDeHogwarts, interpretado_por, hijos, imagen);

      const randomCard = document.createElement('div');
      randomCard.classList.add('charactersList');

      const randomImagen = document.createElement('img');
      randomImagen.src = actor.imagen;
      randomImagen.alt = actor.personaje;

      const randomDetails = document.createElement('div');
      randomDetails.classList.add('details');

      const detailsElements = [
        { label: 'ID:', value: actor.id },
        { label: 'Apodo:', value: actor.apodo },
        { label: 'Estudiante De Hogwarts:', value: actor.estudianteDeHogwarts },
        { label: 'Casa De Hogwarts:', value: actor.casaDeHogwarts },
        { label: 'Interpretado por:', value: actor.interpretado_por },
        { label: 'Hijos:', value: actor.hijos },
      ];

      detailsElements.forEach((detail) => {
        const detailElement = document.createElement('p');
        detailElement.textContent = `${detail.label} ${detail.value}`;
        randomDetails.append(detailElement);
      });

      const randomName = document.createElement('h4');
      randomName.textContent = actor.personaje.charAt(0).toUpperCase() + actor.personaje.slice(1);

      const selectButton = document.createElement('button');
      selectButton.textContent = 'Seleccionar';
      selectButton.classList.add('select-button');
      selectButton.style.color = 'rgb(0, 255, 42)';

      selectButton.addEventListener('click', () => {
        // Verificar si el personaje ya está seleccionado
        if (personajesSeleccionados.some(selectedActor => selectedActor.id === actor.id)) {
          alert('¡Este personaje ya ha sido seleccionado!');
        } else {
          // Almacenar el actor seleccionado en el array
          personajesSeleccionados.push(actor);
          if (personajesSeleccionados.length === 2) {
            localStorage.setItem('selectedActors', JSON.stringify(personajesSeleccionados));
            window.location.href = 'hechizos.html';
          }
        }
      });

      randomCard.append(randomImagen);
      randomCard.append(randomDetails);
      randomCard.append(randomName);
      randomCard.append(selectButton);
      randomCardContainer.append(randomCard);
    });
  })
  .catch((error) => {
    console.error('Error al recuperar los datos del actor.', error);
  });

// Navegación a otra página
document.getElementById("iframe").addEventListener("click", function () {
  window.location.href = "preguntas.html";
});