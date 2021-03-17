const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  JWT_SECRET, JWT_TTL, NODE_ENV, DEV_JWT_SECRET,
} = require('../config');
const {
  Unauthorized, NotFound, BadReguest, Conflict,
} = require('../error');

const getCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findOne({ email, name })
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь с таким email: ${email} или name: ${name} не найден`);
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
        throw new BadReguest(`Не правильно заполнено поле email: ${email} или name: ${name}`);
      }
      throw new Conflict(`Пользователь с таким email: ${email} уже существует`);
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
      if (err.name === 'Error') {
        throw new BadReguest(`Не правильно заполнено поле email: ${email} или password: ${password}`);
      }
      throw new Unauthorized('Необходимо пройти авторизацию');
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
        throw new BadReguest(`Не правильно заполнено поле email: ${email} или name: ${name}`);
      }
    })
    .catch(next);
};
module.exports = {
  getCurrentUser, createUser, updateUser, login,
};
