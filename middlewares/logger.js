const winston = require('winston');
const expressWinston = require('express-winston');
const { FILE_NAME_REQUEST_LOGGER, FILE_NAME_ERROR_LOGGER } = require('../utils/constants');

// логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: FILE_NAME_REQUEST_LOGGER }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: FILE_NAME_ERROR_LOGGER }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
