// Recoger información del formulario para añadir una película
document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene los valores por defecto del formulario
        const newMovie = {
            title: document.getElementById('createOriginalTitle').value.trim(), // Trim quita los espacios en blanco de antes y después
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
        await createMovie(newMovie);  
    });
});

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