const axios = require('axios');
const { approvedMovies } = require('./validate');
const { getMoviesJSON } = require('../local/get_movies');
require('dotenv').config();

const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/movie';

/**
 * Obtiene una lista de películas de la API
 * @param page Número de página
 * @returns Array con películas aprobadas y formateadas
 */
async function getMovies(page) {
  const response = await axios
    .get(`${API}/popular?api_key=${API_KEY}&page=${page}`, { timeout: 30000 })
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) {
    return getMoviesJSON(page);
  }

  return approvedMovies(response);
}

module.exports = {
  getMovies,
};
