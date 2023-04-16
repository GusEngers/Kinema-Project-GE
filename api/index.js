const server = require('./src/app.js');
const mongoose = require('mongoose');
require('dotenv').config();
const { PORT, URL_DB } = process.env;

mongoose
  .connect(URL_DB)
  .then(() => {
    console.info('Database connected!');
    server.listen(PORT, () => {
      console.info(`Server connected on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting database:', error);
  });
