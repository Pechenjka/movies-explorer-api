const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничить запросы на сервер в кол-ве - 100 ед
});

module.exports = limiter;
