const GENRES = require('./genres');

/**
 * Convierte un array con sólo id's de géneros a un array con nombre y id de los respectivos géneros
 * @param genres Array con id's de géneros
 * @returns Array de objetos con nombre y id de los géneros
 */
function genreInfo(genres) {
  return genres.map((genre) => GENRES[genre]);
}

module.exports = genreInfo;
