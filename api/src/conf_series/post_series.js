const { serieFormater } = require('../controllers/formater');
const Serie = require('../database/cloud/models/serie');
const getSeries = require('./get_series');

/**
 * Añade a la base de datos las series que pasen las verificaciones
 * @param page Número de página
 * @returns Mensaje en caso de éxito o mensaje de error
 */
async function addSeries(page) {
  let data = await getSeries(page);
  if (!data.length)
    throw new Error(`The series on page ${page} did not pass the verification`);

  let formated = data.map((serie) => serieFormater(serie, 'card'));
  await Serie.insertMany(formated);
  return `${formated.length} series added to the database!`;
}

module.exports = {
  addSeries,
};
