const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { CELEBRATE_VALIDATE_URL_HELPER_MESSAGE } = require('../utils/constants');

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validationRegisterUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

const validationAuthorizationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(CELEBRATE_VALIDATE_URL_HELPER_MESSAGE);
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(CELEBRATE_VALIDATE_URL_HELPER_MESSAGE);
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(CELEBRATE_VALIDATE_URL_HELPER_MESSAGE);
    }),
  }),
});

const validationDeletedSavedMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validationUpdateUser,
  validationRegisterUser,
  validationAuthorizationUser,
  validationCreateMovie,
  validationDeletedSavedMovie,
};
