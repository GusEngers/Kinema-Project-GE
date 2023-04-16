const { movieFormater } = require('../formater');
/**
 * Verifica si las películas están completas y luego formatea los resultados aprobados
 * @param movies Lista de películas obtenidas de la API
 * @returns Array con películas aprobadas y formateadas
 */
function approvedMovies(movies) {
  let approved = [];
  for (let movie in movies) {
    if (
      !!movie.id &&
      !!movie.title &&
      !!movie.overview &&
      !!movie.genre_ids &&
      !!movie.genre_ids.length &&
      !!movie.poster_path &&
      !!movie.backdrop_path
    ) {
      approved.push(movie);
    }
  }
  return approved.map((movie) => movieFormater(movie, 'card'));
}

module.exports = {
  approvedMovies,
}
