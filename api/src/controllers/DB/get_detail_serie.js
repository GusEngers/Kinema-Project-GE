const axios = require('axios');
const Serie = require('../../database/cloud/models/serie');
const { validateSerie } = require('./validate');
const { API_KEY } = process.env;
const API = 'https://api.themoviedb.org/3/tv';

async function getDetailSerie(id) {
  const serie = await validateSerie(id);
  
}
