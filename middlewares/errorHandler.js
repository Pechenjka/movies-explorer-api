const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message })

    .catch(next);
};

module.exports = errorHandler;
