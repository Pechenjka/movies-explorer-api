const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  JWT_SECRET, JWT_TTL, NODE_ENV, DEV_JWT_SECRET,
} = require('../config');
const {
  Unauthorized, NotFound, BadReguest, Conflict,
} = require('../error');
const {
  UNAUTHORIZATED_MESSAGE, BAD_REQUEST_MESSAGE, CONFLICT_MESSAGE, NOT_FOUND_MESSAGE,
} = require('../utils/constants');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(NOT_FOUND_MESSAGE.INVALID_CURRENT_USER);
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReguest(BAD_REQUEST_MESSAGE);
      }
      if (err.name === 'MongoError') {
        throw new Conflict(CONFLICT_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET,
        { expiresIn: JWT_TTL });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReguest(BAD_REQUEST_MESSAGE);
      }
      if (err.status === 401) {
        throw new Unauthorized(UNAUTHORIZATED_MESSAGE.INVALID_REGISTER);
      }
      next(err);
    })
    .catch(next);
};
const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(_id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReguest(BAD_REQUEST_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};
module.exports = {
  getCurrentUser, createUser, updateUser, login,
};
