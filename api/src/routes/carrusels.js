const { Router } = require('express');
const { getMovieCarrusels } = require('../controllers/API/carrusels_movies');
const { getSerieCarrusels } = require('../controllers/DB/carrusels_series');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await getMovieCarrusels();
    const series = await getSerieCarrusels();
    res.json({ movies, series });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
