const axios = require('axios');
const { validateSerie } = require('./validate');
const { seasonFormater } = require('../formater');
const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/tv';

/**
 * Obtiene el detalle de una temporada específica de una serie específica
 * @param serie ID de la serie
 * @param season Número de la temporada de la serie
 * @returns Objeto formateado con el detalle de la temporada
 */
async function getDetailSeason(serie, season) {
  const { id } = await validateSerie(serie);

  const response = await axios
    .get(`${API}/${id}/season/${season}?api_key=${API_KEY}`)
    .then((res) => res.data)
    .catch((err) => null);

  if (response === null) return {};
  return seasonFormater(response);
}

module.exports = {
  getDetailSeason,
};
