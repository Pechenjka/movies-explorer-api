const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationRegisterUser, validationAuthorizationUser } = require('../middlewares/validation');
const { NotFound } = require('../error');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post('/signup', validationRegisterUser, createUser);
router.post('/signin', validationAuthorizationUser, login);
router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);
router.use('*', () => {
  throw new NotFound(NOT_FOUND_MESSAGE.RESOURSE_ERROR);
});
module.exports = router;
