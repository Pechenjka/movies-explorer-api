const mongoose = require('mongoose');
const { default: validator } = require('validator');
const { MOVIE_SCHEMA_VALIDATION_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.DURATION],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.DESCRIPTION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.YEAR],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.IMAGE],
    validate: {
      validator: (v) => validator.isURL(v),
      message: MOVIE_SCHEMA_VALIDATION_MESSAGE.IMAGE_URL,
    },
  },
  trailer: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.TRAILER],
    validate: {
      validator: (v) => validator.isURL(v),
      message: MOVIE_SCHEMA_VALIDATION_MESSAGE.TRAILER_URL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.THUMBNAIL],
    validate: {
      validator: (v) => validator.isURL(v),
      message: MOVIE_SCHEMA_VALIDATION_MESSAGE.THUMBNAIL_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.OWNER],
    select: false,
  },
  movieId: {
    type: Number,
    unique: true,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.MOVIE_ID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_VALIDATION_MESSAGE.NAME_EU],
  },
});

module.exports = mongoose.model('movie', movieSchema);
