const { Router } = require('express');
const { getMovieCarrusels } = require('../controllers/API/carrusels_movies');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await getMovieCarrusels();
    const data = { movies };
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
