const movies = require('../../database/local/movies.json');
const { movieFormaterJSON } = require('../formater');

/**
 * Obtiene una lista de películas alojadas en los JSON que sirven como backups
 * @param page Número de página, cada página envía 20 películas
 * @returns Lista con 20 películas del JSON
 */
function getMoviesJSON(page = 1) {
  let omit = (page - 1) * 20;
  let limit = omit + 20;
  return movies.slice(omit, limit).map((movie) => movieFormaterJSON(movie));
}

/**
 * Busca la película en el backup según su id
 * @param id Id de la película
 * @returns Objecto con el detalle de la película o un error si no se encuentra la película
 */
function getMovieJSON(id) {
  let movie = movies.find((movie) => movie.id === Number(id));
  if (!Object.entries(movie).length)
    throw new Error("We're sorry! The requested movie is not available");
  return movie;
}

module.exports = {
  getMoviesJSON,
  getMovieJSON,
};
