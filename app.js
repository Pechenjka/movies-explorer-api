const express = require('express');
const mongoose = require('mongoose');

const { PORT, MONGO_URL } = require('./config/index');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on('open', () => console.log('Mongoose connection...'));

app.listen(PORT, () => console.log(`Aplication is working on the port ${PORT}`));
