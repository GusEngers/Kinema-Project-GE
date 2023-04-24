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
 * Formatea los resultados de la temporada de una serie, acortando información innecesaria y asegurando que todos sigan un estándar establecido
 * @param season Objeto con los datos de la temporada
 * @returns Nuevo objeto formateado
 */
function seasonFormater(season) {
  return {
    id: season._id,
    air_date: new Date(season.air_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    title: season.name,
    poster: IMAGE + season.poster_path,
    number_episodes: season.episodes.length,
    season_number: season.season_number,
    episodes: season.episodes.map((ep) => {
      return {
        id: ep.id,
        title: ep.name,
        description: ep.overview,
        episode_number: ep.episode_number,
        air_date: new Date(ep.air_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        poster: IMAGE + ep.still_path,
        duration: `${ep.runtime} minutes.`,
      };
    }),
  };
}

/**
 * Formatea resultados recibidos de la API, acortando información innecesaria y asegurando que todos sigan un estándar establecido
 * @param serie Objecto con información de la serie recibida de la API
 * @param mode Dos opciones: 'card' (formateo para el home) y 'detail' (formateo para el detail)
 * @returns Nuevo objeto formateado
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
  if (mode.toLowerCase() === 'detail') {
    return {
      id: serie.id,
      title: serie.name,
      description: serie.overview,
      genres: serie.genres,
      rating: serie.vote_average,
      user_reviews: serie.vote_count,
      release_date: new Date(serie.first_air_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      poster: IMAGE + serie.poster_path,
      backdrop: IMAGE + serie.backdrop_path,
      number_seasons: serie.number_of_seasons,
      trailer: serie.trailer,
      season_one: seasonFormater(serie.season_one),
    };
  }
}

module.exports = {
  movieFormater,
  movieFormaterJSON,
  serieFormater,
  seasonFormater,
};
