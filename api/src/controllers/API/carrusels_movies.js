const axios = require('axios');
const { approvedMovies } = require('./validate');

const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/movie';
const API_TRENDING = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

async function carrusel(mode) {
  const MODES = ['trending', 'popular', 'top_rated', 'upcoming', 'now_playing'];
  if (!MODES.includes(mode))
    throw new Error(
      "Only modes: 'trending', 'popular', 'top_rated', 'upcoming' and 'now_playing'"
    );

  if (mode === 'trending') {
    const response = await axios
      .get(API_TRENDING, { timeout: 30000 })
      .then((res) => res.data.results)
      .catch((err) => null);
    if (response === null) return ['hola'];
    return approvedMovies(response);
  }

  const response = await axios
    .get(`${API}/${mode}?api_key=${API_KEY}`, { timeout: 30000 })
    .then((res) => res.data.results)
    .catch((err) => null);

  if (response === null) return ['hola'];
  return approvedMovies(response);
}

async function getMovieCarrusels() {
  const data = {};
  data.trending = await carrusel('trending');
  data.popular = await carrusel('popular');
  data.top_rated = await carrusel('top_rated');
  data.upcoming = await carrusel('upcoming');
  data.now_playing = await carrusel('now_playing');
  return data;
}

module.exports = {
  getMovieCarrusels,
};
