const Movie = require('../models/movie');
const {
  NotFound, BadReguest, ForBidden,
} = require('../error');

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
    owner: req.user._id,
    movieId: 22,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .then((data) => res.status(200).send(data))
        .catch(() => {
          throw new NotFound('Фильм не найлден');
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReguest('Одно из полей заполнено не правильно');
      }
    })
    .catch(next);
};

const deleteSavedMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findByIdAndRemove(_id)
    .orFail(new NotFound(`Фильм не найлден по этому id: ${_id}`))
    .then((data) => res.send(data))
    .catch(() => {
      throw new ForBidden('Нет прав на удаление чужого фильма');
    })
    .catch(next);
};

module.exports = { getSavedMovies, createMovie, deleteSavedMovie };
