const axios = require('axios');
const { getMovieJSON } = require('../local/get_movies');
const { movieFormater } = require('../formater');

const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/movie';

/**
 * Obtener trailer de la película correspondiente a su id
 * @param id Id de la película
 * @returns Enlace al trailer de la película o null en caso de que no exista
 */
async function getTrailer(id) {
  const YT = 'https://www.youtube.com/watch?v=';
  const response = await axios
    .get(`${API}/${id}/videos?api_key=${API_KEY}`)
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) return null;
  return `${YT}${response[0].key}`;
}

/**
 * Obtiene el detalle de la película según su id
 * @param id Id de la película
 * @returns Objecto con el detalle de la película después de ser formateado
 */
async function getDetailMovie(id) {
  const trailer = await getTrailer(id);
  if (trailer === null)
    throw new Error(
      "We're sorry! The movie you request does not have the video"
    );

  const response = await axios
    .get(`${API}/${id}?api_key=${API_KEY}`, { timeout: 30000 })
    .then((res) => res.data)
    .catch((err) => null);

  if (response === null) return getMovieJSON(id);
  return movieFormater({ ...response, trailer }, 'detail');
}

module.exports = {
  getDetailMovie,
};
