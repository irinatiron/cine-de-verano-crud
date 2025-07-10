document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('editMovieId'); // Trae el id de la película desde index.html
    if (!id) {
        alert('No se ha encontrado ninguna película');
        window.location.href = '../index.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const movie = await response.json();

        // Cambia el título de la página y el h3 después de obtener los datos con el nombre de la película
        document.title = `${movie.title} - Cine de verano`;
        const pageTitle = document.querySelector('.page-h3');
        pageTitle.innerHTML = `Detalle de la película: ${movie.title}`;

        // Muestra todos los campos que hay en db.json con los datos de la película
        const movieDetail = document.getElementById('movieDetail');
        movieDetail.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="moviePoster">
            <p>Título original: ${movie.title}</p>
            <p>Título en inglés: ${movie.enTitle}</p>
            <p>Año: ${movie.year}</p>
            <p>País: ${movie.country}</p>
            <p>Idioma principal: ${movie.primaryLanguage}</p>
            <p>Duración: ${movie.lenght}</p>
            <p>Director: ${movie.director}</p>
            <p>Género: ${movie.genre}</p>
            <p>Descripción: ${movie.description}</p>
        `;
    } catch (error) {
        console.error('Error al cargar los detalles:', error);
        alert('Error al cargar los detalles de la película.');
    }
});
