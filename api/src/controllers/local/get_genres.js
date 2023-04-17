const genres = require('../../database/local/genres.json');

function getGenresJSON(mode) {
  if (mode.toLowerCase() === 'movie') return genres.movie;
  return genres.tv;
}

module.exports = {
  getGenresJSON,
};
