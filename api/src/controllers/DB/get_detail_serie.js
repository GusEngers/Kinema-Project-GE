const axios = require('axios');
const { validateSerie } = require('./validate');
const { serieFormater } = require('../formater');
const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/tv';

/**
 * Obtiene información sobre la serie especificada por su id
 * @param serie Id de la serie en cuestión
 * @returns Objeto con los detalles necesarios para el detalle de la serie
 */
async function getDetailSerie(serie) {
  const { id, trailer } = await validateSerie(serie);

  const response = await axios
    .get(`${API}/${id}?api_key=${API_KEY}`)
    .then((res) => res.data)
    .catch((err) => null);

  if (response === null) return {};

  const season_one = await axios
    .get(`${API}/${id}/season/1?api_key=${API_KEY}`)
    .then((res) => res.data)
    .catch((err) => null);

  if (response === null) return {};
  return serieFormater({ ...response, trailer, season_one }, 'detail');
}

module.exports = {
  getDetailSerie,
};
