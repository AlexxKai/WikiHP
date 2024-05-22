const characterDetailsContainer = document.getElementById('characterDetails');
const selectedActors = JSON.parse(localStorage.getItem('selectedActors'));

// Función para generar la tarjeta del personaje
function generarTarjeta(actor) {
  const randomCard = document.createElement('div');
  randomCard.classList.add('charactersList'); // Asegúrate de usar la misma clase que usabas antes

  // Crear elementos dentro de la tarjeta (puedes personalizar esto según tus necesidades)
  const randomImagen = document.createElement('img');
  randomImagen.src = actor.imagen;
  randomImagen.alt = actor.personaje;

  const randomDetails = document.createElement('div');
  randomDetails.classList.add('details');

  // Agregar detalles del personaje (por ejemplo, nombre, casa, etc.)
  const detailsElements = [
    { label: 'ID:', value: actor.id },
    { label: 'Apodo:', value: actor.apodo },
    // Agrega más detalles aquí según tus necesidades
  ];

  detailsElements.forEach((detail) => {
    const detailElement = document.createElement('p');
    detailElement.textContent = `${detail.label} ${detail.value}`;
    randomDetails.append(detailElement);
  });

  const randomName = document.createElement('h4');
  randomName.textContent = actor.personaje.charAt(0).toUpperCase() + actor.personaje.slice(1);


  // Agregar la tarjeta al contenedor (ajusta el selector según tu HTML)
  const randomCardContainer = document.getElementById('randomCard');
  randomCard.append(randomImagen);
  randomCard.append(randomDetails);
  randomCard.append(randomName);
  randomCardContainer.append(randomCard);
}

// Llama a la función para generar la tarjeta con los datos de los personajes seleccionados
selectedActors.forEach((actor) => {
  generarTarjeta(actor);
});


// Creamos un boton para  generar los hechizos
const battleButton = document.getElementById('select-button');
battleButton.style.color = 'rgb(0, 255, 42)';

// Agregamos un evento al botón (por ejemplo, para mostrar un mensaje al hacer clic)
battleButton.addEventListener('click', () => {
  alert('¡Hechizo generado! 🪄');
  // Aquí puedes agregar la lógica para generar el hechizo real
  // Por ejemplo, llamar a una función que haga algo relacionado con los hechizos
});

