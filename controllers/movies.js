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
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReguest('Одно из полей заполнено не правильно');
      }
    })
    .catch(next);
};

const deleteSavedMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .orFail(new NotFound(`Not found: ${req.params.movieId}`))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ForBidden('Нет прав на удаление чужого фильма');
      }
    })
    .catch(next);
};

module.exports = { getSavedMovies, createMovie, deleteSavedMovie };
