const { GENRES_MOVIES, GENRES_TV } = require('./genres');

/**
 * Convierte un array con sólo id's de géneros a un array con nombre y id de los respectivos géneros
 * @param genres Array con id's de géneros
 * @param mode Tipo de genero que queremos convertir (movie o tv)
 * @returns Array de objetos con nombre y id de los géneros
 */
function genreInfo(genres, mode) {
  if (mode.toLowerCase() === 'movie')
    return genres.map((genre) => GENRES_MOVIES[genre]);
  return genres.map((genre) => GENRES_TV[genre]);
}

module.exports = genreInfo;
