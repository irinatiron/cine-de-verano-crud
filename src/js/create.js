// Recoger información del formulario para añadir una película
document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('createForm');
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newMovie = {
      title: document.getElementById('createOriginalTitle').value.trim(),
      enTitle: document.getElementById('createEnglishTitle').value.trim(),
      year: document.getElementById('createYear').value.trim(),
      country: document.getElementById('createCountry').value.trim(),
      primaryLanguage: document.getElementById('createPrimaryLanguage').value.trim(),
      lenght: document.getElementById('createLenght').value.trim(),
      director: document.getElementById('createDirector').value.trim(),
      description: document.getElementById('createDescription').value.trim(),
      genre: document.getElementById('createGenre').value.trim(),
      poster: document.getElementById('createPoster').value.trim(),
    };
    // Validación de los datos introducidos mediante expresiones regulares
    const lettersRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ\-]+$/; // Letras y espacios
    const yearRegex = /^\d{4}$/; // Para que el año sea un número de 4 cifras
    const currentYear = new Date().getFullYear(); // Coge el año actual
    function isValidYear(year) {
      return yearRegex.test(year) && Number(year) >= 1895 && Number(year) <= currentYear; // Verificamos que el año de la película introducido en el formulario no sea posterior al año actual
    }
    // Dentro de tu submit:
    if (!isValidYear(newMovie.year)) {
      alert(`El año debe ser un número de 4 cifras entre 1895 y ${currentYear}.`);
      return;
    }
    if (!lettersRegex.test(newMovie.country)) {
      alert('El país debe contener solo letras y espacios.');
      return;
    }
    if (!lettersRegex.test(newMovie.primaryLanguage)) {
      alert('El idioma principal debe contener solo letras y espacios.');
      return;
    }
    if (!lettersRegex.test(newMovie.director)) {
      alert('El nombre de la directora debe contener solo letras y espacios.');
      return;
    }
    // Si todo está correcto, crea la película
    await createMovie(newMovie);
  });
});


// Validación mediante expresiones regulares


// CREATE método POST
async function createMovie(newMovie) {
  try {
    const response = await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    });
    if (response.ok) {
      const createdMovie = await response.json();
      alert('Película añadida correctamente, redirigiendo al inicio...'); // Si ha salido todo ok te sale el alert y luego te devuelve al index
      window.location.href = '../index.html';
      return;
    } else {
      const errorText = await response.text();
      console.error(`Error al añadir la película:`, errorText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}