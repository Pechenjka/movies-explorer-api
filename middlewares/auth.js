const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET, DEV_JWT_SECRET } = require('../config');
const { Unauthorized } = require('../error');
const { UNAUTHORIZATED_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized(UNAUTHORIZATED_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    throw new Unauthorized(UNAUTHORIZATED_MESSAGE);
  }
  req.user = payload;

  next();
};

module.exports = auth;
