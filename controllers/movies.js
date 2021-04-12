const Movie = require('../models/movie');
const {
  NotFound, BadReguest, ForBidden,
} = require('../error');
const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE, FOR_BIDDEN_MESSAGE } = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      const data = movie;
      data.owner = undefined;
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReguest(BAD_REQUEST_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};

const deleteSavedMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFound(NOT_FOUND_MESSAGE.MOVIE_ERROR);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForBidden(FOR_BIDDEN_MESSAGE);
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((data) => res.status(200).send(data))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = { getSavedMovies, createMovie, deleteSavedMovie };
