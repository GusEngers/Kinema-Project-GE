const { Router } = require('express');
const { getMovies } = require('../controllers/API/get_movies');
const { getDetailMovie } = require('../controllers/API/get_detail_movie');

const router = Router();

router.get('/', async (req, res) => {
  const { page } = req.query;
  try {
    const data = await getMovies(page);
    res.json({ data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await getDetailMovie(id);
    res.json({ data });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
