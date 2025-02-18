const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

const movies = require('./routes/movies.js');
const genres = require('./routes/genres.js');
const series = require('./routes/series.js');
const carrusels = require('./routes/carrusels.js');
const search = require('./routes/search.js');
// const comments = require('./routes/comments.js');
// const likes = require('./routes/likes.js');
const payment = require('./routes/payment.js');
const email = require('./routes/email.js');
const confSeries = require('./routes/conf_series.js');

server.name = 'API';
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/movies', movies);
server.use('/genres', genres);
server.use('/series', series);
server.use('/carrusels', carrusels);
server.use('/search', search);
// server.use('/comments', comments);
// server.use('/likes', likes)
server.use('/payment', payment);
server.use('/email', email);
server.use('/conf_series', confSeries);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
