const { Router } = require('express');
const { getGenres } = require('../controllers/API/get_genres');

const router = Router();

router.get('/:mode', async (req, res) => {
  try {
    const data = await getGenres(req.params.mode);
    res.json({ data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
