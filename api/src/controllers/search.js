const { getSearchMovies } = require('./API/get_search_movies');
const { getSeriesByName } = require('./DB/get_series');

async function searchAll(query, page) {
  const movies = await getSearchMovies(query, page);
  const series = await getSeriesByName(query, page);
  return [...movies, ...series].sort((a, b) => b.rating - a.rating);
}

module.exports = {
  searchAll,
};
