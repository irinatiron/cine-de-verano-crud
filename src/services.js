// CREATE método POST

// READ método GET
async function getMovies() {
  const result = await fetch('http://localhost:3000/movies');
  const data = await result.json();
  return data;
}
// UPDATE método PUT

// DELETE método DELETE
async function deleteMovie(id) {
  let result = document.getElementById('result');
    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) { // Response es el fetch y ok es 200
            result.textContent = `Película con id ${id} eliminada correctamente.`;
            console.log(`Película con id ${id} eliminada`);
        } else {
            result.textContent = `Error al eliminar película con id ${id}.`;
            console.error(`Error al eliminar película con id ${id}`);
        }
    } catch (error) {
        console.error('Error:', error);
        result.textContent = `Error: ${error.message}`;
    }
}

// Print
//let moviesContainer = document.querySelector("section");
let moviesContainer = document.getElementById("moviesContainer");
async function printMovies() {
  const movies = await getMovies();
  const movieList = movies.map(movie => {
    return moviesContainer.innerHTML += 
    `<div class="movieCard">
    <img src="${movie.poster}" alt="${movie.title}" class="moviePoster">
    <h3>${movie.title} <span class="enTitle">(${movie.enTitle})</span></h3>
    <p>Dirigido por ${movie.director}, ${movie.year}</p>
      <div class="movieCardSettings">
        <button type="button" class="btn-movieCard" onclick="deleteMovie(${movie.id})">Eliminar</button>
        <button type="button" class="btn-movieCard" onclick="updateMovie(${movie.id})">Modificar</button>
      </div>
    </div>`;
  });
  return movieList;
}