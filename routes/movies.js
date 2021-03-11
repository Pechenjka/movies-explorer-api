const router = require('express').Router();

router.get('/', getSavedMovies);
router.post('/', setMovie);
router.delete('/movieId', deleteSavedMovie);

module.exports = router;
