const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 200, // Ограничить запросы на сервер в кол-ве - 200 ед
});

module.exports = limiter;
