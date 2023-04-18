const axios = require('axios');
const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/tv';

/**
 * Verifica si el detalle resumido de las series están completos
 * @param series Array con series
 * @returns Array con series que pasen la verificación
 */
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

/**
 * Verifica si las series obtenidas de la API tienen videos
 * @param series Array con series obtenidas de la API
 * @returns Array de series que pasen la verificación
 */
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

/**
 * Verifica si la serie pasada por parámetro está completa
 * @param serie Objeto con la información de la serie
 * @returns Booleano, true si pasa la verificacíon, caso contrario false
 */
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

/**
 * Verifica si las series con datos resumidos tienen su detalle total completo
 * @param series Array con series con datos resumidos
 * @returns Array con series que pasen la verificación
 */
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
    valid.push({ ...serie, seasons: response.number_of_seasons });
  }
  console.log(
    `Validated detail. Start ${series.length} - End ${valid.length}`,
    '\n'
  );
  return valid;
}

/**
 * Verifica si los datos de los episodios estan completos
 * @param episodes Array con episodios de una temporada de una serie
 * @returns Booleano, true si está completo, caso contrario false
 */
function episodes(episodes) {
  console.log('--- episodes');
  let data = episodes.filter(
    (episode) =>
      !!episode.id &&
      !!episode.name &&
      !!episode.overview &&
      !!episode.episode_number &&
      !!episode.air_date &&
      !!episode.still_path &&
      !!episode.runtime
  );
  console.log('--- episodes', episodes.length === data.length);
  return episodes.length === data.length;
}

/**
 * Verifica si los datos de las temporadas de una serie están completas
 * @param serie Objecto con información de una serie
 * @returns Booleano, true si están completos, caso contrario false
 */
async function validateSeasons(serie) {
  let i = 1;
  console.log('- seasons', serie.name, serie.id);
  while (i < serie.seasons + 1) {
    console.log('-- season', i);
    let response = await axios
      .get(`${API}/${serie.id}/season/${i}?api_key=${API_KEY}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(
          `Error season ${i} of tv show ${serie.name} -- ${serie.id}`
        );
      });
    if (
      !response._id ||
      !response.air_date ||
      !response.name ||
      !response.poster_path ||
      !response.season_number ||
      !response.episodes ||
      !response.episodes.length
    )
      return false;
    if (!episodes(response.episodes)) return false;
    i++;
  }
  console.log('- Finish seasons', serie.name, serie.id, '\n');
  return true;
}

/**
 * Filtra las series obtenidas de la API dejando solo las que estén totalmente completas
 * @param series Array de series obtenidas de la API
 * @returns Array con series que pasen el filtro
 */
async function validate(series) {
  let stepOne = await validateVideos(validateCards(series));
  let stepTwo = await validateSeries(stepOne);
  let results = [];
  for (let serie of stepTwo) {
    let response = await validateSeasons(serie);
    if (response) {
      results.push(serie);
    }
  }
  return results;
}

module.exports = {
  validate,
};
