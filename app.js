const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');

const { PORT, MONGO_URL } = require('./config');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on('open', () => console.log('Mongoose connection...'));
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json({ extended: true }));

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Aplication is working on the port ${PORT}`));
