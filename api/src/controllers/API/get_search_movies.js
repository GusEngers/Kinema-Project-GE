const axios = require('axios');
const { approvedMovies } = require('./validate');
const { getSearchMoviesJSON } = require('../local/get_movies');
require('dotenv').config();

const { API_KEY } = process.env;
const API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

/**
 * Obtiene una lista de películas filtradas según una query de búsqueda por nombre
 * @param query Nombre de películas a buscar
 * @param page Número de página
 * @returns Array con películas obtenidas formateadas y validadas
 */
async function getSearchMovies(query, page) {
  const response = await axios
    .get(`${API}&query=${query}&page=${page}`, { timeout: 30000 })
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) return getSearchMoviesJSON(query, page);
  return approvedMovies(response);
}

module.exports = {
  getSearchMovies,
};
