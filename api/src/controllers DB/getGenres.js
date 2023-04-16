const Genre = require('../database/cloud/models/genre.js');

const getGenresFromDB = async () => {
  const genres = await Genre.find();
  const genresFiltered = genres.filter((genre) => genre.type === 'tv');
  return genresFiltered.map((genre) => genre.name);
};

module.exports = {
  getGenresFromDB,
};