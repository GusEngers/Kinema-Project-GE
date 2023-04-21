const Serie = require('../../database/cloud/models/serie');
const { series } = require('../../database/local/carrusels.json');

/**
 * Obtener dos carrusels con las series más populares y series random
 * @returns Objeto con el resultado de las consultas
 */
async function getSerieCarrusels() {
  let popular = await Serie.find()
    .select('-_id -__v')
    .limit(20)
    .catch((err) => null);
  if (popular === null) {
    popular = series.popular;
  }

  let random = await Serie.aggregate([{ $sample: { size: 20 } }])
    .project('-_id -__v')
    .catch((err) => null);

  if (random === null) {
    random = series.random;
  }
  return { popular, random };
}

module.exports = {
  getSerieCarrusels,
};
