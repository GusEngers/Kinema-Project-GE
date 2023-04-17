const genres = require('../../database/local/genres.json');

/**
 * Busca en el archivo JSON los generos segun el modo indicado por parámetro
 * @param mode Indica que generos buscar (generos de películas o generos de series)
 * @returns Lista con genreos de películas o series
 */
function getGenresJSON(mode) {
  if (mode.toLowerCase() === 'movie') return genres.movie;
  return genres.tv;
}

module.exports = {
  getGenresJSON,
};
