const genreInfo = require('./genre_info');
const IMAGE = 'https://image.tmdb.org/t/p/original';

/**
 * Formatea resultados recibidos de la API, acortando información innecesaria y asegurando que todos sigan un estándar establecido
 * @param movie Object con los resultados de la API
 * @param mode Dos opciones: 'card' (formateo para el home) y 'detail' (formateo para el detail)
 * @returns Nuevo objeto formateado
 */
function movieFormater(movie, mode) {
  if (!['card', 'detail'].includes(mode.toLowerCase()))
    throw new Error("Incorrect or not supplied movieFormater 'mode' parameter");
  if (mode.toLowerCase() === 'card')
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      genres: genreInfo(movie.genre_ids, 'movie'),
      poster: IMAGE + movie.poster_path,
      backdrop: IMAGE + movie.backdrop_path,
    };
  if (mode.toLowerCase() === 'detail')
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

/**
 * Formatea resultados recibidos de la API, acortando información innecesaria y asegurando que todos sigan un estándar establecido
 * @param serie Objecto con información de la serie recibida de la API
 * @param mode Dos opciones: 'card' (formateo para el home) y 'detail' (formateo para el detail)
 * @returns
 */
function serieFormater(serie, mode) {
  if (!['card', 'detail'].includes(mode.toLowerCase()))
    throw new Error("Incorrect or not supplied movieFormater 'mode' parameter");
  if (mode.toLowerCase() === 'card')
    return {
      id: serie.id,
      title: serie.name,
      description: serie.overview,
      genres: genreInfo(serie.genre_ids, 'tv'),
      poster: IMAGE + serie.poster_path,
      backdrop: IMAGE + serie.backdrop_path,
      vote_average: serie.vote_average,
      serie: true,
    };
}

module.exports = {
  movieFormater,
  movieFormaterJSON,
  serieFormater,
};
