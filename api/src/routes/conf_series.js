const { Router } = require('express');
const getSeries = require('../conf_series/get_series');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await getSeries(req.query.page);
    res.json({ data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
