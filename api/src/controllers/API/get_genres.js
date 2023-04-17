const axios = require('axios');
const { getGenresJSON } = require('../local/get_genres');
require('dotenv').config();

const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/genre';

/**
 * Obtener los generos de películas o series de la API, en caso de que falle la API hace la búsqueda en los JSON
 * @param mode Dos posibles valores 'movie' o 'tv', caso contrario un error
 * @returns Lista con los generos segun el valor de mode
 */
async function getGenres(mode) {
  if (!['movie', 'tv'].includes(mode.toLowerCase()))
    throw new Error(
      "Invalid parameter, only accepts the parameters 'movie' or 'tv'"
    );

  const response = await axios
    .get(`${API}/${mode.toLowerCase()}/list?api_key=${API_KEY}`, {
      timeout: 20000,
    })
    .then((res) => res.data.genres)
    .catch((err) => null);

  if (response === null) return getGenresJSON(mode);
  return response;
}

module.exports = {
  getGenres,
};
