const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationRegisterUser, validationAuthorizationUser } = require('../middlewares/validation');

router.post('/signup', validationRegisterUser, createUser);
router.post('/signin', validationAuthorizationUser, login);
router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

module.exports = router;
