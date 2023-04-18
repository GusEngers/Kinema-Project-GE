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
    `Validated list. Start: ${series.length} - End: ${filtered.length}`
  );
  return filtered;
}

module.exports = {
  validateCards,
};
