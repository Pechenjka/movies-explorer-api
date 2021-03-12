const router = require('express').Router();
const usersRoutes = require('./users');
// const moviesRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', usersRoutes);
// router.use('/movies', moviesRoutes);

module.exports = router;
