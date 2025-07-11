// Traer los datos de una película para editarla
document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('editMovieId'); // Obtiene el id de la película a editar desde localStorage
    if (!id) {
        window.location.href = '../index.html'; // Si no hay id, redirige al index.html, también redirige cuando ya hemos actualizado la película
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // En caso de que no se encuentre la película por el id que hemos traido
        }
        const movie = await response.json();
        // Cambia el título de la página con el nombre de la película
        document.title = `Modificando: ${movie.title} - Cine de verano`;
        const pageTitle = document.querySelector('.page-h3');
        pageTitle.innerHTML = `Modificando la película: ${movie.title}`;
        // Trae los datos de la película y los muestra en el formulario de edición
        document.getElementById('movieId').value = movie.id;
        document.getElementById('title').value = movie.title;
        document.getElementById('englishTitle').value = movie.enTitle;
        document.getElementById('year').value = movie.year;
        document.getElementById('country').value = movie.country;
        document.getElementById('primaryLanguage').value = movie.primaryLanguage;
        document.getElementById('lenght').value = movie.lenght;
        document.getElementById('director').value = movie.director;
        document.getElementById('description').value = movie.description;
        document.getElementById('genre').value = movie.genre;
        document.getElementById('poster').value = movie.poster;
    } catch (error) {
        console.error('Error al cargar la película:', error);
        alert('Error al cargar la película.');
    }
});

// UPDATE método PUT
const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', async (e) => { // Escucha el evento submit del formulario de actualización
    e.preventDefault();
    const id = document.getElementById('movieId').value;
    const updatedMovie = { // Crea un objeto con los datos del formulario
        // Utiliza el id que hemos traido del localStorage y los campos del formulario
        id: id,
        title: document.getElementById('title').value.trim(),
        enTitle: document.getElementById('englishTitle').value.trim(),
        year: document.getElementById('year').value.trim(),
        country: document.getElementById('country').value.trim(),
        primaryLanguage: document.getElementById('primaryLanguage').value.trim(),
        lenght: document.getElementById('lenght').value.trim(),
        director: document.getElementById('director').value.trim(),
        description: document.getElementById('description').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        poster: document.getElementById('poster').value.trim(),
    };

    // Validaciones mediante expresiones regulares, las mismas que en el formulario de create.js
    const lettersRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ\-]+$/;
    const yearRegex = /^\d{4}$/;
    const currentYear = new Date().getFullYear();
    function isValidYear(year) {
        return yearRegex.test(year) && Number(year) >= 1895 && Number(year) <= currentYear;
    }
    if (!isValidYear(updatedMovie.year)) {
        alert(`El año debe ser un número de 4 cifras entre 1895 y ${currentYear}.`);
        return;
    }
    if (!lettersRegex.test(updatedMovie.country)) {
        alert('El país debe contener solo letras y espacios.');
        return;
    }
    if (!lettersRegex.test(updatedMovie.primaryLanguage)) {
        alert('El idioma principal debe contener solo letras y espacios.');
        return;
    }
    if (!lettersRegex.test(updatedMovie.director)) {
        alert('El nombre de la directora debe contener solo letras y espacios.');
        return;
    }

    // UPDATE método PUT
    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie)
        });
        if (response.ok) {
            alert('Película actualizada correctamente, redirigiendo al inicio...');
            localStorage.removeItem('editMovieId'); // Limpia el id del localStorage
            window.location.href = '../index.html'; // Redirige
            return;
        } else {
            console.error(`Error al actualizar: ${response.status} ${response.statusText}`);
            alert('Error al actualizar la película');
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar la película.');
    }
});
