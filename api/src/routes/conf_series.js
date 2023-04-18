const { Router } = require('express');
const getSeries = require('../conf_series/get_series');
const { addSeries } = require('../conf_series/post_series');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const data = await getSeries(req.query.page);
      res.json({ data });
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      let data = await addSeries(req.query.page);
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
