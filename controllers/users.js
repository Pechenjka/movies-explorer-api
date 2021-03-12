const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, JWT_TTL } = require('../config');

const getCurrentUser = () => {

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
        console.log('одно из полей не правильно заполнено заглушка');
      }
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        JWT_SECRET,
        { expiresIn: JWT_TTL });
      res.status(200).send({ token });
    })
    .catch(() => {
      console.log('необходима аторизация');
    })
    .catch(next);
};
const updateUser = () => {

};
module.exports = {
  getCurrentUser, createUser, updateUser, login,
};
