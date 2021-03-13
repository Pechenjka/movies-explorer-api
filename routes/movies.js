const router = require('express').Router();
const { getSavedMovies, createMovie, deleteSavedMovie } = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createMovie);
router.delete('/movieId', deleteSavedMovie);

module.exports = router;
