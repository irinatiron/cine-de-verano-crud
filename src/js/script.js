// Scroll 
function scrollDown1() {
  const element = document.getElementById("moviesContainer");
  element.scrollIntoView();
}

// Recoger información del formulario para editar una película
const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('movieId').value.trim();
    const title = document.getElementById('title').value.trim();
    const writer = document.getElementById('director').value.trim();
    const description = document.getElementById('description').value.trim();
    if (!id || !title || !writer || !description) {
        alert('Por favor, rellena todos los campos.');
        return;
    }

    const editedMovie = {
        title: title,
        director: director,
        movie_description: description
    };

    await updateMovie(id, edited);

    // Opcional: limpiar formulario después de editar
    updateForm.reset();

    // Opcional: refrescar la lista de libros para ver cambios
    if (typeof printMovies === 'function') {
        printMovies();
    }
});