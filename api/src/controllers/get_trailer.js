const axios = require('axios');
const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3';

/**
 * Obtener trailer de la película o serie correspondiente a su id
 * @param id Id de la película o serie
 * @returns Enlace al trailer de la película o serie, null en caso de que no exista
 */
async function getTrailer(id, mode) {
  if (!['movie', 'tv'].includes(mode))
    throw new Error("Only 'movie' or 'tv' modes are accepted");

  const YT = 'https://www.youtube.com/watch?v=';
  const response = await axios
    .get(`${API}/${mode}/${id}/videos?api_key=${API_KEY}`)
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) return null;
  return `${YT}${response[0].key}`;
}

module.exports = {
  getTrailer,
};
