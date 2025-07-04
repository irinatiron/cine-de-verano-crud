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
    `<h1>${movie.title}</h1>
    <p>${movie.director}, ${movie.year}</p>`;
  });
  return movieList;
}