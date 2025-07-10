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
                    <button type="button" class="btn-movieCard view-btn" data-id="${movie.id}"><i class="fa-solid fa-eye" title="Ver detalles"></i></button>
                    <button type="button" class="btn-movieCard edit-btn" data-id="${movie.id}"><i class="fa-solid fa-pen-to-square" title="Editar película"></i></button>
                    <button type="button" class="btn-movieCard delete-btn" data-id="${movie.id}"><i class="fa-solid fa-trash" title="Eliminar película"></i></button>
                </div>
            </div>`;
  });
  moviesContainer.innerHTML = html; // Coloca en el interior de moviesContainer para cada película el código html anterior
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
  // Fetch el título de la película para la confirmación
  let movieTitle = '';
  try {
    const response = await fetch(`http://localhost:3000/movies/${id}`);
    if (response.ok) {
      const movie = await response.json();
      movieTitle = movie.title || '';
    }
  } catch (error) {
    console.error('Error fetching movie for confirmation:', error);
  }
  const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar la película "${movieTitle}"?`); // En el alert sale el mensaje y dos botones: cancel y OK
  if (!confirmDelete) {
    return; // Si el usuario pulsa cancelar se cierra el alert y no se hace nada
  }
  try {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Película eliminada correctamente.'); // Ya estando en la página de index nos sale el alert de que se ha borrado la película
    } else {
      alert(`Error al eliminar película: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert(`Error al eliminar la película: ${error.message}`);
  }
}