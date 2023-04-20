const axios = require('axios');
const { getMovieJSON } = require('../local/get_movies');
const { movieFormater } = require('../formater');
const { getTrailer } = require('../get_trailer');

const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/movie';

/**
 * Obtiene el detalle de la película según su id
 * @param id Id de la película
 * @returns Objecto con el detalle de la película después de ser formateado
 */
async function getDetailMovie(id) {
  const trailer = await getTrailer(id, 'movie');
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
