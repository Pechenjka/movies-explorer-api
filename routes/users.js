const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { validationCurrentUser, validationUpdateUser } = require('../middlewares/validation');

router.get('/me', validationCurrentUser, getCurrentUser);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
