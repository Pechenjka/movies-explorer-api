const router = require('express').Router();

router.get('/me', getUsers);
router.patch('/me', updateUser);

module.exports = router;
