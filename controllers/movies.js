const Movie = require('../models/movie');

const getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    // owner: req.user._id,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .then((data) => res.status(200).send(data))
        .catch(() => {
          console.log('Фильм не найден. Заглушка');
        });
    })
    .catch(next);
};

const deleteSavedMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .orFail(console.log('ошибка'))
    .then((data) => res.send(data))
    .catch(() => {
      console.log('ошибка фильм не удалился. Заглушка');
    })
    .catch(next);
};

module.exports = { getSavedMovies, createMovie, deleteSavedMovie };
