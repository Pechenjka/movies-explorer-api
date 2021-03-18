const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { Unauthorized } = require('../error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized('нет токена');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized('нет токена');
  }
  req.user = payload;

  next();
};

module.exports = auth;
