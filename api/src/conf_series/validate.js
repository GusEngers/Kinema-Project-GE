const axios = require('axios');
const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/tv';

function validateCards(series) {
  let filtered = series.filter(
    (serie) =>
      !!serie.backdrop_path &&
      !!serie.genre_ids.length &&
      !!serie.id &&
      !!serie.name &&
      !!serie.overview &&
      !!serie.poster_path &&
      !!serie.vote_average
  );
  console.log(
    `Validated list. Start: ${series.length} - End: ${filtered.length}`, '\n'
  );
  return filtered;
}

async function validateVideos(series) {
  console.log('Validated videos:')
  let valid = [];
  for (let serie of series) {
    let response = await axios
      .get(`${API}/${serie.id}/videos?api_key=${API_KEY}`)
      .then((res) => res.data.results)
      .catch((err) => null);

    console.log('-', serie.name);
    if (response === null) {
      console.log('--', false);
      continue;
    }
    if (!response.length) {
      console.log('--', false);
      continue;
    }

    console.log('--', true);
    valid.push(serie);
  }

  console.log(
    `Validated videos. Start ${series.length} - End: ${valid.length}`, '\n'
  );
  return valid;
}

module.exports = {
  validateCards,
  validateVideos,
};
