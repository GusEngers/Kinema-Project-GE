const genreInfo = require('./genre_info');
const IMAGE = 'https://image.tmdb.org/t/p/original';

/**
 * Formatea resultados recibidos de la API, acortando información innecesaria y asegurando que todos sigan un estándar establecido
 * @param movie Object con los resultados de la API
 * @param mode Dos opciones: 'card' (formateo para el home) y 'detail' (formateo para el detail)
 * @returns Nuevo objeto formateado
 */
function movieFormater(movie, mode) {
  if (!['card', 'detail'].includes(mode))
    throw new Error("Incorrect or not supplied movieFormater 'mode' parameter");
  if (mode === 'card')
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      genres: genreInfo(movie.genre_ids),
      poster: IMAGE + movie.poster_path,
      backdrop: IMAGE + movie.backdrop_path,
    };
  if (mode === 'detail')
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      genres: movie.genres,
      rating: movie.vote_average,
      user_reviews: movie.vote_count,
      release_date: new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      duration: `${movie.runtime} minutes.`,
      poster: IMAGE + movie.poster_path,
      backdrop: IMAGE + movie.backdrop_path,
      trailer: movie.trailer,
    };
}

/**
 * Formatea resultados recibidos del backup, acortando información innecesaria y asegurando que todos sigan un estándar establecido
 * @param movie Object con los resultados del backup
 * @returns Nuevo objeto formateado
 */
function movieFormaterJSON(movie) {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    genres: movie.genres,
    poster: movie.poster,
    backdrop: movie.backdrop,
  };
}

module.exports = {
  movieFormater,
  movieFormaterJSON,
};
