const { Router } = require('express');
const { searchAll } = require('../controllers/search');

const router = Router();

router.get('/:search', async (req, res) => {
  try {
    const data = await searchAll(req.params.search, req.query.page)
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
