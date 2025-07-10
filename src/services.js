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
                  
                    <button type="button" class="btn-movieCard delete-btn" data-id="${movie.id}"><i class="fa-solid fa-trash"></i></button>
                    
                    <button type="button" class="btn-movieCard edit-btn" data-id="${movie.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                    
                    <button type="button" class="btn-movieCard view-btn" data-id="${movie.id}"><i class="fa-solid fa-eye"></i></button>
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

  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = button.getAttribute('data-id');
      localStorage.setItem('editMovieId', id);  
      window.location.href = 'pages/detail.html';    // Redirige a la página detail.html
    });
  });

}

// DELETE método DELETE con confirmación
async function deleteMovie(id) {
  const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta película?'); // En el alert sale el mensaje y dos botones: cancel y OK
  if (!confirmDelete) {
    return; // Si el usuario punsa cancelar se cierra el alert y no se hace nada
  }

  try {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Película eliminada correctamente.');
    } else {
      alert(`Error al eliminar película: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert(`Error al eliminar la película: ${error.message}`);
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