const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, MONGO_URL } = require('./config');
const router = require('./routes/index');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on('open', () => console.log('Mongoose connection...'));

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/', router);

app.listen(PORT, () => console.log(`Aplication is working on the port ${PORT}`));
