const UNAUTHORIZATED_MESSAGE = {
  INVALID_REGISTER: 'Необходимо пройти авторизацию',
  INVALID_AUTHORIZED: 'Неправильные почта или пароль',
};
const BAD_REQUEST_MESSAGE = 'Одно из полей заполнено неправильно';
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
const NOT_FOUND_MESSAGE = {
  INVALID_CURRENT_USER: 'Пользователь с таким email или name не найден',
  RESOURSE_ERROR: 'Запрошенный ресурс не найден',
  MOVIE_ERROR: 'Нет фильма с таким Id',
};
const FOR_BIDDEN_MESSAGE = 'Нет прав на удаление чужого фильма';
const ERROR_DEFAULT_SERVER_MESSAGE = 'На сервере произошла ошибка';

const FILE_NAME_ERROR_LOGGER = 'logs/error.log';
const FILE_NAME_REQUEST_LOGGER = 'logs/request.log';

const CELEBRATE_VALIDATE_URL_HELPER_MESSAGE = 'Неправильный адрес';

const USER_SCHEMA_VALIDATION_MESSAGE = {
  NAME: "Поле 'name' должно быть заполнено",
  MIN_LENGTH: "Минимальная длина поля 'name' - 2",
  MAX_LENGTH: "Максимальная длина поля 'name' - 30",
  EMAIL: "Поле 'email' должно быть заполнено",
  EMAIL_URL: "Поле 'email' должно быть валидным url-адресом",
  PASSWORD: "Поле 'password' должно быть заполнено",
};

const MOVIE_SCHEMA_VALIDATION_MESSAGE = {
  COUNTRY: "Поле 'country' должно быть заполнено",
  DIRECTOR: "Поле 'director' должно быть заполнено",
  DURATION: "Поле 'duration' должно быть заполнено",
  DESCRIPTION: "Поле 'description' должно быть заполнено",
  YEAR: "Поле 'year' должно быть заполнено",
  IMAGE: "Поле 'image' должно быть заполнено",
  IMAGE_URL: "Поле 'image' должно быть валидным url-адресом",
  TRAILER: "Поле 'trailer' должно быть заполнено",
  TRAILER_URL: "Поле 'trailer' должно быть валидным url-адресом",
  THUMBNAIL: "Поле 'thumbnail' должно быть заполнено",
  THUMBNAIL_URL: "Поле 'thumbnail ' должно быть валидным url-адресом",
  OWNER: "Поле 'owner' должно быть заполнено",
  MOVIE_ID: "Поле 'movieId' должно быть заполнено",
  NAME_RU: "Поле 'nameRU' должно быть заполнено",
  NAME_EN: "Поле 'nameEN' должно быть заполнено",
};

module.exports = {
  UNAUTHORIZATED_MESSAGE,
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  NOT_FOUND_MESSAGE,
  FOR_BIDDEN_MESSAGE,
  FILE_NAME_ERROR_LOGGER,
  FILE_NAME_REQUEST_LOGGER,
  ERROR_DEFAULT_SERVER_MESSAGE,
  USER_SCHEMA_VALIDATION_MESSAGE,
  MOVIE_SCHEMA_VALIDATION_MESSAGE,
  CELEBRATE_VALIDATE_URL_HELPER_MESSAGE,
};
