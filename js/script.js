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

document.addEventListener('DOMContentLoaded', function () {

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

            // Si hay dos personajes seleccionados, guardar en localStorage y redirigir
            if (personajesSeleccionados.length === 2) {
              localStorage.setItem('selectedActors', JSON.stringify(personajesSeleccionados));
              window.location.href = 'hechizos.html';
            }

            // Abrir una ventana emergente para mostrar los personajes seleccionados
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const popupWidth = 400;
            const popupHeight = 300;
            const left = (screenWidth - popupWidth) / 2;
            const top = (screenHeight - popupHeight) / 2;

            const popupWindow = window.open('', 'popup', `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);
            popupWindow.document.write('<h2>Personaje seleccionado:</h2>');

            // Mostrar los nombres de los personajes en la ventana emergente
            personajesSeleccionados.forEach(selected => {
              popupWindow.document.write(`<p>${selected.personaje}</p>`);
            });

            // Botón para eliminar selección
            const deleteButton = popupWindow.document.createElement('button');
            deleteButton.textContent = 'Eliminar selección';
            popupWindow.document.body.appendChild(deleteButton);

            // Evento de clic del botón para eliminar personajes
            deleteButton.addEventListener('click', () => {
              // Encontrar el índice del personaje en array 'personajesSeleccionados'
              const index = personajesSeleccionados.findIndex(selected => selected.id === actor.id);
              if (index !== -1) {
                // Eliminar el personaje seleccionado
                personajesSeleccionados.splice(index, 1);
                localStorage.setItem('selectedActors', JSON.stringify(personajesSeleccionados));
                popupWindow.close();

                // Actualizar la ventana emergente con la nueva lista de personajes
                popupWindow.location.reload();
              }
            });
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
});