const movies = require('../../database/local/movies.json');
const { movieFormaterJSON } = require('../formater');

/**
 * Obtiene una lista de películas alojadas en los archivos JSON
 * @param page Número de página, cada página envía 20 películas
 * @returns Lista con hasta 20 películas del archivo JSON
 */
function getMoviesJSON(page = 1) {
  let omit = (page - 1) * 20;
  let limit = omit + 20;
  return movies.slice(omit, limit).map((movie) => movieFormaterJSON(movie));
}

/**
 * Obtiene una lista de películas filtradas por género alojadas en los JSON
 * @param genre Id del género a filtrar
 * @param page Número de página, cada página envía 20 películas
 * @returns Lista con hasta 20 películas filtradas del archivo JSON
 */
function getMoviesByGenreJSON(genre, page = 1) {
  let omit = (page - 1) * 20;
  let limit = omit + 20;
  return movies
    .filter((movie) => movie.genres.some((gen) => gen.id === Number(genre)))
    .slice(omit, limit)
    .map((movie) => movieFormaterJSON(movie));
}

/**
 * Obtiene una lista de películas filtradas por su nombre alojadas en los JSON
 * @param query Nombre de la película a filtrar
 * @param page Número de página, cada página envía 20 películas
 * @returns Lista con hasta 20 películas filtradas del archivo JSON
 */
function getSearchMoviesJSON(query, page = 1) {
  let omit = (page - 1) * 20;
  let limit = omit + 20;
  let search = new RegExp(query, 'i');
  return movies
    .filter((movie) => search.test(movie.title))
    .slice(omit, limit)
    .map((movie) => movieFormaterJSON(movie));
}

/**
 * Busca la película en según su id en los archivos JSON
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
  getMoviesByGenreJSON,
  getSearchMoviesJSON,
  getMovieJSON,
};
