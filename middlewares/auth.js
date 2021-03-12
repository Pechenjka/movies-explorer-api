const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    Promise.reject(new Error('нет токена'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    Promise.reject(new Error('нет токена'));
  }
  req.user = payload;

  next();
};

module.exports = auth;
