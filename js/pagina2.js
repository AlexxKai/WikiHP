document.addEventListener('DOMContentLoaded', function () {
  // Utilizar fetch para obtener datos del archivo JSON
  fetch('characters.json')
    .then(response => response.json())
    .then(data => {
      // Manipular el DOM dinámicamente con los datos obtenidos
      const charactersList = document.getElementById('charactersList');

      data.forEach(character => {
        const characterLi = document.createElement('li');
        characterLi.textContent = `Nombre: ${character.name}, Rol: ${character.role}, Casa: ${character.house}`;
        charactersList.appendChild(characterLi);
      });
    })
    .catch(error => console.error('Error al obtener los datos:', error));

  // Puedes agregar otras funciones específicas de la página aquí
});
