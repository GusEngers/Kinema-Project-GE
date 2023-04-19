const axios = require('axios');
const { validate } = require('./validate');
require('dotenv').config();

const { API_KEY } = process.env;

/**
 * Obtiene una lista de 20 series populares de la API y luego verifica si están completas
 * @param page Número de página
 * @returns Array con las series que pasen la validación
 */
async function getSeries(page) {
  const API = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`;
  console.log('Getting series from page', page);
  const response = await axios
    .get(API)
    .then((res) => res.data.results)
    .catch((err) => {
      throw new Error(err.message);
    });
  return await validate(response);
}

module.exports = getSeries;
