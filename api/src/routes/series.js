const { Router } = require('express');
const { getSeries, getSeriesByGenre } = require('../controllers/DB/get_series');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await getSeries(req.query.page);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/genre/:genre', async (req, res) => {
  try {
    const data = await getSeriesByGenre(req.params.genre, req.query.page);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
