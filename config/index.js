const { MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb', PORT = 3000 } = process.env;

module.exports = { MONGO_URL, PORT };
