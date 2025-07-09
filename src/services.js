// READ método GET
async function getMovies() {
  const result = await fetch('http://localhost:3000/movies');
  const data = await result.json();
  return data;
}

// Para mostrar el total de películas
async function showMovieCount() {
    const movies = await getMovies(); // Llama al fetch para obtener las películas
    const total = movies.length; // Calcula el total de películas
    const totalMoviesElement = document.getElementById('totalMovies');
    totalMoviesElement.textContent = `Total de películas: ${total}`;
}
showMovieCount(); 


// PRINT
let moviesContainer = document.getElementById("moviesContainer");
async function printMovies() {
  const movies = await getMovies();
  let html = '';
  movies.forEach(movie => {
    html += `
            <div class="movieCard">
                <img src="${movie.poster}" alt="${movie.title}" class="moviePoster">
                <h3>${movie.title} <span class="enTitle">(${movie.enTitle || ''})</span></h3>
                <p>Dirigido por ${movie.director}, ${movie.year}</p>
                <div class="movieCardSettings">
                    <button type="button" class="btn-movieCard delete-btn" data-id="${movie.id}">Eliminar</button>
                    <button type="button" class="btn-movieCard edit-btn" data-id="${movie.id}">Modificar</button>
                </div>
            </div>`;
  });
  moviesContainer.innerHTML = html;
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = button.getAttribute('data-id');
      await deleteMovie(id);
      await printMovies();
    });
  });


  
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = button.getAttribute('data-id');
      localStorage.setItem('editMovieId', id);  // Guarda el id en localStorage
      window.location.href = 'pages/modify.html';    // Redirige a la página modify.html
    });
  });
}

// DELETE método DELETE
async function deleteMovie(id) {
  // let result = document.getElementById('result');
  try {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) { // Response es el fetch y ok es 200
      // result.textContent = `Película con id ${id} eliminada correctamente.`;
      // console.log(`Película con id ${id} eliminada`);
    } else {
      // result.textContent = `Error al eliminar película con id ${id}.`;
      // console.error(`Error al eliminar película con id ${id}`);
    }
  } catch (error) {
    // console.error('Error:', error);
    // result.textContent = `Error: ${error.message}`;
  }
}

// CREATE método POST
// async function createMovie(newMovie) {
//   try {
//     const response = await fetch('http://localhost:3000/movies', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newMovie)
//     });
//     if (response.ok) {
//       const createdMovie = await response.json();
//       alert('Película añadida correctamente, redirigiendo al inicio...');
//       window.location.href = '../index.html';
//       return;
//     } else {
//       const errorText = await response.text();
//       // result.textContent = `Error al añadir la película: ${response.status} ${response.statusText}`;
//       console.error(`Error al añadir la película:`, errorText);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     // result.textContent = `Error de red o inesperado: ${error.message}`;
//   }
// }