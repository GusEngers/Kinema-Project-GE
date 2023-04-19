const Serie = require('../../database/cloud/models/serie');
const { GENRES_TV } = require('../genres');

/**
 * Obtiene 20 series por página de la base de datos
 * @param page Número de página
 * @returns Array con hasta 20 series
 */
async function getSeries(page = 1) {
  let response = await Serie.find()
    .select('-_id -__v')
    .skip((page - 1) * 20)
    .limit(20)
    .catch((error) => null);

  if (response === null) return [];
  return response;
}

/**
 * Obtiene 20 series de la base de datos filtradas por género
 * @param genre Id del género a buscar
 * @param page Número de página
 * @returns Array con hasta 20 series filtradas por género
 */
async function getSeriesByGenre(genre, page = 1) {
  if (!GENRES_TV[genre])
    throw new Error(
      'The specified genre does not exist within the tv show genres'
    );

  let response = await Serie.find({ 'genres.id': Number(genre) })
    .select('-_id -__v')
    .skip((page - 1) * 20)
    .limit(20)
    .catch((error) => null);

  if (response === null) return [];
  return response;
}

module.exports = {
  getSeries,
  getSeriesByGenre,
};
