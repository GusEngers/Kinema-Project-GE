const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  backdrop: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  serie: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('serie', dataSchema);
