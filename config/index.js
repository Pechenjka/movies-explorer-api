const { MONGO_URL = 'mongodb://localhost:27017/diplomadb' } = process.env;
const { PORT = 3000 } = process.env;

module.exports = { MONGO_URL, PORT };
