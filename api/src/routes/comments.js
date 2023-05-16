const { Router } = require('express');
const { getDataComments } = require('../controllers/DB/comments');

const router = Router();

router.post('/', async (req, res) => {
  const { userId, content, date, idReference } = req.body;
  try {
    await Comment.create({ userId, content, date, idReference });
    res.status(201).json('creado!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      let info = await getDataComments(id);
      res.status(200).send(info);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      let json = await Comment.deleteOne({ _id: id });
      res.status(200).json(json);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

module.exports = router;
