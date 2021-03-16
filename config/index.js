const {
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  JWT_SECRET,
  JWT_TTL = '7d',
  NODE_ENV,
} = process.env;

module.exports = {
  MONGO_URL, PORT, JWT_SECRET, JWT_TTL, NODE_ENV,
};
