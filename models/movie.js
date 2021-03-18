const mongoose = require('mongoose');
const { default: validator } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Поле 'country' должно быть заполнено"],
  },
  director: {
    type: String,
    required: [true, "Поле 'director' должно быть заполнено"],
  },
  duration: {
    type: Number,
    required: [true, "Поле 'duration' должно быть заполнено"],
  },
  description: {
    type: String,
    required: [true, "Поле 'description' должно быть заполнено"],
  },
  year: {
    type: String,
    required: [true, "Поле 'year' должно быть заполнено"],
  },
  image: {
    type: String,
    required: [true, "Поле 'image' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Поле 'image' должно быть валидным url-адресом",
    },
  },
  trailer: {
    type: String,
    required: [true, "Поле 'trailer' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Поле 'trailer' должно быть валидным url-адресом",
    },
  },
  thumbnail: {
    type: String,
    required: [true, "Поле 'thumbnail' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Поле 'thumbnail ' должно быть валидным url-адресом",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "Поле 'owner' должно быть заполнено"],
    select: false,
  },
  movieId: {
    type: Number,
    unique: true,
    required: [true, "Поле 'movieId' должно быть заполнено"],
  },
  nameRU: {
    type: String,
    required: [true, "Поле 'nameRU' должно быть заполнено"],
  },
  nameEN: {
    type: String,
    required: [true, "Поле 'nameEN ' должно быть заполнено"],
  },
});

module.exports = mongoose.model('movie', movieSchema);
