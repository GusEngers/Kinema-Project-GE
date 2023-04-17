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

module.exports = {
  getMoviesJSON,
};
