const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.post('/signup', Register);
router.post('/signin', Login);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
