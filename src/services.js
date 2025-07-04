// CREATE método POST

// READ método GET
async function getMovies() {
  const result = await fetch('http://localhost:3000/movies');
  const data = await result.json();
  return data;
}
// UPDATE método PUT

// DELETE método DELETE

// Print
let moviesContainer = document.querySelector("section");
async function printMovies() {
  const movies = await getMovies();
  const movieList = movies.map(movie => {
    return moviesContainer.innerHTML += 
    `<div class="movieCard">
    <img src="${movie.poster}" alt="${movie.title}" class="moviePoster">
    <h3>${movie.title} (${movie.enTitle})</i></h3>
    <p>Directed by ${movie.director}, ${movie.year}</p></div>`;
  });
  return movieList;
}