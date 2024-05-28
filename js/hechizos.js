const selectedActors = JSON.parse(localStorage.getItem('selectedActors')) || [];

function generarTarjeta(actor, containerId) {
  const randomCard = document.createElement('div');
  randomCard.classList.add('charactersList');
  randomCard.classList.add('size');

  const randomImagen = document.createElement('img');
  randomImagen.src = actor.imagen;
  randomImagen.alt = actor.personaje;

  const randomDetails = document.createElement('div');
  randomDetails.classList.add('details');

  const detailsElements = [
    { label: 'Apodo:', value: actor.apodo },
  ];

  detailsElements.forEach((detail) => {
    const detailElement = document.createElement('p');
    detailElement.textContent = `${detail.label} ${detail.value}`;
    randomDetails.append(detailElement);
  });

  const randomName = document.createElement('h2');
  randomName.textContent = actor.personaje.charAt(0).toUpperCase() + actor.personaje.slice(1);

  randomCard.append(randomName);
  randomCard.append(randomImagen);
  randomCard.append(randomDetails);

  const barraDeVida = document.createElement('div');
  barraDeVida.classList.add('vida');
  barraDeVida.textContent = 'Vida: 45';
  randomCard.append(barraDeVida);

  function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  const recargarBtn = document.createElement("button");
  recargarBtn.setAttribute('id', 'select-button');
  recargarBtn.textContent = "Generar otro hechizo";
  recargarBtn.addEventListener("click", () => {
    generarHechizo(containerId);
    let color = getRandomColor();
    document.body.style.backgroundColor = color;
  });

  randomCard.append(recargarBtn);

  const randomCardContainer = document.getElementById(containerId);
  randomCardContainer.append(randomCard);
}

const containerIds = ['randomCard1', 'randomCard2'];

selectedActors.forEach((actor, index) => {
  if (index < containerIds.length) {
    generarTarjeta(actor, containerIds[index]);
  }
});

const battleButton = document.querySelectorAll('#select-button');
battleButton.forEach(button => {
  button.style.color = 'rgb(0, 255, 42)'; // Cambia el color de cada botón
});

class Hechizo {
  constructor(id, hechizo, daño, uso) {
    this.id = id;
    this.hechizo = hechizo;
    this.daño = daño;
    this.uso = uso;
  }
}

const url = 'http://localhost/WikiHP/json/hechizos.json';
const personajesContainer = document.getElementById('hechizos');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generarHechizo(containerId) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Datos incompletos en el JSON recibido');
      }

      // Seleccionar un hechizo al azar de la lista
      const hechizoAleatorio = getRandomNumber(0, data.length);
      const hechizoSeleccionado = data[hechizoAleatorio];

      // Verificar si las propiedades existen
      if (!hechizoSeleccionado.id || !hechizoSeleccionado.hechizo || !hechizoSeleccionado.uso) {
        throw new Error('Datos incompletos en el JSON recibido');
      }

      const hechizoID = new Hechizo(
        hechizoSeleccionado.id,
        hechizoSeleccionado.hechizo,
        hechizoSeleccionado.daño,
        hechizoSeleccionado.uso
      );

      // Obtener el contenedor del personaje seleccionado y el otro personaje
      const selectedContainer = document.getElementById(containerId);
      const otherContainerId = containerId === 'randomCard1' ? 'randomCard2' : 'randomCard1';
      const otherContainer = document.getElementById(otherContainerId);

      // Crear una barra de vida con un total de 45 puntos
      const dañoAleatorio = getRandomNumber(0, 11);

      // Actualizar la vida del otro personaje
      const otherVidaDiv = otherContainer.querySelector('.vida');
      const currentVida = parseInt(otherVidaDiv.textContent.split(': ')[1], 10);
      const nuevaVida = Math.max(currentVida - dañoAleatorio, 0);
      otherVidaDiv.textContent = `Vida: ${nuevaVida}`;

      if (nuevaVida === 0) {
        const ganador = containerId === 'randomCard1' ? 'Personaje 1' : 'Personaje 2';
        const confirmacion = window.confirm(`¡${ganador} es el ganador! ¿Quieres continuar?`);

        if (confirmacion) {
          location.reload();

        } else {
          window.location.href = 'index.html';
        }
      }

      // Mostrar el hechizo y el daño en el div de hechizos
      const hechizoElement = document.createElement('p');
      hechizoElement.textContent = `Hechizo: ${hechizoID.hechizo}`;
      const dañoElement = document.createElement('p');
      dañoElement.textContent = `Daño: ${dañoAleatorio}`;


      const hechizoCard = document.createElement('div');
      hechizoCard.classList.add('pj');
      hechizoCard.classList.add('hechizo-animado');
      hechizoCard.append(hechizoElement);
      hechizoCard.append(dañoElement);

      // Limitar la cantidad de hechizos mostrados
      const hechizosMostrados = personajesContainer.querySelectorAll('.pj');
      if (hechizosMostrados.length >= 3) {
        personajesContainer.removeChild(hechizosMostrados[0]); // Eliminar el más antiguo
      }

      personajesContainer.append(hechizoCard);
    })
    .catch((error) => {
      console.error('Error al recuperar el hechizo:', error);
    });
}