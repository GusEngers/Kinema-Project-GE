const { Router } = require('express');
const Like = require('../database/cloud/models/like');

const router = Router();

router.post('/like', async (req, res) => {
  const { idContent, idUser } = req.query;
  try {
    let json = await Like.create({ idUser, idContent });
    res.status(201).json(json);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/dislike', async (req, res) => {
  const { idContent, idUser } = req.query;
  try {
    let json = await Like.deleteOne({ idUser, idContent });
    res.status(200).json(json);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/content/:idContent', async (req, res) => {
  const { idContent } = req.params;
  try {
    let json = await Like.find({ idContent });
    res.status(200).json(json.length);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/user/:idUser', async (req, res) => {
  const { idUser } = req.params;
  try {
    let json = await Like.find({ idUser });
    res.status(200).json(json);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/islike', async (req, res) => {
  const { idContent, idUser } = req.query;
  try {
    let json = await Like.findOne({ idUser, idContent });
    res.status(200).json(json);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
