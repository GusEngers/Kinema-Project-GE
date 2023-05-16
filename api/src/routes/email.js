const { Router } = require('express');
const emailer = require('../nodemailer/emailer');

const router = Router();

// nodemailer: Welcome email

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMail(body.email, body.user);
    res.status(200).json('email enviado!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// nodemailer: Upgrade email

router.post('/upgrade', async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMailUpgrade(body.email, body.user);
    res.status(200).json('email de upgrade enviado!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// nodemailer: Rent email

router.post('/rent', async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMailRent(
      body.email,
      body.title,
      body.img,
      body.date,
      body.user
    );
    res.status(200).json('Email de rent enviado!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// nodemailer: Contact us email

router.post('/contact', async (req, res) => {
  try {
    const body = req.body;
    await emailer.sendMailContact(body.email, body.user, body.message);
    res.status(200).json('Email de contact enviado!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
