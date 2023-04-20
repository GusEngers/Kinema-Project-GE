const Serie = require('../../database/cloud/models/serie');
const { getTrailer } = require('../get_trailer');

/**
 * Valida si una serie está alojada en la base de datos y además si cuenta con su respectivo trailer
 * @param id Id de la serie
 * @returns Objeto con los datos de la serie más el trailer
 */
async function validateSerie(id) {
  const serie = await Serie.findOne({ id });

  if (!serie)
    throw new Error(
      "We're sorry! The tv show you are requesting is not available on our servers"
    );

  const trailer = await getTrailer(id, 'tv');
  if (trailer === null)
    throw new Error(
      "We're sorry! The tv show you request does not have the video"
    );

  return { ...serie._doc, trailer };
}

module.exports = {
  validateSerie,
};
