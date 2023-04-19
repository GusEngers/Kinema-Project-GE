const axios = require('axios');
const { approvedMovies } = require('./validate');
const { getMoviesJSON, getMoviesByIdJSON } = require('../local/get_movies');
const { GENRES_MOVIES } = require('../genres');
require('dotenv').config();

const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/movie/popular';

/**
 * Obtiene una lista de películas de la API
 * @param page Número de página
 * @returns Array con películas aprobadas y formateadas
 */
async function getMovies(page) {
  const response = await axios
    .get(`${API}?api_key=${API_KEY}&page=${page}`, { timeout: 30000 })
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) {
    return getMoviesJSON(page);
  }

  return approvedMovies(response);
}

/**
 * Obtiene 20 películas de la API filtradas por género
 * @param genre Id del género a buscar
 * @param page Número de página
 * @returns Array con hasta 20 películas filtradas por género
 */
async function getMoviesByGenre(genre, page = 1) {
  if (!GENRES_MOVIES[genre])
    throw new Error(
      'The specified genre does not exist within the movies genres'
    );

  let response = await axios
    .get(`${API}?api_key=${API_KEY}&with_genres=${genre}&page=${page}`, {
      timeout: 30000,
    })
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) {
    return getMoviesByIdJSON(genre, page);
  }

  return approvedMovies(response);
}
module.exports = {
  getMovies,
  getMoviesByGenre,
};
