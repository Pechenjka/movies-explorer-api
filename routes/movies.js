const router = require('express').Router();
const { getSavedMovies, setMovie, deleteSavedMovie } = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', setMovie);
router.delete('/movieId', deleteSavedMovie);

module.exports = router;
