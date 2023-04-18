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
    `Validated list. Start: ${series.length} - End: ${filtered.length}`,
    '\n'
  );
  return filtered;
}

async function validateVideos(series) {
  console.log('Validated videos:');
  let valid = [];
  for (let serie of series) {
    let response = await axios
      .get(`${API}/${serie.id}/videos?api_key=${API_KEY}`)
      .then((res) => res.data.results)
      .catch((err) => null);

    console.log('-', serie.name, serie.id);
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
    `Validated videos. Start ${series.length} - End: ${valid.length}`,
    '\n'
  );
  return valid;
}

function validateDetail(serie) {
  return (
    !!serie.id &&
    !!serie.genres.length &&
    !!serie.name &&
    !!serie.overview &&
    !!serie.vote_average &&
    !!serie.vote_count &&
    !!serie.first_air_date &&
    !!serie.number_of_seasons &&
    !!serie.poster_path &&
    !!serie.backdrop_path
  );
}

async function validateSeries(series) {
  console.log('Validate detail:');
  let valid = [];
  for (let serie of series) {
    console.log('-', serie.name, serie.id);
    let response = await axios
      .get(`${API}/${serie.id}?api_key=${API_KEY}`)
      .then((res) => res.data)
      .catch((err) => null);
    if (response === null) {
      console.log('--', false);
      continue;
    }
    if (!validateDetail(response)) {
      console.log('--', false);
      continue;
    }
    console.log('--', true);
    valid.push(serie);
  }
  console.log(`Validated detail. Start ${series.length} - End ${valid.length}`, '\n');
  return valid;
}

module.exports = {
  validateCards,
  validateVideos,
  validateSeries,
};
