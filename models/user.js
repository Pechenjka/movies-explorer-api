const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../error');
const { UNAUTHORIZATED_MESSAGE, USER_SCHEMA_VALIDATION_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, USER_SCHEMA_VALIDATION_MESSAGE.NAME],
    minlength: [2, USER_SCHEMA_VALIDATION_MESSAGE.MIN_LENGTH],
    maxlength: [30, USER_SCHEMA_VALIDATION_MESSAGE.MAX_LENGTH],

  },
  email: {
    type: String,
    required: [true, USER_SCHEMA_VALIDATION_MESSAGE.EMAIL],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: USER_SCHEMA_VALIDATION_MESSAGE.EMAIL_URL,
    },
  },
  password: {
    type: String,
    required: [true, USER_SCHEMA_VALIDATION_MESSAGE.PASSWORD],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(UNAUTHORIZATED_MESSAGE.INVALID_AUTHORIZED);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(UNAUTHORIZATED_MESSAGE.INVALID_AUTHORIZED);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
