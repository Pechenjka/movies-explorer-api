const router = require('express').Router();
const { getSavedMovies, createMovie, deleteSavedMovie } = require('../controllers/movies');
const { validationCreateMovie, validationDeletedSavedMovie } = require('../middlewares/validation');

router.get('/', getSavedMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:movieId', validationDeletedSavedMovie, deleteSavedMovie);

module.exports = router;
