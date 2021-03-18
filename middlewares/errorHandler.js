const { ERROR_DEFAULT_SERVER_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? ERROR_DEFAULT_SERVER_MESSAGE : message,
  })
    .catch(next);
};

module.exports = errorHandler;
