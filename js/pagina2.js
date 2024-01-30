document.addEventListener('DOMContentLoaded', function () {
  // Ruta al archivo JSON
  const jsonPath = 'characters.json';

  // Obtener la lista de personajes del archivo JSON
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      // Llamar a la función para mostrar la lista de personajes
      displayCharacterList(data);
    })
    .catch(error => console.error('Error al obtener datos del archivo JSON:', error));

  // Función para mostrar la lista de personajes
  function displayCharacterList(characters) {
    const charactersList = document.getElementById('charactersList');

    // Iterar sobre la lista de personajes y agregarlos al DOM
    characters.forEach(character => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${character.name}</h3>
        <p><strong>Rol:</strong> ${character.role}</p>
        <p><strong>Casa:</strong> ${character.house}</p>
        <p><strong>Nacimiento:</strong> ${character.nacimiento}</p>
        <p><strong>Descripción:</strong> ${character.descripcion}</p>
      `;

      // Agregar cada elemento a la lista
      charactersList.appendChild(listItem);
    });
  }
});
